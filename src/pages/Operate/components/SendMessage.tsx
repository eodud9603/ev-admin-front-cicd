import React, { useState } from "react";
import { Col, InputGroup, InputGroupText, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import useInputs from "src/hooks/useInputs";

interface ISendMessageProps {
  /** @TODO type: 전화번호 or 단말기 추가 시, 회원(비회원) or 충전기CH를 구분표시하기 위해 임시로 추가한 props */
  type: "TALK" | "SMS";
  receiverInputTitle: string;
  categoryList: { label: string; value: string }[];
  titleList: { label: string; value: string }[];
  sentContentTitle: string;
  onChangeTab: () => void;

  inquiryHandler?: () => void;
  addHandler?: () => void;
  sendHandler?: () => void;
  registrationHandler?: () => void;
}

const SendMessage = (props: ISendMessageProps) => {
  const {
    /* required */
    type,
    onChangeTab,
    receiverInputTitle = "",
    categoryList = [],
    titleList = [],
    sentContentTitle = "",
    /* optional */
    inquiryHandler,
    addHandler,
    sendHandler,
    registrationHandler,
  } = props;
  const [
    { addNumber, sendContent, newTemplateContent },
    { onChange, onChangeSingle },
  ] = useInputs({
    addNumber: "",
    sendContent: "템플릿 등록 내용 표시",
    newTemplateContent: "",
  });
  const [sendNumberList, setSendNumberList] = useState<
    { label: string; name: string; value: string }[]
  >([]);

  const add = () => {
    /** @TODO addHandler */
    if (addNumber.trim().length === 0) {
      return;
    }

    /** @TODO 알림톡/문자에 따라 회원(비회원), 단말기 번호 표시 문자열 추가 */
    /* 추가 시, 회원정보 or 충전기CH 채널 조회하여 label 표시 */
    setSendNumberList((prev) => [
      ...prev,
      {
        label: type === "TALK" ? "비회원" : "001122",
        name: `send-number-${prev.length + 1}`,
        value: addNumber.trim(),
      },
    ]);
    onChangeSingle({ addNumber: "" });
  };

  return (
    <>
      <Row className={"mb-4"}>
        <Col sm={5}>
          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              수신자
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase
                className={"w-xs"}
                label={"조회"}
                color={"dark"}
                onClick={inquiryHandler}
              />
            </Col>
          </Row>
          <DetailRow>
            <DetailLabelCol sm={3}>{receiverInputTitle}</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-2"}>
                <TextInputBase
                  type={"tel"}
                  bsSize={"lg"}
                  placeholder={`${receiverInputTitle}를 입력해주세요.`}
                  name={"addNumber"}
                  value={addNumber}
                  onChange={onChange}
                />
                <ButtonBase
                  className={"w-xs"}
                  label={"추가"}
                  color={"dark"}
                  onClick={add}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"py-4"} />
          {sendNumberList.map(({ label, name, value }, index) => (
            <DetailRow key={index}>
              <DetailLabelCol sm={3}>{`No. ${index + 1}`}</DetailLabelCol>
              <DetailContentCol>
                <InputGroup>
                  <InputGroupText
                    className={
                      "font-size-14 text-secondary rounded-0 rounded-start " +
                      "bg-light bg-opacity-50 " +
                      "border-secondary border-opacity-50 border-end-0"
                    }
                  >
                    {label}
                  </InputGroupText>
                  <TextInputBase
                    className={"rounded-0 rounded-end"}
                    disabled={true}
                    type={"tel"}
                    bsSize={"lg"}
                    placeholder={"전화번호를 입력해주세요."}
                    name={name}
                    value={value}
                  />
                  <ButtonBase
                    className={"w-xs"}
                    label={"삭제"}
                    color={"turu"}
                    onClick={() => {
                      const tempList = [...sendNumberList];
                      tempList.splice(index, 1);

                      setSendNumberList(tempList);
                    }}
                  />
                </InputGroup>
              </DetailContentCol>
            </DetailRow>
          ))}
        </Col>
        <Col sm={1} />
        <Col sm={6}>
          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              문자 내용
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase
                className={"w-xs"}
                label={"문자 발신"}
                color={"turu"}
                onClick={sendHandler}
              />
            </Col>
          </Row>
          <DetailDropdownRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "카테고리",
                dropdownItems: [
                  {
                    menuItems: categoryList,
                  },
                ],
              },
              {
                titleWidthRatio: 4,
                title: "제목",
                dropdownItems: [
                  {
                    menuItems: titleList,
                  },
                ],
              },
            ]}
          />
          <DetailRow className={"border-bottom border-2 mb-4"}>
            <DetailLabelCol sm={2}>발신 내용</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                /* init 높이, 유저 조절 가능 */
                inputstyle={{ height: 300 }}
                type={"textarea"}
                disabled={true}
                name={"sendContent"}
                value={sendContent}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <Row />

          <Row className={"pb-2 d-flex align-items-center"}>
            <Col className={"font-size-20 fw-semibold"} sm={6}>
              {sentContentTitle}
            </Col>
            <Col sm={6} className={"d-flex justify-content-end"}>
              <ButtonBase
                className={"w-xs"}
                label={"신규 등록"}
                color={"turu"}
                onClick={registrationHandler}
              />
            </Col>
          </Row>
          <DetailDropdownRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "카테고리",
                dropdownItems: [
                  {
                    menuItems: categoryList,
                  },
                ],
              },
              {
                titleWidthRatio: 4,
                title: "제목",
                dropdownItems: [
                  {
                    menuItems: titleList,
                  },
                ],
              },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>발신 내용</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                /* init 높이, 유저 조절 가능 */
                inputstyle={{ height: 300 }}
                type={"textarea"}
                name={"newTemplateContent"}
                value={newTemplateContent}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
        </Col>
      </Row>
      <div className={"d-flex justify-content-center"}>
        <ButtonBase
          className={"w-md"}
          outline
          label={"목록"}
          color={"secondary"}
          onClick={onChangeTab}
        />
      </div>
    </>
  );
};

export default SendMessage;
