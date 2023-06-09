import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import { getStationContractList } from "src/api/station/stationApi";
import {
  IRequestStationContractList,
  IStationContractItem,
  IStationContractListResponse,
} from "src/api/station/stationApi.interface";
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
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import { getPageList } from "src/utils/pagination";
import styled from "styled-components";
import useList from "src/hooks/useList";
import { CONTRACT_STATUS } from "src/constants/status";
import { standardDateFormat } from "src/utils/day";
import { useTabs } from "src/hooks/useTabs";
import { getParams } from "src/utils/params";
import { lock } from "src/utils/lock";

/* 계약여부 필터 */
const contractFilterList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "계약",
    value: "SC01",
  },
  {
    label: "해지대기",
    value: "SC80",
  },
  {
    label: "해지",
    value: "SC89",
  },
];

/* 사용여부 필터 */
const useStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "사용",
    value: "Y",
  },
  {
    label: "미사용",
    value: "N",
  },
];

/* 검색어 필터 */
const searchList = [
  {
    label: "계약장소명",
    placeholderKeyword: "계약장소명을",
    value: "ContractPlace",
  },
  {
    label: "충전소 ID",
    placeholderKeyword: "충전소 ID를",
    value: "StationKey",
  },
  {
    label: "영업업체",
    placeholderKeyword: "영업업체를",
    value: "SalesCompany",
  },
];

/* 정렬기준 */
const sortList = [
  { label: "기본", value: "ContractedDate" },
  { label: "계약 체결일", value: "ContractedDate" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "계약번호" },
  { label: "사용여부" },
  { label: "계약여부" },
  { label: "계약장소명" },
  { label: "환경부 충전소ID" },
  { label: "행정동 주소" },
  { label: "영업업체" },
  { label: "장소 담당자명" },
  { label: "장소 담당자연락처" },
  { label: "계약기간" },
  { label: "계약체결일" },
  { label: "등록일" },
];

const StationContract = () => {
  /** init 충전소 계약 목록 데이터 */
  const { data, filterData, currentPage } = useLoaderData() as {
    data: IStationContractListResponse | null;
    filterData: { [key: string]: any };
    currentPage: number;
  };

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IStationContractItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 충전소 계약 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);

  const {
    sido,
    gugun,
    dong,
    contractCode,
    searchType,
    searchKeyword,
    isUse,
    sort,
    size,
  } = inputs;

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: "충전소 계약 관리",
    filterData: inputs,
    currentPage: page,
  });

  const placeholderKeyword =
    searchList.find((search) => searchType === search.value)
      ?.placeholderKeyword ?? "";

  const navigate = useNavigate();

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestStationContractList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestStationContractList = {
        size: Number(size),
        page,
        sido,
        gugun,
        dong,
        isUse,
        contractCode,
        sort: sort as IRequestStationContractList["sort"],
      };
      /** @TODO 검색어 필터 추가 후, 추가예정 */
      if (searchType && searchKeyword) {
        searchParams.searchType =
          searchType as IRequestStationContractList["searchType"];
        searchParams.searchKeyword = searchKeyword;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getStationContractList(
        searchParams
      );
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 충전소 계약 정보가 없습니다.",
        });
        searchDataStorage(undefined, searchParams.page + 1);
      } else {
        reset({
          code,
          message: message || "오류가 발생하였습니다.",
        });
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
            { label: "충전소 및 충전 관리", href: "" },
            { label: "충전소 계약 관리", href: "" },
          ]}
          title={"충전소 계약 관리"}
        />

        <section className={"py-4 border-top border-bottom"}>
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
                title={"계약여부"}
                name={"contractCode"}
                list={contractFilterList.map((contract) => ({
                  ...contract,
                  checked: contractCode === contract.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                placeholder={`${placeholderKeyword} 입력해주세요.`}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchType: value });
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
                title={"사용여부"}
                name={"isUse"}
                list={useStatusList.map((use) => ({
                  ...use,
                  checked: isUse === use.value,
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
        </section>

        <section className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{total}개</span>의 충전소 계약
              정보가 있습니다.
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
                  navigate("/station/contract/add");
                }}
              />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((contract, index) => (
                  <tr key={contract.id}>
                    <td>{(page - 1) * Number(size) + index + 1}</td>
                    <td>{contract.id}</td>
                    <td>{contract.isUse === "Y" ? "사용" : "미사용"}</td>
                    {/** @TODO 서버 code 픽스 후, 매칭작업 필요 */}
                    <td>{CONTRACT_STATUS[contract.code] ?? "-"}</td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => {
                          navigate(`/station/contract/detail/${contract.id}`);
                        }}
                      >
                        <u>{contract.place}</u>
                      </HoverSpan>
                    </td>
                    <td>{contract.meStationId || "-"}</td>
                    <td>
                      {contract.addressSido
                        ? `${contract.addressSido} ${contract.addressSigugun} 
                        ${contract.addressDongmyun}`
                        : "-"}
                    </td>
                    <td>{contract.salesCompany || "-"}</td>
                    <td>{contract.managerName || "-"}</td>
                    <td>
                      <p>{contract.managerPhone || "-"}</p>
                    </td>
                    <td>
                      {contract.contractStartDt && contract.contractEndDt
                        ? standardDateFormat(
                            contract.contractStartDt,
                            "YYYY.MM.DD"
                          ) +
                          " ~ " +
                          standardDateFormat(
                            contract.contractEndDt,
                            "YYYY.MM.DD"
                          )
                        : "-"}
                    </td>
                    <td>
                      {contract.contractDt
                        ? standardDateFormat(contract.contractDt, "YYYY.MM.DD")
                        : "-"}
                    </td>
                    <td>
                      {contract.createdDate
                        ? standardDateFormat(contract.createdDate, "YYYY.MM.DD")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className={"py-5 text-center text"}>
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
        </section>
      </BodyBase>
    </ContainerBase>
  );
};

export default StationContract;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
