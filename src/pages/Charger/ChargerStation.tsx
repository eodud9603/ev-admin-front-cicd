import React, { useState } from "react";
import { Col, Row, Table } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";

/* 목록 표시 개수 */
const countList = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    menuItems: [{ label: "구,군", value: "2" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "3" }],
  },
];

/* 운영사 필터 */
const operatorList = [
  {
    label: "전체",
  },
  {
    label: "HEV",
  },
  {
    label: "JEV",
  },
];

/* 철거여부 필터 */
const demolitionList = [
  {
    label: "전체",
  },
  {
    label: "철거",
  },
  {
    label: "철거예정",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "충전소명", value: "1" },
  { label: "충전소 ID", value: "2" },
  { label: "주소", value: "3" },
];

/* 정렬기준 */
const sortList = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "충전소명", value: "2" },
      { label: "충전소 ID", value: "3" },
      { label: "급/완속(기)", value: "4" },
      { label: "등록일", value: "5" },
    ],
  },
];

/* 임시 목록 데이터 */
const chargingStationList = [
  {
    region: "서울",
    division: "HEV",
    chargerName: "휴맥스 카플랫 전용 A",
    chargerId: "KEP0000000020",
    address: "경기도 성남시 분당구 황새울로 216",
    addressDetail: " 902호 (수내동, 휴맥스빌리지)",
    fast: "3",
    slow: "2",
    isOpen: "완전",
    isClosure: "N",
    date: "YYYY.MM.DD",
  },
  {
    region: "서울",
    division: "HEV",
    chargerName: "휴맥스 카플랫 전용 A",
    chargerId: "KEP0000000020",
    address: "경기도 성남시 분당구 황새울로 216",
    addressDetail: " 902호 (수내동, 휴맥스빌리지)",
    fast: "3",
    slow: "2",
    isOpen: "완전",
    isClosure: "N",
    date: "YYYY.MM.DD",
  },
];

const ChargingStationManagement = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 관리" },
  ]);
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    setTabList(tempList);
  };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전소 관리", href: "" },
          ]}
          title={"충전소 관리"}
        />

        <SearchSection className={"py-4 border-top border-bottom"}>
          <Row className={"d-flex align-items-center"}>
            <Col md={7}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={addressList}
                className={"me-2 w-xs"}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"운영사"}
                name={"operatorGroup"}
                list={operatorList}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"철거여부"}
                name={"demolitionGroup"}
                list={demolitionList}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={sortList}
                className={"me-2"}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총{" "}
              <span className={"text-turu"}>
                {chargingStationList.length}개
              </span>
              의 충전소 정보가 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={countList} />
              <ButtonBase label={"신규 등록"} color={"turu"} />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <div className={"table-responsive"}>
            <Table>
              <thead className={"table-light"}>
                <tr>
                  <th>번호</th>
                  <th>지역</th>
                  <th>구분</th>
                  <th>충전소명</th>
                  <th>충전소ID</th>
                  <th>주소</th>
                  <th>급/완속(기)</th>
                  <th>개방여부</th>
                  <th>철거여부</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {chargingStationList.length > 0 ? (
                  chargingStationList.map(
                    (
                      {
                        region,
                        division,
                        chargerName,
                        chargerId,
                        address,
                        addressDetail,
                        fast,
                        slow,
                        isOpen,
                        isClosure,
                        date,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{region}</td>
                        <td>{division}</td>
                        <td>
                          <HoverSpan
                            className={"text-turu"}
                            onClick={() => {
                              // TODO: 충전소 상세페이지
                            }}
                          >
                            <u>{chargerName}</u>
                          </HoverSpan>
                        </td>
                        <td>{chargerId}</td>
                        <td>
                          {address}, {addressDetail}
                        </td>
                        <td>
                          {fast} / {slow}
                        </td>
                        <td>{isOpen ? "완전" : "X"}</td>
                        <td>{isClosure}</td>
                        <td>{date}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr className={"m-10"}>
                    <td colSpan={10} className={"text-center text"}>
                      등록된 충전소 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargingStationManagement;

const SearchSection = styled.section``;

const ListSection = styled.section``;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;