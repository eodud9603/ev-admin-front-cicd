import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Label } from "reactstrap";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextRow } from "src/components/Common/DetailContentRow/DetailTextRow";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { useLoaderData, useNavigate } from "react-router";
import { IMemberDetailResponse } from "src/api/member/memberApi.interface";
import useInputs from "src/hooks/useInputs";
import { objectToArray } from "src/utils/convert";
import {
  GENDER_TYPE,
  MEMBER_STATUS_TYPE,
  STATION_OPERATOR,
} from "src/constants/status";
import { standardDateFormat } from "src/utils/day";

const receptionRadio = [
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

export const MemberNormalDetail = () => {
  const data = useLoaderData() as IMemberDetailResponse;

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  const [inputs, { onChange }] = useInputs({
    id: (data?.id ?? "").toString(),
    name: data?.name ?? "",
    userId: data?.userId ?? "",
    birthday: data?.birthday ?? "",
    gender: data?.gender ?? "",
    // 사원번호
    empNumber: data?.empNumber ?? "",
    phone: data?.phone ?? "",
    email: data?.email ?? "",
    stationOperator: data?.stationOperator ?? "",
    // 등록일
    memberAuthDate: data?.memberAuthDate ?? "",
    memberCard: data?.memberCard ?? "",
    payCards: data?.payCards ?? [],
    paymentCardNumber: data?.paymentCardNumber ?? "",
    statusType: data?.statusType ?? "",
    lastChangedPwdDate: data?.lastChangedPwdDate ?? "",
    delayChangePwdDate: data?.delayChangePwdDate ?? "",
    isAgreeEmail: data?.isAgreeEmail ?? "",
    isAgreeSms: data?.isAgreeSms ?? "",
    isAgreeMarketing: data?.isAgreeMarketing ?? "",
    carCompany: data?.carCompany ?? "",
    carModel: data?.carModel ?? "",
    carNumber: data?.carNumber ?? "",
  });
  const {
    id,
    name,
    userId,
    birthday,
    gender,
    empNumber,
    phone,
    email,
    stationOperator,
    memberAuthDate,
    memberCard,
    payCards,
    paymentCardNumber,
    statusType,
    lastChangedPwdDate,
    delayChangePwdDate,
    isAgreeEmail,
    isAgreeSms,
    isAgreeMarketing,
    carCompany,
    carModel,
    carNumber,
  } = inputs;

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "회원 및 카드관리", href: "" },
            { label: "회원 관리", href: "" },
            { label: "회원 상세", href: "" },
          ]}
          title={"회원 상세"}
        />
        <InfoSection>
          <Label className={"fw-bold m-0"}>기본정보</Label>
          <DetailTextRow
            rows={[
              { title: "이름", content: name },
              { title: "회원 ID", content: userId },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>생년월일</DetailLabelCol>
            <DetailContentCol>
              {birthday ? standardDateFormat(birthday, "YYYY.MM.DD") : "-"}
            </DetailContentCol>
            <DetailLabelCol sm={2}>성별</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"gender"}
                list={objectToArray(GENDER_TYPE).map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === gender,
                }))}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                disabled,
                titleWidthRatio: 4,
                title: "사원번호",
                content: "회원가입시 입력된 정보 노출",
              },
              {
                disabled,
                titleWidthRatio: 4,
                title: "휴대전화 번호",
                name: "empNumber",
                content: empNumber,
                onChange,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                disabled,
                titleWidthRatio: 4,
                title: "이메일",
                name: "email",
                content: email,
                onChange,
              },
              {
                disabled,
                titleWidthRatio: 4,
                title: "전화 번호",
                name: "phone",
                content: phone,
                onChange,
              },
            ]}
          />
          <DetailTextRow
            rows={[
              {
                title: "회원 소속",
                content: STATION_OPERATOR[stationOperator] ?? "-",
              },
              {
                title: "회원 가입일(정회원 인증일)",
                content:
                  `YYYY.MM.DD ` +
                  (memberAuthDate
                    ? `(${standardDateFormat(memberAuthDate, "YYYY.MM.DD")})`
                    : ""),
              },
            ]}
          />
          <DetailTextRow
            rows={[
              { title: "회원카드 번호", content: memberCard },
              {
                title: "결제카드 정보",
                content: "-",
              },
            ]}
          />
          <DetailTextRow
            rows={[
              {
                title: "회원 등급",
                content: MEMBER_STATUS_TYPE[statusType] ?? "-",
              },
            ]}
          />
          <DetailTextRow
            rows={[
              {
                title: "비밀번호 변경일",
                content: lastChangedPwdDate
                  ? standardDateFormat(
                      lastChangedPwdDate,
                      "YYYY.MM.DD HH:mm:ss"
                    )
                  : "-",
              },
              {
                title: "비밀번호 연장일",
                content: delayChangePwdDate
                  ? standardDateFormat(
                      delayChangePwdDate,
                      "YYYY.MM.DD HH:mm:ss"
                    )
                  : "-",
              },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>수신 동의 여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                title={"메일 수신"}
                name={"isAgreeEmail"}
                list={receptionRadio.map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === isAgreeEmail,
                }))}
                onChange={onChange}
              />
              <RadioGroup
                title={"SMS 수신"}
                name={"isAgreeSms"}
                list={receptionRadio.map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === isAgreeSms,
                }))}
                onChange={onChange}
              />
              <RadioGroup
                title={"마케팅 활용/수신"}
                name={"isAgreeMarketing"}
                list={receptionRadio.map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === isAgreeMarketing,
                }))}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailTextRow
            rows={[
              {
                title: "차량",
                content: `차량종류 : [${carCompany}] ${carModel}, 차량번호 : ${
                  carNumber || "-"
                }`,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                disabled,
                titleWidthRatio: 2,
                title: "비고",
                content: "-",
              },
            ]}
          />
        </InfoSection>
        <div className={"d-flex justify-content-center"}>
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"mx-2 w-xs"}
            onClick={() => navigate("/member/normal")}
          />
          <ButtonBase
            label={"수정"}
            color={"turu"}
            className={"w-xs"}
            onClick={() => {
              setDisabled((prev) => !prev);
            }}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const InfoSection = styled.section`
  margin-block: 15px;
`;
