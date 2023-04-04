import React, { ChangeEvent, useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Label } from "reactstrap";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

const settlementHistoryHeader = [
  { label: "구분" },
  { label: "정산월" },
  { label: "이용 건수" },
  { label: "충전량 (Kw)" },
  { label: "이용 금액" },
  { label: "할인 금액" },
  { label: "정산 금액" },
];

const usageHistoryHeader = [
  { label: "번호" },
  { label: "회원명" },
  { label: "회원 카드번호" },
  { label: "차량 번호" },
  { label: "이용일시" },
  { label: "이용건수" },
  { label: "충전량(Kw)" },
  { label: "이용 금액" },
  { label: "할인 금액" },
  { label: "정산 금액" },
  { label: "이용 내역" },
];

const settlementData = [
  {
    division: "합계",
    settlementMonth: "3월",
    usageNumber: 30,
    chargingAmount: 50,
    usageFee: 30000,
    saleFee: 1000,
    settlementFee: 29000,
  },
];

const usageData = [
  {
    memberName: "이길동",
    memberCardNumber: "0000-1234-1111-1234",
    carNumber: "111테1111",
    usageDate: "2023-03-01 ~ 2023-03-29",
    usageCount: 10,
    chargingAmount: 20,
    usageFee: 10000,
    saleFee: 1000,
    settlementFee: 9000,
  },
];
export const SettlementRoamingDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "정산 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {};

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
            { label: "정산 관리", href: "" },
            { label: "로밍회원 결제 관리", href: "" },
            { label: "로밍회원 결제 관리 상세", href: "" },
          ]}
          title={"로밍회원 결제 관리 상세"}
        />
        <BasicInfoSection className={"mt-4"}>
          <Label className={"fw-semibold"}>기본정보</Label>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>로밍사</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"roamingCooperation"}
                value={"로밍사 A"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>정산 번호</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"settlementNumber"}
                value={"******"}
                type={"password"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>결제 수단</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"paymentMethod"}
                list={[
                  { label: "개별 결제", value: "" },
                  { label: "합산 결제", value: "" },
                  { label: "세금계산서", value: "" },
                ]}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>개인/법인 구분</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"settlementNumber"}
                value={"******"}
                type={"password"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>정산 기간</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"roamingCooperation"}
                value={"로밍사 A"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>정산월</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"settlementNumber"}
                value={"******"}
                type={"password"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>마감 여부</DetailLabelCol>
            <DetailContentCol>N</DetailContentCol>
            <DetailLabelCol sm={2}>정산일</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"settlementNumber"}
                value={"******"}
                type={"password"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>등록 일시</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"roamingCooperation"}
                value={"로밍사 A"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>결제일</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"settlementNumber"}
                value={"******"}
                type={"password"}
                onChange={onChangeInput}
                disabled={true}
              />
            </DetailContentCol>
          </DetailRow>
        </BasicInfoSection>
        <SettlementHistorySection className={"my-4"}>
          <Label className={"fw-semibold"}>정산 내역</Label>
          <Col md={6}>
            <TableBase tableHeader={settlementHistoryHeader}>
              <>
                {settlementData.length > 0 &&
                  settlementData.map((e, i) => (
                    <tr key={i}>
                      <td className={"text-turu fw-semibold"}>{e.division}</td>
                      <td>{e.settlementMonth}</td>
                      <td>{e.usageNumber}</td>
                      <td>{e.chargingAmount}</td>
                      <td>{e.usageFee}</td>
                      <td>{e.saleFee}</td>
                      <td>{e.settlementFee}</td>
                    </tr>
                  ))}
              </>
            </TableBase>
          </Col>
        </SettlementHistorySection>
        <UsageHistorySection>
          <Label className={"fw-semibold"}>이용 내역</Label>
          <TableBase tableHeader={usageHistoryHeader}>
            <>
              {usageData.length > 0 &&
                usageData.map((e, i) => (
                  <tr key={i}>
                    <td>{}</td>
                    <td>{e.memberName}</td>
                    <td>{e.memberCardNumber}</td>
                    <td>{e.carNumber}</td>
                    <td>{e.usageDate}</td>
                    <td>{e.usageCount}</td>
                    <td>{e.chargingAmount}</td>
                    <td>{e.usageFee}</td>
                    <td>{e.saleFee}</td>
                    <td>{e.settlementFee}</td>
                    <td>
                      <ButtonBase
                        label={"엑셀 저장"}
                        outline={true}
                        color={"turu"}
                      />
                    </td>
                  </tr>
                ))}
            </>
          </TableBase>
        </UsageHistorySection>
        <div className={"d-flex justify-content-center mt-3"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs"} />
          <ButtonBase label={"수정"} color={"turu"} className={"w-xs mx-2"} />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

const BasicInfoSection = styled.section``;
const SettlementHistorySection = styled.section``;
const UsageHistorySection = styled.section``;
