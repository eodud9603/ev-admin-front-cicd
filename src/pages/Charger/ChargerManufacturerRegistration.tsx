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
import useInputs from "src/hooks/useInputs";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import { IManufactureModelItem } from "src/api/manufactures/manufactureApi.interface";

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerRegistration = () => {
  const [tab, setTab] = useState<tabType>("BASIC");

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);

  /* 기본정보 */
  const [
    basicInputs,
    {
      onChange: onChangeBasic,
      onChangeSingle: onChangeSingleBasic,
      reset: resetBasic,
    },
  ] = useInputs({
    code: "",
    name: "",
    identifier: "",
    companyId: "",
    managerName: "",
    managerPhone: "",
    managerExtPhone: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "" /** @TODO 서버에서 추가해줘야 하는 필드 */,
  });
  /* 펌웨어 정보 */
  const [firmwareList, setFirmwareList] = useState<IManufactureModelItem[]>([
    {
      id: undefined,
      modelName: "",
      manufactureId: undefined,
      size: undefined,
      version: "",
      firmwareId: undefined,
      firmwareFileName: "",
      firmwareFileUrl: "",
      imageId: undefined,
      imageFileName: "",
      imageUrl: "",
    },
  ]);

  /** 주소검색 open handler */
  const onChangeAddrModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup />
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
              <ManufacturerBasicInfoTab
                type={"ADD"}
                onChangeModal={onChangeAddrModalVisible}
                inputs={basicInputs}
                onChange={onChangeBasic}
              />
            ) : (
              <ManufacturerFirmwareInfoTab
                type={"ADD"}
                list={firmwareList}
                setList={setFirmwareList}
              />
            )}
          </TabSection>
        </InfoSection>
        <div className={"d-flex justify-content-center mt-5"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs"} />
          <ButtonBase
            label={"저장"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
            disabled={true}
          />
          <ButtonBase
            label={"등록"}
            color={"turu"}
            className={"w-xs"}
            disabled={true}
          />
        </div>
      </BodyBase>

      <AddressSearchModal
        isOpen={addrSearchModalOpen}
        onClose={onChangeAddrModalVisible}
        onchange={(data) => {
          onChangeSingleBasic({
            zipCode: data.zipCode,
            address: data.address,
          });
        }}
      />
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
