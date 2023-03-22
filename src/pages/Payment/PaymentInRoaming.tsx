import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import { Col, Row } from "reactstrap";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "요금제명", value: "1" },
  { label: "충전소명", value: "1" },
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

const contractRadio = [{ label: "전체" }, { label: "Y" }, { label: "N" }];

const applyRadio = [
  { label: "전체" },
  { label: "예정" },
  { label: "진행중" },
  { label: "종료" },
];

const tableHeader = [
  { label: "번호" },
  { label: "요금제ID" },
  { label: "운영사명" },
  { label: "도매가(원)" },
  { label: "소마가(원)" },
  { label: "계약여부" },
  { label: "적용상태" },
  { label: "적용일" },
  { label: "종료일" },
  { label: "수정일시(수정자)" },
  { label: "편집" },
];

const data = [
  {
    paymentSeq: 1,
    paymentId: "NN",
    companyName: "서비스 운영사",
    wholePriceFast: "1000",
    wholePriceSlow: "500",
    retailPriceFast: "900",
    retailPriceSlow: "400",
    contractStatus: "Y",
    applyStatus: "예정",
    applyDt: "YYYY.MM.DD",
    endDt: "YYYY.MM.DD",
    updater: "홍길동",
    updateDt: "YYYY.MM.DD 00:00:00",
  },
];
export const PaymentInRoaming = () => {
  const nav = useNavigate();
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "로밍 요금제 관리" },
  ]);

  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");

  const moveToRegistration = () => {
    nav(`${pathname}/registration`);
  };
  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

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

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

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
      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "요금 관리", href: "" },
            { label: "로밍 요금제 관리", href: "" },
          ]}
          title={"로밍 요금제 관리"}
        />
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
                title={"계약여부"}
                name={"radioGroup1"}
                list={contractRadio}
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
                title={"적용상태"}
                name={"radioGroup2"}
                list={applyRadio}
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
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의 로밍
                요금제 정보가 있습니다.
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
                    <td>{}</td>
                    <td>
                      <u
                        role={"button"}
                        className={"text-turu"}
                        onClick={() => moveToDetail(e.paymentSeq)}
                      >
                        {e.paymentId}
                      </u>
                    </td>
                    <td>{e.companyName}</td>
                    <td>
                      <span>완속 : {e.wholePriceSlow}</span>
                      <br />
                      <span>급속 : {e.wholePriceFast}</span>
                    </td>
                    <td>
                      <span>완속 : {e.retailPriceSlow}</span>
                      <br />
                      <span>급속 : {e.retailPriceFast}</span>
                    </td>
                    <td>{e.contractStatus}</td>
                    <td>{e.applyStatus}</td>
                    <td>{e.applyDt}</td>
                    <td>{e.endDt}</td>
                    <td>
                      {e.updateDt}
                      <br />
                      {e.updater}
                    </td>
                    <td>
                      <ButtonBase
                        label={"수정"}
                        outline={true}
                        color={"turu"}
                      />
                    </td>
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
