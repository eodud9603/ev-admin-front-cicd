import React, { useEffect, useState } from "react";
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
import { useLoaderData, useNavigate } from "react-router";
import useInputs from "src/hooks/useInputs";
import AddressSearchModal from "src/components/Common/Modal/AddressSearchModal";
import DetailDeleteModal from "src/pages/Charger/components/DetailDeleteModal";
import {
  deleteSupplier,
  postSupplierModify,
} from "src/api/supplier/supplierApi";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import { fileUpload } from "src/utils/upload";
import { getParams } from "src/utils/params";
import DetailCancelModal from "src/components/Common/Modal/DetailCancelModal";
import createValidation from "src/utils/validate";
import { YUP_CHARGER_OPERATOR } from "src/constants/valid/charger";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import { useTabs } from "src/hooks/useTabs";
import useTransferFile from "src/hooks/useTransferFile";
import { ISupplierDetailLoaderType } from "src/pages/Charger/loader/supplierDetailLoader";

const YN_LIST = [
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
];

export const ChargerOperatorDetail = () => {
  const {
    data,
    fileData: loaderFileData,
    editable = true,
  } = useLoaderData() as ISupplierDetailLoaderType;

  /* 수정모드 */
  const [disabled, setDisabled] = useState(editable);
  /* 수정취소 모달 */
  const [isEditCancel, setIsEditCancel] = useState(false);
  /* 주소검색 모달 */
  const [addrSearchModalOpen, setAddrSearchModalOpen] = useState(false);
  /* 삭제안내 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 완료(삭제/수정) 모달 */
  const [textModal, setTextModal] = useState<{
    isOpen: boolean;
    title: string;
    contents: string;
    onClosed?: () => void;
  }>({
    isOpen: false,
    title: "",
    contents: "",
    onClosed: undefined,
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    id: (data.id ?? "").toString(),
    name: data.name ?? "",
    supplierId: data.supplierId ?? "",
    code: data.code ?? "",
    meAuthKey: data.meAuthKey ?? "",
    phoneNumber: data.phoneNumber ?? "",
    mainPhoneNumber: data.mainPhoneNumber ?? "",
    zipCode: data.zipCode ?? "",
    address: data.address ?? "",
    addressDetail: data.addressDetail ?? "",
    isContracted: data.isContracted ?? "",
    isActive: data.isActive ?? "",
    contractedDate: data.contractedDate ?? "",
    contractFileId: data.contractFileId ?? undefined,
    contractFileName: data.contractFileName ?? "",
    contractFileUrl: data.contractFileUrl ?? "",
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
    isContracted,
    isActive,
    contractedDate,
    contractFileId,
    contractFileName,
    contractFileUrl,
  } = inputs;

  console.log("data ::", data);
  /* 계약서 파일 */
  const [contractFile, setContractFile] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({});

  const [fileData, setFileData] = useState({
    fileInfoData: {
      type: loaderFileData?.fileInfoData?.type ?? "",
      name: loaderFileData?.fileInfoData?.name ?? "",
    },
    blobStringData: loaderFileData?.blobStringData,
  });
  const { onChangeFile, onChangeFileData } = useTransferFile({ fileData });

  useEffect(() => {
    const file = onChangeFile();
    if (file) {
      setContractFile(file);
    }
  }, [onChangeFile]);

  useEffect(() => {
    const createFileData = async () => {
      if (!contractFile.file) {
        return;
      }

      const result = await onChangeFileData(contractFile.file);
      if (result) {
        setFileData(result);
      }
    };

    void createFileData();
  }, [contractFile, onChangeFileData]);

  const navigate = useNavigate();

  /** 뒤로가기 */
  const goBack = () => {
    navigate(-1);
  };

  /** disabled 상태 변경 */
  const onChangeDisabled = async () => {
    if (!disabled) {
      /** 파일 업로드 params */
      const fileParams = await fileUpload(contractFile);
      fileParams.id = fileParams.id || contractFileId;
      fileParams.name = fileParams.name || contractFileName;
      fileParams.url = fileParams.url || contractFileUrl;

      /** 수정 params */
      const params = {
        ...inputs,
        contractFileId: fileParams.id,
        contractFileName: fileParams.name,
        contractFileUrl: fileParams.url,
      };
      void getParams(params);

      /* 유효성 체크 */
      const scheme = createValidation(YUP_CHARGER_OPERATOR);
      const [invalid] = scheme(params);

      if (invalid) {
        setInvalidModal({
          isOpen: true,
          content: invalid.message,
        });
        return;
      }

      /* 수정 요청 */
      const { code } = await postSupplierModify(params);
      /** 성공 */
      const success = code === "SUCCESS";
      if (success) {
        /** 수정완료 모달 open */
        onChangeTextModal({
          title: "서비스 운영사 정보 수정 완료 안내",
          contents: "수정된 서비스 운영사 정보가 저장되었습니다.",
          onClosed: undefined,
        })();
        setContractFile({});
        onChangeSingle({
          contractFileId: fileParams.id,
          contractFileName: fileParams.name,
          contractFileUrl: fileParams.url,
        });
      } else {
        return;
      }
    }

    setDisabled(!disabled);
  };

  /** 주소 검색 modal visible */
  const onChangeModalVisible = () => {
    setAddrSearchModalOpen((prev) => !prev);
  };

  /** 삭제안내 모달 handler */
  const onChangeDeleteModalVisible = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  /** 텍스트 모달 handler */
  const onChangeTextModal =
    ({
      title = "",
      contents = "",
      onClosed,
    }: Omit<typeof textModal, "isOpen">) =>
    () => {
      setTextModal((prev) => ({
        isOpen: !prev.isOpen,
        title: title || prev.title,
        contents: contents || prev.contents,
        onClosed,
      }));
    };

  /** 삭제 */
  const deleteHandler = async () => {
    if (!data.id) {
      return;
    }

    /* 삭제 요청 */
    const { code } = await deleteSupplier({ id: data.id });
    /* 삭제 성공 */
    const success = code === "SUCCESS";
    if (success) {
      onChangeTextModal({
        title: "서비스 운영사 정보 삭제 완료",
        contents: "서비스 운영사 정보가 삭제되었습니다.",
        onClosed: goBack,
      })();
    }
  };

  useTabs({
    data: { data: inputs, fileData: contractFile },
    pageTitle: "서비스 운영사 상세",
    pageType: "detail",
    editable: disabled,
  });

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
                disabled,
                titleWidthRatio: 4,
                title: "운영사명",
                name: "name",
                content: name,
                onChange,
              },
              {
                disabled,
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
                disabled,
                titleWidthRatio: 4,
                title: "한전기관ID",
                name: "code",
                content: code,
                onChange,
              },
              {
                disabled,
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
                disabled,
                titleWidthRatio: 4,
                title: "사업자 전화번호",
                name: "phoneNumber",
                content: phoneNumber,
                onChange,
              },
              {
                disabled,
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
                  placeholder={""}
                />
                <div style={{ flex: 3 }}>
                  {!disabled && (
                    <ButtonBase
                      className={"width-110"}
                      outline
                      label={"우편번호 검색"}
                      color={"turu"}
                      onClick={onChangeModalVisible}
                    />
                  )}
                </div>
              </div>
              <div className={"d-flex gap-4"}>
                <TextInputBase
                  bsSize={"lg"}
                  disabled={true}
                  name={"address"}
                  value={address}
                  placeholder={""}
                />
                <TextInputBase
                  bsSize={"lg"}
                  disabled={disabled}
                  name={"addressDetail"}
                  value={addressDetail}
                  onChange={onChange}
                  placeholder={"상세 주소를 입력해주세요"}
                />
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>계약여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"isContracted"}
                list={YN_LIST.map((data) => ({
                  ...data,
                  checked: data.value === isContracted,
                  disabled,
                }))}
                onChange={onChange}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>활용여부</DetailLabelCol>
            <DetailContentCol>
              <RadioGroup
                name={"isActive"}
                list={YN_LIST.map((data) => ({
                  ...data,
                  checked: data.value === isActive,
                  disabled,
                }))}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>계약일자</DetailLabelCol>
            <DetailContentCol>
              <Input
                disabled={disabled}
                type={"date"}
                name={"contractedDate"}
                value={contractedDate}
                onChange={onChange}
              />
            </DetailContentCol>
          </DetailRow>

          <DetailRow>
            <DetailLabelCol sm={2}>계약서 파일</DetailLabelCol>
            <DetailContentCol
              className={"d-flex align-items-center justify-content-between"}
            >
              <u
                role={"button"}
                className={
                  contractFile.file?.item(0)?.name || contractFileName
                    ? "text-turu"
                    : "text-secondary text-opacity-50"
                }
                onClick={() => {
                  const url = contractFile.url || contractFileUrl;
                  if (url) {
                    window?.open(url);
                  }
                }}
              >
                {contractFile.file?.item(0)?.name ||
                  contractFileName ||
                  "등록된 파일이 없습니다."}
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

                  setContractFile({
                    url: localUrl,
                    file: e.target.files,
                  });
                }}
              />
              <ButtonBase
                disabled={disabled}
                label={"업로드"}
                outline={true}
                color={"turu"}
                onClick={() => {
                  document.getElementById("contractFile")?.click();
                }}
              />
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
            onClick={() => {
              /* 수정모드 상태에서 목록 버튼 클릭 */
              if (!disabled) {
                setIsEditCancel(true);
                return;
              }

              goBack();
            }}
          />
          <ButtonBase
            label={"삭제"}
            color={"turu"}
            outline={true}
            className={"mx-3 w-xs"}
            onClick={onChangeDeleteModalVisible}
          />
          <ButtonBase
            label={disabled ? "수정" : "저장"}
            color={"turu"}
            className={"w-xs"}
            onClick={onChangeDisabled}
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
      <DetailDeleteModal
        isOpen={deleteModalOpen}
        onClose={onChangeDeleteModalVisible}
        deleteHandler={deleteHandler}
        title={"서비스 운영사 정보 삭제 안내"}
        contents={"서비스 운영사 정보를 삭제하시겠습니까?"}
      />
      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <DetailCompleteModal
        {...textModal}
        onClose={() => {
          setTextModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        }}
      />
      <DetailCancelModal
        isOpen={isEditCancel}
        onClose={() => {
          setIsEditCancel((prev) => !prev);
        }}
        cancelHandler={goBack}
        title={"서비스 운영사 신규 등록 취소 안내"}
        contents={
          "입력된 서비스 운영사 정보가 저장되지 않습니다.\n신규 등록을 취소하시겠습니까?"
        }
      />
    </ContainerBase>
  );
};

const BasicInfoSection = styled.section``;
const RoamingPriceSection = styled.section``;
