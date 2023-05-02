import React, { useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import {
  getEvModelDetail,
  postEvModelModify,
  postEvModelRegister,
} from "src/api/ev/evModelApi";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import {
  CHARGER_TYPE,
  TChargerRationKeys,
  TChargerTypeKeys,
} from "src/constants/status";
import useImages from "src/hooks/useImages";
import useInputs from "src/hooks/useInputs";
import { objectToArray } from "src/utils/convert";
import { standardDateFormat } from "src/utils/day";
import styled from "styled-components";

import {
  IRequestEvModelModify,
  IRequestEvModelRegister,
} from "src/api/ev/evModelApi.interface";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import {
  YUP_OPERATE_EV_MODEL,
  YUP_OPERATE_EV_MODEL_EXTRA,
} from "src/constants/valid/operate";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import { fileUpload } from "src/utils/upload";

export interface IEvModelModalProps {
  type: "EDIT" | "REGISTRATION";
  isOpen: boolean;
  onClose: () => void;

  id?: number;
}

const EvModelModal = (props: IEvModelModalProps) => {
  const {
    type = "REGISTRATION",
    isOpen = false,
    onClose,

    id: searchId,
  } = props;
  const isEditMode = type === "EDIT";

  const [inputs, { onChange, onChangeSingle, reset }] = useInputs({
    id: "",
    chargerType: "",
    modelChargerClass: "",
    manufactureName: "",
    manufactureId: "",
    modelName: "",
    year: "",
    capacity: "",
    memo: "",
    fileId: "",
    fileUrl: "",
    fileName: "",
    createdDate: "",
  });
  const {
    id,
    chargerType,
    modelChargerClass,
    manufactureId,
    manufactureName,
    modelName,
    year,
    capacity,
    fileId,
    fileUrl,
    fileName,
    createdDate,
    memo,
  } = inputs;

  const [images, { upload, remove, reset: resetImages, convertFileList }] =
    useImages([]);

  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 완료(삭제/수정) 모달 */
  const [textModal, setTextModal] = useState<{
    isOpen: boolean;
    title: string;
    contents: string;
  }>({
    isOpen: false,
    title: "",
    contents: "",
  });

  /** 완료(삭제/수정) 모달 handler */
  const onChangeTextModal = ({
    title = "",
    contents = "",
  }: Omit<typeof textModal, "isOpen">) => {
    setTextModal((prev) => ({
      isOpen: !prev.isOpen,
      title: title || prev.title,
      contents: contents || prev.contents,
    }));
  };

  /** 모달 닫히면, input 값 초기화 */
  const clear = () => {
    reset();
    resetImages();
  };

  /** 이미지 업로드 */
  const imageUpload = async () => {
    const [uploadImage] = images;

    if (!uploadImage) {
      return {
        fileId: undefined,
      };
    }

    const files = convertFileList();
    /** 파일 업로드 params */
    const fileParams = await fileUpload({
      url: uploadImage.src,
      file: files,
    });
    fileParams.id = fileParams.id || Number(fileId);
    fileParams.name = fileParams.name || fileName;
    fileParams.url = fileParams.url || fileUrl;

    return {
      fileId: fileParams.id,
      fileName: fileParams.name,
      fileUrl: fileParams.url,
    };
  };

  /** 등록/수정시, 불필요한 params 제거 */
  const removeParams = (
    params: IRequestEvModelModify | IRequestEvModelRegister
  ) => {
    if (!inputs.manufactureId) {
      delete params.manufactureId;
      delete params.manufactureName;
    }
    if (!params.fileId) {
      delete params.fileId;
      delete params.fileName;
      delete params.fileUrl;
    }
    delete params.createdDate;
  };

  /** 수정 */
  const modify = async () => {
    /** 이미지 params */
    const imageParams = await imageUpload();

    /** 수정 params */
    const modifyParams: IRequestEvModelModify = {
      ...inputs,
      ...imageParams,
      chargerType: chargerType as TChargerTypeKeys,
      chargerClass: modelChargerClass as TChargerRationKeys,
      id: Number(inputs.id),
      manufactureId: Number(inputs.manufactureId),
      capacity: Number(inputs.capacity),
    };

    /* params 제거 */
    removeParams(modifyParams);
    getParams(modifyParams);

    /* 유효성 체크 */
    const scheme = createValidation({
      ...YUP_OPERATE_EV_MODEL,
      ...YUP_OPERATE_EV_MODEL_EXTRA,
    });
    const [invalid] = scheme(modifyParams);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /** 수정 요청 */
    const { code } = await postEvModelModify(modifyParams);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /** 수정완료 모달 open */
      onChangeTextModal({
        title: "전기차 모델 정보 수정 완료 안내",
        contents: "수정된 전기차 모델 정보가 저장되었습니다.",
      });
    }
  };

  /** 등록 */
  const register = async () => {
    /** 이미지 params */
    const imageParams = await imageUpload();

    /** 등록 params */
    const registerParams: IRequestEvModelRegister = {
      ...inputs,
      ...imageParams,
      id: Number(id),
      chargerType: chargerType as TChargerTypeKeys,
      chargerClass: modelChargerClass as TChargerRationKeys,
      manufactureId: Number(inputs.manufactureId),
      capacity: Number(inputs.capacity),
    };

    /* params 제거 */
    removeParams(registerParams);
    delete registerParams.id;
    getParams(registerParams);

    /* 유효성 체크 */
    const scheme = createValidation(YUP_OPERATE_EV_MODEL);
    const [invalid] = scheme(registerParams);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /** 등록 요청 */
    const { code } = await postEvModelRegister(registerParams);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /** 등록완료 모달 open */
      onChangeTextModal({
        title: "전기차 모델 정보 등록 완료 안내",
        contents: "수정된 전기차 모델 정보가 등록되었습니다.",
      });
    }
  };

  /* 모달 open -> id 데이터 있을 경우, 상세 조회 */
  useEffect(() => {
    if (!isOpen || !searchId || isNaN(searchId)) {
      return;
    }

    const init = async () => {
      const { data } = await getEvModelDetail({ id: searchId });

      if (data) {
        onChangeSingle({
          chargerType: data.chargerType ?? "",
          modelChargerClass: data.chargerClass ?? "",
          manufactureName: data.manufactureName ?? "",
          modelName: data.modelName ?? "",
          year: data.year ?? "",
          memo: data.memo ?? "",
          fileId: (data.fileId ?? "").toString(),
          fileUrl: data.fileUrl ?? "",
          fileName: data.fileName ?? "",
          id: (data.id ?? "").toString(),
          manufactureId: (data.manufactureId ?? "").toString(),
          capacity: (data.capacity ?? "").toString(),
          createdDate: data.createdDate
            ? standardDateFormat(data.createdDate, "YYYY-MM-DD")
            : "",
        });
      }
    };

    void init();
  }, [isOpen, searchId, onChangeSingle]);

  return (
    <ModalBase
      size={"lg"}
      title={`전기차 모델 ${isEditMode ? "상세" : "등록"}`}
      isOpen={isOpen}
      onClose={onClose}
      onClosed={clear}
    >
      <ModalBody style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        <p className={"font-size-16 fw-semibold"}>충전기 타입</p>
        <Row
          className={
            "m-0 mb-2 d-flex justify-content-between " +
            "bg-light bg-opacity-50 p-4 border rounded"
          }
        >
          <Col className={"d-flex align-items-center"} sm={6}>
            <RadioGroup
              name={"modelChargerClass"}
              title={"급속 / 완속"}
              list={[
                {
                  label: "급속",
                  value: "QUICK",
                  checked: modelChargerClass === "QUICK",
                },
                {
                  label: "완속",
                  value: "STANDARD",
                  checked: modelChargerClass === "STANDARD",
                },
              ]}
              onChange={onChange}
            />
          </Col>
          <Col sm={6}>
            <EvModelModalDropdown
              label={"커넥터 타입"}
              menuItems={objectToArray(CHARGER_TYPE)}
              selectedValue={{
                label: CHARGER_TYPE[chargerType as TChargerTypeKeys] ?? "선택",
                value: chargerType,
              }}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ chargerType: value });
              }}
            />
          </Col>
        </Row>

        <DetailRow>
          <DetailLabelCol sm={2}>제조사명</DetailLabelCol>
          <DetailContentCol>
            {/** @TODO 전기차 모델 목록 조회 dropdown 필요 */}
            <EvModelModalDropdown
              selectedValue={{
                label: manufactureName,
                value: manufactureId,
              }}
              menuItems={[
                {
                  label: "선택",
                  value: "",
                },
                {
                  label: "현대",
                  value: "1",
                },
              ]}
              onClickDropdownItem={(label, value) => {
                onChangeSingle({
                  manufactureName: label,
                  manufactureId: value,
                });
              }}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>모델명</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              bsSize={"lg"}
              name={"modelName"}
              value={modelName}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>
        <DetailRow>
          <DetailLabelCol sm={2}>연식</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              bsSize={"lg"}
              type={"number"}
              min={1960}
              name={"year"}
              value={year}
              onChange={onChange}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>배터리 용량</DetailLabelCol>
          <DetailContentCol>
            <div className={"position-relative"}>
              <TextInputBase
                bsSize={"lg"}
                name={"capacity"}
                value={capacity}
                onChange={onChange}
                maxLength={4}
              />
              <span
                className={
                  "me-3 position-absolute bottom-0 end-0 translate-middle-y"
                }
              >
                Kwh
              </span>
            </div>
          </DetailContentCol>
        </DetailRow>
        {/* 상세(수정모드)에서만 보임 */}
        {isEditMode && (
          <DetailRow>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol>
              <input
                disabled={true}
                type={"date"}
                className={"form-control w-xs"}
                name={"createdDate"}
                value={createdDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
        )}

        <DetailRow>
          <DetailLabelCol sm={12}>차량 이슈</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              className={"border-transparent"}
              name={"memo"}
              value={memo}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>

        <DetailRow>
          <DetailLabelCol className={"d-flex justify-content-between"}>
            <span>차량 이미지</span>
            <Input
              className={"visually-hidden"}
              multiple
              type={"file"}
              id={"images"}
              name={"images"}
              accept={"image/*"}
              onChange={upload}
            />
          </DetailLabelCol>

          <DetailLabelCol className={"d-flex justify-content-end"}>
            <>
              {images.length === 0 && !fileUrl && (
                <ButtonBase
                  outline
                  label={"추가"}
                  color={"turu"}
                  onClick={() => {
                    document.getElementById("images")?.click();
                  }}
                />
              )}
            </>
          </DetailLabelCol>
        </DetailRow>
        {[
          ...(fileUrl ? [{ src: fileUrl, file: { name: fileName } }] : []),
          ...images,
        ].map((image, index) => (
          <Row key={image.src} className={"m-0 py-4 border-top border-2"}>
            <Col className={"position-relative"} sm={12}>
              <img
                width={"100%"}
                src={image.src}
                alt={(image.file.name || fileName) + " 이미지 파일 깨짐"}
              />

              <Icon
                className={
                  "position-absolute top-0 start-100 translate-middle " +
                  "font-size-24 mdi mdi-close"
                }
                onClick={() => {
                  if (fileUrl) {
                    onChangeSingle({
                      fileId: undefined,
                      fileUrl: undefined,
                      fileName: undefined,
                    });
                    return;
                  }

                  remove(index);
                }}
              />
            </Col>
          </Row>
        ))}
      </ModalBody>
      <ModalFooter className={"d-flex justify-content-center"}>
        <ButtonBase outline label={"닫기"} onClick={onClose} />
        <ButtonBase
          label={isEditMode ? "수정" : "등록"}
          color={"turu"}
          onClick={isEditMode ? modify : register}
        />
      </ModalFooter>

      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <DetailCompleteModal
        {...textModal}
        onClose={() => {
          setTextModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        }}
        onClosed={() => {
          if (isEditMode) {
            return;
          }

          onClose();
        }}
      />
    </ModalBase>
  );
};

export default EvModelModal;

const Icon = styled.i`
  :hover {
    cursor: pointer;
  }
`;

interface IDropdownBaseProps {
  disabled?: boolean;
  label?: string;
  selectedValue?: { label: string; value: string };
  onClickDropdownItem?: (label: string, value: string) => void;
  menuItems: Array<{
    label: string;
    value: string;
  }>;
  className?: string;
}
export const EvModelModalDropdown = (props: IDropdownBaseProps) => {
  const {
    label,
    disabled,
    selectedValue,
    onClickDropdownItem,
    menuItems,
    className,
    ...extraProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onClickItems = (label: string, value: string) => {
    onClickDropdownItem && onClickDropdownItem(label, value);
  };

  return (
    <div className="btn-group d-flex align-items-center">
      {label && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
      <Dropdown
        isOpen={isOpen}
        toggle={onToggleDropdown}
        disabled={disabled}
        className={`text-nowrap ${className ?? ""}`}
        {...extraProps}
      >
        <DropdownToggle tag="button" className="btn btn-outline-light w-xs">
          {selectedValue?.label || "선택"}{" "}
          <i className="mdi mdi-chevron-down ms-5" />
        </DropdownToggle>
        <DropdownMenu>
          {menuItems.map((e) => (
            <DropdownItem
              key={`${e.value}${Math.random()}`}
              onClick={() => onClickItems(e.label, e.value)}
              value={e.value}
              aria-label={e.label}
            >
              {e.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
