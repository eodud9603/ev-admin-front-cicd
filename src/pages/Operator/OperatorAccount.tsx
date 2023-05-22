import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import {
  IAdminAccountItem,
  IRequestAdminList,
} from "src/api/admin/adminApi.interface";
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
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import { IOperatorAccountListType } from "src/pages/Operator/loader/operatorAccountListLoader";
import useList from "src/hooks/useList";
import { getPageList } from "src/utils/pagination";
import { useTabs } from "src/hooks/useTabs";
import { ROLE_TYPE } from "src/constants/status";
import { getParams } from "src/utils/params";
import { getAdminList } from "src/api/admin/adminAPi";
import { lock } from "src/utils/lock";

const PAGE = "계정 관리";

/* 계정상태 필터 */
const statusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "정상",
    value: "N",
  },
  {
    label: "차단",
    value: "Y",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "운영자명", value: "Name" },
  { label: "운영자 ID", value: "AdminId" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "그룹명" },
  { label: "운영자명" },
  { label: "운영자 ID" },
  { label: "제조사명" },
  { label: "권한등급" },
  { label: "핸드폰 번호" },
  { label: "부서" },
  { label: "모바일접속허용" },
  { label: "외부접속허용" },
  { label: "활성화 여부" },
];

const OperatorAccount = () => {
  const { filterData, data, currentPage } =
    useLoaderData() as IOperatorAccountListType;

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);
  const { searchType, searchKeyword, isBlock, size } = inputs;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IAdminAccountItem>({
    elements: data.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 계정 정보가 없습니다.",
    defaultPage: currentPage,
  });

  const navigate = useNavigate();

  const { searchDataStorage } = useTabs({
    data: undefined,
    pageTitle: PAGE,
    filterData: inputs,
    currentPage: page,
  });

  /** 검색 핸들러 */
  const searchHandler = (params: Partial<IRequestAdminList> = {}) =>
    lock(async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestAdminList = {
        size: Number(size),
        page,
        isBlock,
      };
      /** @TODO 검색어 필터 추가 후, 추가예정 */
      if (searchType && searchKeyword) {
        searchParams.searchType = searchType as IRequestAdminList["searchType"];
        searchParams.searchKeyword = searchKeyword;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getAdminList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 계정 정보가 없습니다.",
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
            { label: "운영자 관리", href: "" },
            { label: PAGE, href: "" },
          ]}
          title={PAGE}
        />

        <SearchSection className={"py-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                placeholder={`${
                  searchType === "1" ? "운영자명을" : "운영자 ID를"
                } 입력해주세요.`}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchType: value });
                }}
                name={"searchKeyword"}
                value={searchKeyword}
                onChange={onChange}
                onClick={searchHandler({ page: 1 })}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"계정상태"}
                name={"isBlock"}
                list={statusList.map((status) => ({
                  ...status,
                  checked: isBlock === status.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{total}개</span>의 계정 정보가
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
              />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/operator/account/add");
                }}
              />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <tr key={data.id}>
                    <td>{(page - 1) * Number(size) + index + 1}</td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => {
                          /** @TODO 계정 > 그룹명 */
                        }}
                      >
                        <u>{data.groupName ?? "-"}</u>
                      </HoverSpan>
                    </td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={() => {
                          navigate(`/operator/account/detail/${data.id}`);
                        }}
                      >
                        <u>{data.name}</u>
                      </HoverSpan>
                    </td>
                    <td>{data.adminId}</td>
                    <td>{data.manufactureName ?? "-"}</td>
                    <td>{ROLE_TYPE[data.roleCode] ?? "-"}</td>
                    <td>{data.phoneNumber ?? "-"}</td>
                    <td>{data.department ?? "-"}</td>
                    <td>{data.allowMobile}</td>
                    <td>{data.allowExternal}</td>
                    <td>{data.isBlock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className={"py-5 text-center text"}>
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

export default OperatorAccount;

const SearchSection = styled.section``;

const ListSection = styled.section``;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
