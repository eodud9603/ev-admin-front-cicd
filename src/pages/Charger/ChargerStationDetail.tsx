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
import { TableBase } from "src/components/Common/Table/TableBase";
import styled from "styled-components";
import DetailBottomButton from "src/pages/Charger/components/DetailBottomButton";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import useInputs from "src/hooks/useInputs";
import SingleMapBase from "src/components/Common/Map/SingleMapBase";
import { useMapStore } from "src/store/store";

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

/* 임시 목록 데이터 */
const chargerSummaryList = [
  {
    totalCount: 1,
    communicationCount: 0,
    validCount: 0,
    ingCount: 1,
    etcCount: 0,
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

/* 임시 목록 데이터 */
const chargerList = [
  {
    chargerNum: "0000",
    installStatus: "설치완료",
    type: "급속",
    chargerStatus: "충전중",
    communicationStatus: "연결",
  },
];

const ChargerStationDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 운영정보 drop */
  const [isOperateDrop, setIsOperateDrop] = useState(true);
  /* 계약정보 drop */
  const [isContractDrop, setIsContractDrop] = useState(true);

  /* 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);

  const {
    chargerStationName,
    chargerStationId,
    chargerStationLocation,
    serviceProvider,
    useStatus,
    /* 위탁사업자 직접입력 체크여부 */
    directInput,
    businessName,
    openStatus,
    fast,
    slow,
    outletName,
    outletCount,
    exposedStatus,
    receivingMethod,
    separation,
    customerNumber,
    meter,
    optionalFee,
    businessOffice,
    payment,
    entryDate,
    chargerLocation,
    streetAddr,
    zipCode,
    addr,
    addrDetail,
    significant,
    nonRechargeable,
    weekdayStartDate,
    weekdayEndDate,
    holidayStartDate,
    holidayEndDate,
    saturdayStartDate,
    saturdayEndDate,
    parkingFeeStatus,
    parkingFeeDetail,
    lat,
    long,
    contractNumber,
    onChange,
    onChangeSingle,
  } = useInputs({
    /* 기본정보 */
    chargerStationName: "휴맥스 카플랫 전용 A",
    chargerStationId: "KEP0000000020",
    chargerStationLocation: "입력 내용 노출",
    serviceProvider: "1",
    useStatus: "1",
    business: "" /* 위탁사업자 > dropdown */,
    directInput: "0" /* 위탁사업자 > 직접입력 체크여부 */,
    businessName: "선택 내용 노출" /* 위탁사업자 > 직접입력값(businessName) */,
    openStatus: "1",
    fast: "3",
    slow: "2",
    outletName: "3kw 콘센트",
    outletCount: "3",
    exposedStatus: "1",
    receivingMethod: "1",
    separation: "1",
    customerNumber: "선택 내용 노출",
    meter: "선택 내용 노출",
    optionalFee: "선택 내용 노출",
    businessOffice: "선택 내용 노출",
    payment: "선택 내용 노출",
    entryDate: "2022-01-07",
    chargerLocation: "선택 내용 노출",
    streetAddr: "선택 내용 노출",
    zipCode: "우편번호 노출",
    addr: "검색된 주소 정보 노출",
    addrDetail: "입력한 상세 주소 정보 노출",
    significant: "선택 내용 노출",
    nonRechargeable: "차량A,차량B",
    /* 운영정보 */
    weekdayStartDate: "00:00",
    weekdayEndDate: "00:00",
    holidayStartDate: "00:00",
    holidayEndDate: "00:00",
    saturdayStartDate: "00:00",
    saturdayEndDate: "00:00",
    parkingFeeStatus: "1",
    parkingFeeDetail: "입력한 내용 노출",
    /* 지도 좌표 */
    lat: "37.378553955447",
    long: "127.11254077891",
    /* 계약정보 */
    contractNumber: "계약번호 노출",
  });
  /* 지도 컨트롤러 */
  const { setZoom, createMarker } = useMapStore();

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
      <HeaderBase />

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

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
                navigate("/charger/add");
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
                        name: "chargerStationName",
                        content: chargerStationName,
                        onChange,
                      },
                      {
                        titleWidthRatio: 4,
                        title: "충전소ID",
                        disabled,
                        name: "chargerStationId",
                        content: chargerStationId,
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
                        name: "chargerStationLocation",
                        content: chargerStationLocation,
                        onChange,
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>충전서비스사업자</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"serviceProvider"}
                          list={[
                            {
                              disabled,
                              label: "HEV",
                              value: "1",
                              checked: serviceProvider === "1",
                            },
                            {
                              disabled,
                              label: "JEV",
                              value: "2",
                              checked: serviceProvider === "2",
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
                          name={"useStatus"}
                          list={[
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
                            name={"businessName"}
                            value={businessName}
                            onChange={onChange}
                          />
                        )}
                        <CheckBoxBase
                          label={"직접입력"}
                          disabled={disabled}
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
                          name={"openStatus"}
                          list={[
                            {
                              disabled,
                              label: "완전",
                              value: "1",
                              checked: openStatus === "1",
                            },
                            {
                              disabled,
                              label: "부분",
                              value: "2",
                              checked: openStatus === "2",
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
                          name={"fast"}
                          value={fast}
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
                          name={"slow"}
                          value={slow}
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
                          name={"outletName"}
                          value={outletName}
                          onChange={onChange}
                        />
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          type={"number"}
                          placeholder={"개수"}
                          name={"outletCount"}
                          value={outletCount}
                          onChange={onChange}
                        />
                        <span>기</span>
                      </DetailContentCol>
                    </DetailGroupCol>
                    <DetailGroupCol>
                      <DetailLabelCol sm={4}>충전소 노출여부</DetailLabelCol>
                      <DetailContentCol>
                        <RadioGroup
                          name={"exposedStatus"}
                          list={[
                            {
                              disabled,
                              label: "노출",
                              value: "1",
                              checked: exposedStatus === "1",
                            },
                            {
                              disabled,
                              label: "미노출",
                              value: "2",
                              checked: exposedStatus === "2",
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
                        name: "receivingMethod",
                        list: [
                          {
                            disabled,
                            label: "자중",
                            value: "1",
                            checked: receivingMethod === "1",
                          },
                          {
                            disabled,
                            label: "가공",
                            value: "2",
                            checked: receivingMethod === "2",
                          },
                        ],
                        onChange,
                      },
                      {
                        title: "모자분리여부",
                        name: "separation",
                        list: [
                          {
                            disabled,
                            label: "모자",
                            value: "1",
                            checked: separation === "1",
                          },
                          {
                            disabled,
                            label: "자가",
                            value: "2",
                            checked: separation === "2",
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
                        name: "customerNumber",
                        content: customerNumber,
                        onChange,
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "계량기 번호",
                        name: "meter",
                        content: meter,
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
                        name: "optionalFee",
                        content: optionalFee,
                        onChange,
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "해당 한전영업소",
                        name: "businessOffice",
                        content: businessOffice,
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
                          name={"payment"}
                          value={payment}
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
                        name: "streetAddr",
                        content: streetAddr,
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
                            name={"zipCode"}
                            value={zipCode}
                            onChange={onChange}
                          />
                          <div style={{ flex: 3 }}>
                            {!disabled && (
                              <ButtonBase
                                className={"width-110"}
                                outline
                                label={"우편번호 검색"}
                                color={"turu"}
                                onClick={() => {}}
                              />
                            )}
                          </div>
                        </div>
                        <div className={"d-flex gap-4"}>
                          <TextInputBase
                            disabled={true}
                            bsSize={"lg"}
                            placeholder={""}
                            name={"addr"}
                            value={addr}
                            onChange={onChange}
                          />
                          <TextInputBase
                            bsSize={"lg"}
                            disabled={disabled}
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
                        disabled,
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
                        disabled,
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
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영시작시간(평일)",
                        name: "weekdayStartDate",
                        content: weekdayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(평일)",
                        name: "weekdayEndDate",
                        content: weekdayEndDate,
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
                        name: "holidayStartDate",
                        content: holidayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(휴일)",
                        name: "holidayEndDate",
                        content: holidayEndDate,
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
                        name: "saturdayStartDate",
                        content: saturdayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
                        disabled,
                        titleWidthRatio: 4,
                        title: "운영종료시간(토)",
                        name: "saturdayEndDate",
                        content: saturdayEndDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                    ]}
                  />

                  <DetailRow>
                    <DetailLabelCol sm={2}>주차비 여부</DetailLabelCol>
                    <DetailContentCol>
                      <RadioGroup
                        name={"parkingFeeStatus"}
                        list={[
                          {
                            disabled,
                            label: "미확인",
                            value: "1",
                            checked: parkingFeeStatus === "1",
                          },
                          {
                            disabled,
                            label: "유",
                            value: "2",
                            checked: parkingFeeStatus === "2",
                          },
                          {
                            disabled,
                            label: "무",
                            value: "3",
                            checked: parkingFeeStatus === "3",
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
                <Row className={"me-1 border-bottom border-2 mb-4"}>
                  <DetailTextInputRow
                    rows={[
                      {
                        titleWidthRatio: 4,
                        title: "계약번호",
                        name: "contractNumber",
                        content: contractNumber,
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
                      long={Number(long)}
                      isInitMarker={true}
                      onChangeLocation={(changeLat, changeLong) => {
                        if (
                          lat !== changeLat.toString() ||
                          long !== changeLong.toString()
                        ) {
                          onChangeSingle({
                            lat: `${changeLat}`,
                            long: `${changeLong}`,
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
                    name={"long"}
                    value={long}
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
                  <span className={"font-size-12"}>급속 1대 / 완속 0</span>
                </Col>
                <Col md={12}>
                  {/* 충전기 요약 테이블 */}
                  <TableBase tableHeader={chargerSummaryTableHeader}>
                    <>
                      {chargerSummaryList.map(
                        (
                          {
                            totalCount,
                            communicationCount,
                            validCount,
                            ingCount,
                            etcCount,
                          },
                          index
                        ) => (
                          <tr key={index} className={"bg-white"}>
                            <td>{totalCount}</td>
                            <td>{communicationCount}</td>
                            <td>{validCount}</td>
                            <td>{ingCount}</td>
                            <td>{etcCount}</td>
                          </tr>
                        )
                      )}
                    </>
                  </TableBase>
                  {/* 충전기 상세 테이블 */}
                  <TableBase tableHeader={chargerTableHeader}>
                    <>
                      {chargerList.map(
                        (
                          {
                            chargerNum,
                            installStatus,
                            type,
                            chargerStatus,
                            communicationStatus,
                          },
                          index
                        ) => (
                          <tr className={"bg-white"} key={index}>
                            <td>
                              <HoverSpan
                                className={"text-turu"}
                                onClick={() => {
                                  navigate(`/charger/charger/detail/${index}`);
                                }}
                              >
                                <u>{chargerNum}</u>
                              </HoverSpan>
                            </td>
                            <td>{installStatus}</td>
                            <td>{type}</td>
                            <td>
                              <span
                                className={
                                  "px-2 py-1 d-inline-block bg-success " +
                                  "rounded-pill text-center text-white"
                                }
                              >
                                {chargerStatus}
                              </span>
                            </td>
                            <td>{communicationStatus}</td>
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
        title={"충전 정보 수정 완료 안내"}
        contents={"수정된 충전기 정보가 저장되었습니다."}
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
