import React from "react";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IManufacturerInfoTemplates {
  type: "ADD" | "DETAIL" | "UPDATE";
}

interface IBasicInfoTabProps extends IManufacturerInfoTemplates {
  onChangeModal: () => void;
}

export const ManufacturerBasicInfoTab = ({
  type,
  onChangeModal,
}: IBasicInfoTabProps) => {
  const disabled = type === "DETAIL";

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
            />
            <div style={{ flex: 3 }}>
              {!disabled && (
                <ButtonBase
                  className={"width-110"}
                  outline
                  label={"우편번호 검색"}
                  color={"turu"}
                  onClick={onChangeModal}
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
            />
            <TextInputBase
              bsSize={"lg"}
              disabled={disabled}
              name={"상세주소"}
              value={"입력한 상세 주소 정보 노출"}
            />
          </div>
        </DetailContentCol>
      </DetailRow>
    </>
  );
};

export const ManufacturerFirmwareInfoTab = ({
  type,
}: IManufacturerInfoTemplates) => {
  const disabled = type === "DETAIL";

  return (
    <>
      <DetailRow>
        <DetailLabelCol sm={2}>모델명</DetailLabelCol>
        <DetailContentCol>
          <TextInputBase name={"model"} value={"1"} disabled />
        </DetailContentCol>
        <DetailLabelCol sm={2}>모델 이미지</DetailLabelCol>
        <DetailContentCol className={"py-0"}>
          {type === "DETAIL" ? (
            <u role={"button"} className={"text-turu"}>
              등록된 펌웨어 파일명
            </u>
          ) : (
            <div
              className={"d-flex justify-content-between align-items-center"}
            >
              <span className={"text-secondary text-opacity-25"}>
                충전기 모델 이미지를 등록해주세요.
              </span>
              <ButtonBase label={"업로드"} outline={true} color={"turu"} />
            </div>
          )}
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
          {type === "DETAIL" ? (
            <u role={"button"} className={"text-turu"}>
              등록된 펌웨어 파일명
            </u>
          ) : (
            <div
              className={"d-flex justify-content-between align-items-center"}
            >
              <span className={"text-secondary text-opacity-25"}>
                펌웨어 파일을 등록해주세요.
              </span>
              <ButtonBase label={"업로드"} outline={true} color={"turu"} />
            </div>
          )}
        </DetailContentCol>
      </DetailRow>
      <div role={"button"} className={"text-turu px-3 my-3"}>
        + 충전기 펌웨어 정보 추가
      </div>
      <div role={"button"} className={"text-secondary px-3 my-3"}>
        - 등록 정보 삭제
      </div>
    </>
  );
};
