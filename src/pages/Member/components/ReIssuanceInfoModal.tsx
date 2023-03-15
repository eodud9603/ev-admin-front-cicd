import React from "react";
import { Label, ModalProps } from "reactstrap";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
export const ReIssuanceInfoModal = (props: IModalBaseProps) => {
  const { isOpen, onClose } = props;

  return (
    <ModalBase
      title={"재발급 정보"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <Label className={"fw-bold font-size-16 m-2"}>
          재발급 신청내역 상세
        </Label>
        <DetailSection className={"p-2"}>
          <DetailRow>
            <DetailLabelCol sm={2}>재발급 여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"reIssuanceStatus"}
                list={[
                  { label: "Y", value: "Y" },
                  { label: "N", value: "N" },
                ]}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>신청일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>회원카드번호(기존)</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
            <DetailLabelCol sm={2}>회원카드번호(재발급)</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>발급상태</DetailLabelCol>
            <DetailContentCol className={"d-flex align-items-center py-0"}>
              <DropdownBase
                menuItems={[
                  { label: "신청", value: "a" },
                  { label: "발급", value: "b" },
                  { label: "발송", value: "c" },
                  { label: "수령완료", value: "d" },
                ]}
              />
              <span className={"font-size-12 mx-2"}>수령일 : 미수령</span>
            </DetailContentCol>
            <DetailLabelCol sm={2}>발송일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>재발급비(원)</DetailLabelCol>
            <DetailContentCol className={"d-flex align-items-center py-0"}>
              <RadioGroup
                name={"reIssuanceFee"}
                list={[
                  { label: "부과", value: "Y", checked: true },
                  { label: "미부과", value: "N" },
                ]}
              />
              <span className={"font-size-12 mx-2 text-turu"}>3000원</span>
            </DetailContentCol>
          </DetailRow>
        </DetailSection>
        <div className={"d-flex justify-content-center my-4"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs mx-2"} />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs"} />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const DetailSection = styled.section``;
