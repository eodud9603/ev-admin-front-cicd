import React, { useState } from "react";
import { useNavigate } from "react-router";
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
import { toLocaleString } from "src/utils/toLocaleString";
import styled from "styled-components";

const PAGE_NAME = "로밍회원 결제 관리";

/** 마감여부 목록 */
const deadLineStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "Y",
    value: "1",
  },
  {
    label: "N",
    value: "2",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "로밍사", value: "1" },
  { label: "로밍사 ID", value: "2" },
  { label: "선결제 승인 번호", value: "3" },
  { label: "재결제 승인 번호", value: "4" },
];

/** 정렬기준 */
const sortList = [
  { label: "전체", value: "" },
  { label: "로밍사", value: "1" },
  { label: "로밍사 ID", value: "2" },
  { label: "정산월", value: "3" },
  { label: "정산일", value: "4" },
  { label: "충전량", value: "5" },
  { label: "정산 금액", value: "6" },
];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "로밍사",
  },
  {
    label: "로밍사 ID",
  },
  {
    label: "정산번호",
  },
  {
    label: "이용시간",
  },
  {
    label: "정산월",
  },
  {
    label: "정산일",
  },
  {
    label: "마감 여부",
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
    label: "정산 금액",
  },
];

/** 임시 데이터 */
const roamingList = [
  {
    id: "1",
    roaming: "로밍사 A",
    roamingId: "51533305",
    settlementNumber: "51533305",
    usageDate: "2023-03-27 12:00 ~ 2023-03-27 15:00",
    settlementMonth: "2023-03",
    settlementDate: "2023-03-15",
    deadLineStatus: "N",
    chargeAmount: 20,
    usageAmount: 10000,
    discountAmount: null,
    settlementAmount: 10000,
  },
];

const SettlementRoaming = () => {
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

  const { deadLineStatus, searchText, onChange, onChangeSingle } = useInputs({
    deadLineStatus: "",
    searchText: "",
    searchRange: "",
    sort: "",
    count: "1",
  });
  const navigate = useNavigate();

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
                label={"정산일"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"마감 여부"}
                name={"deadLineStatus"}
                list={deadLineStatusList.map((data) => ({
                  ...data,
                  checked: deadLineStatus === data.value,
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
            총 <span className={"text-turu"}>{roamingList.length}개</span>의
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
            {roamingList.length > 0 ? (
              roamingList.map((roaming, index) => (
                <HoverTr
                  key={roaming.id}
                  onClick={() => {
                    /** @TODO 상세페이지 내비게이션 연동 추가 */
                    navigate(`/settlement/roaming/detail/${roaming.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{roaming.roaming}</td>
                  <td>{roaming.roamingId}</td>
                  <td>{roaming.settlementNumber}</td>
                  <td>{roaming.usageDate}</td>
                  <td>{roaming.settlementMonth}</td>
                  <td>{roaming.settlementDate}</td>
                  <td>{roaming.deadLineStatus}</td>
                  <td>{toLocaleString(roaming.chargeAmount)}Kw</td>
                  <td>{toLocaleString(roaming.usageAmount)}</td>
                  <td>{toLocaleString(roaming.discountAmount || "-")}</td>
                  <td>{toLocaleString(roaming.settlementAmount)}</td>
                </HoverTr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className={"py-5 text-center text"}>
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

export default SettlementRoaming;

const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;
