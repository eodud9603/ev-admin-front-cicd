import React from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { Label } from "reactstrap";
import styled from "styled-components";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import { TableBase } from "src/components/Common/Table/TableBase";

const sendTypeRadio = [
  { label: "카카오 알림톡", value: "1" },
  { label: "SMS", value: "1" },
];
const receptionTableHeader = [
  { label: "checkbox" },
  { label: "번호" },
  { label: "등급" },
  { label: "구분" },
  { label: "이름" },
  { label: "회원 ID" },
  { label: "휴대폰 번호" },
];
interface ISendAlarmModal {
  isOpen: boolean;
  onClose: () => void;
}
export const SendAlarmModal = (props: ISendAlarmModal) => {
  const { isOpen, onClose } = props;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={"알림 발송"}
      size={"lg"}
    >
      <ModalContainer>
        <Label className={"fw-bold m-0 my-3"}>폼 선택</Label>
        <div
          className={
            "d-flex align-items-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3"
          }
        >
          <Label className={"fw-bold m-0 mx-3"}>발송유형</Label>
          <RadioGroup name={"sendType"} list={sendTypeRadio} />
        </div>

        <DetailDropdownRow
          rows={[
            {
              title: "분류",
              titleWidthRatio: 2,
              dropdownItems: [
                {
                  disabled: false,
                  menuItems: [{ label: "서버 작업 안내", value: "1" }],
                },
              ],
            },
          ]}
        />
        <DetailTextInputRow rows={[{ title: "제목" }]} />
        <DetailTextInputRow rows={[{ title: "내용", type: "textarea" }]} />

        <div className={"mt-3"}>
          <Label className={"fw-bold m-0 my-3"}>발신 번호</Label>
          <DetailDropdownRow
            rows={[
              {
                title: "분류",
                titleWidthRatio: 2,
                dropdownItems: [
                  {
                    disabled: false,
                    menuItems: [{ label: "서버 작업 안내", value: "1" }],
                  },
                ],
              },
            ]}
          />
        </div>

        <div className={"mt-3"}>
          <Label className={"fw-bold m-0 my-3"}>수신 회원</Label>
          <TableBase tableHeader={receptionTableHeader} />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const ModalContainer = styled.section`
  padding: 15px;
`;
