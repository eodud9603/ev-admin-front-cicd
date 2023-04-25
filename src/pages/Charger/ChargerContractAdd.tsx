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
import TextInputBase from "src/components/Common/Input/TextInputBase";

import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import DetailCancelModal from "src/pages/Charger/components/DetailCancelModal";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import useInputs from "src/hooks/useInputs";
import { RegionGroup } from "src/components/Common/Filter/component/RegionGroup";
import { postStationContractRegister } from "src/api/station/stationApi";
import { number, object, string } from "yup";
import DetailValidCheckModal from "src/pages/Charger/components/DetailValidCheckModal";
import { fileUpload } from "src/utils/upload";
import { useLoaderData } from "react-router-dom";
import { chargerContractAddLoaderType } from "src/pages/Charger/loader/chargerContractAddLoader";
import { useTabs } from "src/hooks/useTabs";

const contractValidation = object({
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
  esafetyMng: string().optional(),
  // .required("전기 안전 관리를 입력해주세요."),
});

const ChargerContractAdd = () => {
  const data = useLoaderData() as chargerContractAddLoaderType;
  const [tabList, setTabList] = useState([{ label: "충전소 계약 관리" }]);
  /* 미입력 안내 모달 */
  const [invalidModalOpen, setInvalidModalOpen] = useState(false);
  /* 등록완료 모달 */
  const [isAddComplete, setIsAddComplete] = useState(false);
  /* 등록취소 모달 */
  const [isAddCancel, setIsAddCancel] = useState(false);
  const [inputs, { onChange, onChangeSingle }] = useInputs(data.inputs);
  const {
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

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  /* 계약서 파일 */
  const [file, setFile] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({
    url: data?.file?.file
      ? URL.createObjectURL(
          JSON.parse(data.file.file)
            .map((info) => new File([], info.name, { type: info.type }))
            .map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
              })
            )[0]
        )
      : "",
    file: data?.file?.file
      ? JSON.parse(data.file.file).map(
          (info) => new File([], info.name, { type: info.type })
        )
      : null,
  });
  // files.map((file) =>
  //     Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //       formattedSize: formatBytes(file.size),
  //     })
  // );
  const navigate = useNavigate();

  /** valid check */
  const isValid = async () => {
    /** 유효성 체크 */
    const valid = await contractValidation.isValid({
      ...inputs,
      /** @TODO 파일 업로드 기능 추가 후, 적용 */
      // contractFileUrl:
      // contractFileName: file?.item(0)?.name
    });

    return valid;
  };

  /** 계약 등록 */
  const postRegister = async () => {
    /** 유효성 체크 */
    const valid = await isValid();
    if (!valid) {
      setInvalidModalOpen(true);
      return;
    }

    /** upload file params */
    const fileParams = await fileUpload(file);

    /* 등록 요청 */
    const { code } = await postStationContractRegister({
      ...inputs,
      subsidyAmount: Number(subsidyAmount),
      costSales: Number(costSales),
      costConstruct: Number(costConstruct),
      contractFileName: fileParams.name,
      contractFileUrl: fileParams.url,
    });
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 등록 완료 모달 오픈 */
      setIsAddComplete(true);
    }
  };

  const filesArray = file.file ? Array.from(file.file) : [];
  const filesInfo = filesArray.map((file) => {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
    };
  });
  const filesInfoString = JSON.stringify(filesInfo);
  console.log(file);
  useTabs({
    data: {
      inputs: inputs,
      file: {
        url: file.url,
        file: filesInfoString,
      },
    },
    pageTitle: "충전소 계약 신규 등록",
    pageType: "add",
  });

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

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
                name: "place",
                content: place,
                onChange,
                placeholder: "입력해주세요.",
              },
              {
                titleWidthRatio: 4,
                title: "계약자명",
                name: "contractorName",
                content: contractorName,
                onChange,
                placeholder: "입력해주세요.",
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
                  },
                  {
                    label: "해지대기",
                    value: "SC80",
                  },
                  {
                    label: "해지",
                    value: "SC89",
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
                  },
                  {
                    label: "미연동",
                    value: "N",
                  },
                ]}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>환경부 충전소 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                bsSize={"lg"}
                name={"meStationId"}
                value={meStationId ?? ""}
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
                  name={"contractStartDt"}
                  className={"form-control w-xs"}
                  value={contractStartDt}
                  onChange={onChange}
                />
                <div className={"px-2 text-center"}>~</div>
                <input
                  type={"date"}
                  name={"contractEndDt"}
                  className={"form-control w-xs"}
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
                  name={"managerName"}
                  value={managerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  name={"managerPhone"}
                  value={managerPhone}
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
                  name={"salesManagerName"}
                  value={salesManagerName}
                  onChange={onChange}
                />
                <div className={"font-size-14"}>연락처</div>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  name={"salesManagerPhone"}
                  value={salesManagerPhone}
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
                name: "contractInfo",
                content: contractInfo,
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
                {file.file && file.file.length > 0 ? (
                  <u
                    onClick={() => {
                      window?.open(file.url);
                    }}
                  >
                    {/*ㄴㄴ*/}
                    {/*{file.file?.item(0)?.name}*/}
                    {file.file[0]?.name}
                  </u>
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

                    console.log(e.target.files);
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
                <ButtonBase
                  outline
                  label={"업로드"}
                  color={"turu"}
                  onClick={() => {
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
                title: "보조금 기관",
                name: "subsidyAgency",
                content: subsidyAgency,
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "보조금 연도",
                name: "subsidyYyyy",
                content: subsidyYyyy,
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
                name={"subsidyAmount"}
                value={subsidyAmount.toString() ?? ""}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>수령일</DetailLabelCol>
            <DetailContentCol>
              <input
                type={"date"}
                className={"form-control w-xs"}
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
                title: "영업비",
                name: "costSales",
                content: costSales.toString(),
                placeholder: "입력해주세요.",
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "공사비",
                name: "costConstruct",
                content: costConstruct.toString(),
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
                name: "esafetyMng",
                content: esafetyMng,
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
            onClick={postRegister}
          />
        </div>
      </BodyBase>

      <DetailValidCheckModal
        isOpen={invalidModalOpen}
        onClose={() => setInvalidModalOpen(false)}
      />
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
