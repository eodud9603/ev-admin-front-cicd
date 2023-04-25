import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";
import EvModelModal, {
  IEvModelModalProps,
} from "src/pages/Operate/components/EvModelModal";
import useInputs from "src/hooks/useInputs";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import { useLoaderData } from "react-router";
import {
  IEvModelItem,
  IEvModelListResponse,
  IRequestEvModelList,
} from "src/api/ev/evModelApi.interface";
import useList from "src/hooks/useList";
import { getPageList } from "src/utils/pagination";
import { getParams } from "src/utils/params";
import { getEvModelList } from "src/api/ev/evModelApi";
import { objectToArray } from "src/utils/convert";
import { CHARGER_RATION, CHARGER_TYPE } from "src/constants/status";
import { standardDateFormat } from "src/utils/day";

const defaultDropItem = {
  label: "전체",
  value: "",
};

/* 급/완속 필터 */
const chargerClassList = [
  defaultDropItem,
  {
    label: "급속",
    value: "QUICK",
  },
  {
    label: "완속",
    value: "STANDARD",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "관리자", value: "ManagerName" },
  { label: "제조사명", value: "ManufactureName" },
  { label: "차량모델명", value: "ModelName" },
];

/** 정렬 필터 */
const sortList = [
  { label: "기본", value: "Year" },
  { label: "제조사명", value: "ManufactureName" },
  { label: "차량모델명", value: "ModelName" },
  { label: "연식", value: "Year" },
  { label: "배터리 용량", value: "Capacity" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호" },
  { label: "급속/완속" },
  { label: "충전기 타입" },
  { label: "제조사명" },
  { label: "차량 모델명" },
  { label: "연식" },
  { label: "배터리 용량" },
  { label: "관리자" },
  { label: "등록일" },
];

const EvModel = () => {
  const data = useLoaderData() as IEvModelListResponse | null;

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<IEvModelItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 모델이 없습니다.",
  });

  /* 모델 등록/수정 모달 */
  const [modelModal, setModelModal] = useState<
    Pick<IEvModelModalProps, "type" | "isOpen" | "id">
  >({
    type: "REGISTRATION",
    isOpen: false,
    id: undefined,
  });
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [
    {
      startDate,
      endDate,
      chargerClass,
      searchRange,
      searchText,
      chargerType,
      sort,
      count,
    },
    { onChange, onChangeSingle },
  ] = useInputs({
    startDate: "",
    endDate: "",
    chargerClass: "",
    searchRange: "ManagerName",
    searchText: "",
    chargerType: "",
    sort: "Year",
    count: "10",
  });

  const itemsRef = useRef<IEvModelItemRef[]>([]);

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestEvModelList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestEvModelList = {
        size: Number(count),
        page,
        sort: sort as IRequestEvModelList["sort"],
        chargerClass: chargerClass as IRequestEvModelList["chargerClass"],
        chargerType: chargerType as IRequestEvModelList["chargerType"],
      };
      if (startDate && endDate) {
        searchParams.regStartDate = standardDateFormat(startDate, "YYYY.MM.DD");
        searchParams.regEndDate = standardDateFormat(endDate, "YYYY.MM.DD");
      }
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestEvModelList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getEvModelList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 모델이 없습니다.",
        });
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    };

  /** 선택항목 삭제 */
  const deleteHandler = () => {
    setIsActive(false);

    const checkedList = [];
    for (const item of itemsRef.current) {
      const { check, data } = item;

      if (check) {
        checkedList.push(data);
        item.onChange(false);
      }
    }
  };

  /** 선택삭제 버튼 활성화 여부 업데이트 */
  const onChangeActive = useCallback((currentItemChecked: boolean) => {
    let isActive = currentItemChecked;
    if (!isActive) {
      const checkCount = itemsRef.current.reduce((acc, cur) => {
        if (cur.check) {
          acc += 1;
        }

        return acc;
      }, 0);

      /* 체크된 목록이 있으면, 선택삭제 버튼 활성화 (ref을 사용하여 1개 보다 커야 체크된 것이 있음) */
      if (checkCount > 1) {
        isActive = true;
      }
    }

    setIsActive(isActive);
  }, []);

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "전기차 모델 관리", href: "" },
          ]}
          title={"전기차 모델 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup
                className={"mb-0"}
                label={"등록일"}
                onChangeDate={onChangeSingle}
              />
            </Col>
            <Col md={4} />
            <Col md={4}>
              <RadioGroup
                title={"급속 / 완속"}
                name={"chargerClass"}
                list={chargerClassList.map((data) => ({
                  ...data,
                  checked: chargerClass === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={8}>
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
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"충전기 타입"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ chargerType: value });
                    },
                    menuItems: [
                      defaultDropItem,
                      ...objectToArray(CHARGER_TYPE),
                    ],
                  },
                ]}
                className={"me-2 w-xs"}
              />
              <ButtonBase label={"추가"} color={"dark"} />
            </Col>
          </Row>

          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <DropboxGroup
                label={"정렬 기준"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ sort: value });
                      void searchHandler({
                        page: 1,
                        sort: value as IRequestEvModelList["sort"],
                      })();
                    },
                    menuItems: sortList,
                  },
                ]}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{total}개</span>의 모델이
              있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>{time}</span>
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
                onClick={() => {
                  setModelModal({
                    isOpen: true,
                    type: "REGISTRATION",
                    id: undefined,
                  });
                }}
              />
              <ButtonBase
                disabled={!isActive}
                label={"선택 삭제"}
                outline={isActive}
                color={isActive ? "turu" : "secondary"}
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {list.length > 0 ? (
                list.map((evModel, index) => (
                  <EvModelItem
                    ref={(ref: IEvModelItemRef) =>
                      (itemsRef.current[index] = ref)
                    }
                    key={evModel.id}
                    index={index}
                    rowClickHandler={() => {
                      setModelModal({
                        isOpen: true,
                        type: "EDIT",
                        id: evModel.id,
                      });
                    }}
                    onChangeActive={onChangeActive}
                    {...evModel}
                  />
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

      <EvModelModal
        {...modelModal}
        onClose={() => {
          setModelModal((prev) => ({ ...prev, isOpen: false }));
        }}
      />
      <OperateTextModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen((prev) => !prev);
        }}
        title={"전기차 모델 삭제"}
        contents={
          "삭제 후 고객에게 해당 전기차 모델이 표시되지 않습니다.\n삭제하시겠습니까?"
        }
        buttons={[
          {
            label: "아니요",
            color: "secondary",
          },
          {
            label: "삭제",
            color: "turu",
            onClick: () => {
              /** @TODO 저장 로직 추가 */

              deleteHandler();
              setDeleteModalOpen((prev) => !prev);
            },
          },
        ]}
      />
    </ContainerBase>
  );
};

export default EvModel;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;

interface IEvModelItemRef {
  check: boolean;
  onChange: (bool: boolean) => void;
  data: IEvModelItem;
}

interface IEvModelItemProps extends IEvModelItem {
  index: number;
  rowClickHandler?: () => void;
}

const EvModelItem = forwardRef<
  IEvModelItemRef,
  IEvModelItemProps & { onChangeActive: (currentItemChecked: boolean) => void }
>((props, ref) => {
  const {
    index,
    id,
    chargerType,
    chargerClass,
    manufactureName,
    modelName,
    year,
    capacity,
    managerName,
    createdDate,
    rowClickHandler,
    onChangeActive,
  } = props;

  const [check, setChecked] = useState(false);

  const onChange = useCallback(() => {
    onChangeActive(!check);

    setChecked((prev) => !prev);
  }, [onChangeActive, check]);

  useImperativeHandle(
    ref,
    () => ({
      check,
      onChange,
      data: props,
    }),
    [check, onChange, props]
  );

  return (
    <HoverTr onClick={rowClickHandler}>
      <td onClick={(e) => e.stopPropagation()}>
        <CheckBoxBase
          label={""}
          name={id.toString()}
          checked={check}
          onChange={onChange}
        />
      </td>
      <td>{index + 1}</td>
      <td>{CHARGER_RATION[chargerClass] ?? "-"}</td>
      <td>{CHARGER_TYPE[chargerType] ?? "-"}</td>
      <td>{manufactureName ?? "-"}</td>
      <td>{modelName ?? "-"}</td>
      <td>{year ?? "-"}</td>
      <td>{capacity ?? "-"}Kwh</td>
      <td>{managerName ?? "-"}</td>
      <td>{standardDateFormat(createdDate, "YYYY.MM.DD")}</td>
    </HoverTr>
  );
});
