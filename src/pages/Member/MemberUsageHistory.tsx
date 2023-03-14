import React, { useState } from "react";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import styled from "styled-components";
import { Col, Row } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { useNavigate, useParams } from "react-router-dom";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const dropdownGroupSearch = [
  { label: "충전소명", value: "1" },
  { label: "충전소 ID", value: "1" },
];

const tableHeader = [
  { label: "번호", sort: () => {} },
  { label: "주문ID" },
  { label: "충전소명" },
  { label: "충전기 ID" },
  { label: "통신 채널" },
  { label: "충전시작일시" },
  { label: "충전종료일시" },
  { label: "종료(중단) 유형" },
  { label: "총 충전시간" },
  { label: "총 충전량(kWh)" },
  { label: "총 이용요금(원)" },
];

const data = [
  {
    orderId: 1,
    stationName: "휴맥스 카플랫 전용 A",
    stationId: "0000",
    channel: "CH1",
    startDt: "YYYY.MM.DD 00:00:00",
    endDt: "YYYY.MM.DD 00:00:00",
    endType: "충전완료",
    chargingTime: "00:00:00",
    chargingAmount: "000",
    fee: 1000,
  },
];

export const MemberUsageHistory = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");

  if (!id) {
    nav(-1);
    return <></>;
  }

  const moveToPrevPage = () => {
    nav("/member/normal");
  };

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "공지사항" }, { label: "회원 관리" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "회원 및 카드 관리", href: "/member/normal" },
            { label: "회원 관리", href: "/member/normal" },
            {
              label: "회원 이용내역 조회",
              href: `/member/normal/history/${id}`,
            },
          ]}
          title={"회원 이용내역 조회"}
        />

        <Separator />

        <FilterSection className={"py-4"}>
          <Row>
            <Col md={6}>
              <DateGroup
                label={"조회기간"}
                buttonState={[
                  { label: "7일" },
                  { label: "1개월" },
                  { label: "3개월" },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <SearchTextInput
                title={"검색어"}
                menuItems={dropdownGroupSearch}
                placeholder={`${text}을 입력해주세요`}
                name={"searchText"}
                className={""}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
          </Row>
        </FilterSection>
        <Separator />

        <DashBoardSection
          className={
            "border border-turu border-opacity-50 " +
            "bg-turu bg-opacity-10 rounded-2"
          }
        >
          <MemberInfoContainer>
            <div className={"bg-white p-1 rounded-3 me-2"}>
              <span className={"fw-bold"}>회원명</span>
              <span className={"mx-1"}>:</span>
              <span>김회원</span>
            </div>
            <div className={"bg-white p-1 rounded-3 me-2"}>
              <span className={"fw-bold"}>회원 ID</span>
              <span className={"mx-1"}>:</span>
              <span>kim</span>
            </div>
            <div className={"bg-white p-1 rounded-3 me-2"}>
              <span className={"fw-bold"}>회원소속</span>
              <span className={"mx-1"}>:</span>
              <span>HEV</span>
            </div>
            <div className={"bg-white p-1 rounded-3"}>
              <span className={"fw-bold"}>구분</span>
              <span className={"mx-1"}>:</span>
              <span>그룹(그룹명)</span>
            </div>
          </MemberInfoContainer>
          <DetailRow className={"border border-turu border-opacity-50 mt-3"}>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              이용 횟수(회)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              총 충전량(kWh)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              총 이용 요금(원)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              충전 오류 횟수(회)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
          </DetailRow>
        </DashBoardSection>

        <ListSection className={"py-4"}>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의
                이용내역이 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td></td>
                    <td>{e.orderId}</td>
                    <td>{e.channel}</td>
                    <td>
                      <HoverSpan className={"text-turu"}>
                        <u>{e.stationName}</u>
                      </HoverSpan>
                    </td>
                    <td>
                      {" "}
                      <HoverSpan className={"text-turu"}>
                        <u>{e.stationId}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.startDt}</td>
                    <td>{e.endDt}</td>
                    <td>{e.endType}</td>
                    <td>{e.chargingTime}</td>
                    <td>{e.chargingAmount}</td>
                    <td>{e.fee}</td>
                  </tr>
                ))}
            </>
          </TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
        <div className={"d-flex justify-content-center"}>
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"w-xs"}
            onClick={moveToPrevPage}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const DashBoardSection = styled.section`
  padding: 18px;
`;
const ListSection = styled.section``;
const FilterSection = styled.section``;
const AmountInfo = styled.span``;
const Separator = styled.hr``;

const MemberInfoContainer = styled.div`
  display: flex;
`;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
