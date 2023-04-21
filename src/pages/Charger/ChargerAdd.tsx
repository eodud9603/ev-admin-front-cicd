import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
import useInputs from "src/hooks/useInputs";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import { postChargerRegister } from "src/api/charger/chargerApi";
import {
  CHARGER_MODE,
  CHARGER_TYPE,
  TChargerModeKeys,
  TChargerRationKeys,
  TChargerTypeKeys,
  TOperationStatusKeys,
} from "src/constants/status";
import { YNType } from "src/api/api.interface";
import {
  IChargerDetailResponse,
  IRequestChargerRegister,
} from "src/api/charger/chargerApi.interface";
import { getParams } from "src/utils/params";
import { objectToArray } from "src/utils/convert";
import ManufacturerDropdown from "src/pages/Charger/components/ManufacturerDropdown";
import ManufacturerModelDropdown from "src/pages/Charger/components/ManufacturerModelDropdown";
import { useTabs } from "src/hooks/useTabs";

const DefaultDropdownData = {
  label: "선택",
  value: "",
};

const ChargerAdd = () => {
  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 설치정보 drop */
  const [isInstallDrop, setIsInstallDrop] = useState(true);
  /* 등록완료 모달 */
  const [isCompleteComplete, setIsCompleteComplete] = useState(false);
  /* 등록취소 모달 */
  const [isCompleteCancel, setIsCompleteCancel] = useState(false);
  /* 충전소검색 모달 */
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);
  /* 기본정보 */
  const [inputs, { onChange, onChangeSingle }] = useInputs({
    chargerKey: "",
    assetNumber: "",
    chargerClass: "" as TChargerRationKeys,
    installType: "" as TChargerTypeKeys, // 서버 확인
    capacity: "",
    isDualChannel: "" as YNType,
    channelType01: "",
    channelType02: "",
    envVersion: "",
    consignmentGubun: "",
    useCode: "", // 서버 확인
    consignmentName: "",
    manufacturerId: "", // 서버 확인
    manufacturerName: "", // 서버 확인
    manufacturerModeId: "", // 서버 확인
    manufacturerModelName: "", // 서버 확인
    operationStatus: "" as TOperationStatusKeys, // 서버 확인
    connectorType: "", // 서버 확인
    isBroken: "" as YNType,
    status: "" as TChargerModeKeys,
    hasPgTerm: "",
    pgName: "",
    infProtocol: "",
    maxChargeTime: "",
    idleCommunicationTime: "",
    busyCommunicationTime: "",
    isRoaming: "" as YNType,
    isKepcoRoaming: "" as YNType,
    rechargeAppAvailable: "", // 서버 확인
    contractPrice: "", // 서버 확인
    qrType: "",
    reservationType: "",
    etcInfo: "",
  });

  const {
    chargerKey,
    assetNumber,
    chargerClass,
    installType,
    isDualChannel,
    channelType02,
    envVersion,
    manufacturerId,
    manufacturerName,
    status,
    maxChargeTime,
    idleCommunicationTime,
    busyCommunicationTime,
    contractPrice,
    etcInfo,
  } = inputs;

  /* 충전소 정보 */
  const [stationInputs, { onChangeSingle: onChangeStationSingle }] = useInputs({
    chargerStationName: "",
    stationKey: "",
  });
  const { chargerStationName } = stationInputs;

  /* 설치 정보 */
  const [
    installInputs,
    { onChange: onChangeInstall, onChangeSingle: onChangeInstallSingle },
  ] = useInputs({
    gubun: "",
    companyName: "",
    installer: "",
    yyyy: "",
    mm: "",
    serverDomain: "",
    serverPort: "",
    sn: "",
    hasTr: "",
    fwVer: "",
    fwVerCurrent: "",
  });
  const {
    companyName,
    yyyy,
    mm,
    serverDomain,
    serverPort,
    fwVer,
    fwVerCurrent,
  } = installInputs;

  /* 모뎀 정보 */
  const [
    modemInputs,
    { onChange: onChangeModem, onChangeSingle: onChangeModemSingle },
  ] = useInputs({
    /* 모뎀  */
    openNumber: "",
    company: "",
    companyPhone: "",
    name: "",
    sn: "",
    /* 통신사  */
    carrierName: "",
    commFee: "",
    /* 개통사  */
    openCompany: "",
    openCompanyPhone: "",
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

  /** 등록 */
  const register = async () => {
    /** 설치 정보 */
    const installParams = { ...installInputs };
    /** 모뎀 정보 */
    const modemParams = { ...modemInputs };

    getParams(installParams);
    getParams(modemParams);

    /** 등록 정보 */
    const registerParams: IRequestChargerRegister = {
      /* 기본 정보 */
      ...inputs,
      maxChargeTime: Number(maxChargeTime),
      idleCommunicationTime: Number(idleCommunicationTime),
      busyCommunicationTime: Number(busyCommunicationTime),
      /* 충전소 정보 */
      station: {
        stationKey: stationInputs.stationKey,
      },

      install: {
        ...installParams,

        modem: modemParams,
      },
    };
    getParams(registerParams);

    /* 등록 요청 */
    const { code } = await postChargerRegister(registerParams);
    /* 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 저장 성공 */
      setIsCompleteComplete(true);
    }
  };

  /** focus시, unmounted됐을 때, 가장 최신 데이터 가져오는 콜백 함수 */
  const { dataCallback } = useTabs({
    data: inputs,
    pageTitle: "충전기 등록",
    pageType: "add",
  });

  /** focus시, unmounted됐을 때, 가장 최신 데이터로 input값 저장 */
  useEffect(() => {
    // @ts-ignore
    //TODO:: type 지정
    onChangeSingle(dataCallback());
  }, [dataCallback]);

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 관리", href: "" },
            { label: "충전기 등록", href: "" },
          ]}
          title={"충전기 등록"}
        />

        <div>
          <div className={"mb-3"}>
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
          </div>

          {/* 기본정보 */}
          {isDefaultInfoDrop && (
            <Row className={"mb-5 border-bottom border-2"}>
              <DetailRow>
                <DetailLabelCol sm={2}>충전소명</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"d-flex align-items-center gap-3"}>
                    {/** @TODO 충전소명 검색을 통해 인풋값이 채워져야할 것으로 보임 */}
                    <TextInputBase
                      inputstyle={{ flex: 1 }}
                      bsSize={"lg"}
                      disabled={true}
                      name={"chargerStationName"}
                      value={chargerStationName}
                      onChange={onChange}
                      placeholder={"충전소명을 입력해주세요"}
                    />
                    <ButtonBase
                      className={"width-110"}
                      label={"충전소 검색"}
                      outline
                      color={"turu"}
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
                        disabled: true,
                        label: "과금형 콘센트",
                        value: "",
                      },
                    ]}
                    onChange={(e) => {
                      onChange(e);
                      /* 급속 충전이 아닐경우, 최대 충전시간 데이터 초기화 */
                      if (e.target.value !== "1") {
                        onChangeSingle({ maxChargeTime: "" });
                      }
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailDropdownRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    title: "설치타입",
                    dropdownItems: [
                      {
                        menuItems: [DefaultDropdownData],
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
                    dropdownItems: [
                      {
                        menuItems: [DefaultDropdownData],
                        onClickDropdownItem: (label, value) => {
                          onChangeSingle({ capacity: value });
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
                      name={"듀얼형"}
                      label={"듀얼형"}
                      value={"Y"}
                      onChange={() => {
                        onChangeSingle({
                          isDualChannel: isDualChannel === "Y" ? "N" : "Y",
                          channelType02:
                            isDualChannel === "N" ? "" : channelType02,
                        });
                      }}
                    />
                    <DropdownBase
                      menuItems={[DefaultDropdownData]}
                      onClickDropdownItem={(_, value) => {
                        onChangeSingle({
                          channelType01: value,
                        });
                      }}
                    />
                    <>
                      {isDualChannel === "Y" && (
                        <DropdownBase
                          menuItems={[DefaultDropdownData]}
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
                    name={"envVersion"}
                    bsSize={"lg"}
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
                    ],
                    onChange,
                  },
                  {
                    title: "사용/전용 구분",
                    name: "useCode",
                    list: [
                      {
                        label: "사용",
                        value: "Y",
                      },
                      {
                        label: "미사용",
                        value: "N",
                      },
                      {
                        label: "전용",
                        value: "",
                      },
                    ],
                    onChange,
                  },
                ]}
              />

              {/** @TODO (CPO, 계약된 법인, 개인회원-미확정 선택 가능) */}
              <DetailRow>
                <DetailLabelCol sm={2}>위탁사명</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    menuItems={[DefaultDropdownData]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ consignmentName: value });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>제조사</DetailLabelCol>
                <DetailContentCol sm={4}>
                  <DetailGroupCol className={"gap-4"}>
                    <ManufacturerDropdown
                      onChange={(data) => {
                        onChangeSingle({
                          manufacturerId: data.id?.toString(),
                          manufacturerName: data.name,
                          manufacturerModeId: "",
                          manufacturerModelName: "",
                        });
                      }}
                    />
                    <ManufacturerModelDropdown
                      disabled={!manufacturerName}
                      id={Number(manufacturerId || -1)}
                      onChange={(data) => {
                        onChangeSingle({
                          manufacturerModeId: data.id?.toString(),
                          manufacturerModelName: data.modelName,
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
                        value: "",
                      },
                      {
                        label: "수리중",
                        value: "",
                      },
                      {
                        label: "철거",
                        value: "DEMOLISHED",
                      },
                      {
                        label: "철거예정",
                        value: "TO_BE_DEMOLISH",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전 커넥터 종류</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    menuItems={[
                      DefaultDropdownData,
                      ...objectToArray(CHARGER_TYPE),
                    ]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ connectorType: value });
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
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 상태</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    menuItems={[
                      DefaultDropdownData,
                      ...objectToArray(CHARGER_MODE),
                    ]}
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
                        value: "1",
                      },
                      {
                        label: "N",
                        value: "2",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>결제단말기 PG사</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    menuItems={[DefaultDropdownData]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ pgName: value });
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>연동 규격</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    menuItems={[DefaultDropdownData]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ infProtocol: value });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>
                  최대 충전 시간(분) - 급속
                </DetailLabelCol>
                {/** @TODO 완속 또는 과금형인 경우 해당 텍스트 필드 미노출, 입력 비활성화 분기처리 필요 */}
                <DetailContentCol>
                  <TextInputBase
                    disabled={chargerClass !== "QUICK"}
                    bsSize={"lg"}
                    name={"maxChargeTime"}
                    value={maxChargeTime}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    title: "미사용 전송 주기(분)",
                    name: "idleCommunicationTime",
                    content: idleCommunicationTime,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    title: "충전중 전송 주기(분)",
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
                        value: "1",
                      },
                      {
                        label: "미연동",
                        value: "2",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "한전 연동 여부",
                    name: "isKepcoRoaming",
                    list: [
                      {
                        label: "연동",
                        value: "1",
                      },
                      {
                        label: "미연동",
                        value: "2",
                      },
                    ],
                    onChange,
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>앱 충전 가능 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"rechargeAppAvailable"}
                    list={[
                      {
                        label: "Y",
                        value: "1",
                      },
                      {
                        label: "N",
                        value: "2",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>계약 단가(원)</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    name={"contractPrice"}
                    value={contractPrice}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextRadioRow
                rows={[
                  {
                    title: "QR 연동여부",
                    name: "qrType",
                    list: [
                      {
                        label: "없음",
                        value: "1",
                      },
                      {
                        label: "카카오",
                        value: "2",
                      },
                      {
                        label: "티맵",
                        value: "3",
                      },
                      {
                        label: "현대 E-PIT",
                        value: "4",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "예약 가능 여부",
                    name: "reservationType",
                    list: [
                      {
                        label: "비예약",
                        value: "1",
                      },
                      {
                        label: "예약",
                        value: "2",
                      },
                      {
                        label: "시범",
                        value: "3",
                      },
                    ],
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 2,
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
                    list={[
                      {
                        label: "자체",
                        value: "자체",
                      },
                      {
                        label: "보조금",
                        value: "보조금",
                      },
                      {
                        label: "납품",
                        value: "납품",
                      },
                      {
                        label: "위탁",
                        value: "위탁",
                      },
                    ]}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>설치업체</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    name={"companyName"}
                    value={companyName}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 연도",
                    name: "yyyy",
                    content: yyyy,
                    onChange: onChangeInstall,
                    placeholder: "숫자만 입력해주세요 (ex. 2023)",
                  },
                  {
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 월",
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
                    titleWidthRatio: 4,
                    title: "서버 도메인",
                    name: "serverDomain",
                    content: serverDomain,
                    onChange: onChangeInstall,
                  },
                  {
                    titleWidthRatio: 4,
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
                    ]}
                    onChange={onChangeInstall}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    title: "충전기 펌웨어",
                    name: "fwVer",
                    content: fwVer,
                    onChange: onChangeInstall,
                  },
                  /** @TODO 자동 노출 표시로 disabled true 고정 */
                  {
                    titleWidthRatio: 4,
                    disabled: true,
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
                    titleWidthRatio: 4,
                    title: "모뎀 제조사",
                    name: "company",
                    content: company,
                    onChange: onChangeModem,
                  },
                  {
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
                    titleWidthRatio: 4,
                    title: "모뎀명",
                    name: "name",
                    content: name,
                    onChange: onChangeModem,
                  },
                  {
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
                    titleWidthRatio: 4,
                    title: "통신사",
                    name: "carrierName",
                    content: carrierName,
                    onChange: onChangeModem,
                  },
                  {
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
                    titleWidthRatio: 4,
                    title: "개통사",
                    name: "openCompany",
                    content: openCompany,
                    onChange: onChangeModem,
                  },
                  {
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
          rightButtonTitle={"등록"}
          listHandler={() => {
            setIsCompleteCancel(true);
          }}
          rightButtonHandler={register}
        />
      </BodyBase>

      <DetailCompleteModal
        isOpen={isCompleteComplete}
        onClose={() => {
          setIsCompleteComplete((prev) => !prev);
        }}
        onClosed={() => {
          navigate("/charger/charger");
        }}
        title={"신규 충전기 등록 완료"}
        contents={"충전기 정보가 등록되었습니다."}
      />
      <DetailCancelModal
        isOpen={isCompleteCancel}
        onClose={() => {
          setIsCompleteCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/charger");
        }}
        title={"신규 충전기 정보 등록 취소 안내"}
        contents={
          "입력된 충전기 정보가 저장되지 않습니다.\n신규 등록을 취소하시겠습니까?"
        }
      />
      <StationSearchModal
        type={"STATION"}
        size={"xl"}
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
      />
    </ContainerBase>
  );
};

export default ChargerAdd;

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
