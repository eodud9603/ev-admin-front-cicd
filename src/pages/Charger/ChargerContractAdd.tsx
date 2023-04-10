import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
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
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import useInputs from "src/hooks/useInputs";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";

const ChargerContractAdd = () => {
  const [tabList, setTabList] = useState([{ label: "충전소 계약 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 등록완료 모달 */
  const [isAddComplete, setIsAddComplete] = useState(false);
  /* 등록취소 모달 */
  const [isAddCancel, setIsAddCancel] = useState(false);
  const {
    contractPlace,
    contractName,
    envChargerId,
    contractStartDate,
    contractEndDate,
    placeManagerName,
    placeManagerTel,
    business,
    businessMangerName,
    businessMangerTel,
    contractContents,
    contractSigningDate,
    grantAgency,
    grantYear,
    grantPrice,
    receiptDate,
    businessPrice,
    constructionPrice,
    safetyManagement,
    onChange,
  } = useInputs({
    contractPlace: "",
    contractName: "",
    contractStatus: "",
    syncEnvironment: "",
    envChargerId: "",
    contractStartDate: "",
    contractEndDate: "",
    placeManagerName: "",
    placeManagerTel: "",
    business: "",
    businessMangerName: "",
    businessMangerTel: "",
    contractContents: "",
    contractSigningDate: "",
    grantAgency: "",
    grantYear: "",
    grantPrice: "",
    receiptDate: "",
    businessPrice: "",
    constructionPrice: "",
    safetyManagement: "",
  });
  /* 계약서 파일 */
  const [file, setFile] = useState<FileList | null>(null);

  const navigate = useNavigate();

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={() => {}}
        onClose={() => {}}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 계약 관리", href: "" },
            { label: "충전소 계약 신규 등록", href: "" },
          ]}
          title={"충전소 계약 신규 등록"}
        />

        <p className={"mt-3 mb-2 font-size-20 text-dark fw-bold"}>기본정보</p>
        <Row className={"mb-4"}>
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "계약장소명",
                name: "contractPlace",
                content: contractPlace,
                onChange,
                placeholder: "입력해주세요.",
              },
              {
                titleWidthRatio: 4,
                title: "계약자명",
                name: "contractName",
                content: contractName,
                onChange,
                placeholder: "입력해주세요.",
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"contractStatus"}
                list={[
                  {
                    label: "계약",
                    value: "1",
                  },
                  {
                    label: "해지대기",
                    value: "2",
                  },
                  {
                    label: "해지",
                    value: "3",
                  },
                ]}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>환경부 연동여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"syncEnvironment"}
                list={[
                  {
                    label: "연동",
                    value: "1",
                  },
                  {
                    label: "미연동",
                    value: "2",
                  },
                ]}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 충전소 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                name={"envChargerId"}
                value={envChargerId}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>계약기간</DetailLabelCol>
            <DetailContentCol>
              <div className={"input-group d-flex align-items-center w-auto"}>
                <input
                  type={"date"}
                  name={"contractStartDate"}
                  className={"form-control w-xs"}
                  value={contractStartDate}
                  onChange={onChange}
                />
                <div className={"px-2 text-center"}>~</div>
                <input
                  type={"date"}
                  name={"contractEndDate"}
                  className={"form-control w-xs"}
                  value={contractEndDate}
                  onChange={onChange}
                />
              </div>
            </DetailContentCol>
            <Col sm={6} />
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>행정동 주소</DetailLabelCol>
            <DetailContentCol>
              <RegionGroup />
            </DetailContentCol>

            <DetailLabelCol sm={2}>장소 담당자</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3 d-flex align-items-center"}>
                <TextInputBase
                  className={"width-100"}
                  bsSize={"lg"}
                  name={"placeManagerName"}
                  value={placeManagerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  name={"placeManagerTel"}
                  value={placeManagerTel}
                  placeholder={"000-0000-0000"}
                  onChange={onChange}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>영업업체</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                name={"business"}
                value={business}
                onChange={onChange}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>영업 담당자/연락처</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3 d-flex align-items-center"}>
                <TextInputBase
                  className={"width-100"}
                  bsSize={"lg"}
                  name={"businessMangerName"}
                  value={businessMangerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  name={"businessMangerTel"}
                  value={businessMangerTel}
                  placeholder={"000-0000-0000"}
                  onChange={onChange}
                />
              </DetailGroupCol>
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 2,
                title: "계약 조건 내용",
                name: "contractContents",
                content: contractContents,
                placeholder: "입력해주세요.",
                onChange,
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일 등록</DetailLabelCol>
            <DetailContentCol
              className={"d-flex align-items-center justify-content-between"}
            >
              <Hover
                className={`font-size-14 text-${
                  file ? "turu" : "secondary text-opacity-50"
                }`}
                onClick={() => {}}
              >
                {file ? (
                  <u>{file?.item(0)?.name}</u>
                ) : (
                  "계약서 파일을 등록해주세요"
                )}
                <Input
                  className={"visually-hidden"}
                  type={"file"}
                  id={"contractFile"}
                  name={"contractFile"}
                  accept={"*"}
                  onChange={(e) => {
                    if (!e.target.files) {
                      return;
                    }

                    setFile(e.target.files);
                  }}
                />
              </Hover>

              <>
                <ButtonBase
                  outline
                  label={"업로드"}
                  color={"turu"}
                  onClick={() => {
                    /** @TODO 업로드 기능 추가 */
                    document.getElementById("contractFile")?.click();
                  }}
                />
              </>
            </DetailContentCol>

            <DetailLabelCol sm={2}>계약 체결일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
                name={"contractSigningDate"}
                value={contractSigningDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "보조금 기관",
                name: "grantAgency",
                content: grantAgency,
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "보조금 연도",
                name: "grantYear",
                content: grantYear,
                placeholder: "입력해주세요.",
                onChange,
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>보조 금액</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                name={"grantPrice"}
                value={grantPrice}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>수령일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
                name={"receiptDate"}
                value={receiptDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "영업비",
                name: "businessPrice",
                content: businessPrice,
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "공사비",
                name: "constructionPrice",
                content: constructionPrice,
                placeholder: "입력해주세요.",
                onChange,
              },
            ]}
          />

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 2,
                title: "전기 안전관리",
                name: "safetyManagement",
                content: safetyManagement,
                placeholder: "입력해주세요.",
                onChange,
              },
            ]}
          />
        </Row>

        <div
          className={"my-5 d-flex align-items-center justify-content-center "}
        >
          <ButtonBase
            className={"width-110 me-2"}
            outline
            label={"목록"}
            onClick={() => {
              navigate("/charger/contract");
            }}
          />
          <ButtonBase
            className={"width-110 ms-2"}
            label={"등록"}
            /** @TODO disabled에 따른 코드 추후 추가 */
            // color={false ? "turu" : "secondary"}
            color={"turu"}
            onClick={() => {
              setIsAddComplete(true);
            }}
          />
        </div>
      </BodyBase>

      <DetailCompleteModal
        isOpen={isAddComplete}
        onClose={() => {
          setIsAddComplete((prev) => !prev);
        }}
        onClosed={() => {
          navigate("/charger/contract");
        }}
        title={"신규 충전소 계약 정보 등록 완료"}
        contents={"충전소 계약  정보가 등록되었습니다."}
      />
      <DetailCancelModal
        isOpen={isAddCancel}
        onClose={() => {
          setIsAddCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/contract");
        }}
        title={"신규 충전소 계약 정보 등록 취소 안내"}
        contents={
          "입력된 충전소 계약 정보가 저장되지 않습니다.\n신규 등록을 취소하시겠습니까?"
        }
      />
    </ContainerBase>
  );
};

export default ChargerContractAdd;

const Hover = styled.span`
  :hover {
    cursor: pointer;
  }
`;
