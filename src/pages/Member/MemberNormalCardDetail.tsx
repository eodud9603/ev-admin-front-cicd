import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { Col, Collapse, Label, Row } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import { IssuanceStatusButton } from "src/pages/Member/MemberNormalCard";
import { ReIssuanceInfoModal } from "src/pages/Member/components/ReIssuanceInfoModal";

const reIssuanceTableHeader = [
  { label: "번호" },
  { label: "발급상태" },
  { label: "회원카드 번호(기존)" },
  { label: "회원카드 번호(재발급)" },
  { label: "재발급비(원)" },
  { label: "신청일" },
  { label: "발급일" },
];

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];
const dropdownData2 = [
  { label: "전체", value: "1" },
  { label: "신청", value: "1" },
  { label: "발급", value: "1" },
  { label: "발송", value: "1" },
  { label: "수령완료", value: "1" },
];

const data = [
  {
    cardSeq: 1,
    issuanceStatus: "a",
    issuanceDivision: "신규",
    memberOriginCardNumber: "0000-0000-0000-0000",
    memberReIssuanceCardNumber: "0000-0000-0000-0000",
    reIssuanceFee: "1000",
    createDt: "YYYY.MM.DD",
    issuanceDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 2,
    issuanceStatus: "b",
    issuanceDivision: "신규",
    memberOriginCardNumber: "0000-0000-0000-0000",
    memberReIssuanceCardNumber: "0000-0000-0000-0000",
    reIssuanceFee: "1000",
    createDt: "YYYY.MM.DD",
    issuanceDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 3,
    issuanceStatus: "c",
    issuanceDivision: "신규",
    memberOriginCardNumber: "0000-0000-0000-0000",
    memberReIssuanceCardNumber: "0000-0000-0000-0000",
    reIssuanceFee: "1000",
    createDt: "YYYY.MM.DD",
    issuanceDt: "YYYY.MM.DD",
  },
  {
    cardSeq: 4,
    issuanceStatus: "d",
    issuanceDivision: "신규",
    memberOriginCardNumber: "0000-0000-0000-0000",
    memberReIssuanceCardNumber: "0000-0000-0000-0000",
    reIssuanceFee: "1000",
    createDt: "YYYY.MM.DD",
    issuanceDt: "YYYY.MM.DD",
  },
];
export const MemberNormalCardDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "회원카드 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [isReIssuanceInfoDrop, setIsReIssuanceInfoDrop] =
    useState<boolean>(true);
  const [isReIssuanceInfoModal, setIsReIssuanceInfoModal] =
    useState<boolean>(false);
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

  const handleIsReIssuanceInfoModal = () => {
    setIsReIssuanceInfoModal((prev) => !prev);
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
            { label: "회원 및 카드관리", href: "" },
            { label: "회원카드 관리", href: "" },
            { label: "회원카드 발급내역 상세", href: "" },
          ]}
          title={"회원카드 발급내역 상세"}
        />

        <Label className={"fw-bold mt-3 font-size-16"}>기본정보</Label>
        <DashBoardSection
          className={
            "border border-turu border-opacity-50 " +
            "bg-turu bg-opacity-10 rounded-2 mb-4"
          }
        >
          <DetailRow className={"border border-turu border-opacity-50"}>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              카드 발급 수량(개)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              총 발급비(원)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              재발급 여부
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
            <DetailLabelCol className={"bg-turu bg-opacity-10"}>
              총 재발급비(원)
            </DetailLabelCol>
            <DetailContentCol>NN</DetailContentCol>
          </DetailRow>
        </DashBoardSection>
        <BasicInfoSection>
          <DetailRow>
            <DetailLabelCol sm={2}>이름</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
            <DetailLabelCol sm={2}>회원 ID</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>회원 구분</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>신청 수량</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
            <DetailLabelCol sm={2}>신청일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>발급상태</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <DropdownBase menuItems={[{ label: "신청", value: "1" }]} />
            </DetailContentCol>
            <DetailLabelCol sm={2}>발송일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>회원카드번호(신규)/수령일</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
            <DetailLabelCol sm={2}>발급비(원)</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>비고</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
          </DetailRow>
        </BasicInfoSection>
        <DropArea
          className={"gap-1 mt-4"}
          onClick={() => setIsReIssuanceInfoDrop((prev) => !prev)}
        >
          <span className={"font-size-16 fw-bold"}>재발급 정보</span>
          <Icon
            isOpen={isReIssuanceInfoDrop}
            className={"mdi mdi-chevron-up font-size-24"}
          />
        </DropArea>
        <ReIssuanceSection isOpen={isReIssuanceInfoDrop}>
          <Row className={"my-2"}>
            <Col className={"d-flex align-items-center"}>
              <span className={"text-size-13 fw-bold"}>
                총 <span className={"text-turu"}>0개</span>의 재발급 정보가
                있습니다.보
              </span>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <DropdownBase menuItems={dropdownData2} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={reIssuanceTableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td></td>
                    <td>
                      <IssuanceStatusButton issuanceStatus={e.issuanceStatus} />
                    </td>
                    <td>
                      <HoverSpan
                        className={"text-turu"}
                        onClick={handleIsReIssuanceInfoModal}
                      >
                        <u>{e.memberOriginCardNumber}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.memberReIssuanceCardNumber}</td>
                    <td>{e.reIssuanceFee}</td>
                    <td>{e.createDt}</td>
                    <td>{e.issuanceDt}</td>
                  </tr>
                ))}
            </>
          </TableBase>
        </ReIssuanceSection>
        <div className={"d-flex justify-content-center"}>
          <ButtonBase label={"목록"} outline={true} className={"mx-2 w-xs"} />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs"} />
        </div>
      </BodyBase>
      <ReIssuanceInfoModal
        isOpen={isReIssuanceInfoModal}
        onClose={handleIsReIssuanceInfoModal}
      />
    </ContainerBase>
  );
};

const DashBoardSection = styled.section`
  padding: 15px;
`;
const BasicInfoSection = styled.section``;
const ReIssuanceSection = styled(Collapse)`
  padding: 2px;
`;
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

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
