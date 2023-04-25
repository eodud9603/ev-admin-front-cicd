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
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import useInputs from "src/hooks/useInputs";
import { IChargerDetailResponse } from "src/api/charger/chargerApi.interface";
import { useTabs } from "src/hooks/useTabs";
import { chargerDetailLoaderType } from "src/pages/Charger/loader/chargerDetailLoader";

const ChargerDetail = () => {
  /** init 충전기 상세 데이터 */
  const { charger, editable = false } =
    useLoaderData() as chargerDetailLoaderType;

  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 설치정보 drop */
  const [isInstallDrop, setIsInstallDrop] = useState(true);
  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(editable);
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 충전소검색 모달 */
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    /* 기본정보 */
    stationName: charger.station?.stationName ?? "",
    id: (charger.id ?? "").toString(),
    assetsNumber: charger.assetNumber ?? "",
    chargerClass: charger.chargerClass ?? "",
    installType: charger.installType ?? "",
    capacity: charger.capacity ?? "",
    /* 듀얼형 */
    isDualChannel: charger.isDualChannel ?? "N",
    channelType01: charger.channelType01 ?? "",
    channelType02: charger.channelType02 ?? "",
    envVersion: charger.envVersion ?? "",
    companyType: "",
    useStatus: "",
    consignmentName: "",
    manufacturerName: "",
    manufacturerModel: "",
    installStatus: "",
    connectorType: "",
    isBroken: charger.isBroken ?? "",
    status: charger.status ?? "",
    hasPgTerm: charger.hasPgTerm ?? "",
    pgName: charger.pgName ?? "",
    infProtocol: charger.infProtocol ?? "",
    maxChargeTime: (charger.maxChargeTime ?? "").toString(),
    idleCommunicationTime: (charger.idleCommunicationTime ?? "").toString(),
    busyCommunicationTime: (charger.busyCommunicationTime ?? "").toString(),
    isRoaming: charger.isRoaming ?? "",
    isKepcoRoaming: charger.isKepcoRoaming ?? "",
    rechargeAppAvailable: "" /** @TODO 앱 충전 가능 여부 추가필요 */,
    contractPrice: "" /** @TODO 예약단가 추가필요 */,
    qrType: charger.qrType ?? "",
    reservationType: charger.reservationType ?? "",
    etcInfo: charger.etcInfo ?? "",
    /* 계약정보 */
    installGubun: charger.install?.gubun ?? "",
    installCompany: charger.install?.companyName ?? "",
    yyyy: charger.install?.yyyy ?? "",
    mm: charger.install?.mm ?? "",
    serverDomain: charger.install?.serverDomain ?? "",
    serverPort: charger.install?.serverPort ?? "",
    chargerSN: charger.install?.sn ?? "",
    hasTr: charger.install?.hasTr ?? "",
    fwVer: charger.install?.fwVer ?? "",
    fwVerCurrent: charger.install?.fwVerCurrent ?? "",
    /* 모뎀  */
    modemOpenNumber: charger.install?.modem?.openNumber ?? "",
    modemCompany: charger.install?.modem?.company ?? "",
    modemCompanyPhone: charger.install?.modem?.companyPhone ?? "",
    modemName: charger.install?.modem?.name ?? "",
    modemSN: charger.install?.modem?.sn ?? "",
    /* 통신사  */
    carrierName: charger.install?.modem?.carrierName ?? "",
    commFee: charger.install?.modem?.commFee ?? "",
    /* 개통사  */
    openCompany: charger.install?.modem?.openCompany ?? "",
    openCompanyPhone: charger.install?.modem?.openCompanyPhone ?? "",
  });

  const {
    stationName,
    id,
    assetsNumber,
    chargerClass,
    isDualChannel,
    channelType02,
    envVersion,
    companyType,
    useStatus,
    installStatus,
    isBroken,
    hasPgTerm,
    maxChargeTime,
    idleCommunicationTime,
    busyCommunicationTime,
    isRoaming,
    isKepcoRoaming,
    rechargeAppAvailable,
    contractPrice,
    qrType,
    reservationType,
    etcInfo,
    installGubun,
    installCompany,
    yyyy,
    mm,
    serverDomain,
    serverPort,
    chargerSN,
    hasTr,
    fwVer,
    fwVerCurrent,
    modemOpenNumber,
    modemCompany,
    modemCompanyPhone,
    modemName,
    modemSN,
    carrierName,
    commFee,
    openCompany,
    openCompanyPhone,
  } = inputs;

  const navigate = useNavigate();

  useTabs({
    data: inputs,
    pageTitle: "충전기 상세",
    pageType: "detail",
    editable: isEditCancel,
  });

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
                      name={"stationName"}
                      value={stationName}
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
                    name={"id"}
                    value={id}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 자산번호</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={true}
                    name={"assetsNumber"}
                    value={assetsNumber}
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
                        value: "1",
                        checked: chargerClass === "1",
                        disabled,
                      },
                      {
                        label: "완속",
                        value: "2",
                        checked: chargerClass === "2",
                        disabled,
                      },
                      {
                        label: "과금형 콘센트",
                        value: "3",
                        checked: chargerClass === "3",
                        disabled,
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailDropdownRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    title: "설치타입",
                    disabled,
                    dropdownItems: [
                      {
                        menuItems: [
                          {
                            label: "스탠드형",
                            value: "1",
                          },
                        ],
                        onClickDropdownItem: (label, value) => {
                          onChangeSingle({ installType: value });
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
                          {
                            label: "100",
                            value: "1",
                          },
                        ],
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
                      disabled={disabled}
                      name={"듀얼형"}
                      label={"듀얼형"}
                      value={"1"}
                      onChange={() => {
                        onChangeSingle({
                          isDualChannel: isDualChannel === "Y" ? "N" : "Y",
                          channelType02:
                            isDualChannel === "Y" ? "" : channelType02,
                        });
                      }}
                    />
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "CH1",
                          value: "1",
                        },
                      ]}
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
                            {
                              label: "CH2",
                              value: "1",
                            },
                          ]}
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
                    name: "companyType",
                    list: [
                      {
                        disabled,
                        label: "자사",
                        value: "1",
                        checked: companyType === "1",
                      },
                      {
                        disabled,
                        label: "위탁사",
                        value: "2",
                        checked: companyType === "2",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "사용/전용 구분",
                    name: "useStatus",
                    list: [
                      {
                        disabled,
                        label: "사용",
                        value: "1",
                        checked: useStatus === "1",
                      },
                      {
                        disabled,
                        label: "미사용",
                        value: "2",
                        checked: useStatus === "2",
                      },
                      {
                        disabled,
                        label: "전용",
                        value: "3",
                        checked: useStatus === "3",
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
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "위탁사(운영사)명 노출",
                        value: "1",
                      },
                    ]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ consignmentName: value });
                    }}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>제조사</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"gap-4"}>
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "제조사명 노출",
                          value: "1",
                        },
                      ]}
                      onClickDropdownItem={(label, value) => {
                        onChangeSingle({ manufacturerName: value });
                      }}
                    />
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "모델명 노출",
                          value: "1",
                        },
                      ]}
                      onClickDropdownItem={(label, value) => {
                        onChangeSingle({ manufacturerModel: value });
                      }}
                    />
                  </DetailGroupCol>
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 설치 상태</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"installStatus"}
                    list={[
                      {
                        disabled,
                        label: "정상",
                        value: "1",
                        checked: installStatus === "1",
                      },
                      {
                        disabled,
                        label: "수리중",
                        value: "2",
                        checked: installStatus === "2",
                      },
                      {
                        disabled,
                        label: "철거",
                        value: "3",
                        checked: installStatus === "3",
                      },
                      {
                        disabled,
                        label: "철거예정",
                        value: "4",
                        checked: installStatus === "4",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전 커넥터 종류</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "DC 콤보",
                        value: "1",
                      },
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
                        disabled,
                        label: "정상",
                        value: "Y",
                        checked: isBroken === "Y",
                      },
                      {
                        disabled,
                        label: "고장",
                        value: "N",
                        checked: isBroken === "N",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 상태</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "충전중",
                        value: "1",
                      },
                    ]}
                    onClickDropdownItem={(label, value) => {
                      onChangeSingle({ status: value });
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
                        disabled,
                        label: "Y",
                        value: "Y",
                        checked: hasPgTerm === "Y",
                      },
                      {
                        disabled,
                        label: "N",
                        value: "N",
                        checked: hasPgTerm === "N",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>결제단말기 PG사</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "스마트로",
                        value: "1",
                      },
                    ]}
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
                    disabled={disabled}
                    menuItems={[{ label: "OCPP 1.6", value: "1" }]}
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
                    bsSize={"lg"}
                    disabled={disabled}
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
                    disabled,
                    title: "미사용 전송 주기(분)",
                    name: "idleCommunicationTime",
                    content: idleCommunicationTime,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
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
                        disabled,
                        label: "연동",
                        value: "1",
                        checked: isRoaming === "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                        checked: isRoaming === "2",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "한전 연동 여부",
                    name: "isKepcoRoaming",
                    list: [
                      {
                        disabled,
                        label: "연동",
                        value: "1",
                        checked: isKepcoRoaming === "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                        checked: isKepcoRoaming === "2",
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
                        disabled,
                        label: "Y",
                        value: "1",
                        checked: rechargeAppAvailable === "1",
                      },
                      {
                        disabled,
                        label: "N",
                        value: "2",
                        checked: rechargeAppAvailable === "2",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>계약 단가(원)</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={disabled}
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
                        disabled,
                        label: "없음",
                        value: "1",
                        checked: qrType === "1",
                      },
                      {
                        disabled,
                        label: "카카오",
                        value: "2",
                        checked: qrType === "2",
                      },
                      {
                        disabled,
                        label: "티맵",
                        value: "3",
                        checked: qrType === "3",
                      },
                      {
                        disabled,
                        label: "현대 E-PIT",
                        value: "4",
                        checked: qrType === "4",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "예약 가능 여부",
                    name: "reservationType",
                    list: [
                      {
                        disabled,
                        label: "비예약",
                        value: "1",
                        checked: reservationType === "1",
                      },
                      {
                        disabled,
                        label: "예약",
                        value: "2",
                        checked: reservationType === "2",
                      },
                      {
                        disabled,
                        label: "시범",
                        value: "3",
                        checked: reservationType === "3",
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
                    name={"installGubun"}
                    list={[
                      {
                        disabled,
                        label: "자체",
                        value: "1",
                        checked: installGubun === "1",
                      },
                      {
                        disabled,
                        label: "보조금",
                        value: "2",
                        checked: installGubun === "2",
                      },
                      {
                        disabled,
                        label: "납품",
                        value: "3",
                        checked: installGubun === "3",
                      },
                      {
                        disabled,
                        label: "위탁",
                        value: "4",
                        checked: installGubun === "4",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>설치업체</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    disabled={disabled}
                    name={"installCompany"}
                    value={installCompany}
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
                    title: "설치 연도",
                    name: "yyyy",
                    content: yyyy,
                    onChange,
                    placeholder: "숫자만 입력해주세요 (ex. 2023)",
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 월",
                    name: "mm",
                    content: mm,
                    onChange,
                    placeholder: "숫자만 입력해주세요 (ex. 06)",
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
                    onChange,
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    title: "서버 PORT",
                    name: "serverPort",
                    content: serverPort,
                    onChange,
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 S/N</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    disabled={disabled}
                    bsSize={"lg"}
                    name={"chargerSN"}
                    value={chargerSN}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>TR 설치여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"hasTr"}
                    list={[
                      {
                        disabled,
                        label: "Y",
                        value: "1",
                        checked: hasTr === "1",
                      },
                      {
                        disabled,
                        label: "N",
                        value: "2",
                        checked: hasTr === "2",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "충전기 펌웨어",
                    name: "fwVer",
                    content: fwVer,
                    onChange,
                  },
                  /** @TODO 자동 노출 표시로 disabled true 고정 */
                  {
                    titleWidthRatio: 4,
                    disabled: true,
                    title: "현재 충전기 펌웨어",
                    name: "fwVerCurrent",
                    content: fwVerCurrent,
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 2,
                    disabled,
                    title: "모뎀개통 번호",
                    name: "modemOpenNumber",
                    content: modemOpenNumber,
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 제조사",
                    name: "modemCompany",
                    content: modemCompany,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 제조사 연락처",
                    name: "modemCompanyPhone",
                    content: modemCompanyPhone,
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀명",
                    name: "modemName",
                    content: modemName,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 S/N",
                    name: "modemSN",
                    content: modemSN,
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "통신사",
                    name: "carrierName",
                    content: carrierName,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "통신요금",
                    name: "commFee",
                    content: commFee,
                    onChange,
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "개통사",
                    name: "openCompany",
                    content: openCompany,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "개통사 연락처",
                    name: "openCompanyPhone",
                    content: openCompanyPhone,
                    onChange,
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
          rightButtonHandler={() => {
            if (!disabled) {
              /** @TODO 저장 로직 추가 필요 */
              /* 저장 성공시 완료모달 오픈 */
              setIsEditComplete(true);
            }

            setDisabled((prev) => !prev);
          }}
        />
      </BodyBase>

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
