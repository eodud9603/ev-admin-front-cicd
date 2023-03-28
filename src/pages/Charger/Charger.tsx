import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
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
import { TableBase } from "src/components/Common/Table/TableBase";
import {
  COUNT_FILTER_LIST,
  DEMOLITION_FILTER_LIST,
  OPERATOR_FILTER_LIST,
} from "src/constants/list";
import styled from "styled-components";
import BatchControlModal from "src/pages/Charger/components/BatchControlModal";
import SingleControlModal from "src/pages/Charger/components/SingleControlModal";
import useInputs from "src/hooks/useInputs";

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "" }],
  },
  {
    menuItems: [{ label: "구,군", value: "" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "" }],
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "충전소명", placeholderKeyword: "충전소명을", value: "1" },
  { label: "충전소 ID", placeholderKeyword: "충전소 ID를", value: "2" },
  { label: "주소", placeholderKeyword: "주소를", value: "3" },
];

/* 정렬기준 */
const sortList = [
  { label: "기본", value: "" },
  { label: "충전소명", value: "1" },
  { label: "충전소 ID", value: "2" },
  { label: "급/완속(기)", value: "3" },
  { label: "등록일", value: "4" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "지역" },
  { label: "구분" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "충전기 번호" },
  { label: "급/완속" },
  { label: "커넥터" },
  { label: "충전상태" },
  { label: "통신" },
  { label: "충전시작" },
  { label: "최종 연결" },
  { label: "최종 충전 종료" },
  { label: "철거여부" },
  { label: "자산번호" },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const chargerList = [
  {
    region: "서울",
    division: "HEV",
    chargerName: "휴맥스 카플랫 전용 A",
    chargerId: "KEP0000000020",
    chargerNum: "0000",
    type: "급속",
    connector: "DC콤보",
    status: "충전중",
    communication: "연결",
    start: "YYYY.MM.DD 00:00:00",
    connect: "YYYY.MM.DD 00:00:00",
    end: "YYYY.MM.DD 00:00:00",
    isClosure: "N",
    assetNum: "자산번호 노출",
    date: "YYYY.MM.DD",
  },
];

const Charger = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전기 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  /* 일괄 제어 모달 */
  const [batchControlModalOpen, setBatchControlModalOpen] = useState(false);
  /* 단일 제어 모달 */
  const [singleControlModalOpen, setSingleControlModalOpen] = useState(false);

  const {
    operator,
    searchRange,
    searchText,
    demolition,
    onChange,
    onChangeSingle,
  } = useInputs({
    operator: "",
    searchRange: "1",
    searchText: "",
    demolition: "",
    sort: "",
    count: "1",
  });
  const searchKeyword =
    searchList.find((data) => searchRange === data.value)?.placeholderKeyword ??
    "";

  const navigate = useNavigate();

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

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 관리", href: "" },
          ]}
          title={"충전기 관리"}
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
                name={"operator"}
                list={OPERATOR_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: operator === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                placeholder={`${searchKeyword} 입력해주세요`}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchRange: value });
                }}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"철거여부"}
                name={"demolition"}
                list={DEMOLITION_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: demolition === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <DropboxGroup
                className={"me-2"}
                label={"정렬기준"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ sort: value });
                    },
                    menuItems: sortList,
                  },
                ]}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{chargerList.length}개</span>의
              충전기 정보가 있습니다.
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
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/charger/add");
                }}
              />
              <ButtonBase
                label={"일괄 제어"}
                outline={true}
                color={"turu"}
                onClick={() => {
                  setBatchControlModalOpen(true);
                }}
              />
              <ButtonBase
                label={"단일 제어"}
                outline={true}
                color={"turu"}
                onClick={() => {
                  setSingleControlModalOpen(true);
                }}
              />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {chargerList.length > 0 ? (
                chargerList.map(
                  (
                    {
                      region,
                      division,
                      chargerId,
                      chargerName,
                      chargerNum,
                      type,
                      connector,
                      status,
                      communication,
                      start,
                      connect,
                      end,
                      isClosure,
                      assetNum,
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
                            navigate(`/charger/charger/detail/${index}`);
                          }}
                        >
                          <u>{chargerName}</u>
                        </HoverSpan>
                      </td>
                      <td>{chargerId}</td>
                      <td>{chargerNum}</td>
                      <td>{type}</td>
                      <td>{connector}</td>
                      <td>
                        <ButtonBase
                          className={"w-xs rounded-5 py-1"}
                          label={status}
                          color={"success"}
                        />
                      </td>
                      <td>{communication}</td>
                      <td>{start}</td>
                      <td>{connect}</td>
                      <td>{end}</td>
                      <td>{isClosure}</td>
                      <td>{assetNum}</td>
                      <td>{date}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={16} className={"py-5 text-center text"}>
                    등록된 충전기 정보가 없습니다.
                  </td>
                </tr>
              )}
            </>
          </TableBase>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>

      <BatchControlModal
        isOpen={batchControlModalOpen}
        onClose={() => {
          setBatchControlModalOpen((prev) => !prev);
        }}
      />
      <SingleControlModal
        isOpen={singleControlModalOpen}
        onClose={() => {
          setSingleControlModalOpen((prev) => !prev);
        }}
      />
    </ContainerBase>
  );
};

export default Charger;

const SearchSection = styled.section``;

const ListSection = styled.section``;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
