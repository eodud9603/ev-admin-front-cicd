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
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { SendAlarmModal } from "src/pages/Member/components/SendAlarmModal";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "이름", value: "1" },
  { label: "회원 ID", value: "1" },
  { label: "휴대폰 번호", value: "1" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "생년월일", value: "1" },
      { label: "회원 가입일", value: "1" },
    ],
  },
];

const gradeRadio = [
  { label: "전체" },
  { label: "정회원" },
  { label: "준회원" },
  { label: "이용정지" },
];
const affiliationRadio = [
  { label: "전체" },
  { label: "HEV" },
  { label: "JEV" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호", sort: () => {} },
  { label: "회원등급" },
  { label: "구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "생년월일" },
  { label: "휴대폰 번호" },
  { label: "회원카드 번호" },
  { label: "회원 가입일(정회원 인증일)" },
  { label: "이용내역" },
];

export const MemberNormal = () => {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");

  const handleModalState = () => {
    setIsOpen(!isOpen);
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
            { label: "회원 관리", href: "/member/normal" },
          ]}
          title={"회원 관리"}
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
                title={"회원등급"}
                name={"radioGroup1"}
                list={gradeRadio}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                placeholder={`${text}을 입력해주세요`}
                name={"searchText"}
                className={""}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"회원소속"}
                name={"radioGroup2"}
                list={affiliationRadio}
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
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 회원
                정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"알림 발송"}
                  color={"turu"}
                  onClick={handleModalState}
                />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}></TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
      <SendAlarmModal isOpen={isOpen} onClose={handleModalState} />
    </ContainerBase>
  );
};

const ListSection = styled.section``;
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;
