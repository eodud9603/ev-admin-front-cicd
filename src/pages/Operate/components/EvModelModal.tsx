import React from "react";
import { Col, Input, ModalBody, ModalFooter, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import useImages from "src/hooks/useImages";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

export interface IEvModelModalProps {
  type: "EDIT" | "REGISTRATION";
  isOpen: boolean;
  onClose: () => void;

  data?: {
    id: string;
    chargerType: string;
    connectorType: string;
    manufacturer: string;
    carModel: string;
    carYear: string;
    battery: string;
    manager: string;
    regDate: string;
  };
  confirmHandler?: () => void;
}

const EvModelModal = (props: IEvModelModalProps) => {
  const {
    type = "REGISTRATION",
    isOpen = false,
    onClose,

    data,
    confirmHandler,
  } = props;
  const isEditMode = type === "EDIT";

  const {
    chargerType,
    connectorType,
    manufacturer,
    modelName,
    year,
    battery,
    regName,
    regDate,
    onChange,
    onChangeSingle,
    reset,
  } = useInputs({
    chargerType: data?.chargerType ?? "",
    connectorType: data?.connectorType ?? "",
    manufacturer: data?.manufacturer ?? "",
    modelName: data?.carModel ?? "",
    year: data?.carYear ?? "",
    battery: data?.battery ?? "",
    regName: data?.manager ?? "",
    regDate: data?.regDate ?? "",
  });
  const { images, upload, remove, reset: resetImages } = useImages([]);

  const clear = () => {
    reset();
    resetImages();
  };

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
              name={"chargerType"}
              title={"급속 / 완속"}
              list={[
                {
                  label: "급속",
                  value: "급속",
                  checked: chargerType === "급속",
                },
                {
                  label: "완속",
                  value: "완속",
                  checked: chargerType === "완속",
                },
              ]}
              onChange={onChange}
            />
          </Col>
          <Col sm={6}>
            <DropboxGroup
              label={"커넥터 타입"}
              dropdownItems={[
                {
                  onClickDropdownItem: (_, value) => {
                    onChangeSingle({ connectorType: value });
                  },
                  menuItems: [
                    {
                      label: "DC 콤보",
                      value: "1",
                    },
                    {
                      label: "콤보",
                      value: "2",
                    },
                  ],
                },
              ]}
            />
          </Col>
        </Row>

        <DetailRow>
          <DetailLabelCol sm={2}>제조사명</DetailLabelCol>
          <DetailContentCol>
            <DropdownBase
              menuItems={[
                {
                  label: "현대",
                  value: "1",
                },
                {
                  label: "기아",
                  value: "2",
                },
              ]}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ manufacturer: value });
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
                name={"battery"}
                value={battery}
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
            <DetailLabelCol sm={2}>관리자</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol>
                <TextInputBase
                  bsSize={"lg"}
                  name={"regName"}
                  value={regName}
                  onChange={onChange}
                />
                <ButtonBase
                  className={"width-110"}
                  label={"조회"}
                  color={"dark"}
                />
              </DetailGroupCol>
            </DetailContentCol>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
                name={"regDate"}
                value={regDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
        )}

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
            <ButtonBase
              outline
              label={"추가"}
              color={"turu"}
              onClick={() => {
                document.getElementById("images")?.click();
              }}
            />
          </DetailLabelCol>
        </DetailRow>
        {images.map((image, index) => (
          <Row key={image.src} className={"m-0 py-4 border-top border-2"}>
            <Col className={"position-relative"} sm={12}>
              <img width={"100%"} src={image.src} alt={image.file.name} />

              <Icon
                className={
                  "position-absolute top-0 start-100 translate-middle " +
                  "font-size-24 mdi mdi-close"
                }
                onClick={() => {
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
          onClick={confirmHandler}
        />
      </ModalFooter>
    </ModalBase>
  );
};

export default EvModelModal;

const Icon = styled.i`
  :hover {
    cursor: pointer;
  }
`;
