import React, { useMemo, useState } from "react";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import styled from "styled-components";
import { Col, Row } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "충전소명", value: "1" },
  { label: "충전소 ID", value: "1" },
  { label: "충전기 번호", value: "1" },
  { label: "관리자명", value: "1" },
  { label: "처리자 ID", value: "1" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "탈퇴일시", value: "1" },
    ],
  },
];

const statusRadio = [
  { label: "전체" },
  { label: "처리완료" },
  { label: "관리자 이관" },
  { label: "관리자 처리완료" },
];
const memberRadio = [{ label: "전체" }, { label: "회원" }, { label: "비회원" }];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "상담유형" },
  { label: "보상구분" },
  { label: "회원여부" },
  { label: "회원명" },
  { label: "회원 ID" },
  { label: "상담원명" },
  { label: "접수일" },
  { label: "처리상태" },
  { label: "관리자명" },
  { label: "관리자 처리상태" },
  { label: "처리일시" },
];

type TabType = "ALL" | "JOIN" | "USE" | "DISORDER" | "CHARGER" | "FEE" | "ETC";

export const CounselingHistory = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");
  const [tab, setTab] = useState<TabType>("ALL");

  const tabButton: { label: string; type: TabType }[] = useMemo(
    () => [
      {
        label: "전체",
        type: "ALL",
      },
      {
        label: "가입안내",
        type: "JOIN",
      },
      {
        label: "이용안내",
        type: "USE",
      },
      {
        label: "이용장애",
        type: "DISORDER",
      },
      {
        label: "충전기안내",
        type: "CHARGER",
      },
      {
        label: "요금안내",
        type: "FEE",
      },
      {
        label: "기타",
        type: "ETC",
      },
    ],
    []
  );

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "공지사항" }, { label: "상담 내역" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "상담 관리", href: "/counseling/customer" },
            { label: "상담 내역", href: "/counseling/history" },
          ]}
          title={"상담 내역"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <DateGroup
                label={"조회기간"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"처리상태"}
                name={"radioGroup1"}
                list={statusRadio}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                placeholder={`${text}를 입력해주세요`}
                name={"searchText"}
                className={""}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"회원여부"}
                name={"radioGroup2"}
                list={memberRadio}
              />
            </Col>
          </Row>
          <Row className={"mt-3"}>
            <Col>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={dropdownGroupSort}
                className={"me-2"}
              />
            </Col>
          </Row>
        </FilterSection>
        <Separator />

        <ListSection className={"py-4"}>
          <div className={"btn-group mb-4"}>
            {tabButton.map((item, index) => (
              <ButtonBase
                key={index}
                className={`w-xs ${tab === item.type ? "active" : ""}`}
                label={item.label}
                outline={true}
                color={"turu"}
                onClick={() => {
                  setTab(item.type);
                }}
              />
            ))}
          </div>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 상담
                내역 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}></TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
    </ContainerBase>
  );
};

const ListSection = styled.section``;
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;
