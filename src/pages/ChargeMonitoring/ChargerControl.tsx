import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import ClusterMapBase from "src/components/Common/Map/ClusterMapBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { OPERATOR_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "" }],
  },
  {
    menuItems: [{ label: "구,군", value: "" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "" }],
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "충전소명", placeholderKeyword: "충전소명을", value: "1" },
  { label: "충전소 ID", placeholderKeyword: "충전소 ID를", value: "2" },
];

/** 충전기 타입 목록 */
const chargerTypeList = [
  {
    label: "전체",
    value: "",
  },
  {
    label: "완속",
    value: "1",
  },
  {
    label: "급속",
    value: "2",
  },
  {
    label: "알수없음",
    value: "3",
  },
];

/** 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "지역" },
  { label: "구분" },
  { label: "사용/전용 구분" },
  { label: "충전소명" },
  { label: "충전기 ID" },
  { label: "충전기유형" },
  { label: "주문ID" },
  { label: "충전기상태" },
  { label: "통신" },
  { label: "충전시작" },
  { label: "최종 연결" },
  { label: "최종 충전 종료" },
  { label: "서버통신채널" },
  { label: "TR설치여부" },
  { label: "서버수신시간" },
  { label: "모뎀수집시간" },
  { label: "모뎀번호" },
  { label: "모뎀수신감도" },
  { label: "케이블상태" },
  { label: "충전이상상태" },
  { label: "버튼상태" },
  { label: "RF상태" },
  { label: "사용충전량" },
  { label: "누적충전량" },
  { label: "구간충전량" },
  { label: "구간충전금액" },
  { label: "이벤트코드" },
  { label: "펌웨어버전" },
  { label: "H/W버전" },
  { label: "음원버전" },
  { label: "환경변수버전" },
  { label: "충전기내부온도" },
  { label: "냉각장치여부" },
  { label: "설치 년도" },
];

/** 임시 마커 목록 */
const markerList = [
  {
    stationId: "KEP0000000020",
    stationName: "휴맥스 카플랫 전용 A",
    regionGroupId: "1",
    addr: "경기도 성남시 분당구 황새울로 216",
    addrDetail: "임시",
    lat: 37.378553955447,
    long: 127.11254077891,
    status: "full",
  },
  {
    stationId: "KEP0000000020",
    stationName: "휴맥스 카플랫 전용 B",
    regionGroupId: "1",
    addr: "경기도 성남시 분당구 황새울로 216",
    addrDetail: "임시",
    lat: 37.378553955447,
    long: 127.21254077891,
    status: "disabled",
  },
  {
    stationId: "KEP0000000020",
    stationName: "부산 카플랫 전용 A",
    regionGroupId: "2",
    addr: "부산 주소",
    addrDetail: "임시",
    lat: 35.1795543,
    long: 129.0756416,
    status: "able",
  },
  {
    stationId: "KEP0000000020",
    stationName: "땅끝마을 카플랫 전용 A",
    regionGroupId: "3",
    addr: "땅끝마을 주소",
    addrDetail: "임시",
    lat: 34.294765,
    long: 126.525143,
    status: "unknown",
  },
  {
    stationId: "KEP0000000020",
    stationName: "땅끝마을 카플랫 전용 B",
    regionGroupId: "3",
    addr: "땅끝마을 주소",
    addrDetail: "임시",
    lat: 34.394765,
    long: 126.525143,
    status: "unknown",
  },
];

/** 임시 데이터 */
const chargerList = [
  {
    id: "1",
    region: "서울",
    operatorType: "HEV",
    useType: "사용",
    chargerStationName: "휴맥스충전소",
    chargerId: "0000000002-1",
    chargerType: "DC콤보",
    orderId: "OD2022120112345678",
    chargerStatus: "충전가능",
    communication: "연결",
    chargeStartDate: "2023-03-28 11:57:00",
    finalConnectionDate: "2023-03-28 13:57:00",
    chargerEndDate: "2023-03-28 13:57:00",
    channel: "1",
    trStatus: "Y",
    serverReceive: "2023-03-28 13:57:00",
    modemCollection: "2023-03-28 13:57:00",
    modemNumber: "01225108977",
    receptionSensitivity: -70,
    cableStatus: "미연결",
    chargingAbnormality: "이상없음",
    buttonStatus: "시작버튼 눌름",
    rfStatus: "인증중",
    usedChargeAmount: 0,
    sectionCumulativeChargeAmount: 790.37,
    sectionChargeAmount: 0,
    chargeAmount: 0,
    eventCode: "주기보고",
    firmwareVersion: "SF1023",
    hwVersion: "10",
    soundSourceVersion: "음원버전 노출",
    envVersion: "100",
    internalTemperature: 0,
    coolingDevice: "N",
    installationYear: "2023-01-01",
  },
];

const ChargerControl = () => {
  const [tabList, setTabList] = useState([{ label: "충전기 관제" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const [
    { operator, searchRange, searchText, chargerType },
    { onChange, onChangeSingle },
  ] = useInputs({
    operator: "",
    searchRange: "1",
    searchText: "",
    chargerType: "",
  });
  const searchKeyword =
    searchList.find((data) => searchRange === data.value)?.placeholderKeyword ??
    "";

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
            { label: "홈", href: "#" },
            { label: "충전 모니터링", href: "#" },
            { label: "충전기 관제", href: "#" },
          ]}
          title={"충전기 관제"}
        />

        {/* 검색 */}
        <section
          className={"py-5 d-flex flex-column gap-4 border-top border-bottom"}
        >
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={addressList}
                className={"me-2 w-xs"}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"운영사"}
                name={"operator"}
                list={OPERATOR_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: operator === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row className={"d-flex align-items-center"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                placeholder={`${searchKeyword} 입력해주세요`}
                menuItems={searchList}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ searchRange: value });
                }}
                name={"searchText"}
                value={searchText}
                onChange={onChange}
              />
            </Col>
            <Col md={4}>
              <RadioGroup
                title={"충전기 구분"}
                name={"chargerType"}
                list={chargerTypeList.map((data) => ({
                  ...data,
                  checked: chargerType === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>
        </section>

        {/* 지도 */}
        <MapContainer className={"my-4"}>
          <ClusterMapBase markerList={markerList}>
            {/* 상단 날씨 */}
            {/** @TODO 공공기관 api 키 필요 */}
            {/* <Weather
            iconClassName={"text-turu bx bx-sun"}
            lowest={-2}
            highest={8}
          ></Weather> */}
            {/* 하단 통계 */}
            <ChargerStatistics
              total={5}
              communicationProblem={1}
              rechargeable={1}
              charging={1}
              inspection={2}
            />
          </ClusterMapBase>
        </MapContainer>

        {/* 테이블 */}
        <TableBase tableHeader={tableHeader}>
          <>
            {chargerList.length > 0 ? (
              chargerList.map((info, index) => (
                <tr key={info.id}>
                  <td>{index + 1}</td>
                  <td>{info.region}</td>
                  <td>{info.operatorType}</td>
                  <td>{info.useType}</td>
                  <td
                    onClick={() => {
                      navigate(`/charger/station/detail/${info.id}`);
                    }}
                  >
                    <HoverSpan className={"text-turu"}>
                      <u> {info.chargerStationName}</u>
                    </HoverSpan>
                  </td>
                  <td>{info.chargerId}</td>
                  <td>{info.chargerType}</td>
                  <td>
                    {" "}
                    <HoverSpan className={"text-info"}>
                      <u> {info.orderId}</u>
                    </HoverSpan>
                  </td>
                  <td>
                    <ButtonBase
                      className={"w-xs rounded-5 py-1"}
                      label={info.chargerStatus}
                      color={"info"}
                    />
                  </td>
                  <td>{info.communication}</td>
                  <td>{info.chargeStartDate}</td>
                  <td>{info.finalConnectionDate}</td>
                  <td>{info.chargerEndDate}</td>
                  <td>{info.channel}</td>
                  <td>{info.trStatus}</td>
                  <td>{info.serverReceive}</td>
                  <td>{info.modemCollection}</td>
                  <td>{info.modemNumber}</td>
                  <td>{info.receptionSensitivity}</td>
                  <td>{info.cableStatus}</td>
                  <td>{info.chargingAbnormality}</td>
                  <td>{info.buttonStatus}</td>
                  <td>{info.rfStatus}</td>
                  <td>{info.usedChargeAmount}</td>
                  <td>{info.sectionCumulativeChargeAmount}</td>
                  <td>{info.sectionChargeAmount}</td>
                  <td>{info.chargeAmount}</td>
                  <td>{info.eventCode}</td>
                  <td>{info.firmwareVersion}</td>
                  <td>{info.hwVersion}</td>
                  <td>{info.soundSourceVersion}</td>
                  <td>{info.envVersion}</td>
                  <td>{info.internalTemperature}</td>
                  <td>{info.coolingDevice}</td>
                  <td>{info.installationYear}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={35} className={"py-5 text"}>
                  검색된 충전기 정보가 없습니다.
                </td>
              </tr>
            )}
          </>
        </TableBase>

        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargerControl;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;

/** 지도 영역(임시) */
const MapContainer = styled.div`
  display: flex;
  flex: 1;
  height: 686px;
`;

/** 날씨 아이콘 */
const Icon = styled.i`
  font-size: 44px;
`;

interface IWeatherProps {
  lowest: number;
  highest: number;
  iconClassName: string;
}

interface IChargerStatisticsItemProps {
  label: string;
  value: number;
}
interface IChargerStatisticsProps {
  total: number;
  communicationProblem: number;
  rechargeable: number;
  charging: number;
  inspection: number;
}

/** 날씨 */
const Weather = (props: IWeatherProps) => {
  const { lowest, highest, iconClassName } = props;

  return (
    <div
      className={
        "shadow-lg m-4 p-4 position-absolute top-0 end-0 " +
        "d-flex rounded bg-white"
      }
    >
      <div className={"me-3 font-size-16 fw-semibold"}>
        <p className={"m-0 mb-2"}>오늘날씨</p>
        <p className={"m-0"}>
          {lowest}º / {highest}º
        </p>
      </div>
      <Icon className={iconClassName} />
    </div>
  );
};

/** 충전기 통계 아이템 */
const StatisticItem = (props: IChargerStatisticsItemProps) => {
  const { label, value } = props;

  return (
    <div className={"width-110"}>
      <div
        className={
          "m-0 py-2 text-secondary text-center " +
          "border-top border-end border-secondary"
        }
      >
        {label}
      </div>
      <p
        className={
          "m-0 py-2 text-secondary text-center " +
          "border-start-0 border border-secondary"
        }
      >
        {value}
      </p>
    </div>
  );
};

/** 충전기 통계 */
const ChargerStatistics = (props: IChargerStatisticsProps) => {
  const { total, communicationProblem, rechargeable, charging, inspection } =
    props;

  return (
    <div
      style={{ zIndex: 1, maxWidth: "541px" }}
      className={
        "shadow-sm m-4 position-absolute bottom-0 start-0 " +
        "d-flex bg-white font-size-16 fw-bold"
      }
    >
      <div className={"width-110"}>
        <div
          className={
            "m-0 py-2 bg-turu text-white text-center " +
            "border-top border-end border-turu"
          }
        >
          총합
        </div>
        <p className={"m-0 py-2 text-turu text-center border border-turu"}>
          {total}
        </p>
      </div>
      <StatisticItem label={"통신이상"} value={communicationProblem} />
      <StatisticItem label={"충전가능"} value={rechargeable} />
      <StatisticItem label={"충전중"} value={charging} />
      <StatisticItem label={"점검중"} value={inspection} />
    </div>
  );
};
