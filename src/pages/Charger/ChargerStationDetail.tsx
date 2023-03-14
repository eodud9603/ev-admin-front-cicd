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
import DetailBottomButton from "./components/DetailBottomButton";

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
  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);

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
            />
          </div>

          <Row>
            <Col md={8}>
              {/* 기본정보 */}
              <AnimationRow
                isOpen={isDefaultInfoDrop}
                className={"me-1 border-bottom border-2 mb-4"}
              >
                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "충전소명",
                      required: true,
                      content: "휴맥스 카플랫 전용 A",
                      disabled,
                    },
                    {
                      titleWidthRatio: 4,
                      title: "충전소ID",
                      content: "KEP0000000020",
                      disabled,
                    },
                  ]}
                />

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 2,
                      title: "충전소 위치",
                      content: "입력 내용 노출",
                      disabled,
                    },
                  ]}
                />

                <DetailRow>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>충전서비스사업자</DetailLabelCol>
                    <DetailContentCol>
                      <DropdownBase
                        disabled={disabled}
                        menuItems={[{ label: "휴맥스 EV", value: "1" }]}
                      />
                    </DetailContentCol>
                  </DetailGroupCol>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>계약자명</DetailLabelCol>
                    <DetailContentCol>
                      <TextInputBase
                        name={"계약자명"}
                        bsSize={"lg"}
                        className={
                          "border-1 border-secondary border-opacity-50"
                        }
                        disabled={disabled}
                        value={"내용 입력 노출"}
                        onChange={() => {}}
                      />
                    </DetailContentCol>
                  </DetailGroupCol>
                </DetailRow>

                <DetailRow>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>위탁사업자명</DetailLabelCol>
                    <DetailContentCol>
                      <DropdownBase
                        disabled={disabled}
                        menuItems={[{ label: "선택 내용 노출", value: "1" }]}
                      />
                    </DetailContentCol>
                  </DetailGroupCol>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>개방여부</DetailLabelCol>
                    <DetailContentCol>
                      <RadioGroup
                        name={"개방여부"}
                        list={[
                          { label: "완전", disabled, checked: true },
                          { label: "부분", disabled },
                        ]}
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
                        name={"fastCharger"}
                        disabled={disabled}
                        value={"1"}
                        onChange={() => {}}
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
                        name={"slowCharger"}
                        disabled={disabled}
                        value={"0"}
                        onChange={() => {}}
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
                        name={"과금형"}
                        disabled={disabled}
                        value={"3kw 콘센트"}
                        onChange={() => {}}
                      />
                      <TextInputBase
                        bsSize={"lg"}
                        name={"과금형_기"}
                        disabled={disabled}
                        value={"3"}
                        onChange={() => {}}
                      />
                      <span>기</span>
                    </DetailContentCol>
                  </DetailGroupCol>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>충전소 노출여부</DetailLabelCol>
                    <DetailContentCol>
                      <RadioGroup
                        name={"충전소 노출여부"}
                        list={[
                          {
                            disabled,
                            checked: true,
                            label: "노출",
                            value: "1",
                          },
                          { disabled, label: "미노출", value: "2" },
                        ]}
                      />
                    </DetailContentCol>
                  </DetailGroupCol>
                </DetailRow>

                <DetailTextRadioRow
                  rows={[
                    {
                      title: "수전방식",
                      list: [
                        {
                          disabled,
                          checked: true,
                          label: "자중",
                          value: "1",
                        },
                        { disabled, label: "가공", value: "2" },
                      ],
                    },
                    {
                      title: "모자분리여부",
                      list: [
                        {
                          disabled,
                          checked: true,
                          label: "모자",
                          value: "1",
                        },
                        { disabled, label: "자가", value: "2" },
                      ],
                    },
                  ]}
                />

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "한전고객번호",
                      disabled,
                      content: "입력 내용 노출",
                    },
                    {
                      titleWidthRatio: 4,
                      title: "계량기 번호",
                      disabled,
                      content: "입력 내용 노출",
                    },
                  ]}
                />

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "한전선택요금",
                      disabled,
                      content: "입력 내용 노출",
                    },
                    {
                      titleWidthRatio: 4,
                      title: "해당 한전영업소",
                      disabled,
                      content: "입력 내용 노출",
                    },
                  ]}
                />

                <DetailRow>
                  <DetailGroupCol>
                    <DetailLabelCol sm={4}>한전불입금</DetailLabelCol>
                    <DetailContentCol>
                      <TextInputBase
                        bsSize={"lg"}
                        name={"한전불입금"}
                        disabled={disabled}
                        value={"입력 내용 노출"}
                        onChange={() => {}}
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
                      />
                    </DetailContentCol>
                  </DetailGroupCol>
                </DetailRow>

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 2,
                      title: "충전기 위치",
                      disabled,
                      content: "입력 내용 노출",
                    },
                  ]}
                />

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 2,
                      title: "도로명 주소",
                      disabled,
                      content: "입력 내용 노출",
                    },
                  ]}
                />

                {/* TODO: 지번 주소 추가 */}
                <DetailRow>
                  <DetailGroupCol>
                    <DetailLabelCol sm={2}>지번 주소</DetailLabelCol>
                    <DetailContentCol>
                      <TextInputBase
                        bsSize={"lg"}
                        disabled={disabled}
                        className={"mb-4"}
                        name={"우편번호"}
                        value={"우편번호 노출"}
                        onChange={() => {}}
                      />
                      <div className={"d-flex gap-4"}>
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          name={"주소"}
                          value={"검색된 주소 정보 노출"}
                          onChange={() => {}}
                        />
                        <TextInputBase
                          bsSize={"lg"}
                          disabled={disabled}
                          name={"상세주소"}
                          value={"입력한 상세 주소 정보 노출"}
                          onChange={() => {}}
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
                      disabled,
                      content: "입력 내용 노출",
                    },
                  ]}
                />

                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 2,
                      title: "충전불가 차량",
                      disabled,
                      content: "차량A, 차량B",
                    },
                  ]}
                />
              </AnimationRow>
              {/* 운영정보 */}
              <DropArea
                className={"gap-1"}
                onClick={() => setIsOperateDrop((prev) => !prev)}
              >
                <span className={"font-size-20 fw-bold"}>운영정보</span>
                <Icon
                  isOpen={isOperateDrop}
                  className={"mdi mdi-chevron-up font-size-24"}
                />
              </DropArea>
              <AnimationRow
                isOpen={isOperateDrop}
                className={"me-1 border-bottom border-2 mb-4"}
              >
                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "운영시작시간(평일)",
                      disabled,
                      content: "00:00",
                    },
                    {
                      titleWidthRatio: 4,
                      title: "운영종료시간(평일)",
                      disabled,
                      content: "00:00",
                    },
                  ]}
                />
                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "운영시작시간(휴일)",
                      disabled,
                      content: "00:00",
                    },
                    {
                      titleWidthRatio: 4,
                      title: "운영종료시간(휴일)",
                      disabled,
                      content: "00:00",
                    },
                  ]}
                />
                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "운영시작시간(토)",
                      disabled,
                      content: "00:00",
                    },
                    {
                      titleWidthRatio: 4,
                      title: "운영종료시간(토)",
                      disabled,
                      content: "00:00",
                    },
                  ]}
                />
              </AnimationRow>
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
              <AnimationRow
                isOpen={isContractDrop}
                className={"me-1 border-bottom border-2 mb-4"}
              >
                <DetailTextInputRow
                  rows={[
                    {
                      titleWidthRatio: 4,
                      title: "계약번호",
                      content: "계약번호",
                      disabled,
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
              </AnimationRow>
            </Col>

            <Col
              md={4}
              className={
                "p-2 bg-light bg-opacity-50 rounded-1 border border-2 border-light"
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
                    disabled={disabled}
                    name={"x"}
                    value={"37.3196853051"}
                    onChange={() => {}}
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
                    name={"y"}
                    value={"127.3196853051"}
                    onChange={() => {}}
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
                                onClick={() => {}}
                              >
                                <u>{chargerNum}</u>
                              </HoverSpan>
                            </td>
                            <td>{installStatus}</td>
                            <td>{type}</td>
                            <td>
                              <span
                                className={
                                  "px-2 py-1 d-inline-block bg-success rounded-pill text-center text-white"
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
          listHandler={() => navigate("/charger/chargerStation")}
          editDisabled={disabled}
          editHandler={() => setDisabled(false)}
          saveHandler={() => {
            /* TODO: 저장 로직 추가 필요 */
            setDisabled(true);
          }}
        />
      </BodyBase>
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
      className={`d-flex justify-content-center align-items-center border rounded bg-white font-size-16 text-secondary ${className}`}
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

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const AnimationRow = styled(Row)<{ isOpen: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? "auto" : 0)};
  transition: height 1s;
`;
