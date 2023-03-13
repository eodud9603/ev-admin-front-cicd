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
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";

/* 검색어 필터 */
const searchList = [
  { label: "상담사명", value: "1" },
  { label: "상담사 ID", value: "2" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "상담사명" },
  { label: "상담원 ID" },
  { label: "소속사" },
  { label: "CTI" },
  { label: "ACD" },
  { label: "내선" },
  { label: "전화번호" },
  { label: "휴대전화 번호" },
  { label: "등록일", sort: () => {} },
];

/* 임시 목록 데이터 */
const accountList = [
  {
    counselorName: "상담사",
    counselorId: "KKS@humaxev.com",
    agency: "입력된 소속사명",
    cti: null,
    acd: null,
    extension: null,
    tel: "0000-0000",
    mobileTel: "000-0000-0000",
    date: "YYYY.MM.DD",
  },
];

const OperatorAccount = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "상담사 정보 관리" },
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
            { label: "상담사 정보 관리", href: "" },
          ]}
          title={"상담사 정보 관리"}
        />

        <SearchSection className={"py-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={9}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                placeholder={"상담사명을 입력해주세요."}
                value={text}
                onChange={(e) => setText(e.target.value)}
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
              상담사 계정 정보가 있습니다.
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
                        counselorName,
                        counselorId,
                        agency,
                        cti,
                        acd,
                        extension,
                        tel,
                        mobileTel,
                        date,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <HoverSpan
                            className={"text-turu"}
                            onClick={() => {
                              // TODO: 상담사
                            }}
                          >
                            <u>{counselorName}</u>
                          </HoverSpan>
                        </td>
                        <td>{counselorId}</td>
                        <td>{agency}</td>
                        <td>{cti}</td>
                        <td>{acd}</td>
                        <td>{extension}</td>
                        <td>{tel}</td>
                        <td>{mobileTel}</td>
                        <td>{date}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={10} className={"py-5 text-center text"}>
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
