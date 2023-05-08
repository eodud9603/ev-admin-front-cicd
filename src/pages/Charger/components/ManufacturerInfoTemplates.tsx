import React, { useCallback } from "react";
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
import { Input } from "reactstrap";
import { postFileUpload } from "src/api/common/commonApi";

interface IManufacturerInfoTemplates {
  type: "ADD" | "DETAIL" | "UPDATE";
}

interface IManufactureInputs
  extends Omit<IManufactureDetailResponse, "id" | "models"> {
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

  const addFirmware = useCallback(() => {
    if (disabled) {
      return;
    }

    setList((prevList) => [
      ...prevList,
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
  }, [disabled, setList]);

  const removeFirmware = useCallback(
    (index: number) => () => {
      if (disabled) {
        return;
      }

      setList((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 1);

        return newList;
      });
    },
    [disabled, setList]
  );

  /** file upload */
  const fileUpload = useCallback(
    (type: "IMAGE" | "FIRMWARE", index: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }

        void postFileUpload(e.target.files).then(({ code, data }) => {
          const success = code === "SUCCESS" && !!data;

          if (success) {
            const [file] = data.elements;

            setList((prevList) => {
              const newList = [...prevList];

              let update = {};
              if (type === "IMAGE") {
                update = {
                  imageId: file.id,
                  imageFileName: file.fileName,
                  imageUrl: file.url,
                };
              } else if (type === "FIRMWARE") {
                update = {
                  size: (e.target.files?.item(0)?.size ?? "").toString(),
                  firmwareId: file.id,
                  firmwareFileName: file.fileName,
                  firmwareFileUrl: file.url,
                };
              }

              newList[index] = {
                ...newList[index],
                ...update,
              };

              return newList;
            });
          }
        });
      },
    [setList]
  );

  /** input change */
  const onChangeInputs = useCallback(
    (key: keyof IManufactureModelItem, index: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setList((prevList) => {
          const newList = [...prevList];
          newList[index] = { ...newList[index], [key]: e.target.value };

          return newList;
        });
      },
    [setList]
  );

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
                onChange={onChangeInputs("modelName", index)}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>모델 이미지</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              {type === "DETAIL" ? (
                <u role={"button"} className={"text-turu"}>
                  {data.imageFileName}
                </u>
              ) : (
                <div
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
                >
                  <span
                    className={
                      data.imageFileName
                        ? "text-turu "
                        : "text-secondary text-opacity-25"
                    }
                    onClick={() => {
                      if (data.imageUrl) {
                        window?.open(data.imageUrl);
                      }
                    }}
                  >
                    {data.imageFileName || "충전기 모델 이미지를 등록해주세요."}
                  </span>
                  <ButtonBase
                    label={"업로드"}
                    outline={true}
                    color={"turu"}
                    onClick={() => {
                      document.getElementById(`imageFile_${index}`)?.click();
                    }}
                  />
                  <Input
                    className={"visually-hidden"}
                    type={"file"}
                    id={`imageFile_${index}`}
                    name={"imageFile_"}
                    accept={"*"}
                    onChange={fileUpload("IMAGE", index)}
                  />
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
                onChange: onChangeInputs("version", index),
              },
              {
                disabled,
                titleWidthRatio: 4,
                type: "number",
                min: 0,
                title: "펌웨어 크기(Byte)",
                name: `size_${index}`,
                content: (data.size ?? "").toString(),
                onChange: onChangeInputs("size", index),
              },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>현재 펌웨어 파일</DetailLabelCol>
            <DetailContentCol>
              {type === "DETAIL" ? (
                <u role={"button"} className={"text-turu"}>
                  {data.firmwareFileName}
                </u>
              ) : (
                <div
                  className={
                    "d-flex justify-content-between align-items-center"
                  }
                >
                  <span
                    className={
                      data.firmwareFileName
                        ? "text-turu "
                        : "text-secondary text-opacity-25"
                    }
                    onClick={() => {
                      if (data.firmwareFileUrl) {
                        window?.open(data.firmwareFileUrl);
                      }
                    }}
                  >
                    {data.firmwareFileName || "펌웨어 파일을 등록해주세요."}
                  </span>
                  <ButtonBase
                    disabled={disabled}
                    label={"업로드"}
                    outline={true}
                    color={"turu"}
                    onClick={() => {
                      document.getElementById(`firmwareFile_${index}`)?.click();
                    }}
                  />
                  <Input
                    className={"visually-hidden"}
                    type={"file"}
                    id={`firmwareFile_${index}`}
                    name={"firmwareFile"}
                    accept={"*"}
                    onChange={fileUpload("FIRMWARE", index)}
                  />
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
              onClick={removeFirmware(index + 1)}
            >
              - 등록 정보 삭제
            </div>
          )}
        </div>
      ))}
    </>
  );
};
