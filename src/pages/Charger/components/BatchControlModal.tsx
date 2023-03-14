import React, { useState } from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ModalBody } from "reactstrap";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";

interface IAlarmAddMemberModal {
  isOpen: boolean;
  onClose: () => void;
}

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    menuItems: [{ label: "구,군", value: "1" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "1" }],
  },
];

const dropdownGroupSearch = [
  { label: "충전소명", value: "1" },
  { label: "충전소 ID", value: "2" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "충전소명" },
  { label: "충전소ID" },
];

const BatchControlModal = (props: IAlarmAddMemberModal) => {
  const { isOpen, onClose } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  /** @TODO 적용 버튼 비활성화 적용해야함(임시) */
  const disabled = true;

  return (
    <ModalBase
      title={"일괄 제어"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalBody>
        {/* filter section 1 */}
        <section className={"mb-2 bg-light bg-opacity-50 p-4 border rounded"}>
          <div className={"mb-3"}>
            <DropboxGroup
              label={"지역"}
              dropdownItems={addressList}
              className={"me-2 w-xs"}
            />
          </div>
          <div>
            <SearchTextInput
              title={"검색어"}
              menuItems={dropdownGroupSearch}
              placeholder={"충전소를 입력해주세요"}
              name={"searchText"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </section>
        {/* filter section 2 */}
        <section className={"bg-light bg-opacity-50 p-4 border rounded"}>
          <RadioGroup
            title={"제어 유형"}
            name={"controlType"}
            list={[
              {
                label: "재가동",
                value: "1",
              },
              {
                label: "공장초기화",
                value: "2",
              },
            ]}
          />
        </section>

        <ListSection className={"py-4"}>
          <p className={"mb-2 font-size-16 fw-bold"}>충전소 선택</p>
          <TableBase tableHeader={tableHeader}>
            <tr>
              <td
                colSpan={3}
                className={"py-4 font-size-14 text-secondary text-center"}
              >
                충전소를 검색해주세요.
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
          />
        </div>
      </ModalBody>
    </ModalBase>
  );
};

export default BatchControlModal;

const ListSection = styled.section``;
