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
import useInputs from "src/hooks/useInputs";
import { toLocaleString } from "src/utils/toLocaleString";

const PAGE_NAME = "멤버쉽 카드 결제 관리";

/** 결제상태 목록 */
const paymentStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "결제 완료",
    value: "1",
  },
  {
    label: "결제 취소",
    value: "2",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "회원명", value: "1" },
  { label: "회원 ID", value: "2" },
  { label: "주문 ID", value: "3" },
];

/** 정렬기준 */
const sortList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "회원명",
    value: "1",
  },
  {
    label: "회원 ID",
    value: "2",
  },
  {
    label: "이용금액",
    value: "3",
  },
  {
    label: "결제일시",
    value: "4",
  },
  {
    label: "취소일시",
    value: "5",
  },
];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "회원명",
  },
  {
    label: "회원 ID",
  },
  {
    label: "주문 ID",
  },
  {
    label: "이용 금액",
  },
  {
    label: "결제 상태",
  },
  {
    label: "결제일시",
  },
  {
    label: "취소일시",
  },
  {
    label: "상태제어",
  },
];

/** 임시 데이터 */
const list = [
  {
    id: "1",
    userName: "홍길동",
    userId: "012345",
    orderId: "OD2022120112345678",
    usageAmount: 3000,
    paymentStatus: "결제완료",
    paymentDate: "2023-03-27 12:00:11",
    cancelDate: null,
    statusControl: "결제취소",
  },
];

const SettlementMembership = () => {
  const [tabList, setTabList] = useState([{ label: "정산 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const [{ paymentStatus, searchText }, { onChange, onChangeSingle }] =
    useInputs({
      paymentStatus: "",
      searchText: "",
      searchRange: "",
      sort: "",
      count: "1",
    });

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
            { label: "정산 관리", href: "" },
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
                label={"결제 일시"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"결제 상태"}
                name={"paymentStatus"}
                list={paymentStatusList.map((data) => ({
                  ...data,
                  checked: paymentStatus === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <DateGroup label={"취소일시"} />
            </Col>
            <Col md={4} />
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
            <Col md={4} />
          </Row>
          <Row>
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
            총 <span className={"text-turu"}>{list.length}개</span>의 결제가
            있습니다.
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
            {list.length > 0 ? (
              list.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.userName}</td>
                  <td>{data.userId}</td>
                  <td>{data.orderId}</td>
                  <td>{toLocaleString(data.usageAmount)}</td>
                  <td>{data.paymentStatus}</td>
                  <td>{data.paymentDate || "-"}</td>
                  <td>{data.cancelDate || "-"}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"warning"}
                      label={data.statusControl || "-"}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className={"py-5 text-center text"}>
                  등록된 결제 정보가 없습니다.
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

export default SettlementMembership;
