import React, {
  forwardRef,
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
  DELETE_FILTER_LIST,
  UPLOAD_FILTER_LIST,
} from "src/constants/list";
import styled from "styled-components";

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "1" },
  { label: "제목", value: "2" },
  { label: "작성자", value: "3" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호", sort: () => {} },
  { label: "제목" },
  { label: "업로드 대상", sort: () => {} },
  { label: "작성자", sort: () => {} },
  { label: "조회수", sort: () => {} },
  { label: "작성일", sort: () => {} },
  { label: "삭제 여부", sort: () => {} },
];

/* 임시 목록 데이터 */
const newsList: Omit<IListItemProps, "index">[] = [
  {
    id: "1",
    title: "개인정보 처리방침 변경 안내",
    upload: "전체",
    writer: "홍길동",
    view: 15,
    date: "2022.01.07",
    isDelete: "Y",
  },
  {
    id: "2",
    title: "개인정보 처리방침 변경 안내",
    upload: "IOS",
    writer: "홍길동",
    view: 10,
    date: "2022.01.07",
    isDelete: "N",
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
  isDelete: "Y" | "N";
}

const EvNews = () => {
  const [tabList, setTabList] = useState([{ label: "EV 뉴스" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
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
    const checkedList = [];
    for (const item of listRef.current) {
      const { checked, data } = item;

      if (checked) {
        checkedList.push(data);
        item.onChange(false);
      }
    }
  };

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
            { label: "EV 뉴스", href: "" },
          ]}
          title={"EV 뉴스"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"작성일"} />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"삭제 여부"}
                name={"deleteGroup"}
                list={DELETE_FILTER_LIST}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"업로드 대상"}
                name={"uploadGroup"}
                list={UPLOAD_FILTER_LIST}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                placeholder={"검색어를 입력해주세요."}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col md={5} />
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{newsList.length}개</span>의
              뉴스가 있습니다.
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
                  navigate("/operate/evNews/add");
                }}
              />
              <ButtonBase
                label={"선택 삭제"}
                outline={true}
                color={"turu"}
                onClick={deleteHandler}
              />
            </div>
          </div>

          <div className="table-responsive">
            <TableBase tableHeader={tableHeader}>
              <>
                {newsList.length > 0 ? (
                  newsList.map((news, index) => (
                    <TableRow
                      ref={(ref: IListRefProps) =>
                        (listRef.current[index] = ref)
                      }
                      key={news.id}
                      index={index}
                      {...news}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className={"py-5 text-center text"}>
                      등록된 뉴스가 없습니다.
                    </td>
                  </tr>
                )}
              </>
            </TableBase>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default EvNews;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;

const TableRow = forwardRef<IListRefProps, IListItemProps>((props, ref) => {
  const { id, index, title, upload, writer, view, date, isDelete } = props;
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  const onChangeCheck = () => {
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
        navigate(`/operate/evNews/detail/${id}`);
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
