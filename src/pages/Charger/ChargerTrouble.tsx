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
import { COUNT_FILTER_LIST, OPERATOR_FILTER_LIST } from "src/constants/list";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import {
  IBrokenListResponse,
  IRequestBrokenList,
} from "src/api/broken/brokenApi.interface";
import { getPageList } from "src/utils/pagination";
import useInputs from "src/hooks/useInputs";
import { getBrokenList } from "src/api/broken/brokenApi";
import { OperatorType } from "src/api/api.interface";

const dropdownGroupSearch = [
  { label: "충전소명", value: "stationNm" },
  { label: "충전소 ID", value: "stationId" },
  { label: "충전기 번호", value: "" },
  { label: "관리자명", value: "" },
  { label: "처리자 ID", value: "" },
];

const dropdownGroupSort = [
  {
    menuItems: [
      { label: "기본", value: "StationName" },
      { label: "충전소명", value: "StationName" },
      { label: "충전소ID", value: "stationId" },
      { label: "등록일", value: "CrateAt" },
    ],
  },
];
const brokenStatusList = [
  { label: "전체", value: "" },
  { label: "접수", value: "접수" },
  { label: "진행중", value: "진행중" },
  { label: "처리완료", value: "처리완료" },
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
  const data = useLoaderData() as IBrokenListResponse | null;

  const nav = useNavigate();
  const { pathname } = useLocation();
  const [selected, setSelected] = useState("0");

  const {
    sido,
    gugun,
    dong,
    count,
    searchRange,
    searchText,
    operator,
    sort,
    brokenStatus,
    onChange,
    onChangeSingle,
  } = useInputs({
    sido: "",
    gugun: "",
    dong: "",
    searchRange: "",
    searchText: "",
    operator: "" as OperatorType,
    sort: "StationName",
    brokenStatus: "",
    count: "10",
  });

  const [list, setList] = useState(data?.elements ?? []);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(data?.totalPages ?? 1);
  const [total, setTotal] = useState(data?.totalElements ?? 0);
  const [emptyMessage, setEmptyMessage] = useState(
    "등록된 고장/파손 충전기 정보가 없습니다."
  );

  /** 파라미터 빈값 제거 */
  const getParams = (params: Partial<IRequestBrokenList>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestBrokenList;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestBrokenList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestBrokenList = {
        size: Number(count),
        page,
        sido,
        gugun,
        dong,
        operator,
        sort: sort as IRequestBrokenList["sort"],
      };
      if (searchRange) {
        searchParams[searchRange as "stationNm" | "stationId"] = searchText;
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
        if (searchParams.page === 0) {
          setPage(1);
        }
        if (data.totalElements === 0) {
          setEmptyMessage("검색된 고장/파손 충전기 정보가 없습니다.");
        }
        setList(data.elements);
        setMaxPage(data.totalPages);
        setTotal(data.totalElements);
      } else {
        setPage(1);
        setList([]);
        setMaxPage(1);
        setTotal(0);
        setEmptyMessage(message || "오류가 발생하였습니다.");
      }
    };

  const moveToDetail = (id: number) => {
    nav(`${pathname}/detail/${id}`);
  };

  const moveToRegistration = () => {
    nav(`${pathname}/registration`);
  };

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "충전소 관리" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

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
              <DateGroup label={"접수일"} />
            </Col>
            <Col md={2} />
          </Row>
          <Row>
            <Col>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchRange: value });
                }}
                placeholder={"충전소를 입력해주세요"}
                name={"searchText"}
                value={searchText}
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
                  onClickDropdownItem: (label, value) => {
                    onChangeSingle({ sort: value });
                    void searchHandler({
                      page: 1,
                      sort: value as IRequestBrokenList["sort"],
                    })();
                  },
                }))}
                className={"me-2"}
              />
            </Col>
            <Col className={"d-flex align-items-center"}>
              <RadioGroup
                title={"처리여부"}
                name={"brokenStatus"}
                list={brokenStatusList.map((data) => ({
                  ...data,
                  checked: brokenStatus === data.value,
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
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
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
                    <td>{(page - 1) * Number(count) + index + 1}</td>
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
                      {emptyMessage}
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
            hasNextPage: page < maxPage,
            navigatePageNums: getPageList(page, maxPage),
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
