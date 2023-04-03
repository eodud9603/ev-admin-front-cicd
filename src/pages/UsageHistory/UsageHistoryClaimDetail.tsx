import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import { toLocaleString } from "src/utils/toLocaleString";

const PAGE_NAME = "청구 현황 상세";

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
    label: "이용시간",
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
    label: "청구 금액",
  },
];

/** 임시 데이터 */
const usageList = [
  {
    id: "1",
    userName: "홍길동",
    userId: "123456",
    orderId: "OD2022120112345678",
    chargerStationName: "휴맥스빌리지",
    usageDate: "2023-03-27 12:00 ~ 2023-03-27 15:00",
    chargeAmount: 100,
    usageAmount: 50000,
    discountAmount: 0,
    billingAmount: 50000,
  },
];

const UsageHistoryClaimDetail = () => {
  const [tabList, setTabList] = useState([{ label: "청구 현황" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  const disabled = true;

  const { onChangeSingle } = useInputs({
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
            { label: "이용 내역 관리", href: "" },
            { label: "청구 현황", href: "" },
            { label: "상세", href: "" },
          ]}
          title={PAGE_NAME}
        />

        <section>
          <p className={"mb-3 font-size-20 fw-bold"}>기본 정보</p>
          <Row className={"mb-5"}>
            <Col md={10}>
              <DetailTextInputRow
                rows={[
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "충전소명",
                    content: "충전소 A",
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "청구월",
                    content: "2023-03",
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "이용 건수",
                    content: "3",
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "충전량(Kw)",
                    content: toLocaleString("90"),
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "이용금액",
                    content: toLocaleString("50000"),
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "할인금액",
                    content: toLocaleString("-"),
                  },
                  {
                    containerWidthRatio: 3,
                    titleWidthRatio: 5,
                    disabled,
                    title: "청구금액",
                    content: toLocaleString("50000"),
                  },
                ]}
              />
            </Col>
            <Col md={2} />
          </Row>
        </section>

        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-20 fw-bold"}>이용 내역</span>

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
            {usageList.length > 0 ? (
              usageList.map((usage, index) => (
                <tr key={usage.id}>
                  <td>{index + 1}</td>
                  <td>{usage.userName}</td>
                  <td>{usage.userId}</td>
                  <td>{usage.orderId}</td>
                  <td>{usage.chargerStationName}</td>
                  <td>{usage.usageDate}</td>
                  <td>{toLocaleString(usage.chargeAmount)}</td>
                  <td>{toLocaleString(usage.usageAmount)}</td>
                  <td>{toLocaleString(usage.discountAmount || "-")}</td>
                  <td>{toLocaleString(usage.billingAmount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className={"py-5 text-center text"}>
                  이용 내역이 없습니다.
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

export default UsageHistoryClaimDetail;
