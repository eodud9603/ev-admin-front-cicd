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
import { toLocaleString } from "src/utils/toLocaleString";
import styled from "styled-components";

const PAGE_NAME = "그룹 정산 관리";

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
/** 결제수단 목록 */
const paymentMethodList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "개인결제",
    value: "1",
  },
  {
    label: "법인결제",
    value: "2",
  },
  {
    label: "세금계산서",
    value: "3",
  },
];

/** 청구 상태 목록 */
const claimStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "청구완료",
    value: "1",
  },
  {
    label: "미납",
    value: "2",
  },
  {
    label: "결제 완료",
    value: "3",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  {
    label: "그룹명",
    value: "1",
  },
  {
    label: "그룹 ID",
    value: "2",
  },
];

/** 정렬기준 */
const sortList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "그룹명",
    value: "1",
  },
  {
    label: "그룹 ID",
    value: "2",
  },
  {
    label: "정산월",
    value: "3",
  },
  {
    label: "정산일",
    value: "4",
  },
  {
    label: "충전량",
    value: "5",
  },
  {
    label: "이용 금액",
    value: "6",
  },
];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "그룹명",
  },
  {
    label: "그룹 ID",
  },
  {
    label: "정산 기간",
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
    label: "청구 상태",
  },
  {
    label: "결제 수단",
  },
  {
    label: "충전량(Kwh)",
  },
  {
    label: "이용 금액",
  },
  {
    label: "기타 금액",
  },
  {
    label: "상태 제어",
  },
];

/** 임시 데이터 */
const groupList = [
  {
    id: "1",
    groupName: "휴맥스",
    groupId: "H1234",
    settlementPeriod: "2023-03-01 ~ 2023-03-29",
    settlementMonth: "2023-03",
    settlementDate: "2023-03-15",
    deadLineStatus: "N",
    claimStatus: "청구 완료",
    paymentMethod: "개별 결제",
    chargeAmount: 50,
    usageAmount: 100000,
    etcAmount: 1000,
    statusControl: "재결제",
  },
];

const SettlementGroup = () => {
  const [tabList, setTabList] = useState([{ label: "정산 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const {
    deadLineStatus,
    searchText,
    claimStatus,
    paymentMethod,
    onChange,
    onChangeSingle,
  } = useInputs({
    deadLineStatus: "",
    searchText: "",
    searchRange: "",
    claimStatus: "",
    sort: "",
    paymentMethod: "",
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
            <Col md={7}>
              <DateGroup
                label={"정산일"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
            <Col md={5}>
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
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                menuItems={searchList}
                placeholder={"검색어를 입력해주세요."}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"청구 상태"}
                name={"claimStatus"}
                list={claimStatusList.map((data) => ({
                  ...data,
                  checked: claimStatus === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col md={7}>
              <DropdownBase
                label={"정렬기준"}
                menuItems={sortList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ sort: value });
                }}
              />
            </Col>
            <Col md={5}>
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
        </section>

        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-13 fw-bold"}>
            총 <span className={"text-turu"}>{groupList.length}개</span>의
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
            {groupList.length > 0 ? (
              groupList.map((group, index) => (
                <HoverTr
                  key={group.id}
                  onClick={() => {
                    navigate(`/settlement/group/detail/${group.id}`);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{group.groupName}</td>
                  <td>{group.groupId}</td>
                  <td>{group.settlementPeriod}</td>
                  <td>{group.settlementMonth}</td>
                  <td>{group.settlementDate}</td>
                  <td>{group.deadLineStatus}</td>
                  <td>{group.claimStatus}</td>
                  <td>{group.paymentMethod}</td>
                  <td>{toLocaleString(group.chargeAmount)}Kw</td>
                  <td>{toLocaleString(group.usageAmount)}</td>
                  <td>{toLocaleString(group.etcAmount || "-")}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      color={"secondary"}
                      label={group.statusControl}
                    />
                  </td>
                </HoverTr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className={"py-5 text-center text"}>
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

export default SettlementGroup;

const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;
