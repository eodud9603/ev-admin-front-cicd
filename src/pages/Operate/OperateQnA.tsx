import React, { useState } from "react";
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
import {
  ANSWER_STATUS_FILTER_LIST,
  COUNT_FILTER_LIST,
} from "src/constants/list";
import styled from "styled-components";

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "1" },
  { label: "제목", value: "2" },
  { label: "회원명", value: "3" },
  { label: "회원 ID", value: "4" },
  { label: "답변자", value: "5" },
];

/* 카테고리 필터 */
const categoryList = [
  {
    menuItems: [
      { label: "전체", value: "1" },
      { label: "가입 승인", value: "2" },
      { label: "결제 카드", value: "3" },
      { label: "충전기 예약", value: "4" },
      { label: "충전기 사용", value: "5" },
      { label: "기타", value: "6" },
    ],
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "카테고리", sort: () => {} },
  { label: "제목", sort: () => {} },
  { label: "회원명", sort: () => {} },
  { label: "회원 ID", sort: () => {} },
  { label: "등록 일시", sort: () => {} },
  { label: "답변자", sort: () => {} },
  { label: "답변 일시", sort: () => {} },
  { label: "상태", sort: () => {} },
];

/* 임시 목록 데이터 */
const qnaList = [
  {
    category: "가입 승인",
    title: "가입 승인이 안됩니다.",
    userName: "홍길동",
    userId: "EV123456",
    regDate: "2023.01.07",
    answerName: "김아무개",
    answerDate: "2023.01.07",
    status: "답변대기",
  },
  {
    category: "결제 카드",
    title: "카드 결제가 왜 안될까요?",
    userName: "홍길동",
    userId: "EV123456",
    regDate: "2023.01.07",
    answerName: "김아무개",
    answerDate: "2023.01.07",
    status: "답변완료",
  },
];

const OperateQnA = () => {
  const [tabList, setTabList] = useState([{ label: "Q&A" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

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
            { label: "Q&A", href: "" },
          ]}
          title={"Q&A"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={5}>
              <DateGroup className={"mb-0"} label={"등록일시"} />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={5}>
              <DateGroup className={"mb-0"} label={"답변일시"} />
            </Col>
            <Col md={3} />
            <Col md={4}>
              <RadioGroup
                title={"답변 상태"}
                name={"statusGroup"}
                list={ANSWER_STATUS_FILTER_LIST}
              />
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
              총 <span className={"text-turu"}>{qnaList.length}개</span>의
              문의사항이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={COUNT_FILTER_LIST} />
            </div>
          </div>

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {qnaList.length > 0 ? (
                  qnaList.map(
                    (
                      {
                        category,
                        title,
                        userName,
                        userId,
                        regDate,
                        answerName,
                        answerDate,
                        status,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td>{title}</td>
                        <td>{userName}</td>
                        <td>{userId}</td>
                        <td>{regDate}</td>
                        <td>{answerName}</td>
                        <td>{answerDate}</td>
                        <td>{status}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={9} className={"py-5 text-center text"}>
                      등록된 문의사항이 없습니다.
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

export default OperateQnA;

const SearchSection = styled.section``;
const ListSection = styled.section``;
