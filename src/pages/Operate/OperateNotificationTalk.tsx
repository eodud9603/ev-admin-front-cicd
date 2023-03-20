import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import TextInputBase from "src/components/Common/Input/TextInputBase";
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

/* 문자발신 카테고리 목록 */
const sendCategoryList = [
  {
    menuItems: [
      {
        label: "회원",
        value: "1",
      },
    ],
  },
];

/* 문자발신 제목 목록 */
const sendTitleList = [
  {
    menuItems: [
      {
        label: "회원 방침 변경",
        value: "1",
      },
    ],
  },
];

const OperateNotificationTalk = () => {
  const [tabList, setTabList] = useState([{ label: "알림톡 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* LIST: 문자발신, SEND: 발신내역 */
  const [subTab, setSubTab] = useState<"LIST" | "SEND">("LIST");

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
            {
              label: subTab === "LIST" ? "문자 발신" : "알림톡 관리",
              href: "",
            },
          ]}
        />
        <section
          className={"pb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"font-size-24"}>
            {subTab === "LIST" ? "문자 발신" : "알림톡 관리"}
          </h3>

          <div>
            <ButtonBase
              className={"rounded-0 width-110"}
              label={"문자 발신"}
              outline={subTab !== "SEND"}
              color={"turu"}
              onClick={() => {
                setSubTab("SEND");
              }}
            />
            <ButtonBase
              className={"rounded-0 width-110"}
              label={"발신 내역"}
              outline={subTab !== "LIST"}
              color={"turu"}
              onClick={() => {
                setSubTab("LIST");
              }}
            />
          </div>
        </section>

        {subTab === "LIST" ? (
          <TalkList navigate={navigate} />
        ) : (
          <SendTalk
            onChangeTab={() => {
              setSubTab("LIST");
            }}
          />
        )}
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

/** subTab: "LIST" UI */
const TalkList = (props: { navigate: NavigateFunction }) => {
  const { navigate } = props;

  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
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
    </>
  );
};

/** LIST ITEM */
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

/** subTab: "SEND" UI */
const SendTalk = (props: { onChangeTab: () => void }) => {
  const { onChangeTab } = props;
  const {
    terminalNumber,
    sendContent,
    newTemplateContent,
    onChange,
    onChangeSingle,
  } = useInputs({
    terminalNumber: "",
    sendContent: "템플릿 등록 내용 표시",
    newTemplateContent: "",
  });
  const [telList, setTelList] = useState<{ name: string; value: string }[]>([]);

  const addTelHandler = () => {
    if (terminalNumber.trim().length === 0) {
      return;
    }

    setTelList((prev) => [
      ...prev,
      {
        name: `tel-${prev.length + 1}`,
        value: terminalNumber.trim(),
      },
    ]);
    onChangeSingle({ terminalNumber: "" });
  };

  return (
    <>
      <Row className={"mb-4"}>
        <Col sm={5}>
          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              수신자
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase className={"w-xs"} label={"조회"} color={"dark"} />
            </Col>
          </Row>
          <DetailRow>
            <DetailLabelCol sm={3}>단말기 번호</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-2"}>
                <TextInputBase
                  type={"tel"}
                  bsSize={"lg"}
                  placeholder={"전화번호를 입력해주세요."}
                  name={"terminalNumber"}
                  value={terminalNumber}
                  onChange={onChange}
                />
                <ButtonBase
                  className={"w-xs"}
                  label={"추가"}
                  color={"dark"}
                  onClick={addTelHandler}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"py-4"} />
          {telList.map(({ name, value }, index) => (
            <DetailRow key={index}>
              <DetailLabelCol sm={3}>{`No. ${index + 1}`}</DetailLabelCol>
              <DetailContentCol>
                <DetailGroupCol className={"gap-2"}>
                  <div className={"position-relative"}>
                    <TextInputBase
                      className={"ps-5"}
                      disabled={true}
                      type={"tel"}
                      bsSize={"lg"}
                      placeholder={"전화번호를 입력해주세요."}
                      name={name}
                      value={value}
                    />
                    <span
                      className={
                        "ms-2 position-absolute bottom-0 start-0 " +
                        "translate-middle-y font-size-14 text-secondary"
                      }
                    >
                      비회원
                    </span>
                  </div>
                  <ButtonBase
                    className={"w-xs"}
                    label={"삭제"}
                    color={"turu"}
                    onClick={() => {
                      const tempList = [...telList];
                      tempList.splice(index, 1);

                      setTelList(tempList);
                    }}
                  />
                </DetailGroupCol>
              </DetailContentCol>
            </DetailRow>
          ))}
        </Col>
        <Col sm={1} />
        <Col sm={6}>
          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              문자 내용
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase
                className={"w-xs"}
                label={"문자 발신"}
                color={"turu"}
              />
            </Col>
          </Row>
          <DetailDropdownRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "카테고리",
                dropdownItems: sendCategoryList,
              },
              {
                titleWidthRatio: 4,
                title: "제목",
                dropdownItems: sendTitleList,
              },
            ]}
          />
          <DetailRow className={"border-bottom border-2 mb-4"}>
            <DetailLabelCol sm={2}>발신 내용</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                /* init 높이, 유저 조절 가능 */
                inputstyle={{ height: 300 }}
                type={"textarea"}
                disabled={true}
                name={"sendContent"}
                value={sendContent}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <Row />

          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              신규 템플릿
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase
                className={"w-xs"}
                label={"신규 등록"}
                color={"turu"}
              />
            </Col>
          </Row>
          <DetailDropdownRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "카테고리",
                dropdownItems: sendCategoryList,
              },
              {
                titleWidthRatio: 4,
                title: "제목",
                dropdownItems: sendTitleList,
              },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>발신 내용</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                /* init 높이, 유저 조절 가능 */
                inputstyle={{ height: 300 }}
                type={"textarea"}
                name={"newTemplateContent"}
                value={newTemplateContent}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
        </Col>
      </Row>
      <div className={"d-flex justify-content-center"}>
        <ButtonBase
          className={"w-md"}
          outline
          label={"목록"}
          color={"secondary"}
          onClick={onChangeTab}
        />
      </div>
    </>
  );
};
