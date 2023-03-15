import React, { useState } from "react";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { ROLE_LIST, ROLE_TABLE_LIST } from "src/constants/list";
import styled from "styled-components";
import {
  RoleHeaderItem,
  RoleMainItem,
} from "src/pages/Operator/components/RoleItem";

const OperatorRole = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "권한 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [selectedRole, setSelectedRole] = useState("1");

  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

    setTabList(tempList);
  };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

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
          {ROLE_LIST.map(({ label, value }, index) => (
            <ButtonBase
              className={`width-110 rounded-0 fw-bold ${
                index > 0 ? "border-start-0" : ""
              } ${value === selectedRole ? "bg-turu text-white" : ""}`}
              key={index}
              outline={true}
              color={"turu"}
              label={label}
              onClick={() => {
                setSelectedRole(value);
              }}
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
              label={"전체 보기"}
              outline={true}
              color={"secondary"}
            />
          </div>
        </RoleSection>

        <ListSection>
          {/** @TODO 펼치기/숨기기 애니메이션 작업 필요 */}
          <RoleHeaderItem />
          {ROLE_TABLE_LIST.map((props, index) => (
            <RoleMainItem key={index} index={index} {...props} />
          ))}
          <div className={"d-flex flex-row justify-content-center gap-4"}>
            <ButtonBase className={"width-110"} outline label={"목록"} />
            <ButtonBase className={"width-110"} color={"turu"} label={"수정"} />
          </div>
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorRole;

const RoleSection = styled.section``;
const ListSection = styled.section``;
