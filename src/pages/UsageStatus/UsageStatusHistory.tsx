import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import { CHARGER_RATION } from "src/constants/status";
import useInputs from "src/hooks/useInputs";
import { objectToArray } from "src/utils/convert";
import { onChangeStaticDate } from "src/utils/day";
import styled from "styled-components";

const PAGE_NAME = "충전기 이용 내역";
const defaultDropdownData = { label: "전체", value: "" };

/** 회원여부 dropdown 목록 */
const membershipList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "회원",
    value: "1",
  },
  {
    label: "현장결제",
    value: "2",
  },
];

/* 검색어 필터 */
const searchList = [{ label: "회원명", value: "" }];

/** 정렬기준 */
const sortList = [
  {
    label: "기본",
    value: "",
  },
];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "주문 ID",
  },
  {
    label: "충전기 상태",
  },
  {
    label: "충전소명",
  },
  {
    label: "충전기 ID",
  },
  {
    label: "급속/완속",
  },
  {
    label: "커넥터",
  },
  {
    label: "통신",
  },
  {
    label: "회원여부",
  },
  {
    label: "회원 ID",
  },
  {
    label: "회원명",
  },
  {
    label: "회원 카드번호",
  },
  {
    label: "충전 시작일시",
  },
  {
    label: "충전 종료일시",
  },
  {
    label: "종료(중단) 유형",
  },
];

/** 임시 데이터 */
const list = [
  {
    id: 1,
    orderId: "OD2022120112345678",
    chargerMode: "충전중",
    stationName: "휴맥스 카플랫 전용 D",
    chargerId: "0000",
    chargerRation: "급속",
    chargerType: "DC콤보",
    communication: "연결",
    isMembership: "Y",
    userId: "hong1234",
    userName: "홍길동",
    userCardNumber: "1010-0101-8548-7683",
    chargingStartDate: "YYYY.MM.DD HH:mm:ss",
    chargingEndDate: "YYYY.MM.DD HH:mm:ss",
    exitType: "완충",
  },
];

const UsageStatusHistory = () => {
  const [page, setPage] = useState(1);

  const [
    { chargerRation, searchText, membership },
    { onChange, onChangeSingle },
  ] = useInputs({
    startDate: "",
    endDate: "",
    chargerRation: "",
    searchRange: "",
    searchText: "",
    membership: "",
    sort: "",
    count: "10",
  });

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전 이용 현황", href: "" },
            { label: PAGE_NAME, href: "" },
          ]}
          title={PAGE_NAME}
        />

        <section
          className={
            "m-0 my-4 p-0 py-4 d-flex flex-column gap-3 " +
            "border-top border-bottom border-2"
          }
        >
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <DateGroup
                label={"조회기간"}
                buttonState={[
                  {
                    label: "7일",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 7,
                        unit: "day",
                      }),
                  },
                  {
                    label: "1개월",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 1,
                        unit: "month",
                      }),
                  },
                  {
                    label: "3개월",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 3,
                        unit: "month",
                      }),
                  },
                ]}
                onChangeDate={onChangeSingle}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"충전기 구분"}
                name={"chargerRation"}
                list={[
                  defaultDropdownData,
                  ...objectToArray(CHARGER_RATION),
                ].map((data) => ({
                  ...data,
                  checked: chargerRation === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                menuItems={searchList}
                placeholder={"검색어를 입력해주세요."}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"회원여부"}
                name={"membership"}
                list={membershipList.map((data) => ({
                  ...data,
                  checked: membership === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>

          <Row className={"d-flex align-items-center"}>
            <Col md={4}>
              <DropdownBase
                label={"정렬기준"}
                menuItems={sortList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ sort: value });
                }}
              />
            </Col>
            <Col md={8} />
          </Row>
        </section>

        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-13 fw-bold"}>
            총 <span className={"text-turu"}>{list.length}개</span>의 이용 내역
            정보가 있습니다.
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
          </div>
        </div>

        <TableBase tableHeader={tableHeader}>
          <>
            {list.length > 0 ? (
              list.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.orderId}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"success"}
                      label={data.chargerMode}
                    />
                  </td>
                  <td>
                    <HoverTr className={"text-turu"}>
                      <u>{data.stationName}</u>
                    </HoverTr>
                  </td>
                  <td>{data.chargerId}</td>
                  <td>{data.chargerRation}</td>
                  <td>{data.chargerType}</td>
                  <td>{data.communication}</td>
                  <td>{data.isMembership === "Y" ? "회원" : "-"}</td>
                  <td>{data.userId || "-"}</td>
                  <td>{data.userName}</td>
                  <td>{data.userCardNumber}</td>
                  <td>{data.chargingStartDate || "-"}</td>
                  <td>{data.chargingEndDate || "-"}</td>
                  <td>{data.exitType || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={15} className={"py-5 text-center text"}>
                  충전기 이용 정보가 없습니다.
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

export default UsageStatusHistory;

const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;
