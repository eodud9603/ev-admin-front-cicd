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
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_LIST } from "src/constants/list";
import styled from "styled-components";

/* 신청 상태 필터 */
const applicationStatusList = [
  {
    label: "전체",
  },
  {
    label: "신청",
  },
  {
    label: "접수",
  },
];

/* 지역 필터 */
const regionList = [
  {
    menuItems: [{ label: "전체", value: "1" }],
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "1" },
  { label: "신청자", value: "2" },
  { label: "접수자", value: "3" },
  { label: "전화번호", value: "4" },
  { label: "주소", value: "5" },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호", sort: () => {} },
  { label: "지역", sort: () => {} },
  { label: "신청자", sort: () => {} },
  { label: "전화번호", sort: () => {} },
  { label: "신청지 주소", sort: () => {} },
  { label: "상담자", sort: () => {} },
  { label: "신청일", sort: () => {} },
  { label: "신청 상태", sort: () => {} },
  { label: "접수 담당자", sort: () => {} },
  { label: "확인일", sort: () => {} },
];

/* 임시 목록 데이터 */
const applicationList: Omit<IListItemProps, "index">[] = [
  {
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
}

const InstallCharger = () => {
  const [tabList, setTabList] = useState([{ label: "충전기 설치 신청 관리" }]);
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
                name={"applicationGroup"}
                list={applicationStatusList}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"접수일"} />
            </Col>
            <Col md={4} />
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={regionList}
                className={"me-2 w-xs"}
              />
              <ButtonBase label={"추가"} color={"dark"} />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                placeholder={"검색어를 입력해주세요."}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex"} md={4} />
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
              <DropdownBase menuItems={COUNT_LIST} />
              <ButtonBase label={"신규 등록"} color={"turu"} />
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
                {applicationList.length > 0 ? (
                  applicationList.map((application, index) => (
                    <TableRow
                      ref={(ref: IListRefProps) =>
                        (listRef.current[index] = ref)
                      }
                      key={index}
                      index={index}
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
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default InstallCharger;

const SearchSection = styled.section``;
const ListSection = styled.section``;

const TableRow = forwardRef<IListRefProps, IListItemProps>((props, ref) => {
  const {
    index,
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
  } = props;

  const [checked, setChecked] = useState(false);

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
    </tr>
  );
});
