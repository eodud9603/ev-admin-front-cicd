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
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import useInputs from "src/hooks/useInputs";
import { IStationContractDetailResponse } from "src/api/station/stationApi.interface";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import { postStationContractModify } from "src/api/station/stationApi";
import { YNType } from "src/api/api.interface";
import { useTabStore } from "src/store/tabStore";
import { TContractStatus } from "src/constants/status";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import { fileUpload } from "src/utils/upload";
import createValidation from "src/utils/validate";
import {
  YUP_CHARGER_CONTRACT,
  YUP_CHARGER_CONTRACT_EXTRA,
} from "src/constants/valid/charger";

const ChargerContractDetail = () => {
  /** init 충전소 계약 상세 데이터 */
  const data = useLoaderData() as IStationContractDetailResponse | null;

  /** 전역 disabled 처리 */
  const [disabled, setDisabled] = useState(true);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 수정완료 모달 */
  const [isEditComplete, setIsEditComplete] = useState(false);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  const [inputs, { onChange, onChangeSingle }] = useInputs({
    id: data?.id ?? "",
    place: data?.place ?? "",
    contractorName: data?.contractorName ?? "",
    code: (data?.code ?? "") as TContractStatus,
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
    contractFileName: data?.contractFileName ?? "",
    contractFileUrl: data?.contractFileUrl ?? "",
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
    contractFileName,
    contractFileUrl,
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
  const [file, setFile] = useState<
    Partial<{ url: string; file: FileList | null }>
  >({
    url: data?.contractFileUrl ?? "",
  });

  const navigate = useNavigate();

  /** 계약 수정 */
  const postModify = async () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /** upload file params */
    const fileParams = await fileUpload(file);
    fileParams.name = fileParams.name || contractFileName;
    fileParams.url = fileParams.url || contractFileUrl;

    const modifyParams = {
      ...inputs,
      id: Number(id),
      subsidyAmount: Number(subsidyAmount),
      costSales: Number(costSales),
      costConstruct: Number(costConstruct),
      contractFileName: fileParams.name,
      contractFileUrl: fileParams.url,
    };

    /** 유효성 체크 */
    const scheme = createValidation({
      ...YUP_CHARGER_CONTRACT,
      ...YUP_CHARGER_CONTRACT_EXTRA,
    });
    const [invalid] = scheme(modifyParams);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 수정 요청 */
    const { code } = await postStationContractModify(modifyParams);

    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 수정 완료 모달 오픈 */
      setIsEditComplete(true);
      setDisabled((prev) => !prev);
      setFile({});
      onChangeSingle({
        contractFileName: fileParams.name,
        contractFileUrl: fileParams.url,
      });
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
                    value: "SC01",
                    checked: code === "SC01",
                    disabled,
                  },
                  {
                    label: "해지대기",
                    value: "SC80",
                    checked: code === "SC80",
                    disabled,
                  },
                  {
                    label: "해지",
                    value: "SC89",
                    checked: code === "SC89",
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
              <Hover className={"font-size-14 text-turu"}>
                <u
                  onClick={() => {
                    const url = file.url || contractFileUrl;
                    if (url) {
                      window?.open(url);
                    }
                  }}
                >
                  {file.file?.item(0)?.name || contractFileName}
                </u>
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

                    const localUrl = URL.createObjectURL(
                      Array.from(e.target.files)[0]
                    );
                    setFile({
                      url: localUrl,
                      file: e.target.files,
                    });
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

      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
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
