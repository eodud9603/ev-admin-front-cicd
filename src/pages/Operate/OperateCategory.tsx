import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST, YN_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";
import useInputs from "src/hooks/useInputs";
import CategoryModal from "src/pages/Operate/components/CategoryModal";
import { useLoaderData } from "react-router";
import {
  ICategoryItem,
  ICategoryListResponse,
  IRequestCategoryList,
} from "src/api/category/categoryApi.interface";
import useList from "src/hooks/useList";
import { standardDateFormat } from "src/utils/day";
import { getCategoryList } from "src/api/category/categoryApi";
import { getParams } from "src/utils/params";
import { YNType } from "src/api/api.interface";
import CategoryFieldDropdown from "src/pages/Operate/components/CategoryFieldDropdown";
import { getPageList } from "src/utils/pagination";

/* 검색어 필터 */
const searchList = [
  { label: "카테고리명", value: "CategoryName" },
  { label: "등록자", value: "Writer" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "분야" },
  { label: "카테고리명" },
  { label: "노출 여부" },
  { label: "등록자" },
  { label: "등록일" },
];

const OperateCategory = () => {
  /** list init data */
  const data = useLoaderData() as ICategoryListResponse | null;

  /* 카테고리 등록/상세(수정) 모달 */
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    type: "MODIFY" | "REGISTER";
  }>({
    isOpen: false,
    type: "REGISTER",
  });

  const [
    { isExposed, searchRange, searchText, fieldName, fieldId, count },
    { onChange, onChangeSingle },
  ] = useInputs({
    isExposed: "" as YNType,
    searchRange: "CategoryName",
    searchText: "",
    fieldName: "",
    fieldId: "",
    count: "10",
  });

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<ICategoryItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 카테고리 정보가 없습니다.",
  });

  const onChangeCategoryModal =
    (data?: Partial<typeof categoryModal>) => () => {
      setCategoryModal((prev) => ({ ...prev, ...(data ?? {}) }));
    };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestCategoryList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestCategoryList = {
        size: Number(count),
        page,
      };
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestCategoryList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      if (isExposed) {
        searchParams.isExposed = isExposed;
      }
      if (fieldId) {
        searchParams.fieldId = Number(fieldId);
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };

      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getCategoryList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 카테고리 정보가 없습니다.",
        });
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "카테고리 관리", href: "" },
          ]}
          title={"카테고리 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                placeholder={"검색어를 입력해주세요."}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchRange: value });
                }}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"노출 여부"}
                name={"isExposed"}
                list={YN_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: isExposed === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>

          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <CategoryFieldDropdown
                initSelectedValue={{
                  label: fieldName,
                  value: fieldId,
                }}
                onChange={(data) => {
                  onChangeSingle({
                    fieldId: data.value ?? "",
                    fieldName: data.name ?? "",
                  });
                }}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{total}개</span>의 카테고리가
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
                onClick={onChangeCategoryModal({
                  type: "REGISTER",
                  isOpen: true,
                })}
              />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <tr key={data.id}>
                    <td>{(page - 1) * Number(count) + index + 1}</td>
                    <td>{data.field}</td>
                    <td
                      onClick={onChangeCategoryModal({
                        type: "MODIFY",
                        isOpen: true,
                      })}
                    >
                      <HoverSpan className={"text-turu"}>
                        <u>{data.name}</u>
                      </HoverSpan>
                    </td>
                    <td>{data.isExpose}</td>
                    <td>{"-"}</td>
                    <td>
                      {data.createAt
                        ? standardDateFormat(data.createAt, "YYYY.MM.DD")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={"py-5 text-center text"}>
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

      <CategoryModal
        {...categoryModal}
        onClose={onChangeCategoryModal({ isOpen: false })}
      />
    </ContainerBase>
  );
};

export default OperateCategory;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
