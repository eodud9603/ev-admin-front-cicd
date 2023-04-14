import React, { useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { Label } from "reactstrap";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import useInputs from "src/hooks/useInputs";
import {
  IRequestStationList,
  IStationListItem,
} from "src/api/station/stationApi.interface";
import { getStationList } from "src/api/station/stationApi";
import { getPageList } from "src/utils/pagination";

const dropdownGroupSearch = [{ label: "충전소명", value: "StationName" }];

const tableHeader = [
  { label: "번호" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "충전기ID" },
  { label: "급속/완속" },
  { label: "커넥터 종류" },
  { label: "주소" },
];
const count = 10;

export const StationSearchModal = (props: IModalBaseProps) => {
  const { isOpen, onClose, title, size } = props;

  const [list, setList] = useState<IStationListItem[]>([]);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [emptyMessage, setEmptyMessage] = useState("충전소를 검색해주세요.");

  const {
    sido,
    gugun,
    dong,
    searchRange,
    searchText,
    onChange,
    onChangeSingle,
  } = useInputs({
    sido: "",
    gugun: "",
    dong: "",
    searchRange: "StationName",
    searchText: "",
  });

  /** 파라미터 빈값 제거 */
  const getParams = (params: Partial<IRequestStationList>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestStationList;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestStationList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestStationList = {
        size: Number(count),
        page,
        sido,
        gugun,
        dong,
        sort: "CreatedDate",
      };
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestStationList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /** @TODO 검색 (* 다른 api로 변경 필요할것으로 판단됨)  */
      const { code, data, message } = await getStationList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        if (searchParams.page === 0) {
          setPage(1);
        }
        if (data.totalElements === 0) {
          setEmptyMessage("검색된 충전소 정보가 없습니다.");
        }
        setList(data.elements);
        setMaxPage(data.totalPages);
      } else {
        setPage(1);
        setList([]);
        setMaxPage(1);
        setEmptyMessage(message || "오류가 발생하였습니다.");
      }
    };

  return (
    <ModalBase
      title={title ?? "충전소 검색"}
      size={size ?? "xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <FilterSection
          className={
            "flex-column justify-content-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3 py-4"
          }
        >
          <RegionGroup
            onChangeRegion={(region) => {
              onChangeSingle({
                sido: region.sido,
                gugun: region.sigugun,
                dong: region.dongmyun,
              });
            }}
          />
          <div className={"my-3"} />
          <SearchTextInput
            title={"검색어"}
            menuItems={dropdownGroupSearch}
            placeholder={"입력해주세요"}
            name={"searchText"}
            value={searchText}
            onChange={onChange}
            onClick={searchHandler({ page: 1 })}
          />
        </FilterSection>

        <ListSection>
          <Label className={"fw-bold font-size-16 my-4 m-0"}>
            충전소(충전기) 선택
          </Label>
          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <tr key={data.stationId}>
                    <td>{(page - 1) * Number(count) + index + 1}</td>
                    <td>
                      <HoverSpan className={"text-turu"}>
                        <u>{data.stationNm}</u>
                      </HoverSpan>
                    </td>
                    <td>{data.stationId}</td>
                    <td>{"-"}</td>
                    <td>{data.fastCharger || "-"}</td>
                    <td>{data.fullCharger - data.fastCharger}</td>
                    <td>{data.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={"py-5 text-center text"}>
                    {emptyMessage}
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
            hasNextPage: page < maxPage,
            navigatePageNums: getPageList(page, maxPage),
            pageNum: page,
            onChangePage: (page) => {
              void searchHandler({ page })();
            },
          }}
        />
        <div className={"d-flex justify-content-center"}>
          <ButtonBase
            label={"닫기"}
            outline={true}
            className={"w-xs my-4"}
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};
const ModalContainer = styled.section`
  padding: 15px;
`;
const FilterSection = styled.section``;
const ListSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
