import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import TextInputBase from "src/components/Common/Input/TextInputBase";

import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";
import DetailBottomButton from "./components/DetailBottomButton";

const disabled = true;

/* 주소(지역) 필터 */
const addressList = [
  {
    disabled,
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    disabled,
    menuItems: [{ label: "구,군", value: "1" }],
  },
  {
    disabled,
    menuItems: [{ label: "동,읍", value: "1" }],
  },
];

const ChargerContractDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 계약 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");

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
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 계약 관리", href: "" },
            { label: "충전기 계약 상세", href: "" },
          ]}
          title={"충전기 계약 상세"}
        />

        <p className={"mt-3 mb-2 font-size-20 text-dark fw-bold"}>기본정보</p>
        <Row className={"mb-4"}>
          <DetailRow>
            <DetailLabelCol sm={2}>계약장소명</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"계약장소명"}
                bsSize={"lg"}
                disabled={disabled}
                value={"입력 내용 노출"}
                onChange={() => {}}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 연동여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"환경부 연동여부"}
                list={[
                  {
                    label: "연동",
                    checked: true,
                    disabled,
                  },
                  {
                    label: "미연동",
                    disabled,
                  },
                ]}
                onChange={() => {}}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"계약여부"}
                list={[
                  {
                    label: "계약",
                    checked: true,
                    value: "1",
                    disabled,
                  },
                  {
                    label: "해지대기",
                    value: "2",
                    disabled,
                  },
                  {
                    label: "해지",
                    value: "3",
                    disabled,
                  },
                ]}
                onChange={() => {}}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 충전소 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"환경부 충전소 ID"}
                bsSize={"lg"}
                disabled={disabled}
                value={"입력 내용 노출"}
                onChange={() => {}}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>계약기간</DetailLabelCol>
            <DetailContentCol>
              <div className={"input-group d-flex align-items-center w-auto"}>
                <input
                  type={"date"}
                  disabled={disabled}
                  className={"form-control w-xs"}
                />
                <div className={"px-2 text-center"}>~</div>
                <input
                  type={"date"}
                  disabled={disabled}
                  className={"form-control w-xs"}
                />
              </div>
            </DetailContentCol>
            <DetailLabelCol sm={2}>사용여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"사용여부"}
                list={[
                  {
                    label: "사용",
                    value: "1",
                    checked: true,
                    disabled,
                  },
                  {
                    label: "미사용",
                    value: "2",
                    disabled,
                  },
                ]}
                onChange={() => {}}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>행정동 주소</DetailLabelCol>
            <DetailContentCol>
              <DropboxGroup dropdownItems={addressList} className={"me-2"} />
            </DetailContentCol>

            <DetailLabelCol sm={2}>장소 담당자</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3"}>
                <TextInputBase
                  className={"width-100"}
                  name={"장소 담당자명"}
                  bsSize={"lg"}
                  disabled={disabled}
                  value={"홍길동"}
                  onChange={() => {}}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  name={"장소 담당자 연락처"}
                  bsSize={"lg"}
                  disabled={disabled}
                  value={"000-0000-0000"}
                  onChange={() => {}}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>영업업체</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"영업업체"}
                bsSize={"lg"}
                disabled={disabled}
                value={"입력 내용 노출"}
                onChange={() => {}}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>영업 담당자/연락처</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3"}>
                <TextInputBase
                  className={"width-100"}
                  name={"영업 담당자명"}
                  bsSize={"lg"}
                  disabled={disabled}
                  value={"홍길동"}
                  onChange={() => {}}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  name={"영업 담당자 연락처"}
                  bsSize={"lg"}
                  disabled={disabled}
                  value={"000-0000-0000"}
                  onChange={() => {}}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 2,
                disabled,
                title: "계약 조건 내용",
                content: "입력 내용 노출",
                onChange: () => {},
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일 등록</DetailLabelCol>
            <DetailContentCol>
              <Hover className={"font-size-14 text-turu"} onClick={() => {}}>
                <u>{"업로드한 계약서 파일명 01.pdf"}</u>
              </Hover>
            </DetailContentCol>

            <DetailLabelCol sm={2}>계약 체결일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                disabled={disabled}
                className={"form-control w-xs"}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                disabled,
                title: "보조금 기관",
                content: "입력 내용 노출",
                onChange: () => {},
              },
              {
                titleWidthRatio: 4,
                disabled,
                title: "보조금 연도",
                content: "입력 내용 노출",
                onChange: () => {},
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>보조 금액</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"보조 금액"}
                bsSize={"lg"}
                disabled={disabled}
                value={"입력 내용 노출"}
                onChange={() => {}}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>수령일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                disabled={disabled}
                className={"form-control w-xs"}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                disabled,
                title: "영업비",
                content: "입력 내용 노출",
                onChange: () => {},
              },
              {
                titleWidthRatio: 4,
                disabled,
                title: "공사비",
                content: "입력 내용 노출",
                onChange: () => {},
              },
            ]}
          />

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 2,
                disabled,
                title: "전기 안전관리",
                content: "입력 내용 노출",
                onChange: () => {},
              },
            ]}
          />
        </Row>

        <DetailBottomButton
          listHandler={() => navigate("/charger/contract")}
          editDisabled={true}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargerContractDetail;

const Hover = styled.span`
  :hover {
    cursor: pointer;
  }
`;
