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
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";

/* 신청 상태 필터 */
const applicationStatusList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "신청",
    value: "1",
  },
  {
    label: "접수",
    value: "2",
  },
];

/* 지역 필터 */
const regionList = [{ label: "전체", value: "" }];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "신청자", value: "1" },
  { label: "접수자", value: "2" },
  { label: "전화번호", value: "3" },
  { label: "주소", value: "4" },
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
  { label: "지역" },
  { label: "신청자" },
  { label: "전화번호" },
  { label: "신청지 주소" },
  { label: "상담자" },
  { label: "신청일" },
  { label: "신청 상태" },
  { label: "접수 담당자" },
  { label: "확인일" },
];

/* 임시 목록 데이터 */
const applicationList: Omit<IListItemProps, "index">[] = [
  {
    id: "1",
    region: "경기",
    applicant: "홍길동",
    tel: "010-1234-1234",
    address: "경기 성남시 분당구 황새울로 216",
    addressDetail: "상세 주소",
    counselorName: "김아무개",
    applicationDate: "2023.02.10",
    applicationStatus: "신청",
    receptionistName: "아무개",
    confirmationDate: "2023.02.11",
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
  region: string;
  applicant: string;
  tel: string;
  address: string;
  addressDetail: string;
  counselorName: string;
  applicationDate: string;
  applicationStatus: string;
  receptionistName: string;
  confirmationDate: string;

  rowClickHandler?: () => void;
}

const InstallCharger = () => {
  const [tabList, setTabList] = useState([{ label: "충전기 설치 신청 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  /* 선택삭제 버튼 활성화 여부 */
  const [isActive, setIsActive] = useState(false);
  /* 선택삭제 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const listRef = useRef<IListRefProps[]>([]);

  const [{ applicationStatus, searchText }, { onChange, onChangeSingle }] =
    useInputs({
      applicationStatus: "",
      region: "",
      searchRange: "",
      searchText: "",
      sort: "",
      count: "1",
    });

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
            { label: "충전기 설치 신청 관리", href: "" },
          ]}
          title={"충전기 설치 신청 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"신청일"} />
            </Col>
            <Col md={4} />
            <Col md={4}>
              <RadioGroup
                title={"신청 상태"}
                name={"applicationStatus"}
                list={applicationStatusList.map((data) => ({
                  ...data,
                  checked: applicationStatus === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"확인일"} />
            </Col>
            <Col md={4} />
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ region: value });
                    },
                    menuItems: regionList,
                  },
                ]}
                className={"me-2 w-xs"}
              />
              <ButtonBase label={"추가"} color={"dark"} />
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
            <Col className={"d-flex"} md={4} />
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
              총 <span className={"text-turu"}>{applicationList.length}개</span>
              의 신청이 있습니다.
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
                  navigate("/operate/installCharger/add");
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
              {applicationList.length > 0 ? (
                applicationList.map((application, index) => (
                  <TableRow
                    ref={(ref: IListRefProps) => (listRef.current[index] = ref)}
                    key={index}
                    index={index}
                    onChangeActive={onChangeActive}
                    {...application}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={11} className={"py-5 text-center text"}>
                    등록된 신청이 없습니다.
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
        title={"충저기 설치 신청 삭제"}
        contents={"삭제하시겠습니까?"}
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

export default InstallCharger;

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
    index,
    id,
    region,
    applicant,
    tel,
    address,
    addressDetail,
    counselorName,
    applicationDate,
    applicationStatus,
    receptionistName,
    confirmationDate,

    onChangeActive,
  } = props;

  const navigate = useNavigate();

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
    <HoverTr
      key={index}
      onClick={() => {
        navigate(`/operate/installCharger/detail/${id}`);
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
      <td>{region}</td>
      <td>{applicant}</td>
      <td>{tel}</td>
      <td>
        {address}, {addressDetail}
      </td>
      <td>{counselorName}</td>
      <td>{applicationDate}</td>
      <td>{applicationStatus}</td>
      <td>{receptionistName}</td>
      <td>{confirmationDate}</td>
    </HoverTr>
  );
});
