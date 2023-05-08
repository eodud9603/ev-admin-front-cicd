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
} from "src/api/manufactures/manufactureApi.interface";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import useInputs from "src/hooks/useInputs";
import {
  deleteManufacture,
  postManufactureModifyAll,
} from "src/api/manufactures/manufactureApi";
import DetailCancelModal from "src/components/Common/Modal/DetailCancelModal";
import DetailDeleteModal from "./components/DetailDeleteModal";
import createValidation from "src/utils/validate";
import {
  YUP_CHARGER_MANUFACTURE,
  YUP_CHARGER_MANUFACTURE_EXTRA,
} from "src/constants/valid/charger";
import { getParams } from "src/utils/params";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerDetail = () => {
  /** init 제조사 상세 데이터 (basic info) */
  const { basic, models } = useLoaderData() as {
    basic: IManufactureDetailResponse;
    models: IManufactureModelItem[];
  };
  const navigate = useNavigate();

  const [tab, setTab] = useState<tabType>("BASIC");
  const [type, setType] = useState<"DETAIL" | "UPDATE">("DETAIL");

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 삭제안내 모달 */
  const [deleteModal, setDeleteModal] = useState(false);
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
    models.length > 0
      ? models
      : [
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
        ]
  );

  /** 주소검색 open handler */
  const onChangeAddrModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 텍스트 모달 handler */
  const onChangeTextModal = (data: Partial<typeof textModal>) => () => {
    setTextModal((prev) => ({
      ...prev,
      ...data,
      isOpen: data.isOpen ?? !prev.isOpen,
    }));
  };

  /** 삭제안내 모달 handler */
  const onChangeDeleteModal = () => {
    setDeleteModal((prev) => !prev);
  };

  /** 목록 페이지 이동 */
  const navigateList = () => {
    navigate("/charger/manufacturer");
  };

  /** 삭제 */
  const deleteHandler = async () => {
    const params = {
      id: Number(basic.id),
    };

    /** 유효성 체크 */
    const scheme = createValidation({
      ...YUP_CHARGER_MANUFACTURE_EXTRA,
    });
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /** 삭제 요청 */
    const { code } = await deleteManufacture(params);
    /** 삭제 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "충전기 제조사 정보 삭제 완료",
        contents: "충전기 제조사 정보가 삭제되었습니다.",
        confirmHandler: navigateList,
      })();
      return;
    }
  };

  /** 수정 */
  const modify = async () => {
    /* 수정모드로 변경 */
    if (type === "DETAIL") {
      setType("UPDATE");
      return;
    }

    const params = {
      ...basicInputs,
      models: firmwareList,
      id: Number(basicInputs.id),
    };
    getParams(params);

    /** 유효성 체크 */
    const scheme = createValidation({
      ...YUP_CHARGER_MANUFACTURE,
      ...YUP_CHARGER_MANUFACTURE_EXTRA,
    });
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /** 수정 요청 */
    const { code } = await postManufactureModifyAll(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "충전기 제조사 정보 수정 완료 안내",
        contents: "수정된 충전기 제조사 정보가 저장되었습니다.",
        confirmHandler: undefined,
      })();
      setType("DETAIL");
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
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"w-xs"}
            onClick={() => {
              if (type === "DETAIL") {
                navigateList();
                return;
              }

              if (type === "UPDATE") {
                setIsEditCancel(true);
                return;
              }
            }}
          />
          <ButtonBase
            label={"삭제"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
            onClick={onChangeDeleteModal}
          />
          <ButtonBase
            label={type === "DETAIL" ? "수정" : "저장"}
            color={"turu"}
            className={"w-xs"}
            onClick={modify}
          />
        </div>
      </BodyBase>

      {/* 모달 모음 */}
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
        isOpen={isEditCancel}
        onClose={() => {
          setIsEditCancel(false);
        }}
        cancelHandler={navigateList}
        title={"충전기 제조사 정보 수정 취소 안내"}
        contents={
          "수정된 충전기 제조사 정보가 저장되지 않습니다.\n수정을 취소하시겠습니까?"
        }
      />
      <DetailDeleteModal
        isOpen={deleteModal}
        onClose={onChangeDeleteModal}
        deleteHandler={deleteHandler}
        title={"충전기 제조사 정보 삭제 안내"}
        contents={"충전기 제조사 정보를 삭제하시겠습니까?"}
      />
      <DetailCompleteModal {...textModal} onClose={onChangeTextModal({})} />
    </ContainerBase>
  );
};

const InfoSection = styled.section``;
const TabSection = styled.section``;
