import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { Col, Label, Row } from "reactstrap";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";

interface IAlarmAddMemberModal {
  isOpen: boolean;
  onClose: () => void;
}

const dropdownGroupSearch = [
  { label: "이름", value: "1" },
  { label: "회원 ID", value: "1" },
  { label: "휴대폰 번호", value: "1" },
];
const statusRadio = [
  { label: "전체" },
  { label: "정회원" },
  { label: "준회원" },
  { label: "이용정지" },
];

const affiliationRadio = [
  { label: "전체" },
  { label: "HEV" },
  { label: "JEV" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호" },
  { label: "회원등급" },
  { label: "회원소속" },
  { label: "구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "휴대폰 번호" },
];
const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];
export const AlarmAddMemberModal = (props: IAlarmAddMemberModal) => {
  const { isOpen, onClose } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ModalBase
      title={"회원 검색"}
      size={"lg"}
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
          <div className={"mb-4"}>
            <SearchTextInput
              title={"검색어"}
              menuItems={dropdownGroupSearch}
              placeholder={"충전소를 입력해주세요"}
              name={"searchText"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={"d-flex"}>
            <RadioGroup title={"회원상태"} name={"status"} list={statusRadio} />
            <div className={"mx-3"} />
            <RadioGroup
              title={"회원소속"}
              name={"affiliation"}
              list={affiliationRadio}
            />
          </div>
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
          <TableBase tableHeader={tableHeader}></TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
      </ModalContainer>
      <div className={"d-flex justify-content-center my-4"}>
        <ButtonBase
          label={"닫기"}
          color={"secondary"}
          outline={true}
          className={"w-xs mx-2"}
        />
        <ButtonBase label={"추가"} color={"turu"} className={"w-xs"} />
      </div>
    </ModalBase>
  );
};
const ModalContainer = styled.section`
  padding: 15px;
`;
const FilterSection = styled.section``;
const ListSection = styled.section``;
