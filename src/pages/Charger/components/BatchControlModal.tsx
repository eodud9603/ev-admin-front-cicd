import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ModalBody } from "reactstrap";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import {
  IRequestStationList,
  IStationListItem,
} from "src/api/station/stationApi.interface";
import useInputs from "src/hooks/useInputs";
import { getParams } from "src/utils/params";
import { getStationList } from "src/api/station/stationApi";
import useList from "src/hooks/useList";
import { getPageList } from "src/utils/pagination";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";

interface IAlarmAddMemberModal {
  isOpen: boolean;
  onClose: () => void;
}

const dropdownGroupSearch = [
  { label: "충전소명", value: "StationName" },
  { label: "충전소 ID", value: "StationKey" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "충전소명" },
  { label: "충전소ID" },
];

const BatchControlModal = (props: IAlarmAddMemberModal) => {
  const { isOpen, onClose } = props;

  /* 체크 리스트 */
  const [checkList, setCheckList] = useState<number[]>([]);
  /* 잔송완료 모달 */
  const [completeModalOpen, setCompleteModal] = useState(false);

  const [
    { list, page, lastPage, message },
    { setPage, onChange: onChangeList, reset: listReset },
  ] = useList<IStationListItem>({
    elements: [],
    totalPages: 1,
    totalElements: 0,
    emptyMessage: "충전소를 검색해주세요.",
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    sido: "",
    gugun: "",
    dong: "",
    searchRange: "StationName",
    searchText: "",
    controlType: "",
    sort: "StationName",
  });
  const { sido, gugun, dong, searchRange, searchText, sort } = inputs;

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestStationList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestStationList = {
        size: 10,
        page,
        sido,
        gugun,
        dong,
        sort: sort as IRequestStationList["sort"],
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

      /* 검색  */
      const { code, data, message } = await getStationList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        void onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 충전소 정보가 없습니다.",
        });
      } else {
        listReset({ code, message: message || "오류가 발생하였습니다." });
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

  /** onClosed */
  const reset = () => {
    setCheckList([]);
  };

  return (
    <ModalBase
      title={"일괄 제어"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
      onClosed={reset}
    >
      <ModalBody>
        {/* filter section 1 */}
        <section className={"mb-2 bg-light bg-opacity-50 p-4 border rounded"}>
          <div className={"mb-3"}>
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
          </div>
          <div>
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
          </div>
        </section>
        {/* filter section 2 */}
        <section className={"bg-light bg-opacity-50 p-4 border rounded"}>
          <RadioGroup
            title={"제어 유형"}
            name={"controlType"}
            list={[
              {
                label: "재가동",
                value: "1",
              },
              {
                label: "공장초기화",
                value: "2",
              },
            ]}
            onChange={onChange}
          />
        </section>

        <ListSection className={"py-4"}>
          <p className={"mb-2 font-size-16 fw-bold"}>충전소 선택</p>
          <TableBase
            tableHeader={tableHeader}
            allCheck={list.length > 0 && checkList.length === list.length}
            onClickAllCheck={onChangeCheck}
          >
            <>
              {list.length > 0 ? (
                list.map((data) => (
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
                    <td>{data.stationNm}</td>
                    <td>{data.stationKey}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className={"py-4 font-size-14 text-secondary text-center"}
                  >
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

        <div className={"d-flex justify-content-center my-4"}>
          <ButtonBase
            label={"닫기"}
            color={"secondary"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClose}
          />
          <ButtonBase
            disabled={checkList.length === 0}
            label={"적용"}
            color={checkList.length === 0 ? "secondary" : "turu"}
            className={"w-xs"}
            onClick={() => {
              /** @TODO 적용 로직 */

              /* 적용 성공 */
              setCompleteModal(true);
            }}
          />
        </div>
      </ModalBody>

      <DetailCompleteModal
        isOpen={completeModalOpen}
        title={"일괄 제어 완료"}
        contents={"일괄 제어 SMS 전송이 완료되었습니다."}
        onClose={() => {
          setCompleteModal(false);
          onClose();
        }}
      />
    </ModalBase>
  );
};

export default BatchControlModal;

const ListSection = styled.section``;
