import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
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
import styled from "styled-components";
import DetailBottomButton from "src/pages/Charger/components/DetailBottomButton";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import useInputs from "src/hooks/useInputs";
import DetailValidCheckModal from "src/pages/Charger/components/DetailValidCheckModal";
import SingleMapBase from "src/components/Common/Map/SingleMapBase";
import useMapStore from "src/store/mapStore";
import { postStationRegistration } from "src/api/station/stationApi";
import { OPERATOR_FILTER_LIST } from "src/constants/list";
import { object, string, number } from "yup";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import ContractDropdown from "./components/ContractDropdown";
import { IRequestStationRegister } from "src/api/station/stationApi.interface";
import { YNType } from "src/api/api.interface";
import { getParams } from "src/utils/params";

const stationRegistrationValidation = object({
  stationName: string().required("Please Enter stationName"),
  stationKey: string().min(6).max(8).required("Please Enter stationKey"),
  lat: number().min(35).max(38).required("Please Enter lat"),
  lng: number().min(125).max(128).required("Please Enter lng"),
});

const ChargerStationAdd = () => {
  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 운영정보 drop */
  const [isOperateDrop, setIsOperateDrop] = useState(true);
  /* 계약정보 drop */
  const [isContractDrop, setIsContractDrop] = useState(true);

  const { onChange, onChangeSingle, reset, ...inputs } = useInputs({
    /* 기본정보 */
    stationName: "",
    stationKey: "",
    location: "",
    operator: "HEV",
    isUse: "" as YNType,
    business: "" /* 위탁사업자 > dropdown */,
    directInput: "0" /* 직접입력 check "1": 체크, "0": "미체크" */,
    consignmentCompany: "" /* 위탁사업자명 (input text) */,
    isOpen: "" as YNType,
    quickChargerCount: "",
    standardChargerCount: "",
    powerSocket: "",
    powerSocketCount: "",
    isHidden: "" as YNType,
    supplyMethod: "",
    billDivision: "" as YNType,
    kepcoCustomerNum: "",
    meterNum: "",
    kepcoFee: "",
    kepcoOffice: "",
    kepcoPayment: "",
    entryDate: "",
    chargerLocation: "",
    addressRoad: "",
    zoneCode: "",
    addressJibun: "",
    addrDetail: "" /* 수정 필요 필드 */,
    significant: "",
    nonRechargeable: "",
    /* 운영정보 */
    baseOperationTimeFrom: "",
    baseOperationTimeTo: "",
    holidayOperationTimeFrom: "",
    holidayOperationTimeTo: "",
    saturdayOperationTimeFrom: "",
    saturdayOperationTimeTo: "",
    isParkFeeFree: "",
    parkingFeeDetail: "",
    /* 지도 좌표 */
    lat: "",
    lng: "",
    /* 계약정보 */
    contractNumber: "",
  });
  const {
    /* 기본정보 */
    stationName,
    stationKey,
    location,
    operator,
    directInput /* 직접입력 check "1": 체크, "0": "미체크" */,
    consignmentCompany /* 위탁사업자명 (input text) */,
    quickChargerCount,
    standardChargerCount,
    powerSocket,
    powerSocketCount,
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
    addrDetail /* 수정 필요 필드 */,
    significant,
    nonRechargeable,
    /* 운영정보 */
    baseOperationTimeFrom,
    baseOperationTimeTo,
    holidayOperationTimeFrom,
    holidayOperationTimeTo,
    saturdayOperationTimeFrom,
    saturdayOperationTimeTo,
    isParkFeeFree,
    parkingFeeDetail,
    lat,
    lng,
  } = inputs;
  /* 등록완료 모달 */
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  /* 미입력 안내 모달 */
  const [isValidCheckModalOpen, setIsValidCheckModalOpen] = useState(false);
  /* 등록취소 모달 */
  const [isRegistrationCancel, setIsRegistrationCancel] = useState(false);
  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 지도 컨트롤러 */
  const { setZoom, createMarker } = useMapStore();

  const navigate = useNavigate();

  const onChangeModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 등록 */
  const save = async () => {
    /* 등록 params */
    const registrationParams: IRequestStationRegister = {
      ...inputs,
      lat: Number(inputs.lat),
      lng: Number(inputs.lng),
      quickChargerCount: Number(quickChargerCount),
      standardChargerCount: Number(standardChargerCount),
      powerSocketCount: Number(powerSocketCount),
    };
    getParams(registrationParams);
    /* valid 체크 */
    const isValid = await stationRegistrationValidation.isValid(
      registrationParams
    );
    if (!isValid) {
      setIsValidCheckModalOpen(true);
    }

    const { code } = await postStationRegistration(registrationParams);
    /** 저장 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setIsRegistrationComplete(true);
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
            { label: "충전소 관리", href: "/charger/chargerStation" },
            { label: "충전소 신규 등록", href: "" },
          ]}
          title={"충전소 신규 등록"}
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
                        name: "stationName",
                        content: stationName,
                        onChange,
                      },

                      {
                        /** @TODO 현재 자동생성되지 않아 직접입력 */
                        // disabled: true,
                        titleWidthRatio: 4,
                        title: "충전소ID",
                        placeholder: "자동입력",
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
                          list={OPERATOR_FILTER_LIST.filter(
                            (data) => data.value !== ""
                          ).map((data) => ({
                            ...data,
                            checked: operator === data.value,
                          }))}
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
                              label: "사용",
                              value: "Y",
                            },
                            {
                              label: "미사용",
                              value: "N",
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
                            menuItems={[{ label: "선택", value: "" }]}
                            onClickDropdownItem={(_, value) => {
                              onChangeSingle({ business: value });
                            }}
                          />
                        ) : (
                          <TextInputBase
                            bsSize={"lg"}
                            name={"consignmentCompany"}
                            value={consignmentCompany}
                            onChange={onChange}
                          />
                        )}
                        <CheckBoxBase
                          label={"직접입력"}
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
                              label: "완전",
                              value: "Y",
                            },
                            {
                              label: "부분",
                              value: "N",
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
                          inputstyle={{ flex: 3 }}
                          bsSize={"lg"}
                          placeholder={"입력해주세요 (ex. 3kw 콘센트)"}
                          name={"powerSocket"}
                          value={powerSocket}
                          onChange={onChange}
                        />
                        <TextInputBase
                          inputstyle={{ flex: 1 }}
                          bsSize={"lg"}
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
                              label: "노출",
                              value: "Y",
                            },
                            {
                              label: "미노출",
                              value: "N",
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
                            label: "자중",
                            value: "1",
                          },
                          {
                            label: "가공",
                            value: "2",
                          },
                        ],
                        onChange,
                      },
                      {
                        title: "모자분리여부",
                        name: "billDivision",
                        list: [
                          {
                            label: "모자",
                            value: "Y",
                          },
                          {
                            label: "자가",
                            value: "N",
                          },
                        ],
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 4,
                        title: "한전고객번호",
                        name: "kepcoCustomerNum",
                        content: kepcoCustomerNum,
                        onChange,
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "한전선택요금",
                        name: "kepcoFee",
                        content: kepcoFee,
                        onChange,
                      },
                      {
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
                            inputstyle={{ flex: 1 }}
                            bsSize={"lg"}
                            disabled={true}
                            className={"mb-4"}
                            placeholder={""}
                            name={"zoneCode"}
                            value={zoneCode}
                            onChange={onChange}
                          />
                          <div style={{ flex: 3 }}>
                            <ButtonBase
                              className={"width-110"}
                              outline
                              label={"우편번호 검색"}
                              color={"turu"}
                              onClick={onChangeModalVisible}
                            />
                          </div>
                        </div>
                        <div className={"d-flex gap-4"}>
                          <TextInputBase
                            bsSize={"lg"}
                            disabled={true}
                            placeholder={""}
                            name={"addressJibun"}
                            value={addressJibun}
                            onChange={onChange}
                          />
                          <TextInputBase
                            bsSize={"lg"}
                            placeholder={"상세 주소를 입력해주세요"}
                            name={"addrDetail"}
                            value={addrDetail}
                            onChange={onChange}
                          />
                        </div>
                      </DetailContentCol>
                    </DetailGroupCol>
                  </DetailRow>

                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 2,
                        title: "충전소 특이사항",
                        name: "significant",
                        content: significant,
                        onChange,
                      },
                    ]}
                  />

                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 2,
                        title: "충전불가 차량",
                        name: "nonRechargeable",
                        content: nonRechargeable,
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
                        titleWidthRatio: 4,
                        title: "운영시작시간(평일)",
                        name: "baseOperationTimeFrom",
                        content: baseOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "운영시작시간(휴일)",
                        name: "holidayOperationTimeFrom",
                        content: holidayOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "운영시작시간(토)",
                        name: "saturdayOperationTimeFrom",
                        content: saturdayOperationTimeFrom,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                            label: "미확인",
                            value: "",
                            checked: isParkFeeFree === "",
                          },
                          {
                            label: "유",
                            value: "Y",
                            checked: isParkFeeFree === "Y",
                          },
                          {
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
                        name={"parkingFeeDetail"}
                        value={parkingFeeDetail}
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
                <Row className={"me-1 border-top border-bottom border-2 mb-4"}>
                  <DetailLabelCol sm={2}>계약번호</DetailLabelCol>
                  <DetailContentCol>
                    <ContractDropdown
                      disabled={true}
                      onChange={(data) => {
                        /** @TODO 계약장소 데이터 state 추가  */
                      }}
                    />
                  </DetailContentCol>
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
                          className={"dripicons-location"}
                          onClick={() => {
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
                    bsSize={"lg"}
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
                    bsSize={"lg"}
                    placeholder={"위치선택, 직접입력"}
                    name={"lat"}
                    value={lat}
                    onChange={onChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <DetailBottomButton
          containerClassName={"my-5"}
          rightButtonTitle={"등록"}
          listHandler={() => {
            navigate("/charger/chargerStation");
          }}
          rightButtonHandler={save}
        />
      </BodyBase>

      <DetailCompleteModal
        isOpen={isRegistrationComplete}
        onClose={() => {
          setIsRegistrationComplete((prev) => !prev);
        }}
        onClosed={() => {
          navigate("/charger/chargerStation");
        }}
        title={"신규 충전소 등록 완료"}
        contents={"충전소 정보가 등록되었습니다."}
      />
      <DetailCancelModal
        isOpen={isRegistrationCancel}
        onClose={() => {
          setIsRegistrationCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/chargerStation");
        }}
        title={"신규 충전소 정보 등록 취소 안내"}
        contents={
          "입력된 충전소 정보가 저장되지 않습니다.\n신규 등록을 취소하시겠습니까?"
        }
      />
      <DetailValidCheckModal
        isOpen={isValidCheckModalOpen}
        onClose={() => {
          setIsValidCheckModalOpen((prev) => !prev);
        }}
      />
      <AddressSearchModal
        isOpen={addrSearchModalOpen}
        onClose={onChangeModalVisible}
        onchange={(data) => {
          onChangeSingle({
            zoneCode: data.zipCode,
            addressRoad: data.road,
            addressJibun: data.jibun,
          });
        }}
      />
    </ContainerBase>
  );
};

export default ChargerStationAdd;

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

const IconBtn = styled.i`
  width: 36px;
  height: 36px;

  :hover {
    cursor: pointer;
  }
`;

const IconButton = ({
  className,
  ...rest
}: {
  className: string;
  onClick: () => void;
}) => {
  return (
    <IconBtn
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
