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
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  INormalCardItem,
  INormalCardListResponse,
  IRequestNormalCardList,
} from "src/api/card/cardApi.interface";
import { INIT_MEMBER_NORMAL_CARD } from "src/pages/Operate/loader/memberCardListLoader";
import useList from "src/hooks/useList";
import useInputs from "src/hooks/useInputs";
import { onChangeStaticDate, standardDateFormat } from "src/utils/day";
import { getParams } from "src/utils/params";
import { getNormalCardExcel, getNormalCardList } from "src/api/card/cardApi";
import { useTabs } from "src/hooks/useTabs";
import {
  MEMBER_CARD_DIVISION_TYPE,
  MEMBER_CARD_STATUS_TYPE,
  MEMBER_GRADE_TYPE,
  MEMBER_STATUS_TYPE,
} from "src/constants/status";
import { getPageList } from "src/utils/pagination";
import { toLocaleString } from "src/utils/toLocaleString";
import { objectToArray } from "src/utils/convert";
import { getNormalMemberListExcel } from "src/api/member/memberApi";
import { blobToExcel } from "src/utils/xlsx";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const defaultFilterData = {
  label: "전체",
  value: "",
};

const dropdownGroupSearch = [{ label: "이름", value: "Name" }];

const dropdownGroupSort = [
  {
    menuItems: [{ label: "기본", value: "Default" }],
  },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "발급상태" },
  { label: "발급구분" },
  { label: "회원구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "회원카드 번호" },
  { label: "신청일" },
];

interface IIssuanceStatusButton {
  issuanceStatus: string;
}
export const IssuanceStatusButton = (props: IIssuanceStatusButton) => {
  const { issuanceStatus } = props;

  switch (issuanceStatus) {
    case "MCS01":
      return (
        <ButtonBase
          color={"info"}
          className={"w-xs rounded-5 py-1"}
          label={"신청"}
        />
      );
    case "MCS02":
      return (
        <ButtonBase
          color={"success"}
          className={"w-xs rounded-5 py-1"}
          label={"발급"}
        />
      );
    case "MCS03":
      return <ButtonBase label={"발송"} className={"w-xs rounded-5 py-1"} />;
    case "MCS04":
      return (
        <ButtonBase
          color={"white"}
          className={"w-xs rounded-5 py-1"}
          label={"수령완료"}
        />
      );
    default:
      return <></>;
  }
  return <></>;
};

export const MemberNormalCard = () => {
  const { data, filterData, currentPage } = useLoaderData() as {
    data: INormalCardListResponse;
    filterData: typeof INIT_MEMBER_NORMAL_CARD;
    currentPage: number;
  };

  const nav = useNavigate();
  const { pathname } = useLocation();

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<INormalCardItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 회원카드 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);
  const {
    startDate: searchStartDate,
    endDate: searchEndDate,
    cardStatusType,
    cardIssuanceType,
    searchRange,
    searchText,
    sort,
    count,
  } = inputs;

  const { searchDataStorage } = useTabs({
    data: data,
    pageTitle: "회원카드 관리",
    filterData: inputs,
    currentPage: page,
  });

  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  const moveToIssuance = () => {
    nav(`${pathname}/add`);
  };

  const getSearchParams = () => {
    /* 검색 파라미터 */
    const searchParams: IRequestNormalCardList = {
      size: Number(count),
      page,
      cardStatusType,
      cardIssuanceType,
    };
    if (searchStartDate && searchEndDate) {
      searchParams.searchStartDate = standardDateFormat(
        searchStartDate,
        "YYYY.MM.DD"
      );
      searchParams.searchEndDate = standardDateFormat(
        searchEndDate,
        "YYYY.MM.DD"
      );
    }
    if (searchRange && searchText) {
      searchParams.searchType =
        searchRange as IRequestNormalCardList["searchType"];
      searchParams.searchKeyword = searchText;
    }

    return searchParams;
  };
  console.log(page);
  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestNormalCardList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams = getSearchParams();
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getNormalCardList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      console.log(page);
      console.log("search", searchParams.page);
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 회원 정보가 없습니다.",
        });
        searchDataStorage(data, searchParams.page + 1);
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    };

  /** 엑셀 다운로드 (*현재 검색어 기준) */
  const download = async () => {
    /* 검색 파라미터 */
    const searchParams = getSearchParams();
    console.log(searchParams);
    searchParams.page = (searchParams.page || 1) - 1;
    console.log(searchParams);
    getParams(searchParams);
    /* 엑셀 다운 요청 */
    const data = await getNormalCardExcel(searchParams);
    /** 성공 */
    const success = !!data;

    if (success) {
      blobToExcel(
        data,
        `회원카드관리_${standardDateFormat(
          undefined,
          "YYYY_MM_DD_HH_mm_ss"
        )}.xlsx`
      );
    }
  };

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "회원 및 카드 관리", href: "/member/normal" },
            { label: "회원카드 관리", href: "/member/card/normal" },
          ]}
          title={"회원카드 관리"}
        />

        <Separator />
        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <DateGroup
                label={"조회기간"}
                buttonState={[
                  {
                    label: "7일",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 7,
                        unit: "day",
                      }),
                  },
                  {
                    label: "1개월",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 1,
                        unit: "month",
                      }),
                  },
                  {
                    label: "3개월",
                    onClick: () =>
                      onChangeStaticDate({
                        size: 3,
                        unit: "month",
                      }),
                  },
                ]}
                onChangeDate={onChangeSingle}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"발급상태"}
                name={"cardStatusType"}
                list={[
                  defaultFilterData,
                  ...objectToArray(MEMBER_CARD_STATUS_TYPE),
                ].map((data) => ({
                  ...data,
                  checked: data.value === cardStatusType,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col className={"mt-3"}>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    searchRange: value,
                  });
                }}
                initSelectedValue={dropdownGroupSearch.find(
                  (e) => e.value === searchRange
                )}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"발급구분"}
                name={"cardIssuanceType"}
                list={[
                  defaultFilterData,
                  ...objectToArray(MEMBER_CARD_DIVISION_TYPE),
                ].map((data) => ({
                  ...data,
                  checked: data.value === cardIssuanceType,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3"}>
            <Col>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={dropdownGroupSort}
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
                총{" "}
                <AmountInfo className={"text-turu"}>
                  {toLocaleString(total)}건
                </AmountInfo>
                의 회원카드 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"신규 발급"}
                  color={"turu"}
                  onClick={moveToIssuance}
                />
                <ButtonBase
                  label={"엑셀 저장"}
                  outline={true}
                  color={"turu"}
                  onClick={download}
                />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 &&
                list.map((e, index) => (
                  <tr key={e.id}>
                    <td>{(page - 1) * Number(count) + index + 1}</td>
                    <td>
                      <IssuanceStatusButton issuanceStatus={e.cardStatusType} />
                    </td>
                    <td>{MEMBER_CARD_DIVISION_TYPE[e.cardIssuanceType]}</td>
                    <td>{MEMBER_GRADE_TYPE[e.grade]}</td>
                    <td>{e.name}</td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => moveToDetail(e.id)}
                      >
                        <u>{e.userId}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.no}</td>
                    <td>
                      {e.regDtm
                        ? standardDateFormat(e.regDtm, "YYYY.MM.DD")
                        : "-"}
                    </td>
                  </tr>
                ))}
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
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
