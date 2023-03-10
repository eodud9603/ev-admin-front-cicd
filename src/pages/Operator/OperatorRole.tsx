import React, { useState } from "react";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";

const roleTabList = [
  {
    label: "최고관리자",
    value: "1",
  },
  {
    label: "일반관리자",
    value: "2",
  },
  {
    label: "상담사",
    value: "3",
  },
  {
    label: "제조사",
    value: "4",
  },
  {
    label: "관계사",
    value: "5",
  },
];

/* 임시 목록 데이터 */
const roleList = [
  /* default */
  {
    name: "전체",
    detailList: [],
    read: true,
    write: true,
  },
  /* server sample response */
  {
    name: "충전소 및 충전기 관리",
    detailList: [
      {
        name: "충전소 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 고장/파손 관리",
        read: true,
        write: true,
      },
      {
        name: "충전기 제조사 관리",
        read: true,
        write: true,
      },
      {
        name: "서비스 운영사(사업자) 관리",
        read: true,
        write: true,
      },
    ],
    read: true,
    write: true,
  },
  {
    name: "회원 및 카드 관리",
    detailList: [
      {
        name: "회원 관리",
        read: true,
        write: true,
      },
      {
        name: "탈퇴회원 관리",
        read: true,
        write: true,
      },
      {
        name: "소항목 목록 노출",
        read: true,
        write: true,
      },
    ],
    read: true,
    write: true,
  },
  {
    name: "운영 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "상담 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "운영자 관리",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "이용 통계",
    detailList: [],
    read: true,
    write: true,
  },
  {
    name: "로그 관리",
    detailList: [],
    read: true,
    write: true,
  },
];

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
          {roleTabList.map(({ label, value }, index) => (
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

        <ListSection></ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorRole;

const RoleSection = styled.section``;
const ListSection = styled.section``;
