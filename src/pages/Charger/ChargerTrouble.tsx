import React from "react";
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
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { COUNT_FILTER_LIST, OPERATOR_FILTER_LIST } from "src/constants/list";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import {
  IBrokenListItem,
  IBrokenListResponse,
  IRequestBrokenList,
} from "src/api/broken/brokenApi.interface";
import { getPageList } from "src/utils/pagination";
import useInputs from "src/hooks/useInputs";
import { getBrokenList } from "src/api/broken/brokenApi";
import useList from "src/hooks/useList";
import { standardDateFormat } from "src/utils/day";
import { useTabs } from "src/hooks/useTabs";
import { getParams } from "src/utils/params";
import { lock } from "src/utils/lock";

const dropdownGroupSearch = [
  { label: "충전소명", value: "StationName" },
  { label: "충전소 ID", value: "StationKey" },
  { label: "충전기 번호", value: "SearchKey" },
  { label: "관리자명", value: "AdminName" },
  { label: "처리자 ID", value: "ManagerId" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "CreatedDate" },
      { label: "충전소명", value: "StationName" },
      { label: "충전소ID", value: "StationKey" },
      { label: "등록일", value: "CreatedDate" },
    ],
  },
];
const brokenStatusList = [
  { label: "전체", value: "" },
  { label: "접수", value: "SUBMIT" },
  { label: "진행중", value: "PROGRESS" },
  { label: "처리완료", value: "COMPLETE" },
];

const tableHeader = [
  { label: "번호" },
  { label: "지역" },
  { label: "구분" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "충전기ID" },
  { label: "고장 부위1" },
  { label: "고장 부위2" },
  { label: "처리자ID(처리자명)" },
  { label: "접수일" },
  { label: "처리여부(일시)" },
  { label: "운영자ID(운영자명)" },
  { label: "등록자" },
  { label: "등록일" },
];

export const ChargerTrouble = () => {
  /** init 충전기별 고장/파손 데이터 */
  const { data, filterData, currentPage } = useLoaderData() as {
    data: IBrokenListResponse | null;
    filterData: { [key: string]: any };
    currentPage: number;
  };

  const nav = useNavigate();
  const { pathname } = useLocation();

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);

  const {
    sido,
    gugun,
    dong,
    size,
    submitStartDate,
    submitEndDate,
    searchType,
    searchKeyword,
    operator,
    sort,
    status,
  } = inputs;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IBrokenListItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 고장/파손 충전기 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: "충전기 고장/파손 관리",
    filterData: inputs,
    currentPage: page,
  });

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestBrokenList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestBrokenList = {
        size: Number(size),
        page,
        sido,
        gugun,
        dong,
        operator,
        status,
        sort: sort as IRequestBrokenList["sort"],
      };

      if (submitStartDate && submitEndDate) {
        searchParams.submitStartDate = standardDateFormat(
          submitStartDate as string,
          "YYYY.MM.DD"
        );
        searchParams.submitEndDate = standardDateFormat(
          submitEndDate as string,
          "YYYY.MM.DD"
        );
      }
      if (searchType && searchKeyword) {
        searchParams.searchType =
          searchType as IRequestBrokenList["searchType"];
        searchParams.searchKeyword = searchKeyword;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getBrokenList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 고장/파손 충전기 정보가 없습니다.",
        });
        searchDataStorage(undefined, searchParams.page + 1);
      } else {
        reset({
          code,
          message: message || "오류가 발생하였습니다.",
        });
      }
    });

  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  const moveToRegistration = () => {
    nav(`${pathname}/registration`);
  };

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "충전소 및 충전기 관리", href: "/charger/" },
            { label: "충전기 고장/파손 관리", href: "/charger/trouble" },
          ]}
          title={"충전기 고장/파손 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row className={"mb-3"}>
            <Col md={6}>
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
            <Col>
              {/** @TODO 검색 api 해당 필드 추가 필요 (서버 선 작업 필요) */}
              <DateGroup
                label={"접수일"}
                dateState={{
                  startDate: submitStartDate
                    ? standardDateFormat(
                        submitStartDate as string,
                        "YYYY-MM-DD"
                      )
                    : "",
                  endDate: submitEndDate
                    ? standardDateFormat(submitEndDate as string, "YYYY-MM-DD")
                    : "",
                }}
                onChangeDate={(date) => {
                  onChangeSingle({
                    submitStartDate: date.startDate,
                    submitEndDate: date.endDate,
                  });
                }}
              />
            </Col>
            <Col md={2} />
          </Row>
          <Row>
            <Col>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchType: value });
                }}
                initSelectedValue={dropdownGroupSearch.find(
                  (e) => e.value === searchType
                )}
                placeholder={"충전소를 입력해주세요"}
                name={"searchKeyword"}
                value={searchKeyword}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
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
          <Row className={"mt-3"}>
            <Col>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={dropdownGroupSort.map((data) => ({
                  ...data,
                  initSelectedValue: data.menuItems.find(
                    (e) => e.value === sort
                  ),
                  onClickDropdownItem: (label, value) => {
                    onChangeSingle({ sort: value });
                  },
                }))}
                className={"me-2"}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"처리여부"}
                name={"status"}
                list={brokenStatusList.map((data) => ({
                  ...data,
                  checked: status === data.value,
                }))}
                onChange={onChange}
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
                총 <AmountInfo className={"text-turu"}>{total}개</AmountInfo>의
                고장/파손 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>{time}기준</span>
                <DropdownBase
                  menuItems={COUNT_FILTER_LIST}
                  initSelectedValue={COUNT_FILTER_LIST.find(
                    (e) => e.value === size
                  )}
                  onClickDropdownItem={(_, value) => {
                    onChangeSingle({
                      size: value,
                    });
                    void searchHandler({ page: 1, size: Number(value) })();
                  }}
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
              {list.length > 0 ? (
                list.map((broken, index) => (
                  <tr key={broken.id}>
                    <td>{(page - 1) * Number(size) + index + 1}</td>
                    <td>{broken.stationRegion}</td>
                    <td>{broken.stationOperator ?? "전체"}</td>
                    <td>
                      <u
                        role={"button"}
                        className={"text-turu"}
                        onClick={() => moveToDetail(broken.id)}
                      >
                        {broken.stationName}
                      </u>
                    </td>
                    <td>{broken.stationKey}</td>
                    <td>{broken.searchKey}</td>
                    <td>{broken.damagedPart01 ?? "-"}</td>
                    <td>{broken.damagedPart02 ?? "-"}</td>
                    <td>
                      {broken.adminId ?? "알수없음"}(
                      {broken.adminName ?? "알수없음"})
                    </td>
                    <td>접수일</td>
                    <td>처리여부(일시)</td>
                    <td>
                      {broken.managerId ?? "알수없음"}(
                      {broken.managerName ?? "알수없음"})
                    </td>
                    <td>{broken.reporterName ?? "-"}</td>
                    <td>{broken.createDate ?? "-"}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan={14} className={"py-5 text-center text"}>
                      {message}
                    </td>
                  </tr>
                </>
              )}
            </>
          </TableBase>
        </ListSection>
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
      </BodyBase>
    </ContainerBase>
  );
};

const ListSection = styled.section``;
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;
// const HoverSpan = styled.span`
//   :hover {
//     po
//   }
// `
