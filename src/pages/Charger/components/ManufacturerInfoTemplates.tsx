import React from "react";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  IManufactureDetailResponse,
  IManufactureModelItem,
} from "src/api/manufactures/manufactureApi.interface";

interface IManufacturerInfoTemplates {
  type: "ADD" | "DETAIL" | "UPDATE";
}

interface IManufactureInputs extends Omit<IManufactureDetailResponse, "id"> {
  id?: string;
}

interface IBasicInfoTabProps extends IManufacturerInfoTemplates {
  onChangeModal?: () => void;
  inputs: IManufactureInputs;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ManufacturerBasicInfoTab = ({
  type,
  onChangeModal,
  inputs,
  onChange,
}: IBasicInfoTabProps) => {
  const disabled = type === "DETAIL";

  const {
    companyId,
    code,
    name,
    managerName,
    managerPhone,
    managerExtPhone,
    phone,
    zipCode,
    address,
    addressDetail,
  } = inputs;

  return (
    <>
      <DetailTextInputRow
        rows={[
          {
            disabled,
            titleWidthRatio: 4,
            title: "제조사 ID",
            name: "companyId",
            content: companyId,
            onChange,
          },
          {
            disabled,
            titleWidthRatio: 4,
            title: "제조사 코드",
            name: "code",
            content: code,
            onChange,
          },
        ]}
      />
      <DetailTextInputRow
        rows={[
          {
            disabled,
            titleWidthRatio: 2,
            title: "제조사명",
            name: "name",
            content: name,
            onChange,
          },
        ]}
      />
      <DetailTextInputRow
        rows={[
          {
            disabled,
            titleWidthRatio: 4,
            title: "담당자명",
            name: "managerName",
            content: managerName,
            onChange,
          },
          {
            disabled,
            titleWidthRatio: 4,
            title: "담당자 연락처",
            name: "managerPhone",
            content: managerPhone,
            onChange,
          },
        ]}
      />
      <DetailTextInputRow
        rows={[
          {
            disabled,
            titleWidthRatio: 4,
            title: "담당자 내선번호",
            name: "managerExtPhone",
            content: managerExtPhone,
            onChange,
          },
          {
            disabled,
            titleWidthRatio: 4,
            title: "사업자 대표번호",
            name: "phone",
            content: phone,
            onChange,
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
              name={"zipCode"}
              value={zipCode}
              onChange={onChange}
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
              name={"address"}
              value={address}
              onChange={onChange}
            />
            <TextInputBase
              bsSize={"lg"}
              disabled={disabled}
              name={"addressDetail"}
              value={addressDetail}
              onChange={onChange}
            />
          </div>
        </DetailContentCol>
      </DetailRow>
    </>
  );
};

interface IFirmwareInfoTabProps extends IManufacturerInfoTemplates {
  list: IManufactureModelItem[];
  setList: React.Dispatch<React.SetStateAction<IManufactureModelItem[]>>;
}

/** @TODO 성능개선 */
export const ManufacturerFirmwareInfoTab = ({
  type,
  list,
  setList,
}: IFirmwareInfoTabProps) => {
  const disabled = type === "DETAIL";

  const addFirmware = () => {
    setList((prev) => [
      ...prev,
      {
        id: undefined,
        modelName: "",
        manufactureId: undefined,
        size: undefined,
        version: "",
        firmwareId: undefined,
        firmwareFileName: "",
        firmwareFileUrl: "",
        imageId: undefined,
        imageFileName: "",
        imageUrl: "",
      },
    ]);
  };

  const removeFirmware = (index: number) => () => {
    const tempList = [...list];
    tempList.splice(index, 1);
    setList(tempList);
  };

  return (
    <>
      {list.map((data, index) => (
        <div key={data.id ?? index}>
          <DetailRow>
            <DetailLabelCol sm={2}>모델명</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                disabled={disabled}
                name={`modelName_${index}`}
                value={data.modelName ?? ""}
                onChange={(e) => {
                  const tempList = [...list];
                  tempList[index].modelName = e.target.value;
                  setList(tempList);
                }}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>모델 이미지</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              {type === "DETAIL" ? (
                <u role={"button"} className={"text-turu"}>
                  등록된 펌웨어 파일명
                </u>
              ) : (
                <div
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
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
              {
                disabled,
                titleWidthRatio: 4,
                title: "펌웨어 버전",
                name: `version_${index}`,
                content: data.version ?? "",
                onChange: (e) => {
                  const tempList = [...list];
                  tempList[index].version = e.target.value;
                  setList(tempList);
                },
              },
              {
                disabled,
                titleWidthRatio: 4,
                type: "number",
                title: "펌웨어 크기(Byte)",
                name: `size_${index}`,
                content: (data.size ?? "").toString(),
                onChange: (e) => {
                  const tempList = [...list];
                  tempList[index].size = e.target.value;
                  setList(tempList);
                },
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
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
                >
                  <span className={"text-secondary text-opacity-25"}>
                    펌웨어 파일을 등록해주세요.
                  </span>
                  <ButtonBase label={"업로드"} outline={true} color={"turu"} />
                </div>
              )}
            </DetailContentCol>
          </DetailRow>
          {list.length - 1 === index ? (
            <div
              role={"button"}
              className={"text-turu px-3 my-3"}
              onClick={addFirmware}
            >
              + 충전기 펌웨어 정보 추가
            </div>
          ) : (
            <div
              role={"button"}
              className={"text-secondary px-3 my-3"}
              onClick={removeFirmware(index)}
            >
              - 등록 정보 삭제
            </div>
          )}
        </div>
      ))}
    </>
  );
};
