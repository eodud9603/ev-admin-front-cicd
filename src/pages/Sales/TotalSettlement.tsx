import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

const PAGE_NAME = "합산 정산 내역";

/** 년 목록 (임시) */
const yearList = [
  {
    label: "전체",
    value: "",
  },
  ...new Array(12).fill(undefined).map((_, index) => ({
    label: `${new Date().getFullYear() - index}`,
    value: `${new Date().getFullYear() - index}`,
  })),
];

/** 월 목록 (임시) */
const monthList = [
  {
    label: "전체",
    value: "",
  },
  ...new Array(12).fill(undefined).map((_, index) => ({
    label: `${index + 1}`,
    value: `${index + 1}`,
  })),
];

/** 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "회원명", value: "1" },
  { label: "회원 ID", value: "2" },
];

/** 회원구분 목록 */
const userTypeList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "회원",
    value: "1",
  },
  {
    label: "비회원",
    value: "2",
  },
];

/** 정산구분 목록 */
const settlementTypeList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "완료",
    value: "1",
  },
  {
    label: "미정산",
    value: "2",
  },
];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "정산구분",
  },
  {
    label: "회원명",
  },
  {
    label: "회원 ID",
  },
  {
    label: "과금대상(연)",
  },
  {
    label: "과금대상(월)",
  },
  {
    label: "합산 충전량(kwh)",
    sort: () => {},
  },
  {
    label: "합산금액(원)",
  },
  {
    label: "조정금액(원)",
  },
  {
    label: "변동금액(원)",
  },
];

/** 임시 데이터 */
const settlementList = [
  {
    id: "1",
    settlementType: "미정산",
    userName: "김정산",
    userId: "회원 ID 노출",
    billingYear: "2023",
    billingMonth: "01",
    totalChargingAmount: 54.12,
    totalAmount: 15103,
    adjustmentAmount: 300,
    variableAmount: -14803,
  },
];

const TotalSettlement = () => {
  const [tabList, setTabList] = useState([{ label: PAGE_NAME }]);
  const [page, setPage] = useState(1);

  const { searchText, userType, settlementType, onChange, onChangeSingle } =
    useInputs({
      billingYear: "",
      billingMonth: "",
      settlementType: "",
      searchRange: "",
      searchText: "",
      userType: "",
      count: "1",
    });

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup list={tabList} selectedIndex={"0"} />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "매출 모니터링", href: "" },
            { label: PAGE_NAME, href: "" },
          ]}
          title={PAGE_NAME}
        />

        {/* 검색 */}
        <section className={"d-flex flex-column gap-3"}>
          <Row className={"mt-4 pt-4 d-flex align-items-center border-top"}>
            <Col md={8} className={"d-flex align-items-center"}>
              <DropboxGroup
                className={"me-3"}
                label={"과금대상(연)"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ billingYear: value });
                    },
                    menuItems: yearList,
                  },
                ]}
              />
              <DropboxGroup
                label={"과금대상(월)"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ billingMonth: value });
                    },
                    menuItems: monthList,
                  },
                ]}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"정산구분"}
                name={"settlementType"}
                list={settlementTypeList.map((data) => ({
                  ...data,
                  checked: settlementType === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mb-4 pb-4 d-flex align-items-center  border-bottom"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                placeholder={"검색어를 입력해주세요"}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchRange: value });
                }}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"회원구분"}
                name={"userType"}
                list={userTypeList.map((data) => ({
                  ...data,
                  checked: userType === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
        </section>
        {/* 테이블 */}
        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-13 fw-bold"}>
            총 <span className={"text-turu"}>{settlementList.length}개</span>의
            합산 정산 내역이 있습니다.
          </span>

          <div className={"d-flex align-items-center gap-3"}>
            <span className={"font-size-10 text-muted"}>
              2023-04-01 14:51기준
            </span>
            <DropdownBase
              menuItems={COUNT_FILTER_LIST}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({
                  count: value,
                });
              }}
            />
            <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
          </div>
        </div>

        <TableBase tableHeader={tableHeader}>
          <>
            {settlementList.length > 0 ? (
              settlementList.map((settlement, index) => (
                <tr key={settlement.id}>
                  <td>{index + 1}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      label={settlement.settlementType}
                      color={"danger"}
                    />
                  </td>
                  <td>
                    <HoverSpan className={"text-turu"}>
                      <u>{settlement.userName}</u>
                    </HoverSpan>
                  </td>
                  <td>{settlement.userId}</td>
                  <td>{settlement.billingYear}</td>
                  <td>{settlement.billingMonth}</td>
                  <td>{settlement.totalChargingAmount}</td>
                  <td>{settlement.totalAmount}</td>
                  <td>{settlement.adjustmentAmount}</td>
                  <td>{settlement.variableAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className={"py-5 text-center text"}>
                  합산 정산 내역이 없습니다.
                </td>
              </tr>
            )}
          </>
        </TableBase>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
    </ContainerBase>
  );
};

export default TotalSettlement;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
