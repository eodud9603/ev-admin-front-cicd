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
import useList from "src/hooks/useList";
import { standardDateFormat } from "src/utils/day";
import { useTabs } from "src/hooks/useTabs";
import { getParams } from "src/utils/params";
import { lock } from "src/utils/lock";

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
  { label: "주소", placeholderKeyword: "주소를", value: "Address" },
];

/** @TODO 정렬기준, 빈 value값 추가 필요 */
const sortList = [
  { label: "기본", value: "CreatedDate" },
  { label: "충전소명", value: "StationName" },
  { label: "충전소 ID", value: "StationKey" },
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
  const { data, filterData, currentPage } = useLoaderData() as {
    data: IStationListResponse | null;
    filterData: { [key: string]: any };
    currentPage: number;
  };

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IStationListItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 충전소 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const inputs = useInputs(filterData);
  const [
    {
      size,
      sido,
      gugun,
      dong,
      operation,
      searchType,
      searchKeyword,
      isUse,
      sort,
    },
    { onChange, onChangeSingle },
  ] = inputs;

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: "충전소 관리",
    filterData: inputs[0],
    currentPage: page,
  });
  const placeholderKeyword =
    searchList.find((data) => searchType === data.value)?.placeholderKeyword ??
    "검색어를";

  const navigate = useNavigate();

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestStationList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestStationList = {
        size: Number(size),
        page,
        sido,
        gugun,
        dong,
        operation,
        isUse,
        sort: sort as IRequestStationList["sort"],
      };
      if (searchType && searchKeyword) {
        searchParams.searchType =
          searchType as IRequestStationList["searchType"];
        searchParams.searchKeyword = searchKeyword;
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
        searchDataStorage(undefined, searchParams.page + 1);
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    });

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
                init={{
                  sido,
                  sigugun: gugun,
                  dongmyun: dong,
                }}
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
                placeholder={`${placeholderKeyword} 입력해주세요`}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchType: value });
                }}
                initSelectedValue={searchList.find(
                  (e) => e.value === searchType
                )}
                disabled={true} /** @TODO 임시 비활성화 (서버 이슈) */
                name={"searchKeyword"}
                value={searchKeyword}
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
                    },
                    menuItems: sortList,
                    initSelectedValue: sortList.find((e) => e.value === sort),
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
                  onChangeSingle({ size: value });
                  void searchHandler({ page: 1, size: Number(value) })();
                }}
                initSelectedValue={COUNT_FILTER_LIST.find(
                  (e) => e.value === size
                )}
              />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/charger/station/add");
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
                      id,
                      stationKey,
                      region,
                      operation,
                      stationNm,
                      address,
                      fastCharger,
                      fullCharger,
                      isOpen,
                      iseUse,
                      createAt,
                    },
                    index
                  ) => (
                    <tr key={id}>
                      <td>{(page - 1) * Number(size) + index + 1}</td>
                      <td>{region}</td>
                      <td>{operation ?? "전체"}</td>
                      <td>
                        <HoverSpan
                          className={"text-turu"}
                          onClick={() => {
                            navigate(`/charger/station/detail/${id}`);
                          }}
                        >
                          <u>{stationNm}</u>
                        </HoverSpan>
                      </td>
                      <td>{stationKey}</td>
                      <td>{address}</td>
                      <td>
                        {fastCharger} / {fullCharger - fastCharger}
                      </td>
                      <td>{isOpen}</td>
                      <td>{iseUse ?? "-"}</td>
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
