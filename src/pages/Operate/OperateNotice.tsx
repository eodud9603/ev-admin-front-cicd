import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLoaderData, useNavigate } from "react-router";
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
import {
  COUNT_FILTER_LIST,
  YN_FILTER_LIST,
  UPLOAD_FILTER_LIST,
} from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import {
  INoticeItem,
  INoticeListResponse,
  IRequestNoticeList,
} from "src/api/board/noticeApi.interface";
import useList from "src/hooks/useList";
import { getPageList } from "src/utils/pagination";
import { getNoticeList } from "src/api/board/noticeApi";
import { getParams } from "src/utils/params";
import { standardDateFormat } from "src/utils/day";
import { UploadType, YNType } from "src/api/api.interface";

/** 검색어 필터 */
const searchList = [
  { label: "제목", value: "Title" },
  { label: "내용", value: "Content" },
  { label: "작성자", value: "Writer" },
];

/** 정렬 필터 */
const sortList = [
  {
    label: "기본",
    value: "CreateAt",
  },
  {
    label: "작성일",
    value: "CreateAt",
  },
  {
    label: "조회 수",
    value: "ReadCount",
  },
];

/** 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호" },
  { label: "제목" },
  { label: "업로드 대상" },
  { label: "작성자" },
  { label: "조회수" },
  { label: "작성일" },
  { label: "삭제 여부" },
];

interface IListRefProps {
  data: INoticeItem;
  checked: boolean;
  onChange: (bool: boolean) => void;
}

const OperateNotice = () => {
  const data = useLoaderData() as INoticeListResponse;
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [
    { list, page, lastPage, total, message, time },
    { setPage, onChange: onChangeList, reset },
  ] = useList<INoticeItem>({
    elements: data?.elements,
    totalPages: data?.totalPages,
    totalElements: data?.totalElements,
    emptyMessage: !data?.elements
      ? "오류가 발생하였습니다."
      : "등록된 공지사항이 없습니다.",
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    startDate: "",
    endDate: "",
    isDeleted: "" as YNType,
    uploadType: "" as UploadType,
    searchRange: "Title",
    searchText: "",
    sort: "CreateAt",
    count: "10",
  });
  const {
    startDate,
    endDate,
    isDeleted,
    uploadType,
    searchRange,
    searchText,
    sort,
    count,
  } = inputs;

  /** 검색 핸들러 */
  const searchHandler =
    (params: Partial<IRequestNoticeList> = {}) =>
    async () => {
      /* 검색 파라미터 */
      let searchParams: IRequestNoticeList = {
        size: Number(count),
        page,
        isDeleted,
        uploadType,
        sort: sort as IRequestNoticeList["sort"],
      };
      if (startDate && endDate) {
        searchParams.startDate = standardDateFormat(startDate, "YYYY-MM-DD");
        searchParams.endDate = standardDateFormat(endDate, "YYYY-MM-DD");
      }
      if (searchRange && searchText) {
        searchParams.searchType =
          searchRange as IRequestNoticeList["searchType"];
        searchParams.searchKeyword = searchText;
      }
      searchParams = {
        ...searchParams,
        ...params,
        page: (params.page || 1) - 1,
      };
      getParams(searchParams);

      /* 검색  */
      const { code, data, message } = await getNoticeList(searchParams);
      /** 검색 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeList({
          ...data,
          page: searchParams.page,
          emptyMessage: "검색된 공지사항이 없습니다.",
        });
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }
    };

  const listRef = useRef<IListRefProps[]>([]);

  const navigate = useNavigate();

  /** 선택항목 삭제 */
  const deleteHandler = () => {
    setIsActive(false);

    const checkedList = [];
    for (const item of listRef.current) {
      const { checked, data } = item;

      if (checked) {
        checkedList.push(data);
        item.onChange(false);
      }
    }
  };

  /** 선택삭제 버튼 활성화 여부 업데이트 */
  const onChangeActive = useCallback((currentItemChecked: boolean) => {
    let isActive = currentItemChecked;
    if (!isActive) {
      const checkCount = listRef.current.reduce((acc, cur) => {
        if (cur.checked) {
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
            { label: "공지사항", href: "" },
          ]}
          title={"공지사항"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup
                className={"mb-0"}
                label={"작성일"}
                onChangeDate={onChangeSingle}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"삭제 여부"}
                name={"isDeleted"}
                list={YN_FILTER_LIST.map((status) => ({
                  ...status,
                  checked: isDeleted === status.value,
                }))}
                onChange={onChange}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"업로드 대상"}
                name={"uploadType"}
                list={UPLOAD_FILTER_LIST.map((target) => ({
                  ...target,
                  checked: uploadType === target.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
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
            <Col md={5} />
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
                        sort: value as IRequestNoticeList["sort"],
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
              총 <span className={"text-turu"}>{total}개</span>의 공지사항이
              있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>{time}기준</span>
              <DropdownBase menuItems={COUNT_FILTER_LIST} />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/operate/notice/add");
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
                list.map((data, index) => (
                  <TableRow
                    ref={(ref: IListRefProps) => (listRef.current[index] = ref)}
                    key={index}
                    num={(page - 1) * Number(count) + index + 1}
                    onChangeActive={onChangeActive}
                    {...data}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className={"py-5 text-center text"}>
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

      <OperateTextModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen((prev) => !prev);
        }}
        title={"공지사항 삭제"}
        contents={
          "삭제 후 고객에게 해당 공지사항이 표시되지 않습니다.\n삭제하시겠습니까?"
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

export default OperateNotice;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;

const TableRow = forwardRef<
  IListRefProps,
  INoticeItem & {
    num: number;
    onChangeActive: (currentItemChecked: boolean) => void;
  }
>((props, ref) => {
  const {
    id,
    num,
    title,
    uploadType,
    writer,
    readCount,
    createAt,
    delete: isDeleted,
    onChangeActive,
  } = props;
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const onChangeCheck = () => {
    onChangeActive(!checked);

    setChecked((prev) => !prev);
  };

  useImperativeHandle(
    ref,
    () => ({
      data: props,
      checked,
      onChange: (bool: boolean) => setChecked(bool),
    }),
    [props, checked]
  );

  return (
    <HoverTr
      onClick={() => {
        navigate(`/operate/notice/detail/${id}`);
      }}
    >
      <td onClick={(e) => e.stopPropagation()}>
        <CheckBoxBase
          name={`announcement-${num}`}
          label={""}
          checked={checked}
          onChange={onChangeCheck}
        />
      </td>
      <td>{num}</td>
      <td>{title}</td>
      <td>{uploadType ?? "전체"}</td>
      <td>{writer ?? "-"}</td>
      <td>{readCount}</td>
      <td>{createAt ? standardDateFormat(createAt, "YYYY.MM.DD") : "-"}</td>
      <td>{isDeleted}</td>
    </HoverTr>
  );
});
