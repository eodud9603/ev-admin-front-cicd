import React, { useState } from "react";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import styled from "styled-components";
import { FormGroup, Input } from "reactstrap";

type newTypeAddRowType =
  | Array<{ typeSeq?: number; label?: string; active?: boolean }>
  | [];
export const NewTypeAddRow = ({ isActive }: { isActive: boolean }) => {
  const [typeList, setTypeList] = useState<newTypeAddRowType>([
    { typeSeq: 1, label: "가입안내", active: true },
  ]);

  const onClickTypeAdd = () => {
    isActive && setTypeList((prev) => [...prev, {}]);
  };

  const onRemoveNewTypeRow = (index: number) => {
    const list: newTypeAddRowType = JSON.parse(JSON.stringify(typeList));
    list.splice(index, 1);
    setTypeList(list);
  };

  return (
    <>
      {typeList.map((e, i) => (
        <div
          key={`${new Date().toString()}${Math.random()}`}
          className={"mb-3 pb-3 border-bottom px-3"}
        >
          {e?.typeSeq ? (
            <div
              className={"d-flex align-items-center justify-content-between"}
            >
              <div>{e.label}</div>
              <div className={"d-flex align-items-center"}>
                <FormGroup switch>
                  <Input
                    type={"switch"}
                    className={"form-switch"}
                    color={"danger"}
                  />
                </FormGroup>
                <i
                  onClick={() => onRemoveNewTypeRow(i)}
                  role={"button"}
                  className={
                    "mdi mdi-close-circle mx-2 font-size-16 text-secondary"
                  }
                />
              </div>
            </div>
          ) : (
            <InputContainer />
          )}
        </div>
      ))}
      <TypeAddButton
        className={`px-3 ${isActive ? "text-turu" : "text-light"}`}
        onClick={onClickTypeAdd}
      >
        + 유형 추가
      </TypeAddButton>
    </>
  );
};

const InputContainer = () => {
  const [text, setText] = useState("");

  return (
    <div className={"d-flex"}>
      <TextInputBase
        name={"type"}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <ButtonBase
        label={"등록"}
        outline={true}
        className={"mx-2 w-xs"}
        disabled={!(text !== "")}
        //TODO :: 등록 이벤트 처리
      />
    </div>
  );
};

const TypeAddButton = styled.div`
  :hover {
    cursor: pointer;
  }
`;
