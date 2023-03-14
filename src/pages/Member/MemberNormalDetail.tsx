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

const disabled = true;
const sexRadio = [
  { label: "남", value: "MAN" },
  { label: "여", value: "WOMAN" },
];
const receptionRadio = [
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

export const MemberNormalDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "회원 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

    setTabList(tempList);
  };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

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
              { title: "이름", content: "홍길동" },
              { title: "회원 ID", content: "회원 ID 노출" },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>생년월일</DetailLabelCol>
            <DetailContentCol>ㄴㅇㄴㅇ</DetailContentCol>
            <DetailLabelCol sm={2}>생년월일</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup name={"sex"} list={sexRadio} />
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "사원번호",
                content: "회원가입시 입력된 정보 노출",
                disabled,
              },
              {
                titleWidthRatio: 4,
                title: "휴대전화 번호",
                content: "000-0000-0000",
                disabled,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "이메일",
                content: "hhh@humaxmobility.co.kr",
                disabled,
              },
              {
                titleWidthRatio: 4,
                title: "전화 번호",
                content: "000-000-0000",
                disabled,
              },
            ]}
          />
          <DetailTextRow
            rows={[
              {
                title: "회원 소속",
                content:
                  "HEV (HEV 홈페이지에서 가입한 사용자의 경우 자동으로 HEV 표기)",
              },
              {
                title: "회원 가입일(정회원 인증일)",
                content: "YYYY.MM.DD (YYYY.MM.DD)",
              },
            ]}
          />
          <DetailTextRow
            rows={[
              { title: "회원카드 번호", content: "홍길동" },
              { title: "결제카드 정보", content: "[현대] 3702********3203" },
            ]}
          />
          <DetailTextRow rows={[{ title: "회원 등급", content: "홍길동" }]} />
          <DetailTextRow
            rows={[
              { title: "비밀번호 변경일", content: "홍길동" },
              { title: "비밀번호 연장일", content: "회원 ID 노출" },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>수신 동의 여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                title={"메일 수신"}
                name={"mail"}
                list={receptionRadio}
              />
              <RadioGroup
                title={"SMS 수신"}
                name={"sms"}
                list={receptionRadio}
              />
              <RadioGroup
                title={"마케팅 활용/수신"}
                name={"marketing"}
                list={receptionRadio}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailTextRow
            rows={[
              {
                title: "차량",
                content: "차량종류 : [현대자동차]코나, 차량번호 : 123아1235 ",
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 2,
                title: "비고",
                content: "hhh@humaxmobility.co.kr",
                disabled,
              },
            ]}
          />
        </InfoSection>
        <div className={"d-flex justify-content-center"}>
          <ButtonBase label={"목록"} outline={true} className={"mx-2 w-xs"} />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const InfoSection = styled.section`
  margin-block: 15px;
`;
