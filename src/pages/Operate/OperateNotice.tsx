import React, { useState } from "react";
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
import { deleteNoticeList, getNoticeList } from "src/api/board/noticeApi";
import { getParams } from "src/utils/params";
import { standardDateFormat } from "src/utils/day";
import { UPLOAD_TYPE } from "src/constants/status";
import { useTabs } from "src/hooks/useTabs";

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
  { label: "checkbox" },
  { label: "번호" },
  { label: "제목" },
  { label: "업로드 대상" },
  { label: "작성자" },
  { label: "조회수" },
  { label: "작성일" },
  { label: "노출 여부" },
];

const OperateNotice = () => {
  const { data, filterData } = useLoaderData() as {
    data: INoticeListResponse;
    filterData: { [key: string]: any };
  };
  /* 체크 리스트 */
  const [checkList, setCheckList] = useState<number[]>([]);
  /* 선택비노출 모달 */
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

  const [inputs, { onChange, onChangeSingle }] = useInputs(filterData);
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

  const { searchDataStorage } = useTabs({
    data: data,
    pageTitle: "공지사항",
    filterData: inputs,
  });

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
        sort,
      };
      if (startDate && endDate) {
        searchParams.startDate = standardDateFormat(
          startDate as string,
          "YYYY-MM-DD"
        );
        searchParams.endDate = standardDateFormat(
          endDate as string,
          "YYYY-MM-DD"
        );
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
        searchDataStorage(data);
      } else {
        reset({ code, message: message || "오류가 발생하였습니다." });
      }

      setCheckList([]);
    };

  const navigate = useNavigate();

  /** 선택 비노출 삭제 */
  const exposureHandler = async () => {
    /* 삭제요청 */
    const { code } = await deleteNoticeList({
      noticeIds: checkList,
    });
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      void searchHandler({ page })();
      setDeleteModalOpen((prev) => !prev);
    }
  };

  /** 전체 체크 변경 콜백 */
  const onChangeCheck = (check: boolean) => {
    if (check) {
      setCheckList(list.map((data) => data.id));
    } else {
      setCheckList([]);
    }
  };

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
            <Col md={3}>
              <RadioGroup
                title={"노출 여부"}
                name={"isDeleted"}
                list={YN_FILTER_LIST.map((status) => ({
                  ...status,
                  checked: isDeleted === status.value,
                }))}
                onChange={onChange}
              />
            </Col>
            <Col md={5}>
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
                initSelectedValue={searchList.find(
                  (e) => e.value === searchRange
                )}
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
                      onChangeSingle({ sort: value as typeof sort });
                      void searchHandler({
                        page: 1,
                        sort: value as IRequestNoticeList["sort"],
                      })();
                    },
                    initSelectedValue: sortList.find((e) => e.value === sort),
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
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/operate/notice/add");
                }}
              />
              <ButtonBase
                disabled={!(checkList.length > 0)}
                label={"선택비노출"}
                outline={checkList.length > 0}
                color={checkList.length > 0 ? "turu" : "secondary"}
                onClick={() => {
                  setDeleteModalOpen(true);
                }}
              />
            </div>
          </div>

          <TableBase
            tableHeader={tableHeader}
            allCheck={list.length > 0 && checkList.length === list.length}
            onClickAllCheck={onChangeCheck}
          >
            <>
              {list.length > 0 ? (
                list.map((data, index) => (
                  <HoverTr
                    key={data.id}
                    onClick={() => {
                      navigate(`/operate/notice/detail/${data.id}`);
                    }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <CheckBoxBase
                        name={"check"}
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
                    <td className={"text-turu"}>
                      <u>{data.title}</u>
                    </td>
                    <td>{UPLOAD_TYPE[data.uploadType] ?? "-"}</td>
                    <td>{data.writer ?? "-"}</td>
                    <td>{data.readCount}</td>
                    <td>
                      {data.createAt
                        ? standardDateFormat(data.createAt, "YYYY.MM.DD")
                        : "-"}
                    </td>
                    <td>{data.delete}</td>
                  </HoverTr>
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
        title={"공지사항 노출 여부"}
        contents={
          "비노출 시, 웹 및 앱에서 해당 공지사항이 표시되지 않습니다.\n비노출 진행하시겠습니까?"
        }
        buttons={[
          {
            label: "아니요",
            color: "secondary",
          },
          {
            label: "예",
            color: "turu",
            onClick: exposureHandler,
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
