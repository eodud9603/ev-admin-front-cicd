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
import OperateTextModal from "./components/OperateTextModal";

/* 급/완속 필터 */
const speedList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "급속",
    value: "1",
  },
  {
    label: "완속",
    value: "2",
  },
];
/* 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/* 충전기 타입 필터 */
const typeList = [{ label: "전체", value: "" }];

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
  { label: "급속/완속" },
  { label: "충전기 타입" },
  { label: "제조사명" },
  { label: "차량 모델명" },
  { label: "연식" },
  { label: "배터리 용량" },
  { label: "관리자" },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const modelList = [
  {
    id: "1",
    chargerType: "급속",
    connectorType: "DC 콤보",
    manufacturer: "현대",
    carModel: "코나 EV",
    carYear: "2023",
    battery: "58",
    manager: "백민규",
    regDate: "2022.01.07",
  },
];

const EvModel = () => {
  const [tabList, setTabList] = useState([{ label: "전기차 모델 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  /* 모델 등록/수정 모달 */
  const [modelModal, setModelModal] = useState<
    Pick<IEvModelModalProps, "type" | "isOpen" | "data">
  >({
    type: "REGISTRATION",
    isOpen: false,
    data: undefined,
  });
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { speed, searchText, onChange, onChangeSingle } = useInputs({
    speed: "",
    searchRange: "",
    searchText: "",
    chargerType: "",
    sort: "",
    count: "1",
  });

  const itemsRef = useRef<IEvModelItemRef[]>([]);

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
            { label: "전기차 모델 관리", href: "" },
          ]}
          title={"전기차 모델 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"등록일"} />
            </Col>
            <Col md={4} />
            <Col md={4}>
              <RadioGroup
                title={"급속 / 완속"}
                name={"speed"}
                list={speedList.map((data) => ({
                  ...data,
                  checked: speed === data.value,
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
                label={"충전기 타입"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ chargerType: value });
                    },
                    menuItems: typeList,
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
              총 <span className={"text-turu"}>{modelList.length}개</span>의
              모델이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase
                menuItems={COUNT_FILTER_LIST}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ count: value });
                }}
              />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  setModelModal({
                    isOpen: true,
                    type: "REGISTRATION",
                    data: undefined,
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

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {modelList.length > 0 ? (
                  modelList.map((evModel, index) => (
                    <EvModelItem
                      ref={(ref: IEvModelItemRef) =>
                        (itemsRef.current[index] = ref)
                      }
                      key={index}
                      index={index}
                      rowClickHandler={() => {
                        setModelModal({
                          isOpen: true,
                          type: "EDIT",
                          data: evModel,
                        });
                      }}
                      onChangeActive={onChangeActive}
                      {...evModel}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className={"py-5 text-center text"}>
                      등록된 모델이 없습니다.
                    </td>
                  </tr>
                )}
              </>
            </TableBase>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
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
  data: IEvModelItemProps;
}

interface IEvModelItemProps {
  index: number;
  id: string;
  chargerType: string;
  connectorType: string;
  manufacturer: string;
  carModel: string;
  carYear: string;
  battery: string;
  manager: string;
  regDate: string;
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
    connectorType,
    manufacturer,
    carModel,
    carYear,
    battery,
    manager,
    regDate,

    rowClickHandler,
    onChangeActive,
  } = props;
  const [check, setChecked] = useState(false);

  const onChange = () => {
    onChangeActive(!check);

    setChecked((prev) => !prev);
  };

  useImperativeHandle(
    ref,
    () => ({
      check,
      onChange,
      data: props,
    }),
    [check, props]
  );

  return (
    <HoverTr onClick={rowClickHandler}>
      <td onClick={(e) => e.stopPropagation()}>
        <CheckBoxBase
          label={""}
          name={id}
          checked={check}
          onChange={onChange}
        />
      </td>
      <td>{index + 1}</td>
      <td>{chargerType}</td>
      <td>{connectorType}</td>
      <td>{manufacturer}</td>
      <td>{carModel}</td>
      <td>{carYear}</td>
      <td>{battery}Kwh</td>
      <td>{manager}</td>
      <td>{regDate}</td>
    </HoverTr>
  );
});
