import React, { useEffect, useState } from "react";
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
import { TableBase } from "src/components/Common/Table/TableBase";
import { useLocation, useNavigate } from "react-router-dom";
import { useTabStore } from "src/store/tabStore";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "제조사명", value: "1" },
      { label: "수정일", value: "1" },
    ],
  },
];

const dropdownGroupSearch = [
  { label: "제조사 ID", value: "1" },
  { label: "제조사명", value: "1" },
  { label: "충전소 ID", value: "1" },
  { label: "담당자명", value: "1" },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "제조사 ID" },
  { label: "제조사명" },
  { label: "코드" },
  { label: "담당자명" },
  { label: "담당자 연락처" },
  { label: "대표번호" },
  { label: "사업자 주소" },
  { label: "수정일" },
];

const data = [
  {
    manufacturerSeq: 1,
    manufacturerId: "애플망고 02",
    manufacturerName: "(주)애플망고",
    code: "A",
    charger: "김애플",
    chargerPhone: "000-0000-0000",
    representNumber: "000-000-0000",
    address: "경기도 성남시 분당구 황새울로 216휴맥스빌리지",
    updateDt: "YYYY.MM.DD",
  },
  {
    manufacturerSeq: 2,
    manufacturerId: "애플망고 01",
    manufacturerName: "(주)애플망고",
    code: "A",
    charger: "강애플",
    chargerPhone: "000-0000-0000",
    representNumber: "000-000-0000",
    address: "경기도 성남시 분당구 황새울로 216휴맥스빌리지",
    updateDt: "YYYY.MM.DD",
  },
];

export const ChargerManufacturer = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");

  const moveToRegister = () => {
    nav(`${pathname}/registration`);
  };
  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  const tabStore = useTabStore();

  useEffect(() => {
    const index = tabStore.data.findIndex((e) => e.path === location.pathname);
    if (index < 0) {
      tabStore.setData({
        data: [],
        label: "충전기 제조사 관리",
        path: "/charger/manufacturer",
      });
    }
    tabStore.setActive(location.pathname);
  }, []);

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "충전소 및 충전기 관리", href: "/charger/" },
            { label: "충전기 제조사 관리", href: "/charger/manufacturer" },
          ]}
          title={"충전기 제조사 관리"}
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
          {/*  */}
        </FilterSection>
        <Separator />

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 충전기
                제조사 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"신규 등록"}
                  color={"turu"}
                  onClick={moveToRegister}
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
                    <td>{}</td>
                    <td>
                      <u
                        className={"text-turu"}
                        role={"button"}
                        onClick={() => moveToDetail(e.manufacturerSeq)}
                      >
                        {e.manufacturerId}
                      </u>
                    </td>
                    <td>{e.manufacturerName}</td>
                    <td>{e.code}</td>
                    <td>{e.charger}</td>
                    <td>{e.chargerPhone}</td>
                    <td>{e.representNumber}</td>
                    <td>{e.address}</td>
                    <td>{e.updateDt}</td>
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
