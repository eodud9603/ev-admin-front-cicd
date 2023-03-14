import React, { useState } from "react";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { ROLE_LIST } from "src/constants/list";
import styled from "styled-components";

/* 목록 헤더 */
const tableHeader = [
  { label: "1차" },
  { label: "2차" },
  { label: "편집" },
  { label: "조회" },
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
          <TableBase tableClassName={"mb-5"} tableHeader={tableHeader}>
            <>
              {roleList.map((role, index) => (
                <FirstRole key={index} index={index} {...role} />
              ))}
            </>
          </TableBase>

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

const DropArea = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.i<{ isOpen: boolean }>`
  transition: all ease 0.5s;
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 360)}deg);
`;

const DetailTr = styled.tr`
  overflow: hidden;
  max-height: 0;
  transition: all 10s ease;
`;

/** @TODO 별도 컴포넌트 빼내기 */
const FirstRole = (props: {
  index: number;
  name: string;
  detailList: { name: string; read: boolean; write: boolean }[];
  write: boolean;
  read: boolean;
}) => {
  const { index, name, detailList } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onChangeOpenHandler = () => {
    if (detailList.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      <tr>
        <td
          className={"align-top"}
          rowSpan={isOpen ? detailList.length + 1 : 1}
        >
          <DropArea
            className={
              "d-flex flex-row align-items-center justify-content-between"
            }
            onClick={onChangeOpenHandler}
          >
            <span>{name}</span>
            {/* 2차 항목이 있는 경우 */}
            {detailList.length > 0 && (
              <Icon isOpen={isOpen} className={"bx bx-down-arrow-alt"} />
            )}
          </DropArea>
        </td>
        <td>{detailList.length > 0 && "전체"}</td>
        <td>
          <CheckBoxBase
            label={""}
            name={`write-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </td>
        <td>
          <CheckBoxBase
            label={""}
            name={`read-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </td>
      </tr>
      {isOpen &&
        (detailList ?? []).map((detail, detailIndex) => (
          <DetailRole key={detailIndex} index={detailIndex} {...detail} />
        ))}
    </>
  );
};

/** @TODO 별도 컴포넌트 빼내기 */
const DetailRole = (props: { index: number; name: string }) => {
  const { index, name } = props;

  return (
    <DetailTr>
      <td>{name}</td>
      <td>
        <CheckBoxBase
          label={""}
          name={`write-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </td>
      <td>
        <CheckBoxBase
          label={""}
          name={`read-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </td>
    </DetailTr>
  );
};
