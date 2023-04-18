import React, { useState } from "react";
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
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  IRequestSupplierList,
  IRequestSupplierListResponse,
  ISupplierItem,
} from "src/api/supplier/supplierApi.interface";
import { COUNT_FILTER_LIST, YN_FILTER_LIST } from "src/constants/list";
import useList from "src/hooks/useList";
import { getPageList } from "src/utils/pagination";
import { standardDateFormat } from "src/utils/day";
import useInputs from "src/hooks/useInputs";
import {
  getSupplierList,
  postSupplierModifyActive,
} from "src/api/supplier/supplierApi";
import { YNType } from "src/api/api.interface";

const dropdownGroupSearch = [
  {
    label: "운영사명",
    placeholderKeyword: "운영사명을",
    value: "SupplierName",
  },
  {
    label: "운영사 ID",
    placeholderKeyword: "운영사 ID를",
    value: "SupplierId",
  },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "CreatedDate" },
      { label: "운영사명", value: "SupplierName" },
      { label: "최근 등록일", value: "CreatedDate" },
    ],
  },
];

const applyRadio = [
  { label: "전체", value: "" },
  { label: "활용", value: "Y" },
  { label: "미활용", value: "N" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호" },
  { label: "활용여부" },
  { label: "운영사 ID" },
  { label: "운영사명" },
  { label: "한전기관 ID" },
  { label: "한전기관인증키(로밍)" },
  { label: "계약여부" },
  { label: "사업자 대표번호" },
  { label: "등록일" },
];

export const ChargerOperator = () => {
  const data = useLoaderData() as IRequestSupplierListResponse | null;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<ISupplierItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: "등록된 서비스 운영사 정보가 없습니다.",
  });
  /* 체크 리스트 */
  const [checkList, setCheckList] = useState<number[]>([]);

  const {
    searchRange,
    searchText,
    isActive,
    sort,
    isContracted,
    count,
    onChange,
    onChangeSingle,
  } = useInputs({
    searchRange: "SupplierName",
    searchText: "",
    isActive: "" as YNType,
    sort: "CreatedDate",
    isContracted: "" as YNType,
    count: "10",
  });
  const searchKeyword =
    dropdownGroupSearch.find((data) => searchRange === data.value)
      ?.placeholderKeyword ?? "검색어를";

  /** 파라미터 빈값 제거 */
  const getParams = (params: Partial<IRequestSupplierList>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestSupplierList;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestSupplierList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestSupplierList = {
        size: Number(count),
        page,
        isActive,
        isContracted,
        sort: sort as IRequestSupplierList["sort"],
      };
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestSupplierList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,

        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getSupplierList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 서비스 운영사 정보가 없습니다.",
        });
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }

      setCheckList([]);
    };

  /** 전체 체크 변경 콜백 */
  const onChangeCheck = (check: boolean) => {
    if (check) {
      setCheckList(list.map((data) => data.id));
    } else {
      setCheckList([]);
    }
  };

  /** 활성화 상태로 전환 */
  const onChangeActive = async () => {
    /** 활용상태 전환 요청 */
    const { code } = await postSupplierModifyActive({
      isActive: "Y",
      ids: checkList,
    });

    /** 활용상태 전환 성공 */
    const success = code === "SUCCESS";
    if (success) {
      void searchHandler({ page })();
    }
  };

  const nav = useNavigate();
  const { pathname } = useLocation();

  const moveToRegistration = () => {
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
            { label: "서비스 운영사 관리", href: "/charger/operator" },
          ]}
          title={"서비스 운영사 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    searchRange: value,
                  });
                }}
                placeholder={`${searchKeyword} 입력해주세요`}
                name={"searchText"}
                className={""}
                value={searchText}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"활용여부"}
                name={"isActive"}
                list={applyRadio.map((data) => ({
                  ...data,
                  checked: data.value === isActive,
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
                  onClickDropdownItem: (label, value) => {
                    onChangeSingle({
                      sort: value,
                    });
                    void searchHandler({
                      page: 1,
                      sort: value as IRequestSupplierList["sort"],
                    })();
                  },
                }))}
                className={"me-2"}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"계약여부"}
                name={"isContracted"}
                list={YN_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: data.value === isContracted,
                }))}
                onChange={onChange}
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
                서비스 운영사 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>{time}기준</span>
                <DropdownBase
                  menuItems={COUNT_FILTER_LIST}
                  onClickDropdownItem={(_, value) => {
                    onChangeSingle({
                      count: value,
                    });
                    void searchHandler({ page: 1, size: Number(value) })();
                  }}
                />
                <ButtonBase
                  label={"활용상태 전환"}
                  color={"turu"}
                  disabled={checkList.length === 0}
                  onClick={onChangeActive}
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
          <TableBase
            tableHeader={tableHeader}
            allCheck={checkList.length === list.length}
            onClickAllCheck={onChangeCheck}
          >
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <tr key={data.id}>
                    <td>
                      <CheckBoxBase
                        name={"check"}
                        checked={checkList.indexOf(data.id) > -1}
                        label={""}
                        onChange={() => {
                          const list = [...checkList];
                          const findIndex = checkList.indexOf(data.id);

                          if (findIndex > -1) {
                            list.splice(findIndex, 1);
                          } else {
                            list.push(data.id);
                          }

                          setCheckList(list);
                        }}
                      />
                    </td>
                    <td>{(page - 1) * Number(count) + index + 1}</td>
                    <td>{data.isActive ?? "-"}</td>
                    <td>
                      <u
                        role={"button"}
                        className={"text-turu"}
                        onClick={() => moveToDetail(data.id)}
                      >
                        {data.supplierId ?? "-"}
                      </u>
                    </td>
                    <td>{data.name}</td>
                    <td>{data.code}</td>
                    <td>{data.meAuthKey ?? "-"}</td>
                    <td>{data.isContracted ?? "-"}</td>
                    <td>{data.mainPhoneNumber ?? "-"}</td>
                    <td>
                      {data.createdDate
                        ? standardDateFormat(data.createdDate, "YYYY.MM.DD")
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className={"py-5 text-center text"}>
                    {message}
                  </td>
                </tr>
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
