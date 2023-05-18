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
import { getAdminRoleList } from "src/api/admin/adminAPi";

/** 권한 목록(탭) */
const roleList = objectToArray(ROLE_TYPE);

const OperatorRole = () => {
  const { data, filterData } = useLoaderData() as {
    data: Partial<IAdminRoleListResponse>;
    filterData: object;
  };

  const [selectedRole, setSelectedRole] = useState(roleList[0].value);
  /* 전체보기 */
  const [allOpen, setAllOpen] = useState(false);
  const [list, setList] = useState<IAdminMainRoleItem[]>(data.elements ?? []);

  const onChangeRole = (role: TRoleTypeKey) =>
    lock(async () => {
      const { code, data: searchData } = await getAdminRoleList({ role });

      /** 성공 */
      const success = code === "SUCCESS" && !!searchData;
      if (success) {
        setList(searchData.elements ?? []);
        setSelectedRole(role);
      }
    });

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
          {list.map((props, index) => (
            <RoleMainItem
              key={props.id}
              index={index}
              initialOpen={allOpen}
              {...props}
            />
          ))}
        </ListSection>

        <div className={"my-5 d-flex flex-row justify-content-center gap-4"}>
          {/** @TODO 권한관리의 별도 페이지가 없으므로 주석 처리 (추후 추가시, 적용) */}
          {/* <ButtonBase className={"width-110"} outline label={"목록"} /> */}
          <ButtonBase className={"width-110"} color={"turu"} label={"수정"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorRole;

const RoleSection = styled.section``;
const ListSection = styled.section``;
