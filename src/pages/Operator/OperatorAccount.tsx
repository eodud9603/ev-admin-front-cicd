import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";

/* 계정상태 필터 */
const statusList = [
  {
    label: "전체",
  },
  {
    label: "정상",
  },
  {
    label: "차단",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "운영자명", value: "1" },
  { label: "운영자 ID", value: "2" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "그룹명" },
  { label: "운영자명" },
  { label: "운영자 ID" },
  { label: "제조사명" },
  { label: "권한등급" },
  { label: "핸드폰 번호" },
  { label: "부서" },
  { label: "모바일접속허용" },
  { label: "외부접속허용" },
  { label: "활성화 여부" },
];

/* 임시 목록 데이터 */
const accountList = [
  {
    groupName: "휴맥스EV",
    operatorName: "이팀장",
    operatorId: "K05@humaxev.com",
    manufacturerName: null,
    role: "최고 관리자",
    tel: "000-0000-0000",
    department: "서비스 운영팀",
    mobileAccess: "Y",
    externalAccess: "Y",
    isActivate: "Y",
  },
  {
    groupName: "휴맥스EV",
    operatorName: "허책임",
    operatorId: "K04@humaxev.com",
    manufacturerName: null,
    role: "일반 관리자",
    tel: "000-0000-0000",
    department: "서비스 운영팀",
    mobileAccess: "Y",
    externalAccess: "Y",
    isActivate: "Y",
  },
  {
    groupName: "스필 01",
    operatorName: "김스필",
    operatorId: "K03@humaxev.com",
    manufacturerName: "스필",
    role: "제조사",
    tel: "000-0000-0000",
    department: "SW팀",
    mobileAccess: "Y",
    externalAccess: "Y",
    isActivate: "Y",
  },
];

const OperatorAccount = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "계정 관리" },
  ]);
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

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
            { label: "계정 관리", href: "" },
          ]}
          title={"계정 관리"}
        />

        <SearchSection className={"py-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                placeholder={"운영자명을 입력해주세요."}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"계정상태"}
                name={"statusGroup"}
                list={statusList}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{accountList.length}개</span>의
              계정 정보가 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={COUNT_FILTER_LIST} />
              <ButtonBase label={"신규 등록"} color={"turu"} />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {accountList.length > 0 ? (
                  accountList.map(
                    (
                      {
                        groupName,
                        operatorName,
                        operatorId,
                        manufacturerName,
                        role,
                        tel,
                        department,
                        mobileAccess,
                        externalAccess,
                        isActivate,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <HoverSpan
                            className={"text-turu"}
                            onClick={() => {
                              /** @TODO 계정 > 그룹명 */
                            }}
                          >
                            <u>{groupName}</u>
                          </HoverSpan>
                        </td>
                        <td>
                          <HoverSpan
                            className={"text-turu"}
                            onClick={() => {
                              /** @TODO 운영자 */
                            }}
                          >
                            <u>{operatorName}</u>
                          </HoverSpan>
                        </td>
                        <td>{operatorId}</td>
                        <td>{manufacturerName}</td>
                        <td>{role}</td>
                        <td>{tel}</td>
                        <td>{department}</td>
                        <td>{mobileAccess}</td>
                        <td>{externalAccess}</td>
                        <td>{isActivate}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={11} className={"py-5 text-center text"}>
                      등록된 계정 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </>
            </TableBase>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorAccount;

const SearchSection = styled.section``;

const ListSection = styled.section``;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
