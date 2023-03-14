import React, { ChangeEvent, useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import { Col, Label, Row } from "reactstrap";
import styled from "styled-components";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";

export const MemberIssuanceNormalCard = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "회원카 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const [infoData, setInfoData] = useState({
    userId: "",
    userName: "",
    userDivision: "",
    requestData: { amount: "1", add: false },
    cardNumber: "",
    issuanceStatus: "",
    sendDt: "",
    etc: "",
  });
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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInfoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            { label: "회원카드 관리", href: "" },
            { label: "회원카드 신규 발급", href: "" },
          ]}
          title={"회원카드 신규 발급"}
        />

        <InfoSection>
          <Label className={"fw-bold m-0"}></Label>
          <DetailRow>
            <DetailLabelCol sm={2}>이름</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <TextInputBase
                    name={"name"}
                    value={infoData.userName}
                    onChange={onChangeInput}
                    placeholder={"이름 검색"}
                  />
                </Col>
                <Col sm={4} className={"d-flex justify-content-end"}>
                  <ButtonBase
                    label={"검색"}
                    outline={true}
                    color={"turu"}
                    className={"w-xs"}
                  />
                </Col>
              </Row>
            </DetailContentCol>
            <DetailLabelCol sm={2}>회원 ID</DetailLabelCol>
            <DetailContentCol>{infoData.userId}</DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>회원 구분</DetailLabelCol>
            <DetailContentCol>{infoData.userDivision}</DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>신청 수량</DetailLabelCol>
            <DetailContentCol>
              <Row>
                <Col>{`${infoData.requestData.amount}개(기본)`}</Col>
                <Col sm={4}>
                  <CheckBoxBase name={"add"} label={"추가발급"} />
                </Col>
              </Row>
            </DetailContentCol>
            <DetailLabelCol sm={2}>신청일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>발급상태</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <DropdownBase menuItems={[{ label: "신청", value: "1" }]} />
            </DetailContentCol>
            <DetailLabelCol sm={2}>발송일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>회원카드번호(신규)</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <TextInputBase
                    name={"cardNumber"}
                    value={infoData.cardNumber}
                    onChange={onChangeInput}
                    placeholder={"입력해주세요."}
                  />
                </Col>
                <Col sm={4} className={"d-flex align-items-center"}>
                  수령일 : 미수령
                </Col>
              </Row>
            </DetailContentCol>
            <DetailLabelCol sm={2}>발급비(원)</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                title: "비고",
                content: infoData.etc,
                titleWidthRatio: 2,
                placeholder: "입력해주세요.",
              },
            ]}
          />
        </InfoSection>
        <div className={"d-flex justify-content-center mt-4"}>
          <ButtonBase label={"목록"} outline={true} className={"mx-2 w-xs"} />
          <ButtonBase label={"등록"} className={"w-xs"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
