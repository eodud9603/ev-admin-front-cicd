import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { Label } from "reactstrap";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IChangeOperatorModal {
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
  { label: "운영자ID" },
  { label: "운영자명" },
  { label: "부서" },
  { label: "권한등급" },
];

const data = [
  {
    userSeq: "1",
    userId: "kim",
    name: "이팀장",
    part: "서비스 운영팀",
    grade: "최고 관리자",
  },
  {
    userSeq: "2",
    userId: "kim",
    name: "이팀장",
    part: "서비스 운영팀",
    grade: "일반 관리자",
  },
];
export const ChangeOperatorModal = (props: IChangeOperatorModal) => {
  const { isOpen, onClose, title, size } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ModalBase
      title={title ?? "운영자 검색"}
      size={size ?? "xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <FilterSection
          className={
            "flex-column justify-content-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3 py-4"
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

        <ListSection>
          <Label className={"fw-bold font-size-16 my-4 m-0"}>운영자 선택</Label>
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
                    <td>{e.part}</td>
                    <td>{e.grade}</td>
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
