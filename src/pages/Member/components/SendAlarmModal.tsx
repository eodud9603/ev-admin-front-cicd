import React from "react";
import ModalBase from "src/components/Common/Modal/ModalBase";
import { Label } from "reactstrap";
import styled from "styled-components";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";

const sendTypeRadio = [
  { label: "카카오 알림톡", value: "1" },
  { label: "SMS", value: "1" },
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
            "bg-opacity-10 p-3 rounded-3"
          }
        >
          <Label className={"fw-bold m-0 mx-3"}>발송유형</Label>
          <RadioGroup name={"sendType"} list={sendTypeRadio} />
        </div>
        <DetailTextInputRow rows={[{ title: "답변내용", type: "textarea" }]} />
      </ModalContainer>
    </ModalBase>
  );
};

const ModalContainer = styled.section`
  padding: 15px;
`;
