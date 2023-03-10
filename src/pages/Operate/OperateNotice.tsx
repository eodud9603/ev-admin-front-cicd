import React, {
  forwardRef,
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
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import styled from "styled-components";

/* 삭제 여부 필터 */
const deleteList = [
  {
    label: "전체",
  },
  {
    label: "Y",
  },
  {
    label: "N",
  },
];

/* 업로드 대상 필터 */
const uploadList = [
  {
    label: "전체",
  },
  {
    label: "IOS",
  },
  {
    label: "AOS",
  },
  {
    label: "WEB",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "1" },
  { label: "제목", value: "2" },
  { label: "내용", value: "3" },
  { label: "작성자", value: "4" },
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

/* 목록 표시 개수 */
const countList = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

/* 임시 목록 데이터 */
const noticeList: Omit<IListItemProps, "index">[] = [
  {
    title: "개인정보 처리방침 변경 안내",
    upload: "전체",
    writer: "홍길동",
    view: 15,
    date: "2022.01.07",
    isDelete: "N",
  },
  {
    title: "개인정보 처리방침 변경 안내",
    upload: "IOS",
    writer: "홍길동",
    view: 10,
    date: "2022.01.07",
    isDelete: "Y",
  },
];

interface IListRefProps {
  checked: boolean;
  onChange: (bool: boolean) => void;
}
interface IListItemProps {
  index: number;
  title: string;
  upload: string;
  writer: string;
  view: number;
  date: string;
  isDelete: "Y" | "N";
}

const OperateNotice = () => {
  const [tabList, setTabList] = useState([{ label: "공지사항" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const listRef = useRef<IListRefProps[]>([]);

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

  /** 체크해제 */
  const uncheckedHandler = () => {
    for (const data of listRef.current) {
      data.onChange(false);
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
                name={"deleteGroup"}
                list={deleteList}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"업로드 대상"}
                name={"uploadGroup"}
                list={uploadList}
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
              총 <span className={"text-turu"}>{noticeList.length}개</span>의
              공지사항이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={countList} />
              <ButtonBase label={"신규 등록"} color={"turu"} />
              <ButtonBase
                label={"선택 삭제"}
                outline={true}
                color={"turu"}
                onClick={uncheckedHandler}
              />
            </div>
          </div>

          <div className="table-responsive">
            <TableBase tableHeader={tableHeader}>
              <>
                {noticeList.length > 0 ? (
                  noticeList.map((notice, index) => (
                    <TableRow
                      ref={(ref: IListRefProps) =>
                        (listRef.current[index] = ref)
                      }
                      key={index}
                      index={index}
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
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateNotice;

const SearchSection = styled.section``;
const ListSection = styled.section``;

const TableRow = forwardRef<IListRefProps, IListItemProps>((props, ref) => {
  const { index, title, upload, writer, view, date, isDelete } = props;
  const [checked, setChecked] = useState(false);

  const onChangeCheck = () => {
    setChecked((prev) => !prev);
  };

  useImperativeHandle(
    ref,
    () => ({
      checked,
      onChange: (bool: boolean) => setChecked(bool),
    }),
    [checked]
  );

  return (
    <tr key={index}>
      <td>
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
    </tr>
  );
});
