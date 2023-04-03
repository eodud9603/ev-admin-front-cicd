import React, { useState } from "react";
import { useNavigate } from "react-router";
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
import useInputs from "src/hooks/useInputs";
import MonthGroup from "src/pages/UsageHistory/components/MonthGroup";
import { toLocaleString } from "src/utils/toLocaleString";
import styled from "styled-components";

const PAGE_NAME = "청구 현황";

/** 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "충전소명",
  },
  {
    label: "청구월",
  },
  {
    label: "이용 건수",
  },
  {
    label: "충전량(Kw)",
  },
  {
    label: "이용금액",
  },
  {
    label: "할인금액",
  },
  {
    label: "청구금액",
  },
];

/** 임시 데이터 */
const claimList = [
  {
    id: "1",
    chargerStationName: "충전소 A",
    claimDate: "2023-03",
    count: 10,
    chargeAmount: 100,
    usageAmount: 50000,
    discountAmount: 0,
    billingAmount: 50000,
  },
];

const UsageHistoryClaim = () => {
  const [tabList, setTabList] = useState([{ label: "청구 현황" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const { startDate, endDate, searchText, onChange, onChangeSingle } =
    useInputs({
      startDate: "",
      endDate: "",
      searchRange: "",
      searchText: "",
      count: "1",
    });

  const navigate = useNavigate();

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={() => {}}
        onClose={() => {}}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "이용 내역 관리", href: "" },
            { label: PAGE_NAME, href: "" },
          ]}
          title={PAGE_NAME}
        />

        <Row className={"pt-4 mb-3 border-top border-1"}>
          <Col md={4}>
            <MonthGroup
              label={"청구월"}
              inputProps={{
                startName: "startDate",
                startValue: startDate,
                endName: "endDate",
                endValue: endDate,
                onChange,
              }}
            />
          </Col>
          <Col md={8} />
        </Row>
        <Row className={"mb-5 pb-4 border-bottom border-1"}>
          <Col md={8}>
            <SearchTextInput
              title={"검색어"}
              placeholder={"검색어를 입력해주세요."}
              menuItems={searchList}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ searchRange: value });
              }}
              name={"searchText"}
              value={searchText}
              onChange={onChange}
            />
          </Col>
          <Col md={4} />
        </Row>

        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-13 fw-bold"}>
            총 <span className={"text-turu"}>{claimList.length}개</span>의
            내역이 있습니다.
          </span>

          <div className={"d-flex align-items-center gap-3"}>
            <span className={"font-size-10 text-muted"}>
              2023-04-01 14:51기준
            </span>
            <DropdownBase
              menuItems={COUNT_FILTER_LIST}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ count: value });
              }}
            />
            <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
          </div>
        </div>

        <TableBase tableHeader={tableHeader}>
          <>
            {claimList.length > 0 ? (
              claimList.map((claim, index) => (
                <HoverTr
                  key={claim.id}
                  onClick={() => {
                    navigate(`/usageHistory/claim/detail/${claim.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{claim.chargerStationName}</td>
                  <td>{claim.claimDate}</td>
                  <td>{claim.count}</td>
                  <td>{toLocaleString(claim.chargeAmount)}</td>
                  <td>{toLocaleString(claim.usageAmount)}</td>
                  <td>{toLocaleString(claim.discountAmount || "-")}</td>
                  <td>{toLocaleString(claim.billingAmount)}</td>
                </HoverTr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className={"py-5 text-center text"}>
                  등록된 청구 내역이 없습니다.
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

export default UsageHistoryClaim;

const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;
