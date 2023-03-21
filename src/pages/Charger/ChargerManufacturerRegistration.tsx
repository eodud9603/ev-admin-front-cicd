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

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerRegistration = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전기 제조사 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const [tab, setTab] = useState<tabType>("BASIC");
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
            { label: "충전기 제조사 관리", href: "" },
            { label: "충전기 제조사 신규 등록", href: "" },
          ]}
          title={"충전기 제조사 신규 등록"}
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
              <ManufacturerBasicInfoTab type={"ADD"} />
            ) : (
              <ManufacturerFirmwareInfoTab type={"ADD"} />
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
            disabled={true}
          />
          <ButtonBase
            label={"수정"}
            color={"turu"}
            className={"w-xs"}
            disabled={true}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
