import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { Col, Row } from "reactstrap";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface ICounselingMemberSearchModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "xl" | "lg" | "sm" | "md";
}

const dropdownGroupSearch = [
  { label: "이름", value: "1" },
  { label: "회원 ID", value: "1" },
  { label: "휴대폰 번호", value: "1" },
  { label: "사원번호", value: "1" },
  { label: "그룹명", value: "1" },
];

const tableHeader = [
  { label: "번호" },
  { label: "회원 ID" },
  { label: "이름" },
  { label: "회원등급" },
  { label: "휴대전화 번호" },
  { label: "그룹명" },
  { label: "사원번호" },
];
const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const data = [
  {
    userId: "kim",
    name: "홍길동",
    grade: "정회원",
    phone: "010-0000-0000",
    groupName: "휴맥스EV",
    employeeNumber: "000000",
  },
];
export const CounselingMemberSearchModal = (
  props: ICounselingMemberSearchModal
) => {
  const { isOpen, onClose, title, size } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ModalBase
      title={title ?? "회원 조회"}
      size={size ?? "xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <FilterSection
          className={
            "flex-column justify-content-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3"
          }
        >
          <SearchTextInput
            title={"검색어"}
            menuItems={dropdownGroupSearch}
            placeholder={"입력해주세요"}
            name={"searchText"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FilterSection>

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <span className={"text-size-13 fw-bold"}>
                총 <span className={"text-turu"}>0개</span>의 회원 정보가
                있습니다.
              </span>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td>{}</td>
                    <td>
                      <HoverSpan className={"text-turu"}>
                        <u>{e.userId}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.name}</td>
                    <td>{e.grade}</td>
                    <td>{e.phone}</td>
                    <td>{e.groupName}</td>
                    <td>{e.employeeNumber}</td>
                  </tr>
                ))}
            </>
          </TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
        <div className={"d-flex justify-content-center"}>
          <ButtonBase
            label={"닫기"}
            outline={true}
            className={"w-xs my-4"}
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};
const ModalContainer = styled.section`
  padding: 15px;
`;
const FilterSection = styled.section``;
const ListSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
