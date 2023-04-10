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
import DetailBottomButton from "src/pages/Charger/components/DetailBottomButton";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import useInputs from "src/hooks/useInputs";

const ChargerContractDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 계약 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  const {
    contractPlace,
    contractName,
    contractStatus,
    syncEnvironment,
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
    contractPlace: "입력 내용 노출",
    contractName: "입력 내용 노출",
    contractStatus: "1",
    syncEnvironment: "1",
    envChargerId: "입력 내용 노출",
    contractStartDate: "2022-01-07",
    contractEndDate: "2024-01-07",
    placeManagerName: "홍길동",
    placeManagerTel: "000-0000-0000",
    business: "입력 내용 노출",
    businessMangerName: "홍길동",
    businessMangerTel: "000-0000-0000",
    contractContents: "입력 내용 노출",
    contractSigningDate: "2022-01-07",
    grantAgency: "입력 내용 노출",
    grantYear: "입력 내용 노출",
    grantPrice: "입력 내용 노출",
    receiptDate: "2022-01-07",
    businessPrice: "입력 내용 노출",
    constructionPrice: "입력 내용 노출",
    safetyManagement: "입력 내용 노출",
  });
  /* 계약서 파일 */
  const [file, setFile] = useState<FileList | null>(null);

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
            { label: "충전기 계약 관리", href: "/charger/contract" },
            { label: "충전소 계약 상세", href: "" },
          ]}
          title={"충전소 계약 상세"}
        />

        <p className={"mt-3 mb-2 font-size-20 text-dark fw-bold"}>기본정보</p>
        <Row className={"mb-4"}>
          <DetailTextInputRow
            rows={[
              {
                disabled,
                titleWidthRatio: 4,
                title: "계약장소명",
                name: "contractPlace",
                content: contractPlace,
                onChange,
              },
              {
                disabled,
                titleWidthRatio: 4,
                title: "계약자명",
                name: "contractName",
                content: contractName,
                onChange,
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
                    checked: contractStatus === "1",
                    disabled,
                  },
                  {
                    label: "해지대기",
                    value: "2",
                    checked: contractStatus === "2",
                    disabled,
                  },
                  {
                    label: "해지",
                    value: "3",
                    checked: contractStatus === "3",
                    disabled,
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
                    checked: syncEnvironment === "1",
                    disabled,
                  },
                  {
                    label: "미연동",
                    value: "2",
                    checked: syncEnvironment === "2",
                    disabled,
                  },
                ]}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 충전소 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                disabled={disabled}
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
                  className={"form-control w-xs"}
                  disabled={disabled}
                  name={"contractStartDate"}
                  value={contractStartDate}
                  onChange={onChange}
                />
                <div className={"px-2 text-center"}>~</div>
                <input
                  type={"date"}
                  className={"form-control w-xs"}
                  disabled={disabled}
                  name={"contractEndDate"}
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
              <DropboxGroup dropdownItems={addressList} className={"me-2"} />
            </DetailContentCol>

            <DetailLabelCol sm={2}>장소 담당자</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3 d-flex align-items-center"}>
                <TextInputBase
                  className={"width-100"}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"placeManagerName"}
                  value={placeManagerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"placeManagerTel"}
                  value={placeManagerTel}
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
                disabled={disabled}
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
                  disabled={disabled}
                  name={"businessMangerName"}
                  value={businessMangerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"businessMangerTel"}
                  value={businessMangerTel}
                  onChange={onChange}
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
                name: "contractContents",
                content: contractContents,
                onChange,
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일 등록</DetailLabelCol>
            <DetailContentCol
              className={"d-flex align-items-center justify-content-between"}
            >
              <Hover className={"font-size-14 text-turu"} onClick={() => {}}>
                <u>{file?.item(0)?.name}</u>
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
                {!disabled && (
                  <ButtonBase
                    outline
                    disabled={disabled}
                    label={"업로드"}
                    color={"turu"}
                    onClick={() => {
                      /** @TODO 업로드 기능 추가 */
                      document.getElementById("contractFile")?.click();
                    }}
                  />
                )}
              </>
            </DetailContentCol>

            <DetailLabelCol sm={2}>계약 체결일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
                disabled={disabled}
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
                disabled,
                title: "보조금 기관",
                name: "grantAgency",
                content: grantAgency,
                onChange,
              },
              {
                titleWidthRatio: 4,
                disabled,
                title: "보조금 연도",
                name: "grantYear",
                content: grantYear,
                onChange,
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>보조 금액</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                disabled={disabled}
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
                disabled={disabled}
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
                disabled,
                title: "영업비",
                name: "businessPrice",
                content: businessPrice,
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                disabled,
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
                disabled,
                title: "전기 안전관리",
                name: "safetyManagement",
                content: safetyManagement,
                placeholder: "입력해주세요.",
                onChange,
              },
            ]}
          />
        </Row>

        <DetailBottomButton
          containerClassName={"my-5"}
          rightButtonTitle={disabled ? "수정" : "저장"}
          listHandler={() => {
            /* 수정모드 상태에서 목록 버튼 클릭 */
            if (!disabled) {
              setIsEditCancel(true);
              return;
            }

            navigate("/charger/contract");
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
        title={"충전소 계약 정보 수정 완료 안내"}
        contents={"수정된 충전소 계약 정보가 저장되었습니다."}
      />
      <DetailCancelModal
        isOpen={isEditCancel}
        onClose={() => {
          setIsEditCancel((prev) => !prev);
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

export default ChargerContractDetail;

const Hover = styled.span`
  :hover {
    cursor: pointer;
  }
`;
