import React, { useState } from "react";
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
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "그룹명", value: "1" },
  { label: "그룹 ID", value: "1" },
  { label: "담당자명", value: "1" },
];

const dropdownGroupSort = [
  {
    menuItems: [{ label: "기본", value: "1" }],
  },
];

const separatorRadio = [
  { label: "전체" },
  { label: "개인" },
  { label: "일반법인" },
  { label: "위탁법인" },
];
const approvalRadio = [
  { label: "전체" },
  { label: "신청" },
  { label: "승인" },
  { label: "거절" },
  { label: "이용정지" },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "승인여부" },
  { label: "구분" },
  { label: "그룹명" },
  { label: "그룹 ID" },
  { label: "담당자명" },
  { label: "담당자 연락처" },
  { label: "사업자등록번호" },
  { label: "그룹 신청일시" },
  { label: "회원" },
  { label: "회원상세" },
  { label: "이용내역" },
];

type TabType = "ALL" | "REQUEST";

export const MemberGroup = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");
  const [tab, setTab] = useState<TabType>("ALL");

  const onClickTab = (tab: TabType) => {
    setTab(tab);
  };

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "공지사항" }, { label: "충전소 관리" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "회원 및 카드 관리", href: "/member/normal" },
            { label: "그룹 관리", href: "/member/group" },
          ]}
          title={"그룹 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
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
                title={"구분"}
                name={"radioGroup1"}
                list={separatorRadio}
              />
            </Col>
          </Row>
          <Row className={"mt-3"}>
            <Col md={6}>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={dropdownGroupSort}
                className={"me-2"}
              />
            </Col>
            <Col>
              <RadioGroup
                title={"승인여부"}
                name={"radioGroup2"}
                list={approvalRadio}
              />
            </Col>
          </Row>
        </FilterSection>
        <Separator />

        <TabSection>
          <div className={"btn-group"}>
            <ButtonBase
              className={`w-xs ${tab === "ALL" ? "active" : ""}`}
              label={"전체"}
              outline={true}
              color={"turu"}
              onClick={() => onClickTab("ALL")}
            />
            <ButtonBase
              className={`w-xs ${tab === "REQUEST" ? "active" : ""}`}
              label={"신청관리"}
              outline={true}
              color={"turu"}
              onClick={() => onClickTab("REQUEST")}
            />
          </div>
        </TabSection>

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 그룹
                정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase label={"신규 등록"} color={"turu"} />
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
const TabSection = styled.section``;
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;
