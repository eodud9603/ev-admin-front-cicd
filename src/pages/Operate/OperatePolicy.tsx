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
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";

/* 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/* 버전 필터 */
const versionList = [
  { label: "전체", value: "" },
  {
    label: "1",
    value: "1",
  },
];

/** 정렬 필터 */
const sortList = [
  {
    label: "기본",
    value: "",
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호" },
  { label: "제목" },
  { label: "작성자" },
  { label: "Ver." },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const policyList = [
  {
    id: "1",
    title: "개인정보 취급 방침",
    writer: "백민규",
    version: "1",
    regDate: "2022.01.07",
  },
];

interface IListRefProps {
  data: IListItemProps;
  checked: boolean;
  onChange: (bool: boolean) => void;
}
interface IListItemProps {
  index: number;
  id: string;
  title: string;
  writer: string;
  version: string;
  regDate: string;
}

const OperatePolicy = () => {
  const [tabList, setTabList] = useState([{ label: "정책 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { searchText, onChange, onChangeSingle } = useInputs({
    searchRange: "",
    searchText: "",
    version: "",
    sort: "",
    count: "1",
  });

  const navigate = useNavigate();

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
            { label: "정책 관리", href: "" },
          ]}
          title={"정책 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={5}>
              <DateGroup className={"mb-0"} label={"등록일"} />
            </Col>
            <Col md={7} />
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                placeholder={"검색어를 입력해주세요."}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    searchRange: value,
                  });
                }}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"Ver."}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({
                        version: value,
                      });
                    },
                    menuItems: versionList,
                  },
                ]}
                className={"me-2 w-xs"}
              />
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
              총 <span className={"text-turu"}>{policyList.length}개</span>의
              정책이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase
                menuItems={COUNT_FILTER_LIST}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    count: value,
                  });
                }}
              />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/operate/policy/add");
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
              {policyList.length > 0 ? (
                policyList.map((policy, index) => (
                  <TableRow
                    ref={(ref: IListRefProps) => (listRef.current[index] = ref)}
                    key={policy.id}
                    index={index}
                    onChangeActive={onChangeActive}
                    {...policy}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={"py-5 text-center text"}>
                    등록된 정책이 없습니다.
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
        title={"정책 삭제"}
        contents={
          "삭제 후 고객에게 해당 정책이 표시되지 않습니다.\n삭제하시겠습니까?"
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

export default OperatePolicy;

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
  const { id, index, title, writer, version, regDate, onChangeActive } = props;
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
        navigate(`/operate/policy/detail/${id}`);
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
      <td>{writer}</td>
      <td>{version}</td>
      <td>{regDate}</td>
    </HoverTr>
  );
});
