import React from "react";
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
import { getPageList } from "src/utils/pagination";
import useList from "src/hooks/useList";
import { getChargerList } from "src/api/charger/chargerApi";
import {
  IChargerListItem,
  IRequestChargerList,
} from "src/api/charger/chargerApi.interface";
import { CHARGER_RATION, CHARGER_TYPE } from "src/constants/status";

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

interface IStationSearchModalProps extends IModalBaseProps {
  onChangeSelected?: (data?: IChargerListItem) => void;
}

export const StationSearchModal = (props: IStationSearchModalProps) => {
  const { isOpen, onClose, title, size, onChangeSelected } = props;

  const [
    { list, page, lastPage, message },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IChargerListItem>({
    elements: [],
    totalPages: 1,
    totalElements: 0,
    emptyMessage: "충전소를 검색해주세요.",
  });

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
  const getParams = (params: Partial<IRequestChargerList>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestChargerList;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestChargerList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestChargerList = {
        size: Number(count),
        page,
        sido,
        gugun,
        dong,
        sort: "CreatedDate",
      };
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestChargerList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /** @TODO 검색 (* 다른 api로 변경 필요할것으로 판단됨)  */
      const { code, data, message } = await getChargerList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 충전소 정보가 없습니다.",
        });
      } else {
        reset({
          code,
          message: message || "오류가 발생하였습니다.",
        });
      }
    };

  const onChangeData = (data: IChargerListItem) => () => {
    !!onChangeSelected && void onChangeSelected(data);
    onClose();
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
                    <td onClick={onChangeData(data)}>
                      <HoverSpan className={"text-turu"}>
                        <u>{data.stationName}</u>
                      </HoverSpan>
                    </td>
                    <td>{data.stationId}</td>
                    <td>{data.searchKey}</td>
                    <td>{CHARGER_RATION[data.chargerClass]}</td>
                    <td>{CHARGER_TYPE[data.type]}</td>
                    {/** @TODO 주소필드 추가 필요 */}
                    <td>{"-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={"py-5 text-center text"}>
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
