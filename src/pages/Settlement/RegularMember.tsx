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
import SettlementTextModal from "src/pages/Settlement/components/SettlementTextModal";

const PAGE_NAME = "정회원 결제 관리";

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
    label: "결제 완료",
    value: "1",
  },
  {
    label: "취소",
    value: "2",
  },
  {
    label: "미납",
    value: "3",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "회원명", value: "1" },
  { label: "회원 ID", value: "2" },
  { label: "주문 ID", value: "3" },
  { label: "충전소명", value: "4" },
  { label: "카드 번호", value: "5" },
  { label: "승인 번호", value: "6" },
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
    label: "이용 금액",
    value: "2",
  },
  {
    label: "할인 금액",
    value: "3",
  },
  {
    label: "결제 금액",
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
    label: "회원명",
  },
  {
    label: "회원 ID",
  },
  {
    label: "주문 ID",
  },
  {
    label: "충전소명",
  },
  {
    label: "이용기간",
  },
  {
    label: "이용 상태",
  },
  {
    label: "충전량(Kw)",
  },
  {
    label: "이용 금액",
  },
  {
    label: "할인 금액",
  },
  {
    label: "결제 금액",
  },
  {
    label: "카드 번호",
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
    label: "승인 번호",
  },
  {
    label: "승인 결과",
  },
  {
    label: "상태 제어",
  },
];

/** 임시 데이터 */
const regularList = [
  {
    id: "1",
    userName: "홍길동",
    userId: "123456",
    orderId: "OD2022120112345678",
    chargerStationName: "휴맥스빌리지",
    usageDate: "2023-03-27 12:00 ~ 2023-03-27 15:00",
    usageStatus: "종료",
    chargeAmount: 30,
    usageAmount: 10000,
    discountAmount: 1000,
    paymentAmount: 9000,
    cardNumber: "(PG사 정책에 따름)",
    paymentStatus: "결제 완료",
    paymentDate: "2023-03-27 15:00",
    cancelDate: null,
    approvalNumber: "05991234455",
    approvalResult: "정상 승인",
    statusControl: "결제 취소",
  },
];

const RegularMember = () => {
  const [tabList, setTabList] = useState([{ label: "정산 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  const [cancelModalOpen, setCancelModalOpen] = useState<{
    visible: boolean;
    id: string | null;
  }>({
    visible: false,
    id: null,
  });

  const { usageStatus, paymentStatus, searchText, onChange, onChangeSingle } =
    useInputs({
      usageStatus: "",
      paymentStatus: "",
      searchText: "",
      searchRange: "",
      sort: "",
      count: "1",
    });

  const onChangeCancelModal = (id?: string) => {
    setCancelModalOpen((prev) => ({
      ...prev,
      id: id ?? prev.id,
      visible: !prev.visible,
    }));
  };

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
                label={"결제일시"}
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
            <Col md={4} />
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
            총 <span className={"text-turu"}>{regularList.length}개</span>의
            결제가 있습니다.
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
            {regularList.length > 0 ? (
              regularList.map((regular, index) => (
                <tr key={regular.id}>
                  <td>{index + 1}</td>
                  <td>{regular.userName}</td>
                  <td>{regular.userId}</td>
                  <td>{regular.orderId}</td>
                  <td>{regular.chargerStationName}</td>
                  <td>{regular.usageDate}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"danger"}
                      label={regular.usageStatus}
                    />
                  </td>
                  <td>{regular.chargeAmount}Kw</td>
                  <td>{regular.usageAmount}</td>
                  <td>{regular.discountAmount}</td>
                  <td>{regular.paymentAmount}</td>
                  <td>{regular.cardNumber}</td>
                  <td>{regular.paymentStatus || "-"}</td>
                  <td>{regular.paymentDate || "-"}</td>
                  <td>{regular.cancelDate || "-"}</td>
                  <td>{regular.approvalNumber || "-"}</td>
                  <td>{regular.approvalResult || "-"}</td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"warning"}
                      label={regular.statusControl}
                      onClick={() => {
                        onChangeCancelModal(regular.id);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={18} className={"py-5 text-center text"}>
                  등록된 결제 정보가 없습니다.
                </td>
              </tr>
            )}
          </>
        </TableBase>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>

      <SettlementTextModal
        isOpen={cancelModalOpen.visible}
        title={"결제 취소 안내"}
        contents={`삭제 후 고객에게 해당 공지사항이 표시되지 않습니다.\n삭제하시겠습니까?`}
        onClose={onChangeCancelModal}
        buttons={[
          {
            label: "아니오",
            color: "secondary",
            onClick: onChangeCancelModal,
          },
          {
            label: "삭제",
            color: "turu",
            onClick: () => {},
          },
        ]}
      />
    </ContainerBase>
  );
};

export default RegularMember;
