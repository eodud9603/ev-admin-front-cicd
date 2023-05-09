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
import { SendAlarmModal } from "src/pages/Member/components/SendAlarmModal";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useList from "src/hooks/useList";
import {
  INormalMemberItem,
  INormalMemberListResponse,
  IRequestNormalMemberList,
} from "src/api/member/memberApi.interface";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import useInputs from "src/hooks/useInputs";
import {
  MEMBER_GRADE_TYPE,
  MEMBER_STATUS_TYPE,
  STATION_OPERATOR,
} from "src/constants/status";
import { getPageList } from "src/utils/pagination";
import { getParams } from "src/utils/params";
import { onChangeStaticDate, standardDateFormat } from "src/utils/day";
import {
  getNormalMemberList,
  getNormalMemberListExcel,
} from "src/api/member/memberApi";
import { objectToArray } from "src/utils/convert";
import { COUNT_FILTER_LIST } from "src/constants/list";
import { blobToExcel } from "src/utils/xlsx";
import { useTabs } from "src/hooks/useTabs";

const defaultFilterData = {
  label: "전체",
  value: "",
};

const dropdownGroupSearch = [
  { label: "이름", value: "Name" },
  { label: "회원 ID", value: "UserId" },
  { label: "휴대폰 번호", value: "PhoneNumber" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "CreatedDate" },
      { label: "생년월일", value: "Birthday" },
      { label: "회원 가입일", value: "CreatedDate" },
    ],
  },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호" },
  { label: "회원소속" },
  { label: "회원등급" },
  { label: "구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "생년월일" },
  { label: "휴대폰 번호" },
  { label: "회원카드 번호" },
  { label: "회원 가입일(정회원 인증일)" },
  { label: "이용내역" },
];

export const MemberNormal = () => {
  const { data, filterData, currentPage } = useLoaderData() as {
    data: INormalMemberListResponse | null;
    filterData: { [key: string]: any };
    currentPage: number;
  };
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  /* 체크 리스트 */
  const [checkList, setCheckList] = useState<number[]>([]);
  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<INormalMemberItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 회원 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);
  const {
    startDate: searchStartDate,
    endDate: searchEndDate,
    statusType,
    searchRange,
    searchText,
    stationOperator,
    sort,
    count,
  } = inputs;

  const { searchDataStorage } = useTabs({
    data: data,
    pageTitle: "회원 관리",
    filterData: inputs,
    currentPage: page,
  });

  const handleModalState = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (id: number, path: string) => {
    nav(`${pathname}/${path}/${id}`);
  };

  const getSearchParams = () => {
    /* 검색 파라미터 */
    const searchParams: IRequestNormalMemberList = {
      size: Number(count),
      page,
      statusType,
      stationOperator,
      sort,
    };
    if (searchStartDate && searchEndDate) {
      searchParams.searchStartDate = standardDateFormat(
        searchStartDate as string,
        "YYYY.MM.DD"
      );
      searchParams.searchEndDate = standardDateFormat(
        searchEndDate as string,
        "YYYY.MM.DD"
      );
    }
    if (searchRange && searchText) {
      searchParams.searchType =
        searchRange as IRequestNormalMemberList["searchType"];
      searchParams.searchKeyword = searchText;
    }

    return searchParams;
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestNormalMemberList> = {}) =>
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
      const { code, data, message } = await getNormalMemberList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
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

  /** 엑셀 다운로드 (*현재 검색어 기준) */
  const download = async () => {
    /* 검색 파라미터 */
    const searchParams = getSearchParams();
    getParams(searchParams);
    /* 엑셀 다운 요청 */
    const data = await getNormalMemberListExcel(searchParams);
    /** 성공 */
    const success = !!data;

    if (success) {
      blobToExcel(
        data,
        `회원관리_${standardDateFormat(undefined, "YYYY_MM_DD_HH_mm_ss")}.xlsx`
      );
    }
  };

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "회원 및 카드 관리", href: "/member/normal" },
            { label: "회원 관리", href: "/member/normal" },
          ]}
          title={"회원 관리"}
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
                title={"회원등급"}
                name={"statusType"}
                list={[
                  defaultFilterData,
                  ...objectToArray(MEMBER_STATUS_TYPE),
                ].map((data) => ({
                  ...data,
                  checked: data.value === statusType,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
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
                title={"회원소속"}
                name={"stationOperator"}
                list={[
                  defaultFilterData,
                  ...objectToArray(STATION_OPERATOR),
                ].map((data) => ({
                  ...data,
                  checked: data.value === stationOperator,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3"}>
            <Col>
              <DropboxGroup
                className={"me-2"}
                label={"정렬기준"}
                dropdownItems={dropdownGroupSort.map((data) => ({
                  ...data,
                  initSelectedValue: data.menuItems.find(
                    (e) => e.value === sort
                  ),
                  onClickDropdownItem: (_, value) => {
                    onChangeSingle({ sort: value as typeof sort });
                    void searchHandler({
                      page: 1,
                      sort: value as typeof sort,
                    })();
                  },
                }))}
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
                회원 정보가 있습니다.
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
                  initSelectedValue={COUNT_FILTER_LIST.find(
                    (e) => e.value === count
                  )}
                />
                <ButtonBase
                  label={"알림 발송"}
                  disabled={checkList.length === 0}
                  color={checkList.length === 0 ? "secondary" : "turu"}
                  onClick={handleModalState}
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
          <TableBase
            tableHeader={tableHeader}
            allCheck={list.length > 0 && checkList.length === list.length}
            onClickAllCheck={onChangeCheck}
          >
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <tr key={data.id}>
                    <td>
                      <CheckBoxBase
                        name={data.id.toString()}
                        label={""}
                        checked={checkList.indexOf(data.id) > -1}
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
                    <td>{STATION_OPERATOR[data.stationOperator] ?? "-"}</td>
                    <td>{MEMBER_GRADE_TYPE[data.grade] ?? "-"}</td>
                    <td>{MEMBER_STATUS_TYPE[data.statusType] ?? "-"}</td>
                    <td>{data.name}</td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => handleNavigation(data.id, "detail")}
                      >
                        <u>{data.userId ?? "-"}</u>
                      </HoverSpan>
                    </td>
                    <td>
                      {data.birthday
                        ? standardDateFormat(data.birthday, "YYYY.MM.DD")
                        : "-"}
                    </td>
                    <td>{data.phone ?? "-"}</td>
                    <td>{data.memberCard ?? "-"}</td>
                    <td>
                      {(data.createAt
                        ? standardDateFormat(data.createAt, "YYYY.MM.DD")
                        : "") +
                        (data.memberAuthDate
                          ? `(${standardDateFormat(
                              data.memberAuthDate,
                              "YYYY.MM.DD"
                            )})`
                          : "-")}
                    </td>
                    <td>
                      <ButtonBase
                        label={"보기"}
                        outline={true}
                        onClick={() => handleNavigation(data.id, "history")}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className={"py-5 text-center text"}>
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
      <SendAlarmModal isOpen={isOpen} onClose={handleModalState} />
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
