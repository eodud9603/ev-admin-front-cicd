import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Input, Label, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import useInputs from "src/hooks/useInputs";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import { postSupplierRegister } from "src/api/supplier/supplierApi";
import { useNavigate } from "react-router";
import { IRequestSupplierRegister } from "src/api/supplier/supplierApi.interface";
import { YNType } from "src/api/api.interface";
import { fileUpload } from "src/utils/upload";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";

const YN_LIST = [
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

export const ChargerOperatorRegistration = () => {
  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 등록완료 모달 */
  const [isAddComplete, setIsAddComplete] = useState(false);

  const { onChange, onChangeSingle, reset, ...inputs } = useInputs({
    name: "",
    supplierId: "",
    code: "",
    meAuthKey: "",
    phoneNumber: "",
    mainPhoneNumber: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    isContracted: "" as YNType,
    isActive: "" as YNType,
    contractedDate: "",
    /** @TODO 로밍담가 데이터 추가 필요 (서버 우선 작업 필요) */
  });
  const {
    name,
    supplierId,
    code,
    meAuthKey,
    phoneNumber,
    mainPhoneNumber,
    zipCode,
    address,
    addressDetail,
    contractedDate,
  } = inputs;
  /* 계약서 파일 */
  const [contractFile, setContractFile] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({});

  const navigate = useNavigate();

  /** 뒤로가기 */
  const goBack = () => {
    navigate(-1);
  };

  /** 주소 검색 modal visible */
  const onChangeModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  const confirm = async () => {
    /** 파일 params */
    const fileParams = await fileUpload(contractFile);
    /** 등록 params */
    const params: IRequestSupplierRegister = {
      ...inputs,
      contractFileId: fileParams.id,
      contractFileName: fileParams.name,
      contractFileUrl: fileParams.url,
    };

    /* 등록 요청 */
    const { code: registerCode } = await postSupplierRegister(params);
    /** 성공 */
    const success = registerCode === "SUCCESS";
    if (success) {
      setIsAddComplete(true);
    }
  };

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup />
      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "서비스 운영사 관리", href: "" },
            { label: "서비스 운영사 상세", href: "" },
          ]}
          title={"서비스 운영사 상세"}
        />
        <BasicInfoSection className={"mt-3"}>
          <Label className={"fw-semibold font-size-16 m-0 mb-2"}>
            기본정보
          </Label>

          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "운영사명",
                name: "name",
                content: name,
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "운영사ID",
                name: "supplierId",
                content: supplierId,
                onChange,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "한전기관ID",
                name: "code",
                content: code,
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "한전기관인증키(로밍)",
                name: "meAuthKey",
                content: meAuthKey,
                onChange,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                titleWidthRatio: 4,
                title: "사업자 전화번호",
                name: "phoneNumber",
                content: phoneNumber,
                onChange,
              },
              {
                titleWidthRatio: 4,
                title: "사업자 대표번호",
                name: "mainPhoneNumber",
                content: mainPhoneNumber,
                onChange,
              },
            ]}
          />
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>사업자 주소</DetailLabelCol>
            <DetailContentCol>
              <div className={"d-flex gap-4"}>
                <TextInputBase
                  inputstyle={{ flex: 1 }}
                  bsSize={"lg"}
                  disabled={true}
                  className={"mb-4"}
                  name={"zipCode"}
                  value={zipCode}
                />
                <div style={{ flex: 3 }}>
                  <ButtonBase
                    className={"width-110"}
                    outline
                    label={"우편번호 검색"}
                    color={"turu"}
                    onClick={onChangeModalVisible}
                  />
                </div>
              </div>
              <div className={"d-flex gap-4"}>
                <TextInputBase
                  bsSize={"lg"}
                  disabled={true}
                  name={"address"}
                  value={address}
                />
                <TextInputBase
                  bsSize={"lg"}
                  name={"addressDetail"}
                  value={addressDetail}
                  onChange={onChange}
                />
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"isContracted"}
                list={YN_LIST}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>활용여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"isActive"}
                list={YN_LIST}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>계약일자</DetailLabelCol>
            <DetailContentCol>
              <Input
                type={"date"}
                name={"contractedDate"}
                value={contractedDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <div
                className={"d-flex justify-content-between align-items-center"}
              >
                <div
                  role={"button"}
                  className={
                    contractFile.file?.item(0)?.name
                      ? "text-turu"
                      : "text-secondary"
                  }
                  onClick={() => {
                    if (contractFile.url) {
                      window?.open(contractFile.url);
                    }
                  }}
                >
                  {contractFile.file?.item(0)?.name ||
                    "계약서 파일을 등록해주세요."}
                </div>
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

                    setContractFile({
                      url: localUrl,
                      file: e.target.files,
                    });
                  }}
                />
                <ButtonBase
                  label={"업로드"}
                  outline={true}
                  color={"turu"}
                  onClick={() => {
                    document.getElementById("contractFile")?.click();
                  }}
                />
              </div>
            </DetailContentCol>
          </DetailRow>
        </BasicInfoSection>
        <RoamingPriceSection className={"mt-5"}>
          <Label className={"fw-semibold font-size-16 m-0 mb-2"}>
            로밍단가
          </Label>
          <span className={"text-turu ms-3"}>
            * 요금 관리 메뉴에서 로밍가 신규 등록 및 변경이 가능합니다
          </span>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>완속</DetailLabelCol>
            <DetailContentCol>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    도매가
                  </Label>
                  <TextInputBase
                    disabled
                    name={"price"}
                    value={""}
                    placeholder={""}
                  />
                </Col>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    소매가
                  </Label>
                  <TextInputBase
                    disabled
                    name={"price"}
                    value={""}
                    placeholder={""}
                  />
                </Col>
              </Row>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>급속</DetailLabelCol>
            <DetailContentCol>
              <Row>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    도매가
                  </Label>
                  <TextInputBase
                    disabled
                    name={"price"}
                    value={""}
                    placeholder={""}
                  />
                </Col>
                <Col className={"d-flex align-items-center"}>
                  <Label className={"fw-semibold text-nowrap me-3 m-0"}>
                    소매가
                  </Label>
                  <TextInputBase
                    disabled
                    name={"price"}
                    value={""}
                    placeholder={""}
                  />
                </Col>
              </Row>
            </DetailContentCol>
          </DetailRow>
        </RoamingPriceSection>
        <div className={"d-flex justify-content-center mt-5"}>
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"w-xs"}
            onClick={goBack}
          />
          <ButtonBase
            label={"등록"}
            color={"turu"}
            className={"mx-3 w-xs"}
            onClick={confirm}
          />
        </div>
      </BodyBase>

      <AddressSearchModal
        isOpen={addrSearchModalOpen}
        onClose={onChangeModalVisible}
        onchange={(data) => {
          onChangeSingle({
            zipCode: data.zipCode,
            address: data.address,
          });
        }}
      />
      <DetailCompleteModal
        isOpen={isAddComplete}
        onClose={() => {
          setIsAddComplete((prev) => !prev);
        }}
        onClosed={goBack}
        confirmHandler={goBack}
        title={"신규 서비스 운영사 등록 완료"}
        contents={"서비스 운영사 정보가 등록되었습니다."}
      />
    </ContainerBase>
  );
};

const BasicInfoSection = styled.section``;
const RoamingPriceSection = styled.section``;
