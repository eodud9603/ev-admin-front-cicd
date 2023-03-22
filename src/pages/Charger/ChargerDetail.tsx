import React, { useState } from "react";
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
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import useInputs from "src/hooks/useInputs";

const ChargerDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전기 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 설치정보 drop */
  const [isInstallDrop, setIsInstallDrop] = useState(true);
  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 충전소검색 모달 */
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);

  const {
    chargerStationName,
    chargerId,
    chargerAssetNumber,
    chargerType,
    dualType,
    dualCh2,
    envVersion,
    companyType,
    useStatus,
    installStatus,
    breakdownStatus,
    paymentTerminalStatus,
    rapidTime,
    unusedCycle,
    chargingCycle,
    syncEnvironment,
    syncKEPCO,
    rechargeAppAvailable,
    contractPrice,
    syncQR,
    reservationAvailable,
    significant,
    installationCategory,
    installer,
    installationYear,
    installationMonth,
    serverDomain,
    serverPort,
    chargerSN,
    installationTR,
    chargerFirmware,
    currentChargerFirmware,
    modemNumber,
    modemManufacturer,
    modemManufacturerTel,
    modemName,
    modemSN,
    carrier,
    communicationFee,
    openCarrier,
    openCarrierTel,
    onChange,
    onChangeSingle,
  } = useInputs({
    /* 기본정보 */
    chargerStationName: "휴맥스 카플랫 전용 A",
    chargerId: "입력 내용 노출",
    chargerAssetNumber: "입력 내용 노출",
    chargerType: "1",
    installType: "1",
    chargerVolume: "1",
    /* 듀얼형 */
    dualType: "",
    dualCh1: "1",
    dualCh2: "",
    envVersion: "입력 내용 노출",
    companyType: "1",
    useStatus: "1",
    consignmentName: "1",
    manufacturerName: "1",
    manufacturerModel: "1",
    installStatus: "1",
    connectorType: "1",
    breakdownStatus: "1",
    chargerStatus: "1",
    paymentTerminalStatus: "1",
    pg: "1",
    interlockingStandard: "1",
    rapidTime:
      "입력 내용 노출  * 완속 또는 과금형인 경우 해당 텍스트 필드 미노출, 입력 비활성화",
    unusedCycle: "입력 내용 노출",
    chargingCycle: "입력 내용 노출",
    syncEnvironment: "1",
    syncKEPCO: "1",
    rechargeAppAvailable: "1",
    contractPrice: "입력 내용 노출",
    syncQR: "1",
    reservationAvailable: "1",
    significant: "입력 내용 노출",
    /* 계약정보 */
    installationCategory: "1",
    installer: "입력 내용 노출",
    installationYear: "2023",
    installationMonth: "12",
    serverDomain: "입력 내용 노출",
    serverPort: "입력 내용 노출",
    chargerSN: "입력 내용 노출",
    installationTR: "1",
    chargerFirmware:
      "펌웨어 정보 노출(자사 관리/ 충전기가 보고하는 펌웨어 정보)",
    currentChargerFirmware:
      "펌웨어 업데이트 또는 충전기 on/off 시 업로드 되는 펌웨어 정보 자동 노출 영역",
    /* 모뎀  */
    modemNumber: "입력 내용 노출",
    modemManufacturer: "입력 내용 노출",
    modemManufacturerTel: "입력 내용 노출",
    modemName: "입력 내용 노출",
    modemSN: "입력 내용 노출",
    /* 통신사  */
    carrier: "입력 내용 노출",
    communicationFee: "입력 내용 노출",
    /* 개통사  */
    openCarrier: "입력 내용 노출",
    openCarrierTel: "입력 내용 노출",
  });

  const navigate = useNavigate();

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
      <HeaderBase></HeaderBase>

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

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
                    disabled={disabled}
                    name={"chargerId"}
                    value={chargerId}
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
                    name={"chargerAssetNumber"}
                    value={chargerAssetNumber}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>종별</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"chargerType"}
                    list={[
                      {
                        label: "급속",
                        value: "1",
                        checked: chargerType === "1",
                        disabled,
                      },
                      {
                        label: "완속",
                        value: "2",
                        checked: chargerType === "2",
                        disabled,
                      },
                      {
                        label: "과금형 콘센트",
                        value: "3",
                        checked: chargerType === "3",
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
                          onChangeSingle({ chargerVolume: value });
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
                          dualType: dualType === "1" ? "" : "1",
                          dualCh2: dualType === "1" ? "" : dualCh2,
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
                          dualCh1: value,
                        });
                      }}
                    />
                    <>
                      {dualType === "1" && (
                        <DropdownBase
                          menuItems={[
                            {
                              label: "CH2",
                              value: "1",
                            },
                          ]}
                          onClickDropdownItem={(_, value) => {
                            onChangeSingle({
                              dualCh2: value,
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
                    name={"breakdownStatus"}
                    list={[
                      {
                        disabled,
                        label: "정상",
                        value: "1",
                        checked: breakdownStatus === "1",
                      },
                      {
                        disabled,
                        label: "고장",
                        value: "2",
                        checked: breakdownStatus === "2",
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
                      onChangeSingle({ chargerStatus: value });
                    }}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>결제단말기 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"paymentTerminalStatus"}
                    list={[
                      {
                        disabled,
                        label: "Y",
                        value: "1",
                        checked: paymentTerminalStatus === "1",
                      },
                      {
                        disabled,
                        label: "N",
                        value: "2",
                        checked: paymentTerminalStatus === "2",
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
                      onChangeSingle({ pg: value });
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
                      onChangeSingle({ interlockingStandard: value });
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
                    name={"rapidTime"}
                    value={rapidTime}
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
                    name: "unusedCycle",
                    content: unusedCycle,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "충전중 전송 주기(분)",
                    name: "chargingCycle",
                    content: chargingCycle,
                    onChange,
                  },
                ]}
              />

              <DetailTextRadioRow
                rows={[
                  {
                    title: "환경부 연동 여부",
                    name: "syncEnvironment",
                    list: [
                      {
                        disabled,
                        label: "연동",
                        value: "1",
                        checked: syncEnvironment === "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                        checked: syncEnvironment === "2",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "한전 연동 여부",
                    name: "syncKEPCO",
                    list: [
                      {
                        disabled,
                        label: "연동",
                        value: "1",
                        checked: syncKEPCO === "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                        checked: syncKEPCO === "2",
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
                    name: "syncQR",
                    list: [
                      {
                        disabled,
                        label: "없음",
                        value: "1",
                        checked: syncQR === "1",
                      },
                      {
                        disabled,
                        label: "카카오",
                        value: "2",
                        checked: syncQR === "2",
                      },
                      {
                        disabled,
                        label: "티맵",
                        value: "3",
                        checked: syncQR === "3",
                      },
                      {
                        disabled,
                        label: "현대 E-PIT",
                        value: "4",
                        checked: syncQR === "4",
                      },
                    ],
                    onChange,
                  },
                  {
                    title: "예약 가능 여부",
                    name: "reservationAvailable",
                    list: [
                      {
                        disabled,
                        label: "비예약",
                        value: "1",
                        checked: reservationAvailable === "1",
                      },
                      {
                        disabled,
                        label: "예약",
                        value: "2",
                        checked: reservationAvailable === "2",
                      },
                      {
                        disabled,
                        label: "시범",
                        value: "3",
                        checked: reservationAvailable === "3",
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
                    name: "significant",
                    content: significant,
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
                    name={"installationCategory"}
                    list={[
                      {
                        label: "자체",
                        value: "1",
                        checked: installationCategory === "1",
                      },
                      {
                        label: "보조금",
                        value: "2",
                        checked: installationCategory === "2",
                      },
                      {
                        label: "납품",
                        value: "3",
                        checked: installationCategory === "3",
                      },
                      {
                        label: "위탁",
                        value: "4",
                        checked: installationCategory === "4",
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
                    name={"installer"}
                    value={installer}
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
                    name: "installationYear",
                    content: installationYear,
                    onChange,
                    placeholder: "숫자만 입력해주세요 (ex. 2023)",
                  },
                  {
                    disabled,
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 월",
                    name: "installationMonth",
                    content: installationMonth,
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
                    name={"installationTR"}
                    list={[
                      {
                        disabled,
                        label: "Y",
                        value: "1",
                        checked: installationTR === "1",
                      },
                      {
                        disabled,
                        label: "N",
                        value: "2",
                        checked: installationTR === "2",
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
                    name: "chargerFirmware",
                    content: chargerFirmware,
                    onChange,
                  },
                  /** @TODO 자동 노출 표시로 disabled true 고정 */
                  {
                    titleWidthRatio: 4,
                    disabled: true,
                    title: "현재 충전기 펌웨어",
                    name: "currentChargerFirmware",
                    content: currentChargerFirmware,
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
                    name: "modemNumber",
                    content: modemNumber,
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
                    name: "modemManufacturer",
                    content: modemManufacturer,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 제조사 연락처",
                    name: "modemManufacturerTel",
                    content: modemManufacturerTel,
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
                    name: "carrier",
                    content: carrier,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "통신요금",
                    name: "communicationFee",
                    content: communicationFee,
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
                    name: "openCarrier",
                    content: openCarrier,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "개통사 연락처",
                    name: "openCarrierTel",
                    content: openCarrierTel,
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
