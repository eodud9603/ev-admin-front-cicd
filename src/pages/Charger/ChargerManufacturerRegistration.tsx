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
import {
  IManufactureModelItem,
  IRequestManufactureRegisterAll,
} from "src/api/manufactures/manufactureApi.interface";
import { postManufactureRegisterAll } from "src/api/manufactures/manufactureApi";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import { useLoaderData, useNavigate } from "react-router";
import DetailCancelModal from "src/components/Common/Modal/DetailCancelModal";
import {
  YUP_CHARGER_MANUFACTURE,
  YUP_CHARGER_MANUFACTURE_FIRMWARE,
} from "src/constants/valid/charger";
import createValidation from "src/utils/validate";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import DetailSaveModal from "src/pages/Charger/components/DetailSaveModal";
import { lock } from "src/utils/lock";
import { useTabs } from "src/hooks/useTabs";
import { INIT_MANUFACTURE_ADD } from "./loader/manufactureAddLoader";

const PAGE = "충전기 제조사 신규 등록";

const INIT_FIRMWARE_LIST = [
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
];

type tabType = "BASIC" | "FIRMWARE";
export const ChargerManufacturerRegistration = () => {
  const data = useLoaderData() as typeof INIT_MANUFACTURE_ADD;
  const navigate = useNavigate();

  const [tab, setTab] = useState<tabType>(data.tab);

  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 저장 모달 */
  const [saveModal, setSaveModal] = useState<{
    type: tabType;
    isOpen: boolean;
  }>({
    type: "BASIC",
    isOpen: false,
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
  ] = useInputs(data.inputs);
  /* 펌웨어 정보 */
  const [firmwareList, setFirmwareList] = useState<IManufactureModelItem[]>(
    data.firmwareList
  );

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

  /** 탭 변경 */
  const onChangeTab = (changeTab: tabType) => () => {
    if (tab === changeTab) {
      return;
    }

    setSaveModal({
      type: changeTab,
      isOpen: true,
    });
  };

  /** 유효성 체크 */
  const getValid = (
    params: IRequestManufactureRegisterAll,
    type: tabType | "ALL" = "ALL"
  ) => {
    const info = {
      valid: true,
      content: "",
    };

    /** 기본 정보 */
    if (["ALL", "BASIC"].indexOf(type) > -1) {
      const basicScheme = createValidation(YUP_CHARGER_MANUFACTURE);
      const [invalid] = basicScheme(params);

      if (invalid) {
        info.valid = false;
        info.content = invalid.message;

        return info;
      }
    }

    /** 펌웨어 정보 */
    if (["ALL", "FIRMWARE"].indexOf(type) > -1) {
      const firmwareScheme = createValidation(YUP_CHARGER_MANUFACTURE_FIRMWARE);
      const firmwareCount = params.models.length;
      for (let i = 0; i < firmwareCount; i++) {
        const [invalid] = firmwareScheme(params.models[i]);
        if (invalid) {
          info.valid = false;
          info.content = `${i + 1}번째 펌웨어 ` + invalid.message;

          return info;
        }
      }
    }

    return info;
  };

  /** 등록가능한 여부에 따른 등록 버튼 disabled */
  const disabledRegister = () => {
    /** 등록 params */
    const params = {
      ...basicInputs,
      models: firmwareList,
    };

    const { valid } = getValid(params);

    return !valid;
  };

  /** 등록 */
  const register = lock(async () => {
    /** 등록 params */
    const params = {
      ...basicInputs,
      models: firmwareList,
    };

    /* 유효성 체크 */
    const { valid, content } = getValid(params);
    if (!valid) {
      setInvalidModal({
        isOpen: true,
        content,
      });
      return;
    }

    /** 등록 요청 */
    const { code, message } = await postManufactureRegisterAll(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "신규 충전기 제조사 등록 완료",
        contents: "충전기 제조사 정보가 등록되었습니다.",
        confirmHandler: navigateList,
      })();
      return;
    } else {
      onChangeTextModal({
        title: "등록 오류 발생",
        contents: message ?? "충전기 제조사 정보 등록 오류가 발생했습니다.",
        confirmHandler: undefined,
      })();
    }
  });

  useTabs({
    data: { tab, inputs: basicInputs, firmwareList },
    pageTitle: PAGE,
    pageType: "add",
  });

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
            { label: PAGE, href: "" },
          ]}
          title={PAGE}
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
                color={"turu"}
                onClick={onChangeTab("BASIC")}
              />
              <ButtonBase
                label={"펌웨어 정보"}
                outline={!(tab === "FIRMWARE")}
                color={"turu"}
                onClick={onChangeTab("FIRMWARE")}
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
            label={"저장"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
            onClick={() => {
              const params = {
                ...basicInputs,
                models: firmwareList,
              };
              const { valid, content } = getValid(params, tab);
              if (!valid) {
                setInvalidModal({
                  isOpen: true,
                  content,
                });
                return;
              }

              onChangeTextModal({
                title: "충전기 제조사 정보 저장 완료 안내",
                contents: `${
                  tab === "BASIC" ? "기본정보" : "펌웨어 정보"
                }가 저장되었습니다.`,
                confirmHandler: undefined,
              })();
            }}
          />
          <ButtonBase
            disabled={disabledRegister()}
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
      <DetailSaveModal
        isOpen={saveModal.isOpen}
        title={"충전기 제조사 정보 저장 안내"}
        contents={getSaveModalContent(saveModal.type)}
        cancelHandler={() => {
          if (tab === "BASIC") {
            resetBasic();
          }
          if (tab === "FIRMWARE") {
            setFirmwareList(INIT_FIRMWARE_LIST);
          }

          setTab(saveModal.type);
        }}
        saveHandler={() => {
          setSaveModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));

          const params = {
            ...basicInputs,
            models: firmwareList,
          };
          const { valid, content } = getValid(params, tab);
          if (!valid) {
            setInvalidModal({
              isOpen: true,
              content,
            });
            return;
          }

          setTab(saveModal.type);
        }}
        onClose={() => {
          setSaveModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        }}
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

const getSaveModalContent = (type: tabType) => {
  const keyword = type === "BASIC" ? "펌웨어 정보" : "기본정보";
  const screen =
    type === "BASIC"
      ? "정보 저장 후 기본정보 화면으로 이동합니다."
      : "정보 저장 후 펌웨어 정보 화면으로 이동합니다.";

  return `입력된 ${keyword}를 저장하시겠습니까?\n${screen}`;
};
