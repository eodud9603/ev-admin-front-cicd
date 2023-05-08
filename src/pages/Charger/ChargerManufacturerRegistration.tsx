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
import { postManufactureRegisterAll } from "src/api/manufactures/manufactureApi";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import { useNavigate } from "react-router";
import DetailCancelModal from "src/components/Common/Modal/DetailCancelModal";
import { YUP_CHARGER_MANUFACTURE } from "src/constants/valid/charger";
import createValidation from "src/utils/validate";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerRegistration = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<tabType>("BASIC");

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 수정취소 모달 */
  const [isRegisterCancel, setIsRegisterCancel] = useState(false);
  /* 텍스트 모달 */
  const [textModal, setTextModal] = useState({
    isOpen: false,
    title: "",
    contents: "",
    confirmHandler: () => {},
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

  /** 목록 페이지 이동 */
  const navigateList = () => {
    navigate("/charger/manufacturer");
  };

  /** 주소검색 open handler */
  const onChangeAddrModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 취소안내 모달 handler */
  const onChangeCancelModal = () => {
    setIsRegisterCancel((prev) => !prev);
  };

  /** 텍스트 모달 handler */
  const onChangeTextModal = (data: Partial<typeof textModal>) => () => {
    setTextModal((prev) => ({
      ...prev,
      ...data,
      isOpen: data.isOpen ?? !prev.isOpen,
    }));
  };

  const params = {
    ...basicInputs,
    models: firmwareList,
  };

  /** 등록 */
  const register = async () => {
    /** 유효성 체크 */
    const scheme = createValidation(YUP_CHARGER_MANUFACTURE);
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /** 등록 요청 */
    const { code } = await postManufactureRegisterAll(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "신규 충전기 제조사 등록 완료",
        contents: "충전기 제조사 정보가 등록되었습니다.",
        confirmHandler: navigateList,
      })();
      return;
    }
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
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"w-xs"}
            onClick={onChangeCancelModal}
          />
          <ButtonBase
            disabled={true}
            label={"저장"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
          />
          <ButtonBase
            disabled={true}
            label={"등록"}
            color={"turu"}
            className={"w-xs"}
            onClick={register}
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
      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <DetailCancelModal
        isOpen={isRegisterCancel}
        onClose={onChangeCancelModal}
        cancelHandler={navigateList}
        title={"충전기 제조사 신규 등록 취소 안내"}
        contents={
          "입력된 충전기 제조사 정보가 저장되지 않습니다.\n신규 등록을 취소하시겠습니까?"
        }
      />
      <DetailCompleteModal {...textModal} onClose={onChangeTextModal({})} />
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
