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
import { deleteManufacture } from "src/api/manufactures/manufactureApi";
import { IManufactureDetailResponse } from "src/api/manufactures/manufactureApi.interface";
import { number } from "yup";
import DetailDeleteModal from "src/pages/Charger/components/DetailDeleteModal";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";

const idValidation = number().required("id값이 없습니다.");

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerDetail = () => {
  /** init 제조사 상세 데이터 (basic info) */
  const data = useLoaderData() as IManufactureDetailResponse | null;

  const [tabList, setTabList] = useState([{ label: "충전기 제조사 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const [tab, setTab] = useState<tabType>("BASIC");
  const [type, setType] = useState<"DETAIL" | "UPDATE">("DETAIL");

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 삭제안내 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  /* 텍스트 모달 */
  const [textModal, setTextModal] = useState({
    isOpen: false,
    title: "",
    contents: "",
  });

  const navigate = useNavigate();

  /** 주소검색 open handler */
  const onChangeAddrModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 삭제안내 모달 handler */
  const onChangeDeleteModalVisible = () => {
    setDeleteModalOpen((prev) => !prev);
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

  /** 삭제 */
  const deleteHandler = async () => {
    /* 유효성 체크 */
    const valid = await idValidation.isValid(data?.id);
    if (!valid) {
      return;
    }
    /* 삭제 요청 */
    const { code } = await deleteManufacture({ id: data!.id });
    /* 삭제 성공 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "충전기 제조사 정보 삭제 완료",
        contents: "충전기 제조사 정보가 삭제되었습니다.",
      })();
    }
  };

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
              <ManufacturerBasicInfoTab
                type={type}
                onChangeModal={onChangeAddrModalVisible}
              />
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
            onClick={onChangeDeleteModalVisible}
          />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs"} />
        </div>
      </BodyBase>

      <DetailDeleteModal
        isOpen={deleteModalOpen}
        onClose={onChangeDeleteModalVisible}
        deleteHandler={deleteHandler}
        onClosed={() => {}}
        title={"충전기 제조사 정보 삭제 안내"}
        contents={"충전기 제조사 정보를 삭제하시겠습니까?"}
      />
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
          /** @TODO 검색된 주소 데이터, 추가 데이터 필요시, 모달 response 추가 */
        }}
      />
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
