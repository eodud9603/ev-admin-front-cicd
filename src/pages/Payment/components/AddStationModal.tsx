import React, { useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { Row } from "reactstrap";

const dropdownGroupSearch = [
  { label: "충전소명", value: "1" },
  { label: "충전소ID", value: "1" },
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

export const AddStationModal = (props: IModalBaseProps) => {
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
            <DropboxGroup
              dropdownItems={[
                { menuItems: [{ label: "시, 도", value: "1" }] },
                { menuItems: [{ label: "구, 군", value: "1" }] },
                { menuItems: [{ label: "동, 읍", value: "1" }] },
              ]}
              label={"지역"}
            />
            <SearchTextInput
              title={"검색어"}
              menuItems={dropdownGroupSearch}
              placeholder={"충전소를 입력해주세요"}
              name={"searchText"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </FilterSection>
        <StationSection></StationSection>
      </ModalContainer>
    </ModalBase>
  );
};

const FilterSection = styled.section``;
const StationSection = styled.section``;
const SelectStation = styled(Row)``;
const RegisteredStation = styled(Row)``;
