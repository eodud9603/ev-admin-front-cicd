import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
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
import { IStationContractDetailResponse } from "src/api/station/stationApi.interface";
import { number, object, string } from "yup";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import { postStationContractModify } from "src/api/station/stationApi";
import { YNType } from "src/api/api.interface";
import { useTabStore } from "src/store/tabStore";

const contractValidation = object({
  id: number().required("필수 값이 누락되었습니다."),
  place: string().required("계약 장소를 입력해주세요."),
  contractorName: string().required("계약자 이름을 입력해주세요."),
  code: string().required("계약여부를 입력해주세요."),
  isMeRoaming: string().required("환경부 연동 여부를 입력해주세요."),
  // isUse: string().required("사용여부를 입력해주세요."),
  meStationId: string().optional(),
  contractStartDt: string().required("계약 시작일를 입력해주세요."),
  contractEndDt: string().required("계약 종료일를 입력해주세요."),
  addressSido: string().required("행정동 주소 (시도)를 입력해주세요."),
  addressSigugun: string().required("행정동 주소(구군)를 입력해주세요."),
  addressDongmyun: string().required("행정동 주소(동읍)를 입력해주세요."),
  managerName: string().required("장소 담당자를 입력해주세요."),
  managerPhone: string().required("담당자 전화번호를 입력해주세요."),
  salesCompany: string().required("영업업체를 입력해주세요."),
  salesManagerName: string().required("영업담당자를 입력해주세요."),
  salesManagerPhone: string().required("영업담당자 전화번호를 입력해주세요."),
  contractInfo: string().required("영업내용을 입력해주세요."),
  // contractFileUrl: string().required("계약파일을 업로드해주세요."),
  // contractFileName: string().required("계약파일 이름을 찾을 수 없습니다."),
  contractDt: string().required("계약일를 입력해주세요."),
  subsidyAgency: string().required("보조금 기관을 입력해주세요."),
  subsidyYyyy: string().required("보조금 연도를 입력해주세요."),
  subsidyAmount: number().required("보조금 금액을 입력해주세요."),
  subsidyRevDt: string().required("보조금 수령일를 입력해주세요."),
  costSales: number().required("영업비용을 입력해주세요."),
  costConstruct: number().required("공사비를 입력해주세요."),
  esafetyMng: string().required("전기 안전 관리를 입력해주세요."),
});

const ChargerContractDetail = () => {
  /** init 충전소 계약 상세 데이터 */
  const data = useLoaderData() as IStationContractDetailResponse | null;

  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  const { onChange, onChangeSingle, reset, ...inputs } = useInputs({
    id: data?.id ?? "",
    place: data?.place ?? "",
    contractorName: data?.contractorName ?? "",
    code: data?.code ?? "",
    isMeRoaming: (data?.isMeRoaming ?? "") as YNType,
    meStationId: data?.meStationId ?? "",
    contractStartDt: data?.contractStartDt ?? "",
    contractEndDt: data?.contractEndDt ?? "",
    addressSido: data?.addressSido ?? "",
    addressSigugun: data?.addressSigugun ?? "",
    addressDongmyun: data?.addressDongmyun ?? "",
    managerName: data?.managerName ?? "",
    managerPhone: data?.managerPhone ?? "",
    salesCompany: data?.salesCompany ?? "",
    salesManagerName: data?.salesManagerName ?? "",
    salesManagerPhone: data?.salesManagerPhone ?? "",
    contractInfo: data?.contractInfo ?? "",
    contractDt: data?.contractDt ?? "",
    subsidyAgency: data?.subsidyAgency ?? "",
    subsidyYyyy: data?.subsidyYyyy ?? "",
    subsidyAmount: (data?.subsidyAmount ?? "").toString(),
    subsidyRevDt: data?.subsidyRevDt ?? "",
    costSales: (data?.costSales ?? "").toString(),
    costConstruct: (data?.costConstruct ?? "").toString(),
    esafetyMng: data?.esafetyMng ?? "",
  });
  const {
    id,
    place,
    contractorName,
    code,
    isMeRoaming,
    meStationId,
    contractStartDt,
    contractEndDt,
    addressSido,
    addressSigugun,
    addressDongmyun,
    managerName,
    managerPhone,
    salesCompany,
    salesManagerName,
    salesManagerPhone,
    contractInfo,
    contractDt,
    subsidyAgency,
    subsidyYyyy,
    subsidyAmount,
    subsidyRevDt,
    costSales,
    costConstruct,
    esafetyMng,
  } = inputs;
  /* 계약서 파일 */
  const [file, setFile] = useState<FileList | null>(null);

  const navigate = useNavigate();

  /** 계약 수정 */
  const postModify = async () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /** 유효성 체크 */
    const valid = await contractValidation.isValid({
      ...inputs,
      /** @TODO 파일 업로드 기능 추가 후, 적용 */
      // contractFileUrl:
      // contractFileName: file?.item(0)?.name
    });
    if (!valid) {
      return;
    }

    /* 수정 요청 */
    const { code } = await postStationContractModify({
      ...inputs,
      id: Number(id),
      subsidyAmount: Number(subsidyAmount),
      costSales: Number(costSales),
      costConstruct: Number(costConstruct),
      contractFileUrl: "",
      contractFileName: "",
    });
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 수정 완료 모달 오픈 */
      setIsEditComplete(true);
      setDisabled((prev) => !prev);
    }
  };

  const tabStore = useTabStore();

  useEffect(() => {
    const index = tabStore.data.findIndex((e) =>
      location.pathname.includes(e.path)
    );
    if (index > -1) {
      tabStore.changeData(location.pathname, {
        data: data,
        label: "충전소 계약 상세",
        path: location.pathname,
        rootPath: location.pathname.split("/detail")[0],
      });
    }
    tabStore.setActive(location.pathname);
  }, []);

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup />

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
                name: "place",
                content: place,
                onChange,
              },
              {
                disabled,
                titleWidthRatio: 4,
                title: "계약자명",
                name: "contractorName",
                content: contractorName,
                onChange,
              },
            ]}
          />

          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"code"}
                list={[
                  {
                    label: "계약",
                    value: "1",
                    checked: code === "1",
                    disabled,
                  },
                  {
                    label: "해지대기",
                    value: "2",
                    checked: code === "2",
                    disabled,
                  },
                  {
                    label: "해지",
                    value: "3",
                    checked: code === "3",
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
                name={"isMeRoaming"}
                list={[
                  {
                    label: "연동",
                    value: "Y",
                    checked: isMeRoaming === "Y",
                    disabled,
                  },
                  {
                    label: "미연동",
                    value: "N",
                    checked: isMeRoaming === "N",
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
                name={"meStationId"}
                value={meStationId}
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
                  name={"contractStartDt"}
                  value={contractStartDt}
                  onChange={onChange}
                />
                <div className={"px-2 text-center"}>~</div>
                <input
                  type={"date"}
                  className={"form-control w-xs"}
                  disabled={disabled}
                  name={"contractEndDt"}
                  value={contractEndDt}
                  onChange={onChange}
                />
              </div>
            </DetailContentCol>
            <Col sm={6} />
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>행정동 주소</DetailLabelCol>
            <DetailContentCol>
              <RegionGroup
                disabled={disabled}
                init={{
                  sido: addressSido,
                  sigugun: addressSigugun,
                  dongmyun: addressDongmyun,
                }}
                onChangeRegion={(region) => {
                  onChangeSingle({
                    addressSido: region.sido,
                    addressSigugun: region.sigugun,
                    addressDongmyun: region.dongmyun,
                  });
                }}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>장소 담당자</DetailLabelCol>
            <DetailContentCol>
              <DetailGroupCol className={"gap-3 d-flex align-items-center"}>
                <TextInputBase
                  className={"width-100"}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"managerName"}
                  value={managerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"managerPhone"}
                  value={managerPhone}
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
                name={"salesCompany"}
                value={salesCompany}
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
                  name={"salesManagerName"}
                  value={salesManagerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"salesManagerPhone"}
                  value={salesManagerPhone}
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
                name: "contractInfo",
                content: contractInfo,
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
                name={"contractDt"}
                value={contractDt}
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
                name: "subsidyAgency",
                content: subsidyAgency,
                onChange,
              },
              {
                titleWidthRatio: 4,
                disabled,
                title: "보조금 연도",
                name: "subsidyYyyy",
                content: subsidyYyyy,
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
                name={"subsidyAmount"}
                value={subsidyAmount}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>수령일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
                disabled={disabled}
                name={"subsidyRevDt"}
                value={subsidyRevDt}
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
                name: "costSales",
                content: costSales,
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                disabled,
                title: "공사비",
                name: "costConstruct",
                content: costConstruct,
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
                name: "esafetyMng",
                content: esafetyMng,
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
          rightButtonHandler={postModify}
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
