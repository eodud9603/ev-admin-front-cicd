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

const PAGE_NAME = "요금 청구 내역";

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

/** 청구구분 목록 */
const claimTypeList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "청구 전",
    value: "1",
  },
  {
    label: "결제 성공",
    value: "2",
  },
  {
    label: "결제 실패",
    value: "3",
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
    sort: () => {},
  },
  {
    label: "과금대상(월)",
    sort: () => {},
  },
  {
    label: "청구 대상 금액(원)",
    sort: () => {},
  },
  {
    label: "청구 대상 조정 금액(원)",
    sort: () => {},
  },
  {
    label: "청구여부",
  },
  {
    label: "청구타입",
  },
  {
    label: "청구결과",
  },
  {
    label: "청구일시",
  },
  {
    label: "결과 메세지",
  },
];

/** 임시 데이터 */
const billingHistoryList = [
  {
    id: "1",
    settlementType: "미정산",
    userName: "김정산",
    userId: "회원 ID 노출",
    billingYear: "2023",
    billingMonth: "01",
    billingAmount: 300,
    billingAdjustmentAmount: 300,
    isClaim: "요청 완료",
    claimType: "카드",
    claimResult: "실패",
    claimDate: "YYYY.MM.DD",
    resultMessage: "카드 결제 성공",
  },
];

const BillingHistory = () => {
  const [tabList, setTabList] = useState([{ label: PAGE_NAME }]);
  const [page, setPage] = useState(1);

  const { searchText, claimType, settlementType, onChange, onChangeSingle } =
    useInputs({
      billingYear: "",
      billingMonth: "",
      settlementType: "",
      searchRange: "",
      searchText: "",
      claimType: "",
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
                title={"청구구분"}
                name={"claimType"}
                list={claimTypeList.map((data) => ({
                  ...data,
                  checked: claimType === data.value,
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
            총{" "}
            <span className={"text-turu"}>{billingHistoryList.length}개</span>의
            요금 청구 내역이 있습니다.
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
            {billingHistoryList.length > 0 ? (
              billingHistoryList.map((billing, index) => (
                <tr key={billing.id}>
                  <td>{index + 1}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      label={billing.settlementType}
                      color={"danger"}
                    />
                  </td>
                  <td>
                    <HoverSpan className={"text-turu"}>
                      <u>{billing.userName}</u>
                    </HoverSpan>
                  </td>
                  <td>{billing.userId}</td>
                  <td>{billing.billingYear}</td>
                  <td>{billing.billingMonth}</td>
                  <td>{billing.billingAmount}</td>
                  <td>{billing.billingAdjustmentAmount}</td>
                  <td>{billing.isClaim}</td>
                  <td>{billing.claimType}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      label={billing.claimResult}
                      color={"danger"}
                    />
                  </td>
                  <td>{billing.claimDate}</td>
                  <td>{billing.resultMessage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className={"py-5 text-center text"}>
                  요금 청구 내역이 없습니다.
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

export default BillingHistory;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
