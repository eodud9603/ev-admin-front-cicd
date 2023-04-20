import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST, OPERATOR_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

const PAGE_NAME = "개별 정산 내역";

/** 로밍사 */
const roamingList = [
  {
    label: "전체",
    value: "",
  },
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
    label: "회원카드번호",
  },
  {
    label: "충전기관",
  },
  {
    label: "충전소명",
  },
  {
    label: "충전소 ID",
  },
  {
    label: "충전기 ID",
  },
  {
    label: "충전시작일시",
    sort: () => {},
  },
  {
    label: "충전종료일시",
    sort: () => {},
  },
  {
    label: "총 충전시간",
    sort: () => {},
  },
  {
    label: "총 충전량(kwh)",
  },
  {
    label: "기본단가(원)",
  },
  {
    label: "실 충전요금(원)",
  },
  {
    label: "할인단가(원)",
  },
  {
    label: "최종 충전요금(원)",
    sort: () => {},
  },
  {
    label: "정산일",
    sort: () => {},
  },
];

/** 임시 데이터 */
const settlementList = [
  {
    id: "1",
    settlementType: "미정산",
    userName: "김정산",
    userCardNum: "1019-1600-7631-2818",
    operatorName: "운영사명",
    chargerStationName: "휴맥스 카플랫 전용 A",
    chargerStationId: "KEP0000000020",
    chargerId: "KEP0000000020-01",
    chargingStartDate: "YYYY.MM.DD 00:00:00",
    chargingEndDate: "YYYY.MM.DD 00:00:00",
    chargingTime: "00:00:00",
    chargingAmount: 43.44,
    unit: 360,
    ActualChargingFee: 15638,
    saleUnit: 0,
    finalChargingFee: 15638,
    settlementDate: null,
  },
];

const IndividualSettlement = () => {
  const [tabList, setTabList] = useState([{ label: PAGE_NAME }]);
  const [page, setPage] = useState(1);

  const [
    { searchText, userType, settlementType, operator },
    { onChange, onChangeSingle },
  ] = useInputs({
    roaming: "",
    searchRange: "",
    searchText: "",
    userType: "",
    settlementType: "",
    operator: "",
    count: "1",
  });

  const navigate = useNavigate();

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
            <Col md={8}>
              <DateGroup
                label={"조회기간"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                  { label: "전체" },
                ]}
              />
            </Col>
            <Col md={4}>
              <DropboxGroup
                label={"로밍사"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ roaming: value });
                    },
                    menuItems: roamingList,
                  },
                ]}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center "}>
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
          <Row className={"mb-4 pb-4 d-flex align-items-center  border-bottom"}>
            <Col md={8}>
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
            <Col md={4}>
              <RadioGroup
                title={"운영사"}
                name={"operator"}
                list={OPERATOR_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: operator === data.value,
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
            개별 정산 내역이 있습니다.
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
                  <td>{settlement.userCardNum}</td>
                  <td>{settlement.operatorName}</td>
                  <td>
                    <HoverSpan
                      className={"text-turu"}
                      onClick={() => {
                        navigate(
                          "/charger/chargerStation/detail/" +
                            settlement.chargerStationId
                        );
                      }}
                    >
                      <u>{settlement.chargerStationName}</u>
                    </HoverSpan>
                  </td>
                  <td>{settlement.chargerStationId}</td>
                  <td>{settlement.chargerId}</td>
                  <td>{settlement.chargingStartDate}</td>
                  <td>{settlement.chargingEndDate}</td>
                  <td>{settlement.chargingTime}</td>
                  <td>{settlement.chargingAmount}kwh</td>
                  <td>{settlement.unit}</td>
                  <td>{settlement.ActualChargingFee}</td>
                  <td>{settlement.saleUnit}</td>
                  <td>{settlement.finalChargingFee}</td>
                  <td>{settlement.settlementDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={17} className={"py-5 text-center text"}>
                  개별 정산 내역이 없습니다.
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

export default IndividualSettlement;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
