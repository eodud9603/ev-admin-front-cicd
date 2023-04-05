import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import { getStationList } from "src/api/station/stationApi";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST, OPERATOR_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import {
  IRequestStationList,
  IStationListItem,
} from "src/api/station/stationApi.interface";

/* 사용여부 필터 */
const useList = [
  { label: "전체", value: "" },
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

/** @TODO 검색어 필터, 빈 value값 추가 필요 */
const searchList = [
  { label: "충전소명", placeholderKeyword: "충전소명을", value: "stationNm" },
  { label: "충전소 ID", placeholderKeyword: "충전소 ID를", value: "stationId" },
  { label: "주소", placeholderKeyword: "주소를", value: "" },
];

/** @TODO 정렬기준, 빈 value값 추가 필요 */
const sortList = [
  { label: "기본", value: "StationName" },
  { label: "충전소명", value: "StationName" },
  { label: "충전소 ID", value: "StationId" },
  { label: "급/완속(기)", value: "" },
  { label: "등록일", value: "CrateAt" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "지역" },
  { label: "구분" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "주소" },
  { label: "급/완속(기)" },
  { label: "개방여부" },
  { label: "사용여부" },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const chargingStationList = [
  {
    id: "1",
    region: "서울",
    division: "HEV",
    chargerName: "휴맥스 카플랫 전용 A",
    chargerId: "KEP0000000020",
    address: "경기도 성남시 분당구 황새울로 216",
    addressDetail: " 902호 (수내동, 휴맥스빌리지)",
    fast: "3",
    slow: "2",
    isOpen: "완전",
    isUse: "N",
    date: "YYYY.MM.DD",
  },
  {
    id: "2",
    region: "서울",
    division: "HEV",
    chargerName: "휴맥스 카플랫 전용 A",
    chargerId: "KEP0000000020",
    address: "경기도 성남시 분당구 황새울로 216",
    addressDetail: " 902호 (수내동, 휴맥스빌리지)",
    fast: "3",
    slow: "2",
    isOpen: "완전",
    isUse: "N",
    date: "YYYY.MM.DD",
  },
];

const defaultParams: IRequestStationList = {
  /** @TODO 서버 sortDirection 정의 후, 추가 */
  // sortDirection: "ASC",
  size: 10,
  page: 0,
  sort: "StationName",
};

const ChargingStationManagement = () => {
  const [tabList, setTabList] = useState([{ label: "충전소 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [list, setList] = useState<IStationListItem[]>([]);
  const [page, setPage] = useState(1);

  const inputs = useInputs({
    sido: "",
    gugun: "",
    dong: "",
    operation: "",
    searchRange: "",
    searchText: "",
    isUse: "" as "Y" | "N",
    sort: "StationName",
    count: "10",
  });
  const {
    count,
    sido,
    gugun,
    dong,
    operation,
    searchRange,
    searchText,
    isUse,
    sort,
    onChange,
    onChangeSingle,
  } = inputs;
  const searchKeyword =
    searchList.find((data) => searchRange === data.value)?.placeholderKeyword ??
    "";

  const navigate = useNavigate();

  /** 파라미터 빈값 제거 */
  const getParams = (params: Partial<IRequestStationList>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestStationList;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestStationList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestStationList = {
        size: Number(count),
        page: 0,
        sido: sido,
        operation: operation,
        gugun: gugun,
        dong: dong,
        isUse: isUse,
        sort: sort as IRequestStationList["sort"],
      };

      if (searchRange) {
        searchParams[searchRange as "stationNm" | "stationId"] = searchText;
      }
      searchParams = { ...searchParams, ...params };
      getParams(searchParams);

      /* 검색  */
      const { code, data } = await getStationList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        setList(data.elements);
      }
    };

  /* init 검색 목록 */
  useEffect(() => {
    const init = async () => {
      /* 검색  */
      const { code, data } = await getStationList(defaultParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        setList(data.elements);
      }
    };

    void init();
  }, []);

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={() => {}}
        onClose={() => {}}
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
              <RegionGroup
                onChangeCallback={(region) => {
                  onChangeSingle({
                    sido: region.sido,
                    gugun: region.sigugun,
                    dong: region.dongmyun,
                  });
                }}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"운영사"}
                name={"operation"}
                list={OPERATOR_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: operation == data.value,
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
                onClick={searchHandler()}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"사용여부"}
                name={"isUse"}
                list={useList.map((data) => ({
                  ...data,
                  checked: isUse == data.value,
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
                      void searchHandler({ sort: value })();
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
              <DropdownBase
                menuItems={COUNT_FILTER_LIST}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ count: value });
                  void searchHandler({ size: Number(value) })();
                }}
              />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/charger/chargerStation/add");
                }}
              />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {chargingStationList.length > 0 ? (
                chargingStationList.map(
                  (
                    {
                      id,
                      region,
                      division,
                      chargerName,
                      chargerId,
                      address,
                      addressDetail,
                      fast,
                      slow,
                      isOpen,
                      isUse,
                      date,
                    },
                    index
                  ) => (
                    <tr key={id}>
                      <td>{(page - 1) * Number(count) + index + 1}</td>
                      <td>{region}</td>
                      <td>{division}</td>
                      <td>
                        <HoverSpan
                          className={"text-turu"}
                          onClick={() => {
                            navigate(`/charger/chargerStation/detail/${index}`);
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
                      <td>{isUse}</td>
                      <td>{date}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={10} className={"py-5 text-center text"}>
                    등록된 충전소 정보가 없습니다.
                  </td>
                </tr>
              )}
            </>
          </TableBase>

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
