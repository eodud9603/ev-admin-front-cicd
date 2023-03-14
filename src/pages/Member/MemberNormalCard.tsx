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
import { useLocation, useNavigate } from "react-router-dom";

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
      { label: "탈퇴일시", value: "1" },
    ],
  },
];

const statusRadio = [
  { label: "전체" },
  { label: "신청" },
  { label: "발급" },
  { label: "발송" },
  { label: "수령완료" },
];
const separatorRadio = [
  { label: "전체" },
  { label: "신규" },
  { label: "재발급" },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "발급상태" },
  { label: "발급구분" },
  { label: "회원구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "회원카드 번호" },
  { label: "신청일" },
];

const data = [
  {
    cardSeq: 1,
    issuanceStatus: "a",
    issuanceDivision: "신규",
    memberDivision: "그룹(그룹명)",
    name: "김회원",
    userId: "kim",
    memberCardNumber: "0000-0000-0000-0000",
    createDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 2,
    issuanceStatus: "b",
    issuanceDivision: "신규",
    memberDivision: "그룹(그룹명)",
    name: "김회원",
    userId: "kim",
    memberCardNumber: "0000-0000-0000-0000",
    createDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 3,
    issuanceStatus: "c",
    issuanceDivision: "신규",
    memberDivision: "그룹(그룹명)",
    name: "김회원",
    userId: "kim",
    memberCardNumber: "0000-0000-0000-0000",
    createDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 4,
    issuanceStatus: "d",
    issuanceDivision: "신규",
    memberDivision: "그룹(그룹명)",
    name: "김회원",
    userId: "kim",
    memberCardNumber: "0000-0000-0000-0000",
    createDt: "YYYY.MM.DD",
  },
];
interface IIssuanceStatusButton {
  issuanceStatus: string;
}
const IssuanceStatusButton = (props: IIssuanceStatusButton) => {
  const { issuanceStatus } = props;

  switch (issuanceStatus) {
    case "a":
      return (
        <ButtonBase
          color={"info"}
          className={"w-xs rounded-5 py-1"}
          label={"신청"}
        />
      );
    case "b":
      return (
        <ButtonBase
          color={"success"}
          className={"w-xs rounded-5 py-1"}
          label={"발급"}
        />
      );
    case "c":
      return <ButtonBase label={"발송"} className={"w-xs rounded-5 py-1"} />;
    case "d":
      return (
        <ButtonBase
          color={"white"}
          className={"w-xs rounded-5 py-1"}
          label={"수령완료"}
        />
      );
    default:
      return <></>;
  }
  return <></>;
};

export const MemberNormalCard = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");

  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  const moveToIssuance = () => {
    nav(`${pathname}/add`);
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
            { label: "회원카드 관리", href: "/member/card/normal" },
          ]}
          title={"회원카드 관리"}
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
                title={"발급상태"}
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
                title={"발급구분"}
                name={"radioGroup2"}
                list={separatorRadio}
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
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의
                회원카드 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"신규 발급"}
                  color={"turu"}
                  onClick={moveToIssuance}
                />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td></td>
                    <td>
                      <IssuanceStatusButton issuanceStatus={e.issuanceStatus} />
                    </td>
                    <td>{e.issuanceDivision}</td>
                    <td>{e.memberDivision}</td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => moveToDetail(e.cardSeq)}
                      >
                        <u>{e.name}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.userId}</td>
                    <td>{e.memberCardNumber}</td>
                    <td>{e.createDt}</td>
                  </tr>
                ))}
            </>
          </TableBase>
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
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
