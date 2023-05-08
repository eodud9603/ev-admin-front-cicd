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
import { useLoaderData, useNavigate } from "react-router";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import {
  IManufactureDetailResponse,
  IManufactureModelItem,
  IManufactureModelListResponse,
} from "src/api/manufactures/manufactureApi.interface";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import useInputs from "src/hooks/useInputs";

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerDetail = () => {
  /** init 제조사 상세 데이터 (basic info) */
  const { basic, model } = useLoaderData() as {
    basic: IManufactureDetailResponse;
    model: IManufactureModelListResponse;
  };
  const navigate = useNavigate();

  const [tab, setTab] = useState<tabType>("BASIC");
  const [type, setType] = useState<"DETAIL" | "UPDATE">("DETAIL");

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 텍스트 모달 */
  const [textModal, setTextModal] = useState({
    isOpen: false,
    title: "",
    contents: "",
  });

  /* 기본정보 */
  const [
    basicInputs,
    {
      onChange: onChangeBasic,
      onChangeSingle: onChangeSingleBasic,
      reset: resetBasic,
    },
  ] = useInputs({
    id: (basic.id ?? "").toString(),
    code: basic.code ?? "",
    name: basic.name ?? "",
    companyId: basic.companyId ?? "",
    managerName: basic.managerName ?? "",
    managerPhone: basic.managerPhone ?? "",
    managerExtPhone: basic.managerExtPhone ?? "",
    phone: basic.phone ?? "",
    zipCode: basic.zipCode ?? "",
    address: basic.address ?? "",
    addressDetail:
      basic.addressDetail ?? "" /** @TODO 서버에서 추가해줘야 하는 필드 */,
  });
  /* 펌웨어 정보 */
  const [firmwareList, setFirmwareList] = useState<IManufactureModelItem[]>(
    model.elements.length > 0
      ? model.elements
      : [
          {
            id: undefined,
            modelName: "",
            manufactureId: basic.id,
            size: undefined,
            version: "",
            firmwareId: undefined,
            firmwareFileName: "",
            firmwareFileUrl: "",
            imageId: undefined,
            imageFileName: "",
            imageUrl: "",
          },
        ]
  );

  /** 주소검색 open handler */
  const onChangeAddrModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 텍스트 모달 handler */
  const onChangeTextModal =
    ({ title = "", contents = "" }) =>
    () => {
      setTextModal((prev) => ({
        isOpen: !prev.isOpen,
        title: title || prev.title,
        contents: contents || prev.contents,
      }));
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
              <ManufacturerBasicInfoTab
                type={type}
                onChangeModal={onChangeAddrModalVisible}
                inputs={basicInputs}
                onChange={onChangeBasic}
              />
            ) : (
              <ManufacturerFirmwareInfoTab
                type={type}
                list={firmwareList}
                setList={setFirmwareList}
              />
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
          <ButtonBase
            label={type === "DETAIL" ? "수정" : "저장"}
            color={"turu"}
            className={"w-xs"}
            onClick={() => {
              setType((prev) => (prev === "DETAIL" ? "UPDATE" : "DETAIL"));
            }}
          />
        </div>
      </BodyBase>

      <DetailCompleteModal
        {...textModal}
        onClose={onChangeTextModal({ title: "", contents: "" })}
        confirmHandler={() => {
          navigate("/charger/manufacturer");
        }}
      />
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
