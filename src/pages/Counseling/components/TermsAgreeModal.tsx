import React from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import styled from "styled-components";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { Label } from "reactstrap";
import { TableBase } from "src/components/Common/Table/TableBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";

const checkListTableHeader = [
  { label: "번호" },
  { label: "필수 안내 내용" },
  { label: "checkbox" },
];
const data = [
  { requireContent: "개인정보 이용/저장 동의 거부 권리 및 불이익 내용" },
  { requireContent: "개인정보 수집 목적과 수집 정보 내용" },
  { requireContent: "개인정보 보유/활용 기간 및 파기" },
];
export const TermsAgreeModal = (props: IModalBaseProps) => {
  const { isOpen, onClose, size = "lg" } = props;

  return (
    <ModalBase
      title={"비밀번호 초기화"}
      size={size}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer className={"mx-2"}>
        <div className={"d-flex justify-content-center my-3"}>
          <TitleSection />
        </div>

        <CheckListSection>
          <Label className={"fw-bold font-size-16"}>체크리스트</Label>
          <TableBase tableHeader={checkListTableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td></td>
                    <td>{e.requireContent}</td>
                    <td>
                      <CheckBoxBase name={"check"} label={""} />
                    </td>
                  </tr>
                ))}
            </>
          </TableBase>
        </CheckListSection>
        <div className={"my-3"}>
          <RadioGroup
            title={"회원 동의 여부"}
            name={"memberAgree"}
            list={[
              { label: "동의", value: "1" },
              { label: "거부", value: "1" },
            ]}
          />
        </div>
        <div className={"d-flex my-4 justify-content-center"}>
          <ButtonBase
            label={"취소"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClose}
          />
          <ButtonBase
            label={"완료"}
            color={"turu"}
            disabled={true}
            className={"w-xs"}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const TitleSection = () => {
  return (
    <span className={"text-center"}>
      반드시{" "}
      <span className={"text-turu fw-semibold"}>
        개인정보 이용/저장 동의 안내
      </span>
      를 진행해주세요.
      <br />
      개인정보 동의는 선택사항이며, 회원의 개인정보 이용/저장 동의 거부 시<br />
      상담내용은 상담내역에 저장되지 않습니다.
    </span>
  );
};

const CheckListSection = styled.section``;
