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

const PAGE_NAME = "비회원 결제 관리";

/** 이용상태 목록 */
const usageStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "이용중",
    value: "1",
  },
  {
    label: "종료",
    value: "2",
  },
];

/** 결제상태 목록 */
const paymentStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "선결제",
    value: "1",
  },
  {
    label: "결제 완료",
    value: "2",
  },
  {
    label: "취소",
    value: "3",
  },
];

/** 결제수단 목록 */
const paymentMethodList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "카드",
    value: "1",
  },
  {
    label: "무통장",
    value: "2",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "주문 ID", value: "1" },
  { label: "충전소명", value: "2" },
  { label: "선결제 승인 번호", value: "3" },
  { label: "재결제 승인 번호", value: "4" },
];

/** 정렬기준 */
const sortList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "충전량",
    value: "1",
  },
  {
    label: "선결제 금액",
    value: "2",
  },
  {
    label: "이용 금액",
    value: "3",
  },
  {
    label: "재결제 금액",
    value: "4",
  },
  {
    label: "결제 일시",
    value: "5",
  },
  {
    label: "취소 일시",
    value: "6",
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
    label: "충전소명",
  },
  {
    label: "이용 상태",
  },
  {
    label: "이용기간",
  },
  {
    label: "충전량(Kw)",
  },
  {
    label: "선결제 금액",
  },
  {
    label: "이용 금액",
  },
  {
    label: "재결제 금액",
  },
  {
    label: "결제 상태",
  },
  {
    label: "결제 수단",
  },
  {
    label: "선/재결제 일시",
  },
  {
    label: "취소일시",
  },
  {
    label: "선결제 승인 번호",
  },
  {
    label: "재결제 승인 번호",
  },
  {
    label: "승인 결과",
  },
  {
    label: "상태 제어",
  },
];

/** 임시 데이터 */
const nonList = [
  {
    id: "1",
    orderId: "OD2022120112345678",
    chargerStationName: "휴맥스빌리지",
    usageStatus: "종료",
    usageDate: "2023-03-27 12:00 ~ 2023-03-27 15:00",
    chargeAmount: 30,
    prepaymentAmount: 10000,
    usageAmount: 5000,
    repaymentAmount: 5000,
    paymentStatus: "결제 완료",
    paymentMethod: "카드",
    paymentDate: "2023-03-27 15:00",
    cancelDate: null,
    preApprovalNumber: "05991234455",
    reApprovalNumber: "05991234455",
    approvalResult: "정상 승인",
    statusControl: "재결제",
  },
];

const NonMember = () => {
  const [tabList, setTabList] = useState([{ label: "정산 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const {
    usageStatus,
    paymentStatus,
    searchText,
    paymentMethod,
    onChange,
    onChangeSingle,
  } = useInputs({
    usageStatus: "",
    paymentStatus: "",
    searchText: "",
    searchRange: "",
    paymentMethod: "",
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
                label={"선/재결제 일시"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"이용 상태"}
                name={"usageStatus"}
                list={usageStatusList.map((data) => ({
                  ...data,
                  checked: usageStatus === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <DateGroup label={"취소일시"} />
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
                title={"결제 수단"}
                name={"paymentMethod"}
                list={paymentMethodList.map((data) => ({
                  ...data,
                  checked: paymentMethod === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
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
            총 <span className={"text-turu"}>{nonList.length}개</span>의 결제가
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
            {nonList.length > 0 ? (
              nonList.map((non, index) => (
                <tr key={non.id}>
                  <td>{index + 1}</td>
                  <td>{non.orderId}</td>
                  <td>{non.chargerStationName}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"danger"}
                      label={non.usageStatus}
                    />
                  </td>
                  <td>{non.usageDate}</td>
                  <td>{non.chargeAmount}Kw</td>
                  <td>{non.prepaymentAmount}</td>
                  <td>{non.usageAmount}</td>
                  <td>{non.repaymentAmount}</td>
                  <td>{non.paymentStatus || "-"}</td>
                  <td>{non.paymentMethod || "-"}</td>
                  <td>{non.paymentDate || "-"}</td>
                  <td>{non.cancelDate || "-"}</td>
                  <td>{non.preApprovalNumber || "-"}</td>
                  <td>{non.reApprovalNumber || "-"}</td>
                  <td>{non.approvalResult || "-"}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"secondary"}
                      label={non.statusControl}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={17} className={"py-5 text-center text"}>
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

export default NonMember;
