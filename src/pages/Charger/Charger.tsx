import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
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
import {
  IChargerListItem,
  IChargerListResponse,
  IRequestChargerList,
} from "src/api/charger/chargerApi.interface";
import { getPageList } from "src/utils/pagination";
import { getChargerList } from "src/api/charger/chargerApi";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import {
  CHARGER_MODE,
  CHARGER_RATION,
  CHARGER_TYPE,
  TOperationStatusKeys,
} from "src/constants/status";
import { getChargerStatusColor } from "src/utils/charger";
import useList from "src/hooks/useList";
import { useTabs } from "src/hooks/useTabs";
import { getParams } from "src/utils/params";
import { standardDateFormat } from "src/utils/day";
import { lock } from "src/utils/lock";

/* 검색어 필터 */
const searchList = [
  { label: "충전소명", placeholderKeyword: "충전소명을", value: "StationName" },
  {
    label: "충전소 ID",
    placeholderKeyword: "충전소 ID를",
    value: "StationKey",
  },
  { label: "주소", placeholderKeyword: "주소를", value: "Address" },
];

/* 정렬기준 */
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

const Charger = () => {
  const { data, filterData, currentPage } = useLoaderData() as {
    data: IChargerListResponse | null;
    filterData: { [key: string]: string };
    currentPage: number;
  };

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IChargerListItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 충전기 정보가 없습니다.",
    defaultPage: currentPage,
  });

  /* 일괄 제어 모달 */
  const [batchControlModalOpen, setBatchControlModalOpen] = useState(false);
  /* 단일 제어 모달 */
  const [singleControlModalOpen, setSingleControlModalOpen] = useState(false);

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);

  const {
    sido,
    gugun,
    dong,
    operation,
    searchType,
    searchKeyword,
    operationStatus,
    sort,
    size,
  } = inputs;

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: "충전기 관리",
    filterData: inputs,
    currentPage: page,
  });

  const placeholderKeyword =
    searchList.find((data) => searchType === data.value)?.placeholderKeyword ??
    "";

  const navigate = useNavigate();

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestChargerList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestChargerList = {
        size: Number(size),
        page,
        sido,
        gugun,
        dong,
        operation,
        operationStatus: operationStatus as TOperationStatusKeys,
        sort: sort as IRequestChargerList["sort"],
      };
      if (searchType && searchKeyword) {
        searchParams.searchType =
          searchType as IRequestChargerList["searchType"];
        searchParams.searchKeyword = searchKeyword;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getChargerList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        searchDataStorage(undefined, searchParams.page + 1);
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 충전기 정보가 없습니다.",
        });
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
            { label: "충전기 관리", href: "" },
          ]}
          title={"충전기 관리"}
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
                  checked: operation === data.value,
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
                  onChangeSingle({ searchRange: value });
                }}
                initSelectedValue={searchList.find(
                  (e) => e.value === searchType
                )}
                name={"searchKeyword"}
                value={searchKeyword}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"철거여부"}
                name={"operationStatus"}
                list={DEMOLITION_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: operationStatus == data.value,
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
              총 <span className={"text-turu"}>{total}개</span>의 충전기 정보가
              있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>{time}기준</span>
              <DropdownBase
                menuItems={COUNT_FILTER_LIST}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    size: value,
                  });
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
                  navigate("/charger/charger/add");
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
              {list.length > 0 ? (
                list.map(
                  (
                    {
                      id,
                      region,
                      operator,
                      stationName,
                      stationId,
                      chargerKey,
                      searchKey,
                      chargerClass,
                      type,
                      status,
                      lastConnection,
                      assetNumber,
                      nowChargingStartTime,
                      // lastChargingStartTime,
                      lastChargingEndTime,
                      operationStatus,
                      isConnection,
                    },
                    index
                  ) => (
                    <tr key={searchKey}>
                      <td>{(page - 1) * Number(size) + index + 1}</td>
                      <td>{region}</td>
                      <td>{operator ?? "전체"}</td>
                      <td>
                        <HoverSpan
                          className={"text-turu"}
                          onClick={() => {
                            navigate(`/charger/charger/detail/${id}`);
                          }}
                        >
                          <u>{stationName}</u>
                        </HoverSpan>
                      </td>
                      <td>{stationId}</td>
                      <td>{chargerKey}</td>
                      <td>{CHARGER_RATION[chargerClass]}</td>
                      <td>{CHARGER_TYPE[type]}</td>
                      <td>
                        <ButtonBase
                          className={"w-xs rounded-5 py-1"}
                          label={CHARGER_MODE[status]}
                          color={getChargerStatusColor(status)}
                        />
                      </td>
                      <td>{isConnection === "Y" ? "연결" : "미연결"}</td>
                      <td>
                        {nowChargingStartTime
                          ? standardDateFormat(
                              nowChargingStartTime,
                              "YYYY.MM.DD HH:mm:ss"
                            )
                          : "-"}
                      </td>
                      <td>
                        {lastConnection
                          ? standardDateFormat(
                              lastConnection,
                              "YYYY.MM.DD HH:mm:ss"
                            )
                          : "-"}
                      </td>
                      <td>
                        {lastChargingEndTime
                          ? standardDateFormat(
                              lastChargingEndTime,
                              "YYYY.MM.DD HH:mm:ss"
                            )
                          : "-"}
                      </td>
                      <td>{operationStatus === "DEMOLISHED" ? "Y" : "N"}</td>
                      <td>{assetNumber ?? "-"}</td>
                      {/** @TODO 데이터 누락 추가 필요 */}
                      <td>-</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={16} className={"py-5 text-center text"}>
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
