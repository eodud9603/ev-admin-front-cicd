import React, { useEffect, useState } from "react";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import useInputs from "src/hooks/useInputs";
import CategoryFieldDropdown from "src/pages/Operate/components/CategoryFieldDropdown";

interface ICategoryModalProps {
  type: "MODIFY" | "REGISTER";
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal = (props: ICategoryModalProps) => {
  const { type, isOpen, onClose } = props;

  const [disabled, setDisabled] = useState(true);
  const [
    { fieldId, fieldName, name, modalIsExposed: isExposed, writer, regDate },
    { onChange, onChangeSingle, reset },
  ] = useInputs({
    fieldId: "",
    fieldName: "",
    name: "",
    modalIsExposed: "Y",
    writer: "",
    regDate: "",
  });
  const isEmpty = fieldId === "" || name === "" || isExposed === "";

  /** 등록 */
  const register = () => {
    /** @TODO 등록 로직 추가 */
  };

  /** 수정 */
  const modify = () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /** @TODO 수정 로직 추가 */
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (type === "REGISTER") {
      setDisabled(false);
      return;
    }

    if (type === "MODIFY") {
      setDisabled(true);
      return;
    }
  }, [type, isOpen]);

  return (
    <ModalBase
      title={type === "REGISTER" ? "카테고리 신규 등록" : "카테고리 상세"}
      isOpen={isOpen}
      onClose={onClose}
      onClosed={reset}
    >
      <ModalBody
        style={{ maxHeight: "70vh", overflowY: "scroll" }}
        className={"p-0 py-4"}
      >
        <section
          className={
            "d-flex flex-column flex-1 gap-3 " +
            "mx-3 py-4 px-3 rounded bg-light bg-opacity-50 "
          }
        >
          <Row className={"d-flex align-items-center"}>
            <Col sm={4} className={"font-size-14 fw-bold"}>
              분야
            </Col>
            <Col sm={8}>
              <CategoryFieldDropdown
                initSelectedValue={{
                  label: fieldName,
                  value: fieldId,
                }}
                onChange={(data) => {
                  onChangeSingle({
                    fieldId: data.value ?? "",
                    fieldName: data.name ?? "",
                  });
                }}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col sm={4} className={"font-size-14 fw-bold"}>
              카테고리명
            </Col>
            <Col sm={8}>
              <TextInputBase
                disabled={disabled}
                name={"name"}
                value={name}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col sm={4} className={"font-size-14 fw-bold"}>
              노출 여부
            </Col>
            <Col sm={8}>
              <RadioGroup
                name={"modalIsExposed"}
                list={[
                  {
                    label: "노출",
                    value: "Y",
                  },
                  {
                    label: "미노출",
                    value: "N",
                  },
                ].map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === isExposed,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          {type === "MODIFY" && (
            <>
              <Row className={"d-flex align-items-center"}>
                <Col sm={4} className={"font-size-14 fw-bold"}>
                  작성자
                </Col>
                <Col sm={8}>
                  <TextInputBase
                    disabled={true}
                    name={"writer"}
                    value={writer}
                    onChange={onChange}
                  />
                </Col>
              </Row>
              <Row className={"d-flex align-items-center"}>
                <Col sm={4} className={"font-size-14 fw-bold"}>
                  등록일
                </Col>
                <Col sm={8}>
                  <input
                    disabled={true}
                    className={"form-control w-xs"}
                    type={"date"}
                    name={"regDate"}
                    value={regDate}
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </>
          )}
        </section>
      </ModalBody>

      <ModalFooter
        className={
          "p-0 py-3 d-flex flex-row align-items-center justify-content-center"
        }
      >
        <ButtonBase
          className={"w-xs"}
          outline={true}
          label={"닫기"}
          onClick={onClose}
        />
        <ButtonBase
          className={"w-xs"}
          color={isEmpty && !disabled ? "secondary" : "turu"}
          label={type === "REGISTER" ? "등록" : disabled ? "수정" : "저장"}
          onClick={type === "REGISTER" ? register : modify}
        />
      </ModalFooter>
    </ModalBase>
  );
};

export default CategoryModal;
