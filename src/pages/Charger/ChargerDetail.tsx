import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DetailTextRadioRow } from "src/components/Common/DetailContentRow/DetailTextRadioRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";
import DetailBottomButton from "src/pages/Charger/components/DetailBottomButton";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import useInputs from "src/hooks/useInputs";
import { useTabs } from "src/hooks/useTabs";
import { chargerDetailLoaderType } from "src/pages/Charger/loader/chargerDetailLoader";
import {
  CAPACITY,
  CHARGER_MODE,
  CHARGER_TYPE,
  INFPROTOCOL_STATUS,
  INSTALL_GUBUN,
  INSTALL_TYPE,
  PG_CODE,
  QR_TYPE,
  RESERVATION_TYPE,
  TCapacityKeys,
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TInfprotocolStatusKeys,
  TInstallGubunKeys,
  TInstallTypeKeys,
  TOperationStatusKeys,
  TPgCodeKeys,
  TQrTypeKeys,
  TReservationTypeKeys,
  USE_CODE,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";
import { objectToArray } from "src/utils/convert";
import ManufacturerModelDropdown from "src/pages/Charger/components/ManufacturerModelDropdown";
import ManufacturerDropdown from "src/pages/Charger/components/ManufacturerDropdown";
import { CHANNEL_TYPE_LIST } from "src/constants/list";
import { postChargerModify } from "src/api/charger/chargerApi";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import {
  YUP_CHARGER,
  YUP_CHARGER_EXTRA,
  YUP_CHARGER_INSTALL,
  YUP_CHARGER_IN_STATION,
  YUP_CHARGER_MODEM,
} from "src/constants/valid/charger";
import DetailValidCheckModal from "src/pages/Charger/components/DetailValidCheckModal";
import { IRequestChargerModify } from "src/api/charger/chargerApi.interface";

const DefaultDropdownData = {
  label: "선택",
  value: "",
};

const ChargerDetail = () => {
  /** init 충전기 상세 데이터 */
  const { charger, editable = false } =
    useLoaderData() as chargerDetailLoaderType;

  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 설치정보 drop */
  const [isInstallDrop, setIsInstallDrop] = useState(true);

  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 충전소검색 모달 */
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);

  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(!editable);

  /* 기본정보 */
  const [inputs, { onChange, onChangeSingle }] = useInputs({
    id: charger.id,
    chargerKey: (charger.chargerKey ?? "").toString(),
    assetNumber: (charger.assetNumber ?? "").toString(),
    chargerClass: (charger.chargerClass ?? "") as TChargerRationKeys,
    installType: (charger.installType ?? "") as TInstallTypeKeys,
    capacity: (charger.capacity ?? "").toString() as `${TCapacityKeys}`,
    isDualChannel: (charger.channelType02 ? "Y" : "N") as YNType,
    channelType01: charger.channelType01 ?? "",
    channelType02: charger.channelType02 ?? "",
    envVersion: charger.envVersion ?? "",
    consignmentGubun: charger.consignmentGubun ?? "",
    useCode: charger.useCode ?? "", // 서버 확인
    consignmentName: charger.consignmentName ?? "",
    manufactureId: (charger.manufactureId ?? "").toString(),
    manufactureCode: charger.manufactureCode ?? "",
    manufactureName: charger.manufactureName ?? "",
    modelId: (charger.modelId ?? "").toString(),
    model: charger.model ?? "",
    operationStatus: (charger.operationStatus ?? "") as TOperationStatusKeys,
    type: (charger.type ?? "") as TChargerTypeKeys,
    isBroken: (charger.isBroken ?? "") as YNType,
    status: (charger.status ?? "") as TChargerModeKeys,
    hasPgTerm: (charger.hasPgTerm ?? "") as YNType,
    pgCode: (charger.pgCode ?? "") as TPgCodeKeys,
    pgName: charger.pgName ?? "",
    infProtocol: (charger.infProtocol ?? "") as TInfprotocolStatusKeys,
    maxChargeTime: (charger.maxChargeTime ?? "").toString(),
    idleCommunicationTime: (charger.idleCommunicationTime ?? "").toString(),
    busyCommunicationTime: (charger.busyCommunicationTime ?? "").toString(),
    isRoaming: (charger.isRoaming ?? "") as YNType,
    isKepcoRoaming: (charger.isKepcoRoaming ?? "") as YNType,
    enableCharging: (charger.enableCharging ?? "") as YNType, // 서버 확인
    unitPrice: (charger.unitPrice ?? "").toString(),
    qrType: (charger.qrType ?? "") as TQrTypeKeys,
    reservationType: (charger.reservationType ?? "") as TReservationTypeKeys,
    etcInfo: charger.etcInfo ?? "",
  });
  const {
    chargerKey,
    assetNumber,
    chargerClass,
    installType,
    capacity,
    isDualChannel,
    channelType01,
    channelType02,
    envVersion,
    manufactureId,
    manufactureCode,
    manufactureName,
    modelId,
    model,
    status,
    maxChargeTime,
    idleCommunicationTime,
    busyCommunicationTime,
    unitPrice,
    etcInfo,
    operationStatus,
    consignmentGubun,
    useCode,
    isBroken,
    hasPgTerm,
    pgCode,
    isRoaming,
    isKepcoRoaming,
    enableCharging,
    qrType,
    reservationType,
    type,
    infProtocol,
  } = inputs;

  /* 충전소 정보 */
  const [stationInputs, { onChangeSingle: onChangeStationSingle }] = useInputs({
    chargerStationName: charger.station?.stationName ?? "",
    stationKey: charger.station?.stationKey ?? "",
  });
  const { chargerStationName } = stationInputs;

  /* 설치 정보 */
  const [
    installInputs,
    { onChange: onChangeInstall, onChangeSingle: onChangeInstallSingle },
  ] = useInputs({
    id: charger.install?.id,
    gubun: (charger.install?.gubun ?? "") as TInstallGubunKeys,
    companyName: charger.install?.companyName ?? "",
    yyyy: charger.install?.yyyy ?? "",
    mm: charger.install?.mm ?? "",
    serverDomain: charger.install?.serverDomain ?? "",
    serverPort: (charger.install?.serverPort ?? "").toString(),
    sn: charger.install?.sn ?? "",
    hasTr: charger.install?.hasTr ?? "",
    fwVer: charger.install?.fwVer ?? "",
    fwVerCurrent: charger.install?.fwVerCurrent ?? "",
  });
  const {
    gubun,
    companyName,
    yyyy,
    mm,
    serverDomain,
    serverPort,
    hasTr,
    fwVer,
    fwVerCurrent,
  } = installInputs;

  /* 모뎀 정보 */
  const [
    modemInputs,
    { onChange: onChangeModem, onChangeSingle: onChangeModemSingle },
  ] = useInputs({
    id: charger.install?.modem?.id,
    /* 모뎀  */
    openNumber: charger.install?.modem?.openNumber ?? "",
    company: charger.install?.modem?.company ?? "",
    companyPhone: charger.install?.modem?.companyPhone ?? "",
    name: charger.install?.modem?.name ?? "",
    sn: charger.install?.modem?.sn ?? "",
    /* 통신사  */
    carrierName: charger.install?.modem?.carrierName ?? "",
    commFee: charger.install?.modem?.commFee ?? "",
    /* 개통사  */
    openCompany: charger.install?.modem?.openCompany ?? "",
    openCompanyPhone: charger.install?.modem?.companyPhone ?? "",
  });
  const {
    openNumber,
    company,
    companyPhone,
    name,
    carrierName,
    commFee,
    openCompany,
    openCompanyPhone,
  } = modemInputs;

  const navigate = useNavigate();

  useTabs({
    data: inputs,
    pageTitle: "충전기 상세",
    pageType: "detail",
    editable: !disabled,
  });

  /** 수정 */
  const modify = async () => {
    if (disabled) {
      setDisabled((prev) => !prev);
      return;
    }

    /** 설치 정보 */
    const installParams = { ...installInputs };
    /** 모뎀 정보 */
    const modemParams = { ...modemInputs };

    getParams(installParams);
    getParams(modemParams);

    /** 등록 정보 */
    const modifyParams: IRequestChargerModify = {
      /* 기본 정보 */
      ...inputs,
      assetNumber: Number(assetNumber),
      chargerKey: Number(chargerKey),
      maxChargeTime: Number(maxChargeTime),
      idleCommunicationTime: Number(idleCommunicationTime),
      busyCommunicationTime: Number(busyCommunicationTime),
      manufactureId: Number(manufactureId),
      modelId: Number(modelId),
      unitPrice: Number(unitPrice),
      /* 충전소 정보 */
      station: {
        /** @description 현재 충전기 id 생성 이슈로 stationKey: "11111111" 충전소로만 생성 가능 */
        stationKey: stationInputs.stationKey,
      },
      /* 설치 정보 */
      install: {
        ...installParams,
        serverPort: Number(installParams.serverPort),
        /* 모뎀 정보 */
        modem: modemParams,
      },
    };
    getParams(modifyParams);

    /* 유효성 체크 */
    const scheme = createValidation({
      ...YUP_CHARGER_IN_STATION,
      ...YUP_CHARGER,
      ...YUP_CHARGER_EXTRA,
      ...YUP_CHARGER_INSTALL,
      ...YUP_CHARGER_MODEM,
    });
    const [invalid] = scheme({
      ...stationInputs,
      ...modifyParams,
      ...installParams,
      ...modemParams,
    });

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 수정 요청 */
    const { code } = await postChargerModify(modifyParams);
    /* 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 저장 성공 */
      setIsEditComplete(true);
    }
  };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 관리", href: "" },
            { label: "충전기 상세", href: "" },
          ]}
          title={"충전기 상세"}
        />

        <div>
          <div
            className={"mb-3 d-flex align-items-center justify-content-between"}
          >
            <DropArea
              className={"gap-1"}
              onClick={() => setIsDefaultInfoDrop((prev) => !prev)}
            >
              <span className={"font-size-20 fw-bold"}>기본정보</span>
              <Icon
                isOpen={isDefaultInfoDrop}
                className={"mdi mdi-chevron-up font-size-24"}
              />
            </DropArea>

            <div className={"d-flex align-items-center gap-3"}>
              <ButtonBase
                className={"width-110"}
                label={"충전기 제어"}
                color={"turu"}
                outline
              />
              <ButtonBase
                className={"width-110"}
                label={"펌웨어 관리"}
                color={"turu"}
                outline
              />
            </div>
          </div>

          {/* 기본정보 */}
          {isDefaultInfoDrop && (
            <Row className={"mb-5 border-bottom border-2"}>
              <DetailRow>
                <DetailLabelCol sm={2}>충전소명</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"d-flex align-items-center gap-3"}>
                    <TextInputBase
                      inputstyle={{ flex: 1 }}
                      bsSize={"lg"}
                      disabled={true}
                      name={"chargerStationName"}
                      value={chargerStationName}
                      onChange={onChange}
                    />

                    <ButtonBase
                      className={"width-110"}
                      disabled={disabled}
                      label={"충전소 검색"}
                      outline
                      color={disabled ? "secondary" : "turu"}
                      onClick={() => {
                        setIsStationSearchModal(true);
                      }}
                    />
                  </DetailGroupCol>
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={true}
                    name={"chargerKey"}
                    value={chargerKey}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 자산번호</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={disabled}
                    name={"assetNumber"}
                    value={assetNumber}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>종별</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"chargerClass"}
                    list={[
                      {
                        label: "급속",
                        value: "QUICK",
                      },
                      {
                        label: "완속",
                        value: "STANDARD",
                      },
                      {
                        label: "과금형 콘센트",
                        value: undefined,
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === chargerClass,
                    }))}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailDropdownRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "설치타입",
                    dropdownItems: [
                      {
                        menuItems: [
                          DefaultDropdownData,
                          ...objectToArray(INSTALL_TYPE),
                        ],
                        initSelectedValue: {
                          label: INSTALL_TYPE[installType],
                          value: installType,
                        },
                        onClickDropdownItem: (label, value) => {
                          onChangeSingle({
                            installType: value as typeof installType,
                          });
                        },
                      },
                    ],
                  },
                  {
                    titleWidthRatio: 4,
                    title: "충전 용량",
                    disabled,
                    dropdownItems: [
                      {
                        menuItems: [
                          DefaultDropdownData,
                          ...objectToArray(CAPACITY),
                        ],
                        initSelectedValue: {
                          label: CAPACITY[capacity],
                          value: capacity,
                        },
                        onClickDropdownItem: (label, value) => {
                          onChangeSingle({
                            capacity: value as typeof capacity,
                          });
                        },
                      },
                    ],
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>서버통신채널</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol>
                    <CheckBoxBase
                      disabled={disabled}
                      name={"듀얼형"}
                      label={"듀얼형"}
                      value={"Y"}
                      checked={isDualChannel === "Y"}
                      onChange={() => {
                        onChangeSingle({
                          isDualChannel: isDualChannel === "Y" ? "N" : "Y",
                          channelType02:
                            isDualChannel === "N" ? "" : channelType02,
                        });
                      }}
                    />
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[DefaultDropdownData, ...CHANNEL_TYPE_LIST]}
                      initSelectedValue={{
                        label: channelType01,
                        value: channelType01,
                      }}
                      onClickDropdownItem={(_, value) => {
                        onChangeSingle({
                          channelType01: value,
                        });
                      }}
                    />
                    <>
                      {isDualChannel === "Y" && (
                        <DropdownBase
                          menuItems={[
                            DefaultDropdownData,
                            ...CHANNEL_TYPE_LIST,
                          ]}
                          initSelectedValue={{
                            label: channelType02,
                            value: channelType02,
                          }}
                          onClickDropdownItem={(_, value) => {
                            onChangeSingle({
                              channelType02: value,
                            });
                          }}
                        />
                      )}
                    </>
                  </DetailGroupCol>
                </DetailContentCol>
                <DetailLabelCol sm={2}>환경변수버전</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={disabled}
                    name={"envVersion"}
                    value={envVersion}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextRadioRow
                rows={[
                  {
                    title: "자사/위탁 구분",
                    name: "consignmentGubun",
                    list: [
                      {
                        label: "자사",
                        value: "1",
                      },
                      {
                        label: "위탁사",
                        value: "2",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === consignmentGubun,
                    })),
                    onChange,
                  },
                  {
                    title: "사용/전용 구분",
                    name: "useCode",
                    list: objectToArray(USE_CODE).map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === useCode,
                    })),
                    onChange,
                  },
                ]}
              />

              {/** @TODO (CPO, 계약된 법인, 개인회원-미확정 선택 가능) */}
              <DetailRow>
                <DetailLabelCol sm={2}>위탁사명</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[DefaultDropdownData]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ consignmentName: value });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>제조사</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"gap-4"}>
                    <ManufacturerDropdown
                      disabled={disabled}
                      initSelectedValue={{
                        code: manufactureCode,
                        name: manufactureName,
                      }}
                      onChange={(data) => {
                        onChangeSingle({
                          manufactureId: data.id?.toString(),
                          manufactureCode: data.code,
                          manufactureName: data.name,
                          modelId: "",
                          model: "",
                        });
                      }}
                    />
                    <ManufacturerModelDropdown
                      disabled={disabled || !manufactureName}
                      id={Number(manufactureId || -1)}
                      initSelectedValue={{
                        value: model,
                        label: modelId,
                      }}
                      onChange={(data) => {
                        onChangeSingle({
                          modelId: data.id?.toString(),
                          model: data.modelName,
                        });
                      }}
                    />
                  </DetailGroupCol>
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 설치 상태</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"operationStatus"}
                    list={[
                      {
                        label: "정상",
                        value: "INSTALLED",
                      },
                      {
                        label: "수리중",
                        value: "REPAIR",
                      },
                      {
                        label: "철거",
                        value: "DEMOLISHED",
                      },
                      {
                        label: "철거예정",
                        value: "TO_BE_DEMOLISH",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === operationStatus,
                    }))}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전 커넥터 종류</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      DefaultDropdownData,
                      ...objectToArray(CHARGER_TYPE),
                    ]}
                    initSelectedValue={{
                      label: CHARGER_TYPE[type],
                      value: type,
                    }}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ type: value as typeof type });
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>고장유무</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"isBroken"}
                    list={[
                      {
                        label: "정상",
                        value: "N",
                      },
                      {
                        label: "고장",
                        value: "Y",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === isBroken,
                    }))}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 상태</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      DefaultDropdownData,
                      ...objectToArray(CHARGER_MODE),
                    ]}
                    initSelectedValue={{
                      label: CHARGER_MODE[status],
                      value: status,
                    }}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ status: value as typeof status });
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>결제단말기 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"hasPgTerm"}
                    list={[
                      {
                        label: "Y",
                        value: "Y",
                      },
                      {
                        label: "N",
                        value: "N",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === hasPgTerm,
                    }))}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>결제단말기 PG사</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[DefaultDropdownData, ...objectToArray(PG_CODE)]}
                    initSelectedValue={{
                      label: PG_CODE[pgCode],
                      value: pgCode,
                    }}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({
                        pgCode: value as typeof pgCode,
                        pgName: label,
                      });
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>연동 규격</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      DefaultDropdownData,
                      ...objectToArray(INFPROTOCOL_STATUS),
                    ]}
                    initSelectedValue={{
                      label: INFPROTOCOL_STATUS[infProtocol],
                      value: infProtocol,
                    }}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({
                        infProtocol: value as typeof infProtocol,
                      });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>
                  최대 충전 시간(분) - 급속
                </DetailLabelCol>
                {/** @TODO 완속 또는 과금형인 경우 해당 텍스트 필드 미노출, 입력 비활성화 분기처리 필요 */}
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    type={"number"}
                    disabled={disabled || chargerClass !== "QUICK"}
                    min={1}
                    max={60}
                    name={"maxChargeTime"}
                    value={maxChargeTime}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "미사용 전송 주기(분)",
                    min: 1,
                    max: 60,
                    name: "idleCommunicationTime",
                    content: idleCommunicationTime,
                    onChange,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "충전중 전송 주기(분)",
                    min: 1,
                    max: 60,
                    name: "busyCommunicationTime",
                    content: busyCommunicationTime,
                    onChange,
                  },
                ]}
              />

              <DetailTextRadioRow
                rows={[
                  {
                    title: "환경부 연동 여부",
                    name: "isRoaming",
                    list: [
                      {
                        label: "연동",
                        value: "Y",
                      },
                      {
                        label: "미연동",
                        value: "N",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === isRoaming,
                    })),
                    onChange,
                  },
                  {
                    title: "한전 연동 여부",
                    name: "isKepcoRoaming",
                    list: [
                      {
                        label: "연동",
                        value: "Y",
                      },
                      {
                        label: "미연동",
                        value: "N",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === isKepcoRoaming,
                    })),
                    onChange,
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>앱 충전 가능 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"enableCharging"}
                    list={[
                      {
                        label: "Y",
                        value: "Y",
                      },
                      {
                        label: "N",
                        value: "N",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === enableCharging,
                    }))}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>계약 단가(원)</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    type={"number"}
                    disabled={disabled}
                    name={"unitPrice"}
                    value={unitPrice}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextRadioRow
                rows={[
                  {
                    title: "QR 연동여부",
                    name: "qrType",
                    list: objectToArray(QR_TYPE).map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === qrType,
                    })),
                    onChange,
                  },
                  {
                    title: "예약 가능 여부",
                    name: "reservationType",
                    list: objectToArray(RESERVATION_TYPE).map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === reservationType,
                    })),
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 2,
                    disabled,
                    title: "특이사항",
                    name: "etcInfo",
                    content: etcInfo,
                    onChange,
                  },
                ]}
              />
            </Row>
          )}

          {/* 계약정보 */}
          <DropArea
            className={"gap-1"}
            onClick={() => setIsInstallDrop((prev) => !prev)}
          >
            <span className={"font-size-20 fw-bold"}>계약정보</span>
            <Icon
              isOpen={isInstallDrop}
              className={"mdi mdi-chevron-up font-size-24"}
            />
          </DropArea>
          {isInstallDrop && (
            <Row className={"mb-5 border-bottom border-2"}>
              <DetailRow>
                <DetailLabelCol sm={2}>설치구분</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"gubun"}
                    list={objectToArray(INSTALL_GUBUN).map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === gubun,
                    }))}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>설치업체</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={disabled}
                    name={"companyName"}
                    value={companyName}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 연도",
                    min: 1970,
                    name: "yyyy",
                    content: yyyy,
                    onChange: onChangeInstall,
                    placeholder: "숫자만 입력해주세요 (ex. 2023)",
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 월",
                    min: 1,
                    max: 12,
                    placeholder: "숫자만 입력해주세요 (ex. 06)",
                    name: "mm",
                    content: mm,
                    onChange: onChangeInstall,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "서버 도메인",
                    name: "serverDomain",
                    content: serverDomain,
                    onChange: onChangeInstall,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "서버 PORT",
                    name: "serverPort",
                    content: serverPort,
                    onChange: onChangeInstall,
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 S/N</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    disabled={disabled}
                    bsSize={"lg"}
                    name={"installSN"}
                    value={installInputs.sn}
                    onChange={(e) => {
                      onChangeInstallSingle({
                        sn: e.target.value,
                      });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>TR 설치여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"hasTr"}
                    list={[
                      {
                        label: "Y",
                        value: "Y",
                      },
                      {
                        label: "N",
                        value: "N",
                      },
                    ].map((data) => ({
                      ...data,
                      disabled,
                      checked: data.value === hasTr,
                    }))}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "충전기 펌웨어",
                    name: "fwVer",
                    content: fwVer,
                    onChange: onChangeInstall,
                  },
                  /** @TODO 자동 노출 표시로 disabled true 고정 */
                  {
                    disabled: true,
                    titleWidthRatio: 4,
                    title: "현재 충전기 펌웨어",
                    name: "fwVerCurrent",
                    content: fwVerCurrent,
                    onChange: onChangeInstall,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 2,
                    title: "모뎀개통 번호",
                    name: "openNumber",
                    content: openNumber,
                    onChange: onChangeModem,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "모뎀 제조사",
                    name: "company",
                    content: company,
                    onChange: onChangeModem,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "모뎀 제조사 연락처",
                    name: "companyPhone",
                    content: companyPhone,
                    onChange: onChangeModem,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "모뎀명",
                    name: "name",
                    content: name,
                    onChange: onChangeModem,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "모뎀 S/N",
                    name: "modelSN",
                    content: modemInputs.sn,
                    onChange: (e) => {
                      onChangeModemSingle({
                        sn: e.target.value,
                      });
                    },
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "통신사",
                    name: "carrierName",
                    content: carrierName,
                    onChange: onChangeModem,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "통신요금",
                    name: "commFee",
                    content: commFee,
                    onChange: onChangeModem,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "개통사",
                    name: "openCompany",
                    content: openCompany,
                    onChange: onChangeModem,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "개통사 연락처",
                    name: "openCompanyPhone",
                    content: openCompanyPhone,
                    onChange: onChangeModem,
                  },
                ]}
              />
            </Row>
          )}
        </div>

        <DetailBottomButton
          containerClassName={"my-5"}
          rightButtonTitle={disabled ? "수정" : "저장"}
          listHandler={() => {
            /* 수정모드 상태에서 목록 버튼 클릭 */
            if (!disabled) {
              setIsEditCancel(true);
              return;
            }

            navigate("/charger/charger");
          }}
          rightButtonHandler={modify}
        />
      </BodyBase>
      {/* 모달 모음 */}
      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <DetailCompleteModal
        isOpen={isEditComplete}
        onClose={() => {
          setIsEditComplete((prev) => !prev);
        }}
        title={"충전기 정보 수정 완료 안내"}
        contents={"수정된 충전기 정보가 저장되었습니다."}
      />
      <DetailCancelModal
        isOpen={isEditCancel}
        onClose={() => {
          setIsEditCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/charger");
        }}
        title={"충전기 정보 수정 취소 안내"}
        contents={
          "수정된 충전기 정보가 저장되지 않습니다.\n수정을 취소하시겠습니까?"
        }
      />
      <StationSearchModal
        type={"STATION"}
        isOpen={isStationSearchModal}
        onClose={() => {
          setIsStationSearchModal((prev) => !prev);
        }}
        onChangeSelected={(data) => {
          onChangeStationSingle({
            chargerStationName: data?.stationName ?? "",
            stationKey: data?.stationId ?? "",
          });
        }}
        size={"xl"}
      />
    </ContainerBase>
  );
};

export default ChargerDetail;

const DropArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.i<{ isOpen: boolean }>`
  transition: all ease 0.5s;
  transform: rotate(${({ isOpen }) => (isOpen ? 0 : 180)}deg);
`;
