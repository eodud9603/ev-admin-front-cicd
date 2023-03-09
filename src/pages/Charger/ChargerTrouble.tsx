import React, { useState } from "react";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import styled from "styled-components";
import { Col, Row, Table } from "reactstrap";
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

const dropdownGroupArea = [
  {
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    menuItems: [{ label: "구,군", value: "1" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "1" }],
  },
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
    menuItems: [{ label: "시,도", value: "1" }],
  },
];
const operatorRadio = [{ label: "전체" }, { label: "HEV" }, { label: "JEV" }];
const statusRadio = [
  { label: "전체" },
  { label: "접수" },
  { label: "진행중" },
  { label: "처리완료" },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "지역" },
  { label: "구분" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "충전기 번호" },
  { label: "고장 부위1" },
  { label: "고장 부위2" },
  { label: "처리자ID(처리자명)" },
  { label: "접수일" },
  { label: "처리여부(일시)" },
  { label: "운영자ID(운영자명)" },
  { label: "등록자" },
  { label: "등록일" },
];

export const ChargerTrouble = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");

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
            { label: "충전소 및 충전기 관리", href: "/charger/" },
            { label: "충전기 고장/파손 관리", href: "/charger/trouble" },
          ]}
          title={"충전기 고장/파손 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={dropdownGroupArea}
                className={"me-2 w-xs"}
              />
            </Col>
            <Col>
              <DateGroup label={"접수일"} />
            </Col>
            <Col md={2} />
          </Row>
          <Row>
            <Col>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                placeholder={"충전소를 입력해주세요"}
                name={"searchText"}
                className={""}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"운영사"}
                name={"radioGroup2"}
                list={operatorRadio}
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
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"처리여부"}
                name={"radioGroup3"}
                list={statusRadio}
              />
            </Col>
          </Row>
          {/*  */}
        </FilterSection>
        <Separator />

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0개</AmountInfo>의
                고장/파손 정보가 있습니다.
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
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;
