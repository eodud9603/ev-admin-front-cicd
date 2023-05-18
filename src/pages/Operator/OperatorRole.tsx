import React, { useState } from "react";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";
import {
  RoleHeaderItem,
  RoleMainItem,
} from "src/pages/Operator/components/RoleItem";
import { objectToArray } from "src/utils/convert";
import { ROLE_TYPE, TRoleTypeKey } from "src/constants/status";
import {
  IAdminMainRoleItem,
  IAdminRoleListResponse,
} from "src/api/admin/adminApi.interface";
import { useLoaderData } from "react-router";
import { lock } from "src/utils/lock";
import { getAdminRoleList, postAdminRoleModify } from "src/api/admin/adminAPi";
import DetailCancelModal from "src/components/Common/Modal/DetailCancelModal";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";

/** 권한 목록(탭) */
const roleList = objectToArray(ROLE_TYPE);

const OperatorRole = () => {
  const { data, filterData } = useLoaderData() as {
    data: Partial<IAdminRoleListResponse>;
    filterData: object;
  };

  const [selectedRole, setSelectedRole] = useState<TRoleTypeKey>(
    roleList[0].value as TRoleTypeKey
  );
  /* 전체보기 */
  const [allOpen, setAllOpen] = useState(false);
  const [list, setList] = useState<IAdminMainRoleItem[]>(data.elements ?? []);
  /** disabled */
  const [disabled, setDisabled] = useState(true);

  /* 수정취소 모달 */
  const [editCancelModal, setEditCancelModal] = useState<{
    isOpen: boolean;
    role: TRoleTypeKey;
  }>({
    isOpen: false,
    role: roleList[0].value as TRoleTypeKey,
  });
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);

  /** 권한 목록 가져오기 */
  const getRoleList = async (role: TRoleTypeKey) => {
    const { code, data: searchData } = await getAdminRoleList({ role });

    /** 성공 */
    const success = code === "SUCCESS" && !!searchData;
    if (success) {
      setList(searchData.elements ?? []);
      setSelectedRole(role);
    }
  };

  const onChangeRole = (role: TRoleTypeKey) =>
    lock(async () => {
      /* 수정모드 상태에서 탭 변경시, 취소안내모달 */
      if (!disabled) {
        setEditCancelModal({ isOpen: true, role });
        return;
      }

      await getRoleList(role);
    }, 100);

  /** 권한등급별 권한 수정 */
  const modify = lock(async () => {
    /* 수정모드가 아니면 리턴 */
    if (disabled) {
      setDisabled(false);
      return;
    }
    if (!data.code || !data.name) {
      return;
    }

    /* 수정 요청 */
    const { code } = await postAdminRoleModify({
      code: data.code,
      name: data.name,
      elements: list,
    });
    /** 수정 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setIsEditComplete(true);
      setDisabled(true);
    }
  }, 100);

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "운영자 관리", href: "" },
            { label: "권한 관리", href: "" },
          ]}
          title={"권한 관리"}
        />

        <RoleSection>
          {roleList.map(({ label, value }, index) => (
            <ButtonBase
              className={`width-110 rounded-0 fw-bold ${
                index > 0 ? "border-start-0" : ""
              } ${value === selectedRole ? "bg-turu text-white" : ""}`}
              key={value}
              outline={true}
              color={"turu"}
              label={label}
              onClick={onChangeRole(value as TRoleTypeKey)}
            />
          ))}

          <div
            className={
              "mt-3 d-flex align-items-center justify-content-between mb-4"
            }
          >
            <div className={"font-size-20 fw-bold"}>
              기본권한
              <span className={"ms-3 font-size-12 fw-normal text-secondary"}>
                * 권한 등급별로 권한등급에 기본으로 적용되는 편집/조회 권한을
                설정할 수 있습니다.
              </span>
            </div>

            <ButtonBase
              className={"rounded-0 fw-bold"}
              label={allOpen ? "전체 닫기" : "전체 보기"}
              outline={true}
              color={"secondary"}
              onClick={() => {
                setAllOpen((prev) => !prev);
              }}
            />
          </div>
        </RoleSection>

        <ListSection>
          <RoleHeaderItem />
          {list.map((props) => (
            <RoleMainItem
              key={props.id}
              disabled={disabled}
              initialOpen={allOpen}
              {...props}
              setList={setList}
            />
          ))}
        </ListSection>

        <div className={"my-5 d-flex flex-row justify-content-center gap-4"}>
          {/** @TODO 권한관리의 별도 페이지가 없으므로 주석 처리 (추후 추가시, 적용) */}
          {/* <ButtonBase className={"width-110"} outline label={"목록"} /> */}
          <ButtonBase
            className={"width-110"}
            color={"turu"}
            label={disabled ? "수정" : "저장"}
            onClick={modify}
          />
        </div>
      </BodyBase>

      <DetailCancelModal
        isOpen={editCancelModal.isOpen}
        onClose={() => {
          setEditCancelModal((prev) => ({ ...prev, isOpen: false }));
        }}
        cancelHandler={() => {
          setDisabled(true);
          void getRoleList(editCancelModal.role);
        }}
        title={"권한 수정 취소 안내"}
        contents={
          "변경된 권한 정보가 저장되지 않습니다.\n권한 수정을 취소하시겠습니까?"
        }
      />
      <DetailCompleteModal
        isOpen={isEditComplete}
        onClose={() => {
          setIsEditComplete(false);
        }}
        title={"권한 정보 수정 완료 안내"}
        contents={`수정한 [${ROLE_TYPE[selectedRole]}] 권한 정보가 저장되었습니다.`}
      />
    </ContainerBase>
  );
};

export default OperatorRole;

const RoleSection = styled.section``;
const ListSection = styled.section``;
