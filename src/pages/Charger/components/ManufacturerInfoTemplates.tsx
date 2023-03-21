import React from "react";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { Col, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

let disabled = true;
export const ManufacturerBasicInfoTab = () => {
  return (
    <>
      <DetailTextInputRow
        rows={[
          { title: "제조사 ID", content: "", titleWidthRatio: 4, disabled },
          { title: "제조사 코드", content: "", titleWidthRatio: 4, disabled },
        ]}
      />
      <DetailTextInputRow
        rows={[
          { title: "제조사명", content: "", titleWidthRatio: 2, disabled },
        ]}
      />
      <DetailTextInputRow
        rows={[
          { title: "담당자명", content: "", titleWidthRatio: 4, disabled },
          { title: "담당자 연락처", content: "", titleWidthRatio: 4, disabled },
        ]}
      />
      <DetailTextInputRow
        rows={[
          {
            title: "담당자 내선번호",
            content: "",
            titleWidthRatio: 4,
            disabled,
          },
          {
            title: "담당자 대표번호",
            content: "",
            titleWidthRatio: 4,
            disabled,
          },
        ]}
      />
      <DetailRow className={"bg-light bg-opacity-10"}>
        <DetailLabelCol sm={2}>사업자 주소</DetailLabelCol>
        <DetailContentCol>
          <div className={"d-flex gap-4"}>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              bsSize={"lg"}
              disabled={true}
              className={"mb-4"}
              name={"우편번호"}
              value={"우편번호 노출"}
              onChange={() => {}}
            />
            <div style={{ flex: 3 }}>
              {!disabled && (
                <ButtonBase
                  className={"width-110"}
                  outline
                  label={"우편번호 검색"}
                  color={"turu"}
                  onClick={() => {}}
                />
              )}
            </div>
          </div>
          <div className={"d-flex gap-4"}>
            <TextInputBase
              bsSize={"lg"}
              disabled={true}
              name={"주소"}
              value={"검색된 주소 정보 노출"}
              onChange={() => {}}
            />
            <TextInputBase
              bsSize={"lg"}
              disabled={disabled}
              name={"상세주소"}
              value={"입력한 상세 주소 정보 노출"}
              onChange={() => {}}
            />
          </div>
        </DetailContentCol>
      </DetailRow>
    </>
  );
};

export const ManufacturerFirmwareInfoTab = () => {
  return (
    <>
      <DetailRow>
        <DetailLabelCol sm={2}>모델명</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
        <DetailLabelCol sm={2}>모델 이미지</DetailLabelCol>
        <DetailContentCol>
          <u role={"button"} className={"text-turu"}>
            등록된 펌웨어 파일명
          </u>
        </DetailContentCol>
      </DetailRow>
      <DetailTextInputRow
        rows={[
          { title: "펌웨어 버전", content: "", titleWidthRatio: 4, disabled },
          {
            title: "펌웨어 크기(Byte)",
            content: "",
            titleWidthRatio: 4,
            disabled,
          },
        ]}
      />
      <DetailRow>
        <DetailLabelCol sm={2}>현재 펌웨어 파일</DetailLabelCol>
        <DetailContentCol>
          <u role={"button"} className={"text-turu"}>
            등록된 펌웨어 파일명
          </u>
        </DetailContentCol>
      </DetailRow>
    </>
  );
};
