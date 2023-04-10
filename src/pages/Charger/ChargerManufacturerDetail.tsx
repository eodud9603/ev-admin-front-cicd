import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { ButtonGroup, Label } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  ManufacturerBasicInfoTab,
  ManufacturerFirmwareInfoTab,
} from "src/pages/Charger/components/ManufacturerInfoTemplates";
import { useLoaderData } from "react-router";

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerDetail = () => {
  /** init 제조사 상세 데이터 (basic info) */
  const data = useLoaderData();

  const [tabList, setTabList] = useState([{ label: "충전기 제조사 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const [tab, setTab] = useState<tabType>("BASIC");
  const [type, setType] = useState<"DETAIL" | "UPDATE">("DETAIL");

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={() => {}}
        onClose={() => {}}
      />
      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 제조사 관리", href: "" },
            { label: "충전기 제조사 상세", href: "" },
          ]}
          title={"충전기 제조사 상세"}
        />
        <InfoSection className={"mt-3"}>
          <div
            className={"d-flex justify-content-between mb-2 align-items-center"}
          >
            <Label className={"fw-semibold font-size-16 m-0"}>
              {tab === "BASIC" ? "기본정보" : "펌웨어 정보"}
            </Label>
            <ButtonGroup>
              <ButtonBase
                label={"기본정보"}
                outline={!(tab === "BASIC")}
                onClick={() => setTab("BASIC")}
                color={"turu"}
              />
              <ButtonBase
                label={"펌웨어 정보"}
                outline={!(tab === "FIRMWARE")}
                onClick={() => setTab("FIRMWARE")}
                color={"turu"}
              />
            </ButtonGroup>
          </div>

          <TabSection>
            {tab === "BASIC" ? (
              <ManufacturerBasicInfoTab type={type} />
            ) : (
              <ManufacturerFirmwareInfoTab type={type} />
            )}
          </TabSection>
        </InfoSection>
        <div className={"d-flex justify-content-center mt-5"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs"} />
          <ButtonBase
            label={"삭제"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
          />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
