import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ModalBody } from "reactstrap";
import DetailCompleteModal from "./DetailCompleteModal";

interface IAlarmAddMemberModal {
  isOpen: boolean;
  onClose: () => void;
}

const dropdownGroupSearch = [
  { label: "충전기 ID", value: "1" },
  { label: "충전기명", value: "2" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "충전소명" },
  { label: "충전소 ID" },
  { label: "충전기 ID" },
];

const SingleControlModal = (props: IAlarmAddMemberModal) => {
  const { isOpen, onClose } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  /* 적용 버튼 disabled */
  const [disabled, setDisabled] = useState(true);
  /* 잔송완료 모달 */
  const [completeModalOpen, setCompleteModal] = useState(false);

  return (
    <ModalBase
      title={"단일 제어"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalBody>
        {/* filter section 1 */}
        <section className={"mb-2 bg-light bg-opacity-50 p-4 border rounded"}>
          <div>
            <SearchTextInput
              title={"검색어"}
              menuItems={dropdownGroupSearch}
              placeholder={"충전기를 입력해주세요"}
              name={"searchText"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </section>

        <ListSection className={"py-4"}>
          <p className={"mb-2 font-size-16 fw-bold"}>충전소 선택</p>
          <TableBase tableHeader={tableHeader}>
            <tr>
              <td
                colSpan={4}
                className={"py-4 font-size-14 text-secondary text-center"}
              >
                충전기를 검색해주세요.
              </td>
            </tr>
          </TableBase>
        </ListSection>

        <PaginationBase setPage={setPage} data={{}} />

        <div className={"d-flex justify-content-center my-4"}>
          <ButtonBase
            label={"닫기"}
            color={"secondary"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClose}
          />
          <ButtonBase
            disabled={disabled}
            label={"적용"}
            color={disabled ? "secondary" : "turu"}
            className={"w-xs"}
            onClick={() => {
              setDisabled(true);
              /** @TODO 적용 로직 */

              /* 적용 성공 */
              setCompleteModal(true);
            }}
          />
        </div>
      </ModalBody>

      <DetailCompleteModal
        isOpen={completeModalOpen}
        title={"단일 제어 완료"}
        contents={"단일 제어 SMS 전송이 완료되었습니다."}
        onClose={() => {
          setCompleteModal(false);
          onClose();
          setDisabled(false);
        }}
      />
    </ModalBase>
  );
};

export default SingleControlModal;

const ListSection = styled.section``;
