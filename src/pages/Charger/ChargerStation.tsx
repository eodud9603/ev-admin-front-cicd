import React from "react";
import { useLoaderData, useNavigate } from "react-router";
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
  IStationListResponse,
} from "src/api/station/stationApi.interface";
import { getPageList } from "src/utils/pagination";
import { YNType } from "src/api/api.interface";
import useList from "src/hooks/useList";
import { standardDateFormat } from "src/utils/day";
import { useTabs } from "src/hooks/useTabs";

/* 사용여부 필터 */
const useStatusList = [
  { label: "전체", value: "" },
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

/** @TODO 검색어 필터, 빈 value값 추가 필요 */
const searchList = [
  { label: "충전소명", placeholderKeyword: "충전소명을", value: "StationName" },
  {
    label: "충전소 ID",
    placeholderKeyword: "충전소 ID를",
    value: "StationKey",
  },
  { label: "주소", placeholderKeyword: "주소를", value: "" },
];

/** @TODO 정렬기준, 빈 value값 추가 필요 */
const sortList = [
  { label: "기본", value: "CreatedDate" },
  { label: "충전소명", value: "StationName" },
  { label: "충전소 ID", value: "StationKey" },
  { label: "급/완속(기)", value: "" },
  { label: "등록일", value: "CreatedDate" },
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

const ChargingStationManagement = () => {
  const data = useLoaderData() as IStationListResponse | null;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IStationListItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: "등록된 충전소 정보가 없습니다.",
  });

  const inputs = useInputs({
    sido: "",
    gugun: "",
    dong: "",
    operation: "",
    searchRange: "StationName",
    searchText: "서울",
    isUse: "" as YNType,
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
        page,
        sido,
        gugun,
        dong,
        operation,
        isUse,
        sort: sort as IRequestStationList["sort"],
      };
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestStationList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getStationList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        void onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 충전소 정보가 없습니다.",
        });
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    };

  useTabs({ data: data, pageTitle: "충전소 관리" });

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

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
                label={"지역"}
                onChangeRegion={(region) => {
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
                disabled={true} /** @TODO 임시 비활성화 (서버 이슈) */
                name={"searchText"}
                value={searchText}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"사용여부"}
                name={"isUse"}
                list={useStatusList.map((data) => ({
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
                      void searchHandler({
                        page: 1,
                        sort: value as IRequestStationList["sort"],
                      })();
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
              총 <span className={"text-turu"}>{total}개</span>의 충전소 정보가
              있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>{time}기준</span>
              <DropdownBase
                menuItems={COUNT_FILTER_LIST}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ count: value });
                  void searchHandler({ page: 1, size: Number(value) })();
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
              {list.length > 0 ? (
                list.map(
                  (
                    {
                      stationId,
                      region,
                      operation,
                      stationNm,
                      address,
                      fastCharger,
                      fullCharger,
                      isOpen,
                      createAt,
                    },
                    index
                  ) => (
                    <tr key={stationId}>
                      <td>{(page - 1) * Number(count) + index + 1}</td>
                      <td>{region}</td>
                      <td>{operation ?? "전체"}</td>
                      <td>
                        <HoverSpan
                          className={"text-turu"}
                          onClick={() => {
                            navigate(
                              `/charger/chargerStation/detail/${stationId}`
                            );
                          }}
                        >
                          <u>{stationNm}</u>
                        </HoverSpan>
                      </td>
                      <td>{stationId}</td>
                      <td>{address}</td>
                      <td>
                        {fastCharger} / {fullCharger - fastCharger}
                      </td>
                      <td>{isOpen}</td>
                      {/** @TODO 데이터 누락 추가 필요 */}
                      <td>-</td>
                      <td>{standardDateFormat(createAt, "YYYY.MM.DD")}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={10} className={"py-5 text-center text"}>
                    {message}
                  </td>
                </tr>
              )}
            </>
          </TableBase>

          <PaginationBase
            setPage={setPage}
            data={{
              hasPreviousPage: page > 1,
              hasNextPage: page < lastPage,
              navigatePageNums: getPageList(page, lastPage),
              pageNum: page,
              onChangePage: (page) => {
                void searchHandler({ page })();
              },
            }}
          />
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
