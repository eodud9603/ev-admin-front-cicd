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
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import { useLocation, useNavigate } from "react-router-dom";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "운영사명", value: "1" },
  { label: "운영사 ID", value: "1" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "운영사명", value: "1" },
      { label: "최근 등록일", value: "1" },
    ],
  },
];

const applyRadio = [{ label: "전체" }, { label: "활용" }, { label: "미활용" }];
const contractRadio = [{ label: "전체" }, { label: "Y" }, { label: "N" }];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호", sort: () => {} },
  { label: "활용여부" },
  { label: "운영사 ID" },
  { label: "운영사명" },
  { label: "한전기관 ID" },
  { label: "한전기관인증키(로밍)" },
  { label: "계약여부" },
  { label: "사업자 대표번호" },
  { label: "등록일" },
];

const data = [
  {
    operatorSeq: 1,
    useYn: "Y",
    operatorId: "운영사 ID",
    operatorName: "운영사명",
    companyId: "한전기관 아이디",
    companyAuthKey: "인증키",
    contractYn: "Y",
    representNumber: "0000-000",
    createDt: "YYYY.MM.DD",
  },
  {
    operatorSeq: 2,
    useYn: "N",
    operatorId: "운영사 ID",
    operatorName: "운영사명",
    companyId: "한전기관 아이디",
    companyAuthKey: "인증키",
    contractYn: "Y",
    representNumber: "0000-000",
    createDt: "YYYY.MM.DD",
  },
];

export const ChargerOperator = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");

  const moveToRegistration = () => {
    nav(`${pathname}/registration`);
  };
  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  return (
    <ContainerBase>
      <HeaderBase />
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
            { label: "서비스 운영사 관리", href: "/charger/operator" },
          ]}
          title={"서비스 운영사 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                placeholder={"제조사 ID를 입력해주세요"}
                name={"searchText"}
                className={""}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"활용여부"}
                name={"radioGroup1"}
                list={applyRadio}
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
                title={"계약여부"}
                name={"radioGroup2"}
                list={contractRadio}
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
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 서비스
                운영사 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"활용상태 전환"}
                  color={"turu"}
                  disabled={true}
                />
                <ButtonBase
                  label={"신규 등록"}
                  color={"turu"}
                  onClick={moveToRegistration}
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
                    <td>
                      <CheckBoxBase name={"check"} label={""} />
                    </td>
                    <td>{}</td>
                    <td>{e.useYn}</td>
                    <td>
                      <u
                        role={"button"}
                        className={"text-turu"}
                        onClick={() => moveToDetail(e.operatorSeq)}
                      >
                        {e.operatorId}
                      </u>
                    </td>
                    <td>{e.operatorName}</td>
                    <td>{e.companyId}</td>
                    <td>{e.companyAuthKey}</td>
                    <td>{e.contractYn}</td>
                    <td>{e.representNumber}</td>
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
