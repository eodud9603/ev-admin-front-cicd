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
import useInputs from "src/hooks/useInputs";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import { useTabs } from "src/hooks/useTabs";
import { useLoaderData } from "react-router-dom";

const DefaultDropdownData = {
  label: "선택",
  value: "",
};

const ChargerAdd = () => {
  const data = useLoaderData() as { [key: string]: string };

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

  const inputs = useInputs(data);
  const { changeTabData, tabStoreData } = useTabs({
    data: data,
    pageTitle: "충전기 상세",
    pageType: "add",
    inputData: inputs,
  });

  const {
    chargerStationName,
    chargerId,
    chargerAssetNumber,
    chargerType,
    /* 듀얼형 */
    dualType,
    dualCh2,
    envVersion,
    manufacturerName,
    rapidTime,
    unusedCycle,
    chargingCycle,
    contractPrice,
    significant,
    installer,
    installationYear,
    installationMonth,
    serverDomain,
    serverPort,
    chargerSN,
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
  } = inputs;

  const navigate = useNavigate();

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
            { label: "충전기 상세", href: "" },
          ]}
          title={"충전기 상세"}
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
                      },
                      {
                        label: "완속",
                        value: "2",
                      },
                      {
                        label: "과금형 콘센트",
                        value: "3",
                      },
                    ]}
                    onChange={(e) => {
                      onChange(e);
                      /* 급속 충전이 아닐경우, 최대 충전시간 데이터 초기화 */
                      if (e.target.value !== "1") {
                        onChangeSingle({ rapidTime: "" });
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
                        menuItems: [
                          DefaultDropdownData,
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
                    dropdownItems: [
                      {
                        menuItems: [
                          DefaultDropdownData,
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
                      menuItems={[
                        DefaultDropdownData,
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
                            DefaultDropdownData,
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
                    name: "companyType",
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
                    name: "useStatus",
                    list: [
                      {
                        label: "사용",
                        value: "1",
                      },
                      {
                        label: "미사용",
                        value: "2",
                      },
                      {
                        label: "전용",
                        value: "3",
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
                    menuItems={[
                      DefaultDropdownData,
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
                      menuItems={[
                        DefaultDropdownData,
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
                      disabled={!manufacturerName}
                      menuItems={[
                        DefaultDropdownData,
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
                        label: "정상",
                        value: "1",
                      },
                      {
                        label: "수리중",
                        value: "2",
                      },
                      {
                        label: "철거",
                        value: "3",
                      },
                      {
                        label: "철거예정",
                        value: "4",
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
                        label: "정상",
                        value: "1",
                      },
                      {
                        label: "고장",
                        value: "2",
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
                    menuItems={[
                      DefaultDropdownData,
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
                    menuItems={[
                      DefaultDropdownData,
                      { label: "OCPP 1.6", value: "1" },
                    ]}
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
                    disabled={chargerType !== "1"}
                    bsSize={"lg"}
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
                    title: "미사용 전송 주기(분)",
                    name: "unusedCycle",
                    content: unusedCycle,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
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
                    name: "syncKEPCO",
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
                    name: "syncQR",
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
                    name: "reservationAvailable",
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
                      },
                      {
                        label: "보조금",
                        value: "2",
                      },
                      {
                        label: "납품",
                        value: "3",
                      },
                      {
                        label: "위탁",
                        value: "4",
                      },
                    ]}
                    onChange={onChange}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>설치업체</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    bsSize={"lg"}
                    name={"installer"}
                    value={installer}
                    onChange={onChange}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    type: "number",
                    title: "설치 연도",
                    name: "installationYear",
                    content: installationYear,
                    onChange,
                    placeholder: "숫자만 입력해주세요 (ex. 2023)",
                  },
                  {
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
                    titleWidthRatio: 4,
                    title: "서버 도메인",
                    name: "serverDomain",
                    content: serverDomain,
                    onChange,
                  },
                  {
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
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
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
                    title: "모뎀 제조사",
                    name: "modemManufacturer",
                    content: modemManufacturer,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
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
                    title: "모뎀명",
                    name: "modemName",
                    content: modemName,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
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
                    title: "통신사",
                    name: "carrier",
                    content: carrier,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
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
                    title: "개통사",
                    name: "openCarrier",
                    content: openCarrier,
                    onChange,
                  },
                  {
                    titleWidthRatio: 4,
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
          rightButtonTitle={"등록"}
          listHandler={() => {
            navigate("/charger/charger");
          }}
          rightButtonHandler={() => {
            /** @TODO 저장 로직 추가 필요 */

            /* 저장 성공 */
            setIsCompleteComplete(true);
          }}
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
        isOpen={isStationSearchModal}
        onClose={() => {
          setIsStationSearchModal((prev) => !prev);
        }}
        size={"xl"}
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
