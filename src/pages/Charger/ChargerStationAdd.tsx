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
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import DetailValidCheckModal from "./components/DetailValidCheckModal";

const ChargerStationAdd = () => {
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

  const {
    chargerStationName,
    chargerStationId,
    chargerStationLocation,
    serviceProvider,
    useStatus,
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
    locationX,
    locationY,
    onChange,
    onChangeSingle,
  } = useInputs({
    /* 기본정보 */
    chargerStationName: "",
    chargerStationId: "",
    chargerStationLocation: "",
    serviceProvider: "1",
    useStatus: "",
    business: "0" /* 위탁사업자 > dropdown */,
    directInput: "0" /* 위탁사업자 > 직접입력 체크여부 */,
    businessName: "" /* 위탁사업자 > 직접입력값(businessName) */,
    openStatus: "",
    fast: "",
    slow: "",
    outletName: "",
    outletCount: "",
    exposedStatus: "",
    receivingMethod: "",
    separation: "",
    customerNumber: "",
    meter: "",
    optionalFee: "",
    businessOffice: "",
    payment: "",
    entryDate: "",
    chargerLocation: "",
    streetAddr: "",
    zipCode: "",
    addr: "",
    addrDetail: "",
    significant: "",
    nonRechargeable: "",
    /* 운영정보 */
    weekdayStartDate: "",
    weekdayEndDate: "",
    holidayStartDate: "",
    holidayEndDate: "",
    saturdayStartDate: "",
    saturdayEndDate: "",
    parkingFeeStatus: "1",
    parkingFeeDetail: "",
    /* 지도 좌표 */
    locationX: "",
    locationY: "",
    /* 계약정보 */
    contractNumber: "",
  });
  /* 등록완료 모달 */
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  /* 미입력 안내 모달 */
  const [isValidCheckModalOpen, setIsValidCheckModalOpen] = useState(false);
  /* 등록취소 모달 */
  const [isRegistrationCancel, setIsRegistrationCancel] = useState(false);

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

  /** 빈값 체크 */
  const emptyCheck = (value: string) => {
    return value.trim().length === 0;
  };

  /** 피그마 기준 - 필수입력 항목 체크 */
  const requiredCheck = () => {
    return (
      emptyCheck(chargerStationName) ||
      emptyCheck(chargerStationName) ||
      emptyCheck(locationX) ||
      emptyCheck(locationY)
    );
  };

  /** 등록 */
  const save = () => {
    const isEmpty = requiredCheck();
    if (isEmpty) {
      setIsValidCheckModalOpen(true);
      return;
    }
    /** @TODO 저장 로직 추가 필요 */

    /* 저장 성공 */
    setIsRegistrationComplete(true);
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
                        name: "chargerStationName",
                        content: chargerStationName,
                        onChange,
                      },

                      {
                        titleWidthRatio: 4,
                        title: "충전소ID",
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
                              label: "HEV",
                              value: "1",
                              checked: serviceProvider === "1",
                            },
                            {
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
                              label: "사용",
                              value: "1",
                              checked: useStatus === "1",
                            },
                            {
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
                            menuItems={[
                              { label: "선택", value: "" },
                              { label: "선택 내용 노출", value: "1" },
                            ]}
                            onClickDropdownItem={(_, value) => {
                              onChangeSingle({ business: value });
                            }}
                          />
                        ) : (
                          <TextInputBase
                            bsSize={"lg"}
                            name={"businessName"}
                            value={businessName}
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
                          name={"openStatus"}
                          list={[
                            {
                              label: "완전",
                              value: "1",
                              checked: openStatus === "1",
                            },
                            {
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
                          inputstyle={{ flex: 3 }}
                          bsSize={"lg"}
                          placeholder={"입력해주세요 (ex. 3kw 콘센트)"}
                          name={"outletName"}
                          value={outletName}
                          onChange={onChange}
                        />
                        <TextInputBase
                          inputstyle={{ flex: 1 }}
                          bsSize={"lg"}
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
                              label: "노출",
                              value: "1",
                              checked: exposedStatus === "1",
                            },
                            {
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
                            label: "자중",
                            value: "1",
                            checked: receivingMethod === "1",
                          },
                          {
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
                            label: "모자",
                            value: "1",
                            checked: separation === "1",
                          },
                          {
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
                        titleWidthRatio: 4,
                        title: "한전고객번호",
                        name: "customerNumber",
                        content: customerNumber,
                        onChange,
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "한전선택요금",
                        name: "optionalFee",
                        content: optionalFee,
                        onChange,
                      },
                      {
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
                            inputstyle={{ flex: 1 }}
                            bsSize={"lg"}
                            disabled={true}
                            className={"mb-4"}
                            placeholder={""}
                            name={"zipCode"}
                            value={zipCode}
                            onChange={onChange}
                          />
                          <div style={{ flex: 3 }}>
                            <ButtonBase
                              className={"width-110"}
                              outline
                              label={"우편번호 검색"}
                              color={"turu"}
                              onClick={() => {}}
                            />
                          </div>
                        </div>
                        <div className={"d-flex gap-4"}>
                          <TextInputBase
                            bsSize={"lg"}
                            disabled={true}
                            placeholder={""}
                            name={"addr"}
                            value={addr}
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
                        name: "weekdayStartDate",
                        content: weekdayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "운영시작시간(휴일)",
                        name: "holidayStartDate",
                        content: holidayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                        titleWidthRatio: 4,
                        title: "운영시작시간(토)",
                        name: "saturdayStartDate",
                        content: saturdayStartDate,
                        onChange,
                        placeholder: "00:00 형식으로 입력해주세요",
                      },
                      {
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
                            label: "미확인",
                            value: "1",
                            checked: parkingFeeStatus === "1",
                          },
                          {
                            label: "유",
                            value: "2",
                            checked: parkingFeeStatus === "2",
                          },
                          {
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
                  <DetailDropdownRow
                    rows={[
                      {
                        titleWidthRatio: 2,
                        title: "계약번호",
                        dropdownItems: [
                          {
                            menuItems: [
                              {
                                label: "선택",
                                value: "",
                              },
                              {
                                label: "test",
                                value: "1",
                              },
                            ],
                            onClickDropdownItem: (label, value) => {
                              onChangeSingle({ contractNumber: value });
                            },
                          },
                        ],
                      },
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
                  <TempMap className={"bg-light bg-opacity-100"}>
                    지도 영역
                    <MapButtonArea className={"position-absolute"}>
                      <IconButton
                        className={"dripicons-location"}
                        onClick={() => {}}
                      />
                      <IconButton className={"bx bx-plus"} onClick={() => {}} />
                      <IconButton
                        className={"bx bx-minus"}
                        onClick={() => {}}
                      />
                    </MapButtonArea>
                  </TempMap>
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
                    name={"locationX"}
                    value={locationX}
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
                    name={"locationY"}
                    value={locationY}
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

const TempMap = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 251px;

  justify-content: center;
  align-items: center;
`;