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
import { TableBase } from "src/components/Common/Table/TableBase";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { COUNT_FILTER_LIST } from "src/constants/list";
import {
  IManufactureListItem,
  IManufactureListResponse,
  IRequestManufactureList,
} from "src/api/manufactures/manufactureApi.interface";
import useInputs from "src/hooks/useInputs";
import { getPageList } from "src/utils/pagination";
import { getManufactureList } from "src/api/manufactures/manufactureApi";
import useList from "src/hooks/useList";
import { standardDateFormat } from "src/utils/day";
import { useTabs } from "src/hooks/useTabs";
import { getParams } from "src/utils/params";
import { lock } from "src/utils/lock";

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "CompanyId" },
      { label: "제조사명", value: "Name" },
      { label: "수정일", value: "ModifiedDate" },
    ],
  },
];

const dropdownGroupSearch = [
  { label: "제조사 ID", value: "CompanyId" },
  { label: "제조사명", value: "CompanyName" },
  { label: "담당자명", value: "ManagerName" },
];

const tableHeader = [
  { label: "번호" },
  { label: "제조사 ID" },
  { label: "제조사명" },
  { label: "코드" },
  { label: "담당자명" },
  { label: "담당자 연락처" },
  { label: "대표번호" },
  { label: "사업자 주소" },
  { label: "수정일" },
];

export const ChargerManufacturer = () => {
  const { data, filterData, currentPage } = useLoaderData() as {
    data: IManufactureListResponse | null;
    filterData: { [key: string]: any };
    currentPage: number;
  };

  const nav = useNavigate();
  const { pathname } = useLocation();

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);

  const { size, searchType, searchKeyword, sort } = inputs;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IManufactureListItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 제조사 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: "충전기 제조사 관리",
    filterData: inputs,
    currentPage: page,
  });

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestManufactureList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestManufactureList = {
        size: Number(size),
        page,
        sort: sort as IRequestManufactureList["sort"],
      };
      if (searchType && searchKeyword) {
        searchParams.searchType =
          searchType as IRequestManufactureList["searchType"];
        searchParams.searchKeyword = searchKeyword;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getManufactureList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 제조사 정보가 없습니다.",
        });
        searchDataStorage(undefined, searchParams.page + 1);
      } else {
        reset({
          code,
          message: message || "오류가 발생하였습니다.",
        });
      }
    });

  const moveToRegister = () => {
    nav(`${pathname}/registration`);
  };
  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

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
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchType: value });
                }}
                initSelectedValue={dropdownGroupSearch.find(
                  (e) => e.value === searchType
                )}
                placeholder={"제조사 ID를 입력해주세요"}
                name={"searchKeyword"}
                value={searchKeyword}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
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
                    onChangeSingle({
                      sort: value,
                    });
                  },
                }))}
                className={"me-2"}
              />
            </Col>
          </Row>
        </FilterSection>
        <Separator />

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>{total}건</AmountInfo>의
                충전기 제조사 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
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
                  onClick={moveToRegister}
                />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((manufacture, index) => (
                  <tr key={manufacture.id}>
                    <td>{(page - 1) * Number(size) + index + 1}</td>
                    <td>
                      <u
                        className={"text-turu"}
                        role={"button"}
                        onClick={() => moveToDetail(manufacture.id)}
                      >
                        {manufacture.id}
                      </u>
                    </td>
                    <td>{manufacture.name}</td>
                    <td>{manufacture.code}</td>
                    <td>{manufacture.managerName ?? "-"}</td>
                    <td>{manufacture.managerPhone ?? "-"}</td>
                    <td>{manufacture.phone ?? "-"}</td>
                    <td>{manufacture.address ?? "-"}</td>
                    <td>
                      {standardDateFormat(
                        manufacture.modifiedDate,
                        "YYYY.MM.DD"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan={9} className={"py-5 text-center text"}>
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
