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
import { COUNT_FILTER_LIST, YN_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";
import VariableModal from "src/pages/Operate/components/VariableModal";
import useInputs from "src/hooks/useInputs";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import { YNType } from "src/api/api.interface";

/* 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/* 코드값 필터 */
const codeList = [{ label: "전체", value: "" }];

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
  { label: "코드값" },
  { label: "변수명" },
  { label: "변수값" },
  { label: "내용" },
  { label: "등록자" },
  { label: "등록일" },
  { label: "삭제 여부" },
];

/* 임시 목록 데이터 */
const variableList: Omit<IListItemProps, "index">[] = [
  {
    code: "P12345",
    variableName: "예약금",
    variableValue: "123445",
    contents: "충전기 예약 금액",
    regName: "김아무개",
    regDate: "2022.02.07 12:00:00",
    isDelete: "N",
  },
];

interface IListRefProps {
  data: IListItemProps;
  checked: boolean;
  onChange: (bool: boolean) => void;
}
interface IListItemProps {
  index: number;
  code: string;
  variableName: string;
  variableValue: string;
  contents: string;
  regName: string;
  regDate: string;
  isDelete: YNType;
}

const OperateVariable = () => {
  const [tabList, setTabList] = useState([{ label: "변수 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  const [variableModalOpen, setVariableModalOpen] = useState(false);
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { deleteStatus, searchText, onChange, onChangeSingle } = useInputs({
    deleteStatus: "",
    searchRange: "",
    searchText: "",
    code: "",
    sort: "",
    count: "1",
  });

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
            { label: "변수 관리", href: "" },
          ]}
          title={"변수 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"등록일"} />
            </Col>
            <Col md={4} />
            <Col md={4}>
              <RadioGroup
                title={"삭제 여부"}
                name={"deleteStatus"}
                list={YN_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: deleteStatus === data.value,
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
              />
            </Col>
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"코드값"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ code: value });
                    },
                    menuItems: codeList,
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
              총 <span className={"text-turu"}>{variableList.length}개</span>의
              변수가 있습니다.
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
                  setVariableModalOpen(true);
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
              {variableList.length > 0 ? (
                variableList.map((code, index) => (
                  <TableRow
                    ref={(ref: IListRefProps) => (listRef.current[index] = ref)}
                    key={index}
                    index={index}
                    onChangeActive={onChangeActive}
                    {...code}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className={"py-5 text-center text"}>
                    등록된 변수가 없습니다.
                  </td>
                </tr>
              )}
            </>
          </TableBase>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>

      <VariableModal
        isOpen={variableModalOpen}
        onClose={() => {
          setVariableModalOpen(false);
        }}
      />
      <OperateTextModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen((prev) => !prev);
        }}
        title={"변수 삭제"}
        contents={"해당 변수를 삭제하시겠습니까?"}
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

export default OperateVariable;

const SearchSection = styled.section``;
const ListSection = styled.section``;

const TableRow = forwardRef<
  IListRefProps,
  IListItemProps & { onChangeActive: (currentItemChecked: boolean) => void }
>((props, ref) => {
  const {
    index,
    code,
    variableName,
    variableValue,
    contents,
    regName,
    regDate,
    isDelete,

    onChangeActive,
  } = props;
  const [checked, setChecked] = useState(false);

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
      <td>{code}</td>
      <td>{variableName}</td>
      <td>{variableValue}</td>
      <td>{contents}</td>
      <td>{regName}</td>
      <td>{regDate}</td>
      <td>{isDelete}</td>
    </tr>
  );
});
