import React, { useEffect, useState } from "react";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import {
  getCategoryDetail,
  postCategoryRegister,
  putCategoryModify,
} from "src/api/category/categoryApi";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import ModalBase from "src/components/Common/Modal/ModalBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import useInputs from "src/hooks/useInputs";
import CategoryFieldDropdown from "src/pages/Operate/components/CategoryFieldDropdown";
import { standardDateFormat } from "src/utils/day";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import { YUP_OPERATE_CATEGORY } from "src/constants/valid/operate";
import {
  IRequestCategoryModify,
  IRequestCategoryRegister,
} from "src/api/category/categoryApi.interface";
import { YNType } from "src/api/api.interface";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";

interface ICategoryModalProps {
  type: "MODIFY" | "REGISTER";
  id?: number;
  isOpen: boolean;
  onClose: () => void;
  refreshTabData: any;
}

const CategoryModal = (props: ICategoryModalProps) => {
  const { type, id, isOpen, onClose, refreshTabData } = props;

  const [disabled, setDisabled] = useState(true);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  const [inputs, { onChange, onChangeSingle, reset }] = useInputs({
    fieldId: "",
    fieldName: "",
    name: "",
    modalIsExposed: "Y",
    writer: "",
    createAt: "",
  });
  const {
    fieldId,
    fieldName,
    name,
    modalIsExposed: isExposed,
    writer,
    createAt,
  } = inputs;
  const isEmpty = fieldId === "" || name === "" || isExposed === "";

  /** 등록 */
  const register = async () => {
    const params: IRequestCategoryRegister = {
      ...inputs,
      fieldId: Number(fieldId),
      isExpose: isExposed as YNType,
    };

    getParams(params);
    console.log(params);

    /* 유효성 체크 */
    const scheme = createValidation(YUP_OPERATE_CATEGORY);
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 등록 요청 */
    const { code } = await postCategoryRegister(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      refreshTabData();
      onClose();
      return;
    }
  };

  /** 수정 */
  const modify = async () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /* 수정 params */
    const modifyParams: IRequestCategoryModify = {
      ...inputs,
      id: Number(id),
      fieldId: Number(fieldId),
      isExpose: isExposed as YNType,
    };
    getParams(modifyParams);

    /* 유효성 체크 */
    const scheme = createValidation({
      ...YUP_OPERATE_CATEGORY,
    });
    const [invalid] = scheme(modifyParams);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 수정요청 */
    const { code } = await putCategoryModify(modifyParams);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      refreshTabData();
      onClose();
    }
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

      if (id) {
        /* 상세 조회 */
        void getCategoryDetail({ id }).then(({ code, data }) => {
          /** 성공 */
          const success = code === "SUCCESS" && !!data;

          if (success) {
            onChangeSingle({
              fieldId: (data.fieldId ?? "").toString(),
              fieldName: data.field,
              name: data.name ?? "",
              modalIsExposed: data.isExpose ?? "",
              writer: data.writer ?? "",
              createAt: data.createAt
                ? standardDateFormat(data.createAt, "YYYY-MM-DD")
                : "",
            });
          }
        });
      }
      return;
    }
  }, [type, isOpen, id, onChangeSingle]);

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
                disabled={disabled}
                label={""}
                displayValue={{
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
                    name={"createAt"}
                    value={createAt}
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
      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
    </ModalBase>
  );
};

export default CategoryModal;
