import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Label, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";

const disabled = false;
export const ChargerOperatorRegistration = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "서비스 운영사 관리" },
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
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "서비스 운영사 관리", href: "" },
            { label: "서비스 운영사 상세", href: "" },
          ]}
          title={"서비스 운영사 상세"}
        />
        <BasicInfoSection className={"mt-3"}>
          <Label className={"fw-semibold font-size-16 m-0 mb-2"}>
            기본정보
          </Label>

          <DetailTextInputRow
            rows={[
              { title: "운영사명", content: "", titleWidthRatio: 4, disabled },
              {
                title: "운영사ID",
                content: "",
                titleWidthRatio: 4,
                disabled,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                title: "한전기관ID",
                content: "",
                titleWidthRatio: 4,
                disabled,
              },
              {
                title: "한전기관인증키(로밍)",
                content: "",
                titleWidthRatio: 4,
                disabled,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                title: "사업자 전화번호",
                content: "",
                titleWidthRatio: 4,
                disabled,
              },
              {
                title: "사업자 대표번호",
                content: "",
                titleWidthRatio: 4,
                disabled,
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
                  name={"우편번호"}
                  value={"우편번호 노출"}
                  onChange={() => {}}
                />
                <div style={{ flex: 3 }}>
                  {!disabled && (
                    <ButtonBase
                      className={"width-110"}
                      outline
                      label={"우편번호 검색"}
                      color={"turu"}
                      onClick={() => {}}
                    />
                  )}
                </div>
              </div>
              <div className={"d-flex gap-4"}>
                <TextInputBase
                  bsSize={"lg"}
                  disabled={true}
                  name={"주소"}
                  value={"검색된 주소 정보 노출"}
                  onChange={() => {}}
                />
                <TextInputBase
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"상세주소"}
                  value={"입력한 상세 주소 정보 노출"}
                  onChange={() => {}}
                />
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"contract"}
                list={[
                  { label: "Y", value: "Y" },
                  { label: "N", value: "N" },
                ]}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>활용여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"usage"}
                list={[
                  { label: "Y", value: "Y" },
                  { label: "N", value: "N" },
                ]}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              { title: "계약일자", content: "", titleWidthRatio: 2, disabled },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <div
                className={"d-flex justify-content-between align-items-center"}
              >
                <div role={"button"} className={"text-secondary"}>
                  계약서 파일을 등록해주세요.
                </div>
                <ButtonBase label={"업로드"} outline={true} color={"turu"} />
              </div>
            </DetailContentCol>
          </DetailRow>
        </BasicInfoSection>
        <RoamingPriceSection className={"mt-5"}>
          <Label className={"fw-semibold font-size-16 m-0 mb-2"}>
            로밍단가
          </Label>
          <span className={"text-turu ms-3"}>
            * 요금 관리 메뉴에서 로밍가 신규 등록 및 변경이 가능합니다
          </span>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>완속</DetailLabelCol>
            <DetailContentCol>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    도매가
                  </Label>
                  <TextInputBase
                    name={"price"}
                    value={
                      "로밍요금 단가 정보 노출(요금 관리 메뉴에 로밍단가 정보가 없을 경우 빈칸으로 노출)"
                    }
                    disabled
                  />
                </Col>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    소매가
                  </Label>
                  <TextInputBase
                    name={"price"}
                    value={
                      "로밍요금 단가 정보 노출(요금 관리 메뉴에 로밍단가 정보가 없을 경우 빈칸으로 노출)"
                    }
                    disabled
                  />
                </Col>
              </Row>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>급속</DetailLabelCol>
            <DetailContentCol>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    도매가
                  </Label>
                  <TextInputBase
                    name={"price"}
                    value={
                      "로밍요금 단가 정보 노출(요금 관리 메뉴에 로밍단가 정보가 없을 경우 빈칸으로 노출)"
                    }
                    disabled
                  />
                </Col>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    소매가
                  </Label>
                  <TextInputBase
                    name={"price"}
                    value={
                      "로밍요금 단가 정보 노출(요금 관리 메뉴에 로밍단가 정보가 없을 경우 빈칸으로 노출)"
                    }
                    disabled
                  />
                </Col>
              </Row>
            </DetailContentCol>
          </DetailRow>
        </RoamingPriceSection>
        <div className={"d-flex justify-content-center mt-5"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs"} />
          <ButtonBase label={"등록"} color={"turu"} className={"mx-3 w-xs"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const BasicInfoSection = styled.section``;
const RoamingPriceSection = styled.section``;
