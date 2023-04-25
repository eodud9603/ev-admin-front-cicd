import React from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DetailTextRadioRow } from "src/components/Common/DetailContentRow/DetailTextRadioRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import styled from "styled-components";
import DetailBottomButton from "src/pages/Charger/components/DetailBottomButton";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import useInputs from "src/hooks/useInputs";
import SingleMapBase from "src/components/Common/Map/SingleMapBase";
import useMapStore from "src/store/mapStore";
import {
  IRequestStationModify,
  IStationDetailResponse,
} from "src/api/station/stationApi.interface";
import { IChargerListByStationResponse } from "src/api/charger/chargerApi.interface";
import {
  CHARGER_MODE,
  CHARGER_RATION,
  OPERATION_STATUS,
} from "src/constants/status";
import { getChargerStatusColor } from "src/utils/charger";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import { useTabs } from "src/hooks/useTabs";
import { number, object, string } from "yup";
import { getParams } from "src/utils/params";
import { YNType } from "src/api/api.interface";
import { postStationModify } from "src/api/station/stationApi";
import ContractDropdown from "src/pages/Charger/components/ContractDropdown";
import createValidation from "src/utils/validate";
import { YUP_CHARGER_STATION } from "src/constants/valid/charger";
import DetailValidCheckModal from "src/pages/Charger/components/DetailValidCheckModal";

/* 충전기 요약 테이블 */
const chargerSummaryTableHeader = [
  {
    label: "총합",
  },
  {
    label: "통신이상",
  },
  {
    label: "충전가능",
  },
  {
    label: "충전중",
  },
  {
    label: "기타",
  },
];

/* 충전기 상세 테이블 */
const chargerTableHeader = [
  {
    label: "번호",
  },
  {
    label: "설치상태",
  },
  {
    label: "급속/완속",
  },
  {
    label: "충전기상태",
  },
  {
    label: "통신상태",
  },
];

const stationModifyValidation = object({
  stationName: string().required("Please Enter stationName"),
  stationKey: string().min(6).max(8).required("Please Enter stationKey"),
  lat: number().min(35).max(38).required("Please Enter lat"),
  lng: number().min(125).max(128).required("Please Enter lng"),
});

const ChargerStationDetail = () => {
  /** init api response */
  const initData = useLoaderData() as {
    station: IStationDetailResponse;
    charger: IChargerListByStationResponse;
  } | null;
  /** 충전소 상세 */
  const detail = initData?.station;
  /** 충전소별 충전기 */
  const chargers = initData?.charger;
  /* 충전기 상태 통계 */
  const { fast, slow, total, communication, valid, ing, etc } =
    getChargerStatusStatistics(chargers);

  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 운영정보 drop */
  const [isOperateDrop, setIsOperateDrop] = useState(true);
  /* 계약정보 drop */
  const [isContractDrop, setIsContractDrop] = useState(true);

  /* 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    id: detail?.id ?? undefined,
    /* 기본정보 */
    stationName: detail?.stationName ?? "",
    stationKey: detail?.stationKey ?? "",
    location: detail?.location ?? "",
    operator: detail?.operator ?? "",
    isUse: (detail?.isUse ?? "") as YNType,
    business: "" /* 위탁사업자 > dropdown */,
    directInput: "1",
    // detail?.consignmentCompany ?? ""
    //   ? "1"
    //   : "0" /* 직접입력 check "1": 체크, "0": "미체크" */,
    consignmentCompany:
      detail?.consignmentCompany ?? "" /* 위탁사업자명 (input text) */,
    isOpen: (detail?.isOpen ?? "") as YNType,
    quickChargerCount: (detail?.quickChargerCount ?? "").toString(),
    standardChargerCount: (detail?.standardChargerCount ?? "").toString() ?? "",
    powerSocket: detail?.powerSocket ?? "",
    powerSocketCount: (detail?.powerSocketCount ?? "").toString(),
    isHidden: (detail?.isHidden ?? "") as YNType,
    supplyMethod: detail?.supplyMethod ?? "",
    billDivision: (detail?.billDivision ?? "") as YNType,
    kepcoCustomerNum: detail?.kepcoCustomerNum ?? "",
    meterNum: detail?.meterNum ?? "",
    kepcoFee: detail?.kepcoFee ?? "",
    kepcoOffice: detail?.kepcoOffice ?? "",
    kepcoPayment: detail?.kepcoPayment ?? "",
    entryDate: detail?.entryDate ?? "",
    chargerLocation: detail?.chargerLocation ?? "",
    addressRoad: detail?.addressRoad ?? "",
    zoneCode: detail?.zoneCode ?? "",
    addressJibun: detail?.addressJibun ?? "",
    addressJibunDetail: detail?.addressJibunDetail ?? "",
    memo: detail?.memo ?? "",
    etcInfo: detail?.etcInfo ?? "",
    /* 운영정보 */
    baseOperationTimeFrom: detail?.baseOperationTimeFrom ?? "",
    baseOperationTimeTo: detail?.baseOperationTimeTo ?? "",
    holidayOperationTimeFrom: detail?.holidayOperationTimeFrom ?? "",
    holidayOperationTimeTo: detail?.holidayOperationTimeTo ?? "",
    saturdayOperationTimeFrom: detail?.saturdayOperationTimeFrom ?? "",
    saturdayOperationTimeTo: detail?.saturdayOperationTimeTo ?? "",
    isParkFeeFree: detail?.isParkFeeFree ?? "",
    parkFee: detail?.parkFee ?? "" /* 수정 필요 필드 */,
    /* 지도 좌표 */
    lat: (detail?.lat ?? "").toString(),
    lng: (detail?.lng ?? "").toString(),
    /* 계약정보 */
    contractId: (detail?.contractId ?? "").toString(),
  });
  const {
    /* 기본정보 */
    stationName,
    stationKey,
    location,
    operator,
    isUse,
    /* 위탁사업자 직접입력 체크여부 */
    directInput,
    consignmentCompany,
    isOpen,
    quickChargerCount,
    standardChargerCount,
    powerSocket,
    powerSocketCount,
    isHidden,
    supplyMethod,
    billDivision,
    kepcoCustomerNum,
    meterNum,
    kepcoFee,
    kepcoOffice,
    kepcoPayment,
    entryDate,
    chargerLocation,
    addressRoad,
    zoneCode,
    addressJibun,
    addressJibunDetail,
    memo,
    etcInfo,
    /* 운영정보 */
    baseOperationTimeFrom,
    baseOperationTimeTo,
    holidayOperationTimeFrom,
    holidayOperationTimeTo,
    saturdayOperationTimeFrom,
    saturdayOperationTimeTo,
    isParkFeeFree,
    parkFee,
    /* 지도 좌표 */
    lat,
    lng,
    /* 계약정보 */
    contractId,
  } = inputs;

  /* 지도 컨트롤러 */
  const { setZoom, createMarker } = useMapStore();

  const navigate = useNavigate();

  const onChangeModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };
  useTabs({ data: detail, pageTitle: "충전소 상세", pageType: "detail" });

  /** 수정 */
  const modify = async () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /* 등록 params */
    const modifyParams: IRequestStationModify = {
      ...inputs,
      lat: Number(inputs.lat),
      lng: Number(inputs.lng),
      quickChargerCount: Number(quickChargerCount),
      standardChargerCount: Number(standardChargerCount),
      powerSocketCount: Number(powerSocketCount),
      contractId: Number(contractId),
    };
    getParams(modifyParams);

    console.log(modifyParams);

    /* valid 체크 */
    /* 유효성 체크 */
    const scheme = createValidation(YUP_CHARGER_STATION);
    const [invalid] = scheme(modifyParams);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    if (!disabled) {
      /* valid 체크 */
      const valid = await stationModifyValidation.isValid(modifyParams);
      if (!valid) {
        return;
      }

      /** @TODO 서버 수정 api 추가후, 테스트 및 수정 필요 */
      const { code } = await postStationModify(modifyParams);
      /** 저장 성공 */
      const success = code === "SUCCESS";
      if (success) {
        /* 저장 성공시 완료모달 오픈 */
        setIsEditComplete(true);
      } else {
        return;
      }
    }

    setDisabled((prev) => !prev);
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
            { label: "충전소 관리", href: "" },
            { label: "충전소 상세", href: "" },
          ]}
          title={"충전소 상세"}
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

            <ButtonBase
              className={"width-110"}
              label={"충전기 등록"}
              color={"turu"}
              outline
              onClick={() => {
                navigate("/charger/charger/add");
              }}
            />
          </div>

          <Row>
            <Col md={8}>
              {/* 기본정보 */}
              {isDefaultInfoDrop && (
                <Row className={"me-1 border-bottom border-2 mb-4"}>
                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 4,
                        title: "충전소명",
                        required: true,
                        disabled,
                        name: "stationName",
                        content: stationName,
                        onChange,
                      },
                      {
                        titleWidthRatio: 4,
                        title: "충전소ID",
                        disabled,
                        name: "stationKey",
                        content: stationKey,
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 2,
                        title: "충전소 위치",
                        disabled,
                        name: "location",
                        content: location,
                        onChange,
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>충전서비스사업자</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"operator"}
                          list={[
                            {
                              disabled,
                              label: "HEV",
                              value: "HEV",
                              checked: operator === "HEV",
                            },
                            {
                              disabled,
                              label: "JEV",
                              value: "JEV",
                              checked: operator === "JEV",
                            },
                          ]}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>사용여부</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"isUse"}
                          list={[
                            {
                              disabled,
                              label: "사용",
                              value: "Y",
                              checked: isUse === "Y",
                            },
                            {
                              disabled,
                              label: "미사용",
                              value: "N",
                              checked: isUse === "N",
                            },
                          ]}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>위탁사업자명</DetailLabelCol>
                      <DetailContentCol
                        className={
                          "d-flex gap-2 " +
                          "align-items-center justify-content-between"
                        }
                      >
                        {directInput === "0" ? (
                          <DropdownBase
                            disabled={disabled}
                            menuItems={[
                              { label: "선택 내용 노출", value: "1" },
                            ]}
                            onClickDropdownItem={(_, value) => {
                              onChangeSingle({ business: value });
                            }}
                          />
                        ) : (
                          <TextInputBase
                            bsSize={"lg"}
                            disabled={disabled}
                            name={"consignmentCompany"}
                            value={consignmentCompany}
                            onChange={onChange}
                          />
                        )}
                        <CheckBoxBase
                          label={"직접입력"}
                          disabled={true}
                          name={"directInput"}
                          value={"1"}
                          checked={directInput === "1"}
                          onChange={() => {
                            onChangeSingle({
                              directInput: directInput === "0" ? "1" : "0",
                            });
                          }}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>개방여부</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"isOpen"}
                          list={[
                            {
                              disabled,
                              label: "완전",
                              value: "Y",
                              checked: isOpen === "Y",
                            },
                            {
                              disabled,
                              label: "부분",
                              value: "N",
                              checked: isOpen === "N",
                            },
                          ]}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>급속충전기 수</DetailLabelCol>
                      <DetailContentCol
                        className={"d-flex gap-2 align-items-center"}
                      >
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          type={"number"}
                          placeholder={"숫자만 입력해주세요"}
                          name={"quickChargerCount"}
                          value={quickChargerCount}
                          onChange={onChange}
                        />
                        <span>기</span>
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>완속충전기 수</DetailLabelCol>
                      <DetailContentCol
                        className={"d-flex gap-2 align-items-center"}
                      >
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          type={"number"}
                          placeholder={"숫자만 입력해주세요"}
                          name={"standardChargerCount"}
                          value={standardChargerCount}
                          onChange={onChange}
                        />
                        <span>기</span>
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>과금형콘센트 수</DetailLabelCol>
                      <DetailContentCol
                        className={"d-flex gap-2 align-items-center"}
                      >
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          placeholder={"입력해주세요 (ex. 3kw 콘센트)"}
                          name={"powerSocket"}
                          value={powerSocket}
                          onChange={onChange}
                        />
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          type={"number"}
                          placeholder={"개수"}
                          name={"powerSocketCount"}
                          value={powerSocketCount}
                          onChange={onChange}
                        />
                        <span>기</span>
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>충전소 노출여부</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"isHidden"}
                          list={[
                            {
                              disabled,
                              label: "노출",
                              value: "Y",
                              checked: isHidden === "Y",
                            },
                            {
                              disabled,
                              label: "미노출",
                              value: "N",
                              checked: isHidden === "N",
                            },
                          ]}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailTextRadioRow
                    rows={[
                      {
                        title: "수전방식",
                        name: "supplyMethod",
                        list: [
                          {
                            disabled,
                            label: "자중",
                            value: "1",
                            checked: supplyMethod === "1",
                          },
                          {
                            disabled,
                            label: "가공",
                            value: "2",
                            checked: supplyMethod === "2",
                          },
                        ],
                        onChange,
                      },
                      {
                        title: "모자분리여부",
                        name: "billDivision",
                        list: [
                          {
                            disabled,
                            label: "모자",
                            value: "Y",
                            checked: billDivision === "Y",
                          },
                          {
                            disabled,
                            label: "자가",
                            value: "N",
                            checked: billDivision === "N",
                          },
                        ],
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "한전고객번호",
                        name: "kepcoCustomerNum",
                        content: kepcoCustomerNum,
                        onChange,
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "계량기 번호",
                        name: "meterNum",
                        content: meterNum,
                        onChange,
                        placeholder: "최대 1개 입력 가능합니다",
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "한전선택요금",
                        name: "kepcoFee",
                        content: kepcoFee,
                        onChange,
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "해당 한전영업소",
                        name: "kepcoOffice",
                        content: kepcoOffice,
                        onChange,
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>한전불입금</DetailLabelCol>
                      <DetailContentCol>
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          name={"kepcoPayment"}
                          value={kepcoPayment}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>전기인입일</DetailLabelCol>
                      <DetailContentCol>
                        <input
                          type={"date"}
                          className={"form-control w-xs"}
                          disabled={disabled}
                          name={"entryDate"}
                          value={entryDate}
                          onChange={onChange}
                        />
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 2,
                        title: "충전기 위치",
                        name: "chargerLocation",
                        content: chargerLocation,
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 2,
                        title: "도로명 주소",
                        name: "addressRoad",
                        content: addressRoad,
                        onChange,
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={2}>지번 주소</DetailLabelCol>
                      <DetailContentCol>
                        <div className={"d-flex gap-4"}>
                          <TextInputBase
                            disabled={true}
                            inputstyle={{ flex: 1 }}
                            bsSize={"lg"}
                            className={"mb-4"}
                            placeholder={""}
                            name={"zoneCode"}
                            value={zoneCode}
                            onChange={onChange}
                          />
                          <div style={{ flex: 3 }}>
                            {!disabled && (
                              <ButtonBase
                                className={"width-110"}
                                outline
                                label={"우편번호 검색"}
                                color={"turu"}
                                onClick={onChangeModalVisible}
                              />
                            )}
                          </div>
                        </div>
                        <div className={"d-flex gap-4"}>
                          <TextInputBase
                            disabled={true}
                            bsSize={"lg"}
                            placeholder={""}
                            name={"addressJibun"}
                            value={addressJibun}
                            onChange={onChange}
                          />
                          <TextInputBase
                            bsSize={"lg"}
                            disabled={disabled}
                            placeholder={"상세 주소를 입력해주세요"}
                            name={"addressJibunDetail"}
                            value={addressJibunDetail}
                            onChange={onChange}
                          />
                        </div>
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 2,
                        title: "충전소 특이사항",
                        name: "memo",
                        content: memo,
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 2,
                        title: "충전불가 차량",
                        name: "etcInfo",
                        content: etcInfo,
                        onChange,
                        placeholder:
                          "‘,’로 구분해 작성해주세요 (ex. 차량명A, 차량명B)",
                      },
                    ]}
                  />
                </Row>
              )}
              {/* 운영정보 */}
              <DropArea
                className={"gap-1 mb-3"}
                onClick={() => setIsOperateDrop((prev) => !prev)}
              >
                <span className={"font-size-20 fw-bold"}>운영정보</span>
                <Icon
                  isOpen={isOperateDrop}
                  className={"mdi mdi-chevron-up font-size-24"}
                />
              </DropArea>
              {isOperateDrop && (
                <Row className={"me-1 border-bottom border-2 mb-4"}>
                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영시작시간(평일)",
                        name: "baseOperationTimeFrom",
                        content: baseOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(평일)",
                        name: "baseOperationTimeTo",
                        content: baseOperationTimeTo,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                    ]}
                  />
                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영시작시간(휴일)",
                        name: "holidayOperationTimeFrom",
                        content: holidayOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(휴일)",
                        name: "holidayOperationTimeTo",
                        content: holidayOperationTimeTo,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                    ]}
                  />
                  <DetailTextInputRow
                    rows={[
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영시작시간(토)",
                        name: "saturdayOperationTimeFrom",
                        content: saturdayOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(토)",
                        name: "saturdayOperationTimeTo",
                        content: saturdayOperationTimeTo,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailLabelCol sm={2}>주차비 여부</DetailLabelCol>
                    <DetailContentCol>
                      <RadioGroup
                        name={"isParkFeeFree"}
                        list={[
                          {
                            disabled,
                            label: "미확인",
                            value: "",
                            checked: isParkFeeFree === "",
                          },
                          {
                            disabled,
                            label: "유",
                            value: "Y",
                            checked: isParkFeeFree === "Y",
                          },
                          {
                            disabled,
                            label: "무",
                            value: "N",
                            checked: isParkFeeFree === "N",
                          },
                        ]}
                        onChange={onChange}
                      />
                    </DetailContentCol>
                    <DetailLabelCol sm={2}>주차비 상세</DetailLabelCol>
                    <DetailContentCol>
                      <TextInputBase
                        bsSize={"lg"}
                        disabled={disabled}
                        name={"parkFee"}
                        value={parkFee}
                        onChange={onChange}
                      />
                    </DetailContentCol>
                  </DetailRow>
                </Row>
              )}
              {/* 계약정보 */}
              <DropArea
                className={"gap-1"}
                onClick={() => setIsContractDrop((prev) => !prev)}
              >
                <span className={"font-size-20 fw-bold"}>계약정보</span>
                <Icon
                  isOpen={isContractDrop}
                  className={"mdi mdi-chevron-up font-size-24"}
                />
              </DropArea>
              {isContractDrop && (
                <Row className={"me-1 border-bottom border-2 mb-4"}>
                  {disabled ? (
                    <DetailTextInputRow
                      rows={[
                        {
                          titleWidthRatio: 4,
                          title: "계약번호",
                          name: "contractId",
                          content: contractId,
                          disabled: true,
                          children: (
                            <ButtonBase
                              label={"계약 상세"}
                              color={"turu"}
                              outline
                            />
                          ),
                        },
                        null,
                      ]}
                    />
                  ) : (
                    <>
                      <DetailLabelCol sm={2}>계약번호</DetailLabelCol>
                      <DetailContentCol>
                        <ContractDropdown
                          onChange={(data) => {
                            onChangeSingle({
                              contractId: (data.id ?? "").toString(),
                            });
                          }}
                        />
                      </DetailContentCol>
                    </>
                  )}
                </Row>
              )}
            </Col>

            <Col
              md={4}
              className={
                "p-2 bg-light bg-opacity-50 " +
                "rounded-1 border border-2 border-light"
              }
            >
              {/* 지도 */}
              <Row className={"mb-3"}>
                <Col md={12}>
                  <MapContainer>
                    <SingleMapBase
                      lat={Number(lat)}
                      long={Number(lng)}
                      isInitMarker={true}
                      onChangeLocation={(changeLat, changeLong) => {
                        if (
                          lat !== changeLat.toString() ||
                          lng !== changeLong.toString()
                        ) {
                          onChangeSingle({
                            lat: `${changeLat}`,
                            lng: `${changeLong}`,
                          });
                        }
                      }}
                    >
                      <MapButtonArea className={"position-absolute"}>
                        <IconButton
                          disabled={disabled}
                          className={"dripicons-location"}
                          onClick={() => {
                            if (disabled) {
                              return;
                            }

                            !!createMarker && createMarker();
                          }}
                        />
                        <IconButton
                          className={"bx bx-plus"}
                          onClick={() => {
                            setZoom(1);
                          }}
                        />
                        <IconButton
                          className={"bx bx-minus"}
                          onClick={() => {
                            setZoom(-1);
                          }}
                        />
                      </MapButtonArea>
                    </SingleMapBase>
                  </MapContainer>
                </Col>
              </Row>
              {/* 좌표 */}
              <Row className={"mb-4"}>
                <Col
                  className={"align-self-center fw-bold font-size-16"}
                  md={2}
                >
                  X좌표 <span className={"text-danger"}>*</span>
                </Col>
                <Col md={4}>
                  <TextInputBase
                    className={
                      "border border-1 border-secondary border-opacity-50"
                    }
                    disabled={disabled}
                    placeholder={"위치선택, 직접입력"}
                    name={"lng"}
                    value={lng}
                    onChange={onChange}
                  />
                </Col>
                <Col
                  className={"align-self-center fw-bold font-size-16"}
                  md={2}
                >
                  Y좌표 <span className={"text-danger"}>*</span>
                </Col>
                <Col md={4}>
                  <TextInputBase
                    className={
                      "border border-1 border-secondary border-opacity-50"
                    }
                    disabled={disabled}
                    placeholder={"위치선택, 직접입력"}
                    name={"lat"}
                    value={lat}
                    onChange={onChange}
                  />
                </Col>
              </Row>
              {/* 테이블 */}
              <Row>
                <Col
                  md={12}
                  className={
                    "mb-2 d-flex align-items-center justify-content-between"
                  }
                >
                  <span className={"font-size-16 fw-bold"}>충전기 상태</span>
                  <span className={"font-size-12"}>
                    급속 {fast}대 / 완속 {slow}
                  </span>
                </Col>
                <Col md={12}>
                  {/* 충전기 요약 테이블 */}
                  <TableBase tableHeader={chargerSummaryTableHeader}>
                    <tr className={"bg-white"}>
                      <td>{total}</td>
                      <td>{communication}</td>
                      <td>{valid}</td>
                      <td>{ing}</td>
                      <td>{etc}</td>
                    </tr>
                  </TableBase>
                  {/* 충전기 상세 테이블 */}
                  <TableBase tableHeader={chargerTableHeader}>
                    <>
                      {(chargers ?? []).map(
                        ({
                          id,
                          chargerKey,
                          operationStatus,
                          status,
                          chargerClass,
                          isConnection,
                        }) => (
                          <tr className={"bg-white"} key={id}>
                            <td>
                              <HoverSpan
                                className={"text-turu"}
                                onClick={() => {
                                  navigate(`/charger/charger/detail/${id}`);
                                }}
                              >
                                <u>{chargerKey}</u>
                              </HoverSpan>
                            </td>
                            <td>{OPERATION_STATUS[operationStatus]}</td>
                            <td>{CHARGER_RATION[chargerClass]}</td>
                            <td>
                              <span
                                className={
                                  "px-2 py-1 d-inline-block " +
                                  "rounded-pill text-center text-white " +
                                  `bg-${getChargerStatusColor(status)}`
                                }
                              >
                                {CHARGER_MODE[status]}
                              </span>
                            </td>
                            <td>{isConnection === "Y" ? "연결" : "미연결"}</td>
                          </tr>
                        )
                      )}
                    </>
                  </TableBase>
                </Col>
              </Row>
            </Col>
          </Row>
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

            navigate("/charger/chargerStation");
          }}
          rightButtonHandler={modify}
        />
      </BodyBase>

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
        title={"충전소 정보 수정 완료 안내"}
        contents={"수정된 충전소 정보가 저장되었습니다."}
      />
      <DetailCancelModal
        isOpen={isEditCancel}
        onClose={() => {
          setIsEditCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/chargerStation");
        }}
        title={"충전소 정보 수정 취소 안내"}
        contents={
          "수정된 충전소 정보가 저장되지 않습니다.\n수정을 취소하시겠습니까?"
        }
      />
      <AddressSearchModal
        isOpen={addrSearchModalOpen}
        onClose={onChangeModalVisible}
        onchange={(data) => {
          onChangeSingle({
            zoneCode: data.zipCode,
            addressJibun: data.address,
          });
        }}
      />
    </ContainerBase>
  );
};

export default ChargerStationDetail;

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

const MapButtonArea = styled.div`
  z-index: 1;
  bottom: 10px;
  right: 10px;
`;

const IconBtn = styled.i<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;

  :hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const IconButton = ({
  disabled,
  className,
  ...rest
}: {
  disabled?: boolean;
  className: string;
  onClick: () => void;
}) => {
  return (
    <IconBtn
      disabled={disabled}
      className={
        "d-flex justify-content-center align-items-center " +
        `border rounded bg-white font-size-16 text-secondary ${className}`
      }
      {...rest}
    />
  );
};

const MapContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  height: 251px;
`;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;

/** 충전기상태 목록 통계 */
const getChargerStatusStatistics = (
  chargers: IChargerListByStationResponse = []
) => {
  return chargers.reduce(
    (acc, cur) => {
      const { chargerClass, status } = cur;

      /* 급속/완속 계산 */
      if (chargerClass === "QUICK") {
        acc.fast += 1;
      } else if (chargerClass === "STANDARD") {
        acc.fast += 1;
      }

      /* 충전기 상태별 계산 */
      switch (status) {
        /* 통신 이상 */
        case "S1":
          acc.communication += 1;
          break;
        /* 충전가능 */
        case "S2":
        case "S3":
        case "S4":
        case "S5":
          acc.valid += 1;
          break;
        /* 충전중 */
        case "S6":
        case "S7":
          acc.ing += 1;
          break;
        /* 기타 */
        default:
          acc.etc += 1;
          break;
      }

      return acc;
    },
    {
      fast: 0,
      slow: 0,
      total: chargers.length,
      communication: 0,
      valid: 0,
      ing: 0,
      etc: 0,
    }
  );
};
