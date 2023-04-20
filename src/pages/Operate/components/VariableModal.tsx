import React from "react";
import { ModalBody, ModalFooter } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import useInputs from "src/hooks/useInputs";

interface IVariableModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Partial<{
    mainCode: string;
  }>;
}

const VariableModal = (props: IVariableModalProps) => {
  const { isOpen, onClose, data } = props;
  /** @TODO initial props 데이터 매칭하여 추가 필요, 현재 등록자명 추가  */
  const [
    { mainCode, code, varName, varValue, regName, regDate, contents },
    { onChange, reset },
  ] = useInputs({
    mainCode: data?.mainCode ?? "",
    code: "",
    varName: "",
    varValue: "",
    regName: "",
    regDate: "",
    contents: "",
  });

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      onClosed={reset}
      size={"lg"}
      title={"변수 관리"}
    >
      <ModalBody>
        <p className={"mb-2 px-1 font-size-16 fw-semibold"}>상위 코드</p>
        <DetailTextInputRow
          rows={[
            {
              titleWidthRatio: 4,
              title: "상위 코드",
              name: "mainCode",
              content: mainCode,
              placeholder: "Default 값",
              onChange,
            },
            {
              titleWidthRatio: 4,
              title: "코드",
              name: "code",
              content: code,
              onChange,
            },
          ]}
        />
        <DetailTextInputRow
          rows={[
            {
              titleWidthRatio: 4,
              title: "변수명",
              name: "varName",
              content: varName,
              onChange,
            },
            {
              titleWidthRatio: 4,
              title: "변수 값",
              name: "varValue",
              content: varValue,
              onChange,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>등록자</DetailLabelCol>
          <DetailContentCol>
            <DetailGroupCol className={"gap-3"}>
              <TextInputBase
                bsSize={"lg"}
                name={"regName"}
                value={regName}
                onChange={onChange}
              />
              <ButtonBase className={"w-xs"} label={"조회"} color={"dark"} />
            </DetailGroupCol>
          </DetailContentCol>
          <DetailLabelCol sm={2}>등록일</DetailLabelCol>
          <DetailContentCol>
            <input
              type={"date"}
              className={"form-control"}
              name={"regDate"}
              value={regDate}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>

        <p className={"pt-3 border-top border-2 font-size-16 fw-semibold"}>
          내용
        </p>
        <div
          className={"py-3 px-2 border-top border-bottom border-2 font-size-16"}
        >
          <TextInputBase
            name={"contents"}
            type={"textarea"}
            value={contents}
            onChange={onChange}
          />
        </div>
      </ModalBody>

      <ModalFooter
        className={"mx-2 p-0 py-3 border-bottom d-flex justify-content-center"}
      >
        <ButtonBase
          className={"w-xs"}
          outline
          label={"닫기"}
          color={"secondary"}
          onClick={onClose}
        />
        <ButtonBase className={"w-xs"} label={"등록"} color={"turu"} />
      </ModalFooter>
    </ModalBase>
  );
};

export default VariableModal;
