import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
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
import { YNType } from "src/api/api.interface";

/** 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "제목", value: "1" },
  { label: "내용", value: "2" },
  { label: "작성자", value: "3" },
];

/** 정렬 필터 */
const sortList = [
  {
    label: "기본",
    value: "",
  },
  {
    label: "작성일",
    value: "1",
  },
  {
    label: "조회 수",
    value: "2",
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

/** 임시 목록 데이터 */
const noticeList: Omit<IListItemProps, "index">[] = [
  {
    id: "1",
    title: "개인정보 처리방침 변경 안내",
    upload: "전체",
    writer: "홍길동",
    view: 15,
    date: "2022.01.07",
    isDelete: "N",
  },
  {
    id: "2",
    title: "개인정보 처리방침 변경 안내",
    upload: "IOS",
    writer: "홍길동",
    view: 10,
    date: "2022.01.07",
    isDelete: "Y",
  },
];

interface IListRefProps {
  data: IListItemProps;
  checked: boolean;
  onChange: (bool: boolean) => void;
}
interface IListItemProps {
  id: string;
  index: number;
  title: string;
  upload: string;
  writer: string;
  view: number;
  date: string;
  isDelete: YNType;
}

const OperateNotice = () => {
  const [tabList, setTabList] = useState([{ label: "공지사항" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    // startDate,
    // endDate,
    deleteStatus,
    uploadTarget,
    searchText,
    onChange,
    onChangeSingle,
  } = useInputs({
    startDate: "",
    endDate: "",
    deleteStatus: "",
    uploadTarget: "",
    searchRange: "",
    searchText: "",
    sort: "",
  });

  const listRef = useRef<IListRefProps[]>([]);

  const navigate = useNavigate();

  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

    setTabList(tempList);
  };

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

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

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
              <DateGroup className={"mb-0"} label={"작성일"} />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"삭제 여부"}
                name={"deleteStatus"}
                list={YN_FILTER_LIST.map((status) => ({
                  ...status,
                  checked: deleteStatus === status.value,
                }))}
                onChange={onChange}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"업로드 대상"}
                name={"uploadTarget"}
                list={UPLOAD_FILTER_LIST.map((target) => ({
                  ...target,
                  checked: uploadTarget === target.value,
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
              총 <span className={"text-turu"}>{noticeList.length}개</span>의
              공지사항이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
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
              {noticeList.length > 0 ? (
                noticeList.map((notice, index) => (
                  <TableRow
                    ref={(ref: IListRefProps) => (listRef.current[index] = ref)}
                    key={index}
                    index={index}
                    onChangeActive={onChangeActive}
                    {...notice}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className={"py-5 text-center text"}>
                    등록된 공지사항이 없습니다.
                  </td>
                </tr>
              )}
            </>
          </TableBase>

          <PaginationBase setPage={setPage} data={{}} />
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
  IListItemProps & { onChangeActive: (currentItemChecked: boolean) => void }
>((props, ref) => {
  const {
    id,
    index,
    title,
    upload,
    writer,
    view,
    date,
    isDelete,
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
          name={`announcement-${index}`}
          label={""}
          checked={checked}
          onChange={onChangeCheck}
        />
      </td>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{upload}</td>
      <td>{writer}</td>
      <td>{view}</td>
      <td>{date}</td>
      <td>{isDelete}</td>
    </HoverTr>
  );
});
