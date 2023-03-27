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
import {
  ANSWER_STATUS_FILTER_LIST,
  COUNT_FILTER_LIST,
} from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

/* 검색어 필터 */
const searchList = [
  { label: "전체", value: "" },
  { label: "제목", value: "1" },
  { label: "법인명", value: "2" },
  { label: "회원명", value: "3" },
  { label: "답변자", value: "4" },
];

/* 카테고리 필터 */
const categoryList = [
  { label: "전체", value: "" },
  { label: "가입 승인", value: "1" },
  { label: "결제 카드", value: "2" },
  { label: "충전기 예약", value: "3" },
  { label: "충전기 사용", value: "4" },
  { label: "기타", value: "5" },
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
  { label: "번호" },
  { label: "카테고리" },
  { label: "제목" },
  { label: "법인명" },
  { label: "회원명" },
  { label: "등록 일시" },
  { label: "답변자" },
  { label: "답변 일시" },
  { label: "상태" },
];

/* 임시 목록 데이터 */
const qnaList = [
  {
    id: "1",
    category: "가입 승인",
    title: "가입 승인이 안됩니다.",
    corporateName: "휴맥스",
    userName: "홍길동",
    regDate: "2023.01.07",
    answerName: "김아무개",
    answerDate: "2023.01.07",
    status: "답변대기",
  },
  {
    id: "2",
    category: "결제 카드",
    title: "카드 결제가 왜 안될까요?",
    corporateName: "휴맥스",
    userName: "홍길동",
    regDate: "2023.01.07",
    answerName: "김아무개",
    answerDate: "2023.01.07",
    status: "답변완료",
  },
];

const CorporateQnA = () => {
  const [tabList, setTabList] = useState([{ label: "법인 문의사항" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const { answerStatus, searchText, onChange, onChangeSingle } = useInputs({
    answerStatus: "",
    searchRange: "",
    searchText: "",
    category: "",
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
            { label: "법인 문의사항", href: "" },
          ]}
          title={"법인 문의사항"}
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
                name={"answerStatus"}
                list={ANSWER_STATUS_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: answerStatus === data.value,
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
                label={"카테고리"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ category: value });
                    },
                    menuItems: categoryList,
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
                      onChangeSingle({ sort: "" });
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
              총 <span className={"text-turu"}>{qnaList.length}개</span>의
              문의사항이 있습니다.
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
            </div>
          </div>

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {qnaList.length > 0 ? (
                  qnaList.map(
                    (
                      {
                        id,
                        category,
                        title,
                        corporateName,
                        userName,
                        regDate,
                        answerName,
                        answerDate,
                        status,
                      },
                      index
                    ) => (
                      <HoverTr
                        key={id}
                        onClick={() => {
                          navigate(`/operate/corporateQnA/detail/${id}`);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td>{title}</td>
                        <td>{corporateName}</td>
                        <td>{userName}</td>
                        <td>{regDate}</td>
                        <td>{answerName}</td>
                        <td>{answerDate}</td>
                        <td>{status}</td>
                      </HoverTr>
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

export default CorporateQnA;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverTr = styled.tr`
  :hover {
    cursor: pointer;
  }
`;
