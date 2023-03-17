import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
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

/* 진행 여부 필터 */
const progressList = [
  {
    label: "전체",
  },
  {
    label: "예약",
  },
  {
    label: "발송",
  },
  {
    label: "지연",
  },
  {
    label: "실패",
  },
];

/* 발신 구분 필터 */
const divisionList = [
  {
    label: "전체",
  },
  {
    label: "카카오톡",
  },
  {
    label: "SMS",
  },
  {
    label: "LMS",
  },
  {
    label: "MMS",
  },
];

/* 검색어 필터 */
const searchList = [{ label: "전체", value: "1" }];

/* 분류 필터 */
const classificationList = [
  {
    menuItems: [{ label: "전체", value: "1" }],
  },
];

/* 카테고리 필터 */
const categoryList = [
  {
    menuItems: [{ label: "전체", value: "1" }],
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "분류", sort: () => {} },
  { label: "카테고리", sort: () => {} },
  { label: "제목", sort: () => {} },
  { label: "수신자", sort: () => {} },
  { label: "발신자", sort: () => {} },
  { label: "발신 번호", sort: () => {} },
  { label: "발신일", sort: () => {} },
  { label: "발신 예약일", sort: () => {} },
  { label: "진행 상태", sort: () => {} },
];

/* 임시 목록 데이터 */
const smsList = [
  {
    id: "1",
    type: "카카오톡",
    category: "회원",
    title: "회원 방침 변경",
    receiver: "홍길동",
    caller: "백민규",
    outgoingNumber: "18003188",
    sendDate: "2022.02.07 12:00:00",
    reservationDate: "2022.02.07 12:00:00",
    status: "발송",
  },
];

const OperateNotificationTalk = () => {
  const [tabList, setTabList] = useState([{ label: "알림톡 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  /* 0: 문자발신, 1: 발신내역 */
  const [subTab, setSubTab] = useState(1);

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
            { label: "알림톡 관리", href: "" },
          ]}
        />
        <section
          className={"pb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"font-size-24"}>알림톡 관리</h3>

          <div>
            <ButtonBase
              className={"rounded-0 width-110"}
              label={"문자 발신"}
              outline={subTab !== 0}
              color={"turu"}
            />
            <ButtonBase
              className={"rounded-0 width-110"}
              label={"발신 내역"}
              outline={subTab !== 1}
              color={"turu"}
            />
          </div>
        </section>

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"발신일"} />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"진행 여부"}
                name={"progressGroup"}
                list={progressList}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"발신 여부"}
                name={"divisionGroup"}
                list={divisionList}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={4}>
              <DateGroup className={"mb-0"} label={"등록일"} />
            </Col>
            <Col md={4} />
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"분류"}
                dropdownItems={classificationList}
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
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"카테고리"}
                dropdownItems={categoryList}
                className={"me-2 w-xs"}
              />
              <ButtonBase label={"추가"} color={"dark"} />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{smsList.length}개</span>의
              발신내역이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={COUNT_FILTER_LIST} />
            </div>
          </div>

          <div className="table-responsive">
            <TableBase tableHeader={tableHeader}>
              <>
                {smsList.length > 0 ? (
                  smsList.map((sms, index) => (
                    <SMSItem
                      key={index}
                      index={index}
                      rowClickHandler={() => {
                        navigate(`/operate/talk/detail/${sms.id}`);
                      }}
                      {...sms}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className={"py-5 text-center text"}>
                      등록된 발신내역이 없습니다.
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

export default OperateNotificationTalk;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;

interface ISMSItemProps {
  index: number;
  id: string;
  type: string;
  category: string;
  title: string;
  receiver: string;
  caller: string;
  outgoingNumber: string;
  sendDate: string;
  reservationDate: string;
  status: string;

  rowClickHandler?: () => void;
}

const SMSItem = (props: ISMSItemProps) => {
  const {
    index,
    type,
    category,
    title,
    receiver,
    caller,
    outgoingNumber,
    sendDate,
    reservationDate,
    status,

    rowClickHandler,
  } = props;

  return (
    <HoverTr onClick={rowClickHandler}>
      <td>{index + 1}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{title}</td>
      <td>{receiver}</td>
      <td>{caller}</td>
      <td>{outgoingNumber}</td>
      <td>{sendDate}</td>
      <td>{reservationDate}</td>
      <td>{status}</td>
    </HoverTr>
  );
};
