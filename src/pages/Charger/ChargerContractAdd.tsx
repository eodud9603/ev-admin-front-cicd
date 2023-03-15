import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Row } from "reactstrap";
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

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    menuItems: [{ label: "구,군", value: "1" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "1" }],
  },
];

const ChargerContractAdd = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 계약 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 등록완료 모달 */
  const [isAddComplete, setIsAddComplete] = useState(false);
  /* 등록취소 모달 */
  const [isAddCancel, setIsAddCancel] = useState(false);
  const {
    contractPlace,
    contractName,
    envChargerId,
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
    envChargerId: "",
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
            { label: "충전소 계약 신규 등록", href: "" },
          ]}
          title={"충전소 계약 신규 등록"}
        />

        <p className={"mt-3 mb-2 font-size-20 text-dark fw-bold"}>기본정보</p>
        <Row className={"mb-4"}>
          <DetailRow>
            <DetailLabelCol sm={2}>계약장소명</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                name={"contractPlace"}
                value={contractPlace}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 연동여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"환경부 연동여부"}
                list={[
                  {
                    label: "연동",
                  },
                  {
                    label: "미연동",
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
                onChange={() => {}}
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
                <input type={"date"} className={"form-control w-xs"} />
                <div className={"px-2 text-center"}>~</div>
                <input type={"date"} className={"form-control w-xs"} />
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
                  },
                  {
                    label: "미사용",
                    value: "2",
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
              <DetailGroupCol className={"gap-3"}>
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
            disabled={true}
            /** @TODO disabled에 따른 코드 추후 추가 */
            // color={false ? "turu" : "secondary"}
            color={"secondary"}
            onClick={() => {}}
          />
        </div>
      </BodyBase>

      <DetailCompleteModal
        isOpen={isAddComplete}
        onClose={() => {
          setIsAddComplete((prev) => !prev);
        }}
        title={"충전소 계약 정보 수정 완료 안내"}
        contents={"수정된 충전소 계약 정보가 저장되었습니다."}
      />
      <DetailCancelModal
        isOpen={isAddCancel}
        onClose={() => {
          setIsAddCancel((prev) => !prev);
        }}
        cancelHandler={() => {
          navigate("/charger/contract");
        }}
        title={"충전소 계약 정보 수정 취소 안내"}
        contents={
          "수정된 충전소 계약 정보가 저장되지 않습니다.\n수정을 취소하시겠습니까?"
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
