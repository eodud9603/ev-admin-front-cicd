import React, { useState } from "react";
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
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { number, object, string } from "yup";
import { useLoaderData, useNavigate } from "react-router";
import {
  IBrokenDetailResponse,
  IRequestBrokenModify,
} from "src/api/broken/brokenApi.interface";
import useInputs from "src/hooks/useInputs";
import { BROKEN_LIST, BROKEN_PROCESS_LIST } from "src/constants/list";
import { BROKEN_STATUS, TBrokenStatus } from "src/constants/status";
import { deleteBroken, postBrokenModify } from "src/api/broken/brokenApi";
import DetailDeleteModal from "src/pages/Charger/components/DetailDeleteModal";
import DetailCompleteModal from "src/pages/Charger/components/DetailCompleteModal";
import DetailValidCheckModal from "./components/DetailValidCheckModal";
import { fileUpload } from "src/utils/upload";
import { standardDateFormat } from "src/utils/day";
import { StationSearchModal } from "./components/StationSearchModal";

const contractValidation = object({
  stationKey: string().required("충전소 ID를 입력해주세요."),
  stationName: string().required("충전소명을 입력해주세요."),
  chargerKey: string().required("충전기 ID를 입력해주세요."),
  reservation: number().required("예약번호를 입력해주세요."),
});

export const ChargerTroubleDetail = () => {
  const data = useLoaderData() as IBrokenDetailResponse | null;

  /* 수정모드 */
  const [disabled, setDisabled] = useState(true);
  /* 충전소 검색 모달 */
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);
  /* 삭제안내 모달 */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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
  /* 미입력 안내 모달 */
  const [invalidModalOpen, setInvalidModalOpen] = useState(false);

  const { onChange, onChangeSingle, reset, ...inputs } = useInputs({
    id: (data?.id ?? "").toString(),
    stationKey: data?.stationKey ?? "",
    stationName: data?.stationName ?? "",
    searchKey: (data?.searchKey ?? "").toString(),
    chargerKey: data?.chargerKey ?? "",
    reservation: (data?.reservation ?? "").toString(),
    damagedPart01: (data?.damagedPart01 ?? "") as TBrokenStatus,
    fileIdPart01: data?.fileIdPart01 ?? undefined,
    fileNamePart01: data?.fileNamePart01 ?? "",
    fileUrlPart01: data?.fileUrlPart01 ?? "",
    damagedPart02: (data?.damagedPart02 ?? "") as TBrokenStatus,
    fileIdPart02: data?.fileIdPart02 ?? undefined,
    fileNamePart02: data?.fileNamePart01 ?? "",
    fileUrlPart02: data?.fileUrlPart02 ?? "",
    brokenContent: data?.brokenContent ?? "",
    managerMemo: data?.managerMemo ?? "",
    /* 운영자/처리자/등록자 정보 */
    /** @TODO 운영자ID, 처리자ID 추가 필요 */
    reporterName: data?.reporterName ?? "",
    reporterPhone: data?.reporterPhone ?? "",
    /* 처리상태 */
    brokenStatus: data?.brokenStatus ?? "",
    processDate: data?.processDate ?? "",
    processMemo: data?.processMemo ?? "",
  });
  const {
    id,
    stationKey,
    stationName,
    searchKey,
    reservation,
    damagedPart01,
    fileIdPart01,
    fileNamePart01,
    fileUrlPart01,
    damagedPart02,
    fileIdPart02,
    fileNamePart02,
    fileUrlPart02,
    brokenContent,
    managerMemo,
    reporterName,
    reporterPhone,
    brokenStatus,
    processDate,
    processMemo,
  } = inputs;
  /* 고장1 */
  const [damagedFilePart01, setDamagedFilePart01] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({
    url: data?.fileUrlPart01,
    file: null,
  });
  /* 고장2 */
  const [damagedFilePart02, setDamagedFilePart02] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({
    url: data?.fileUrlPart02,
    file: null,
  });

  /** 삭제안내 모달 handler */
  const onChangeDeleteModalVisible = () => {
    setDeleteModalOpen((prev) => !prev);
  };

  /** 완료(삭제/수정) 모달 handler */
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

  const navigate = useNavigate();

  /** 뒤로가기 */
  const goBack = () => {
    navigate(-1);
  };

  /** 삭제 */
  const deleteHandler = async () => {
    if (!id) {
      return;
    }

    /* 삭제 요청 */
    const { code } = await deleteBroken({ id: Number(id) });

    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      /* 삭제완료 모달 open */
      onChangeTextModal({
        title: "충전기 고장/파손 정보 삭제 완료",
        contents: "충전기 고장/파손 정보가 삭제되었습니다.",
        onClosed: goBack,
      })();
    }
  };

  /** valid check */
  const isValid = async () => {
    /** 유효성 체크 */
    const valid = await contractValidation.isValid(inputs);

    return valid;
  };

  /** 파라미터 빈값 제거 */
  const getParams = (params: Partial<IRequestBrokenModify>) => {
    for (const param in params) {
      const deleteName = param as keyof IRequestBrokenModify;
      const data = params[deleteName];

      if (data === "") {
        delete params[deleteName];
      }
    }
  };

  /** disabled 상태 변경 */
  const onChangeDisabled = async () => {
    if (!disabled) {
      /** 유효성 체크 */
      const valid = await isValid();
      if (!valid) {
        setInvalidModalOpen(true);
        return;
      }

      /* 파일 업로드 */
      const fileParams01 = await fileUpload(damagedFilePart01);
      const fileParams02 = await fileUpload(damagedFilePart02);

      /** 파일 params */
      const fileParams = {
        fileIdPart01: fileParams01.id || fileIdPart01,
        fileNamePart01: fileParams01.name || fileNamePart01,
        fileUrlPart01: fileParams01.url || fileUrlPart01,
        fileIdPart02: fileParams02.id || fileIdPart02,
        fileNamePart02: fileParams02.name || fileNamePart02,
        fileUrlPart02: fileParams02.url || fileUrlPart02,
      };

      /** 수정 params */
      const params = { ...inputs };
      void getParams({
        ...params,
        reservation: Number(reservation),
        searchKey: Number(searchKey),
      });

      /* 수정 요청 */
      const { code } = await postBrokenModify({
        ...params,
        reservation: Number(reservation),
        searchKey: Number(searchKey),
        ...fileParams,
      });
      /** 성공 */
      const success = code === "SUCCESS";
      if (success) {
        /** 수정완료 모달 open */
        onChangeTextModal({
          title: "충전기 고장/파손 정보 수정 완료 안내",
          contents: "수정된 충전기 고장/파손 정보가 저장되었습니다.",
          onClosed: undefined,
        })();
        setDamagedFilePart01({});
        setDamagedFilePart02({});
        onChangeSingle({
          fileIdPart01: fileParams01.id,
          fileNamePart01: fileParams01.name,
          fileUrlPart01: fileParams01.url,
          fileIdPart02: fileParams02.id,
          fileNamePart02: fileParams02.name,
          fileUrlPart02: fileParams02.url,
        });
      }
    }

    setDisabled(!disabled);
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
            { label: "충전기 고장/파손 관리", href: "" },
            { label: "충전기 고장/파손 상세", href: "" },
          ]}
          title={"충전기 고장/파손 상세"}
        />
        <RepairSection>
          <Label className={"m-0 fw-semibold font-size-16 mb-3"}>
            정비내용
          </Label>
          <DetailRow>
            <DetailLabelCol sm={2}>충전소 ID</DetailLabelCol>
            <DetailContentCol
              className={
                "d-flex align-items-center justify-content-center py-0"
              }
            >
              <TextInputBase
                disabled={true}
                name={"stationKey"}
                value={stationKey}
              />
              <ButtonBase
                disabled={disabled}
                label={"충전소 검색"}
                className={"mx-2 w-md"}
                outline={true}
                onClick={() => {
                  setIsStationSearchModal(true);
                }}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>충전소명</DetailLabelCol>
            <DetailContentCol>
              <Col className={"d-flex p-0"}>
                <TextInputBase
                  disabled={true}
                  name={"stationName"}
                  value={stationName}
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                disabled={true}
                name={"searchKey"}
                value={searchKey}
              />
            </DetailContentCol>
            <Col sm={6} />
            {/* <DetailLabelCol sm={2}>충전기명??</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"stationId"}
                value={"1"}
                disabled={disabled}
              />
            </DetailContentCol> */}
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>예약번호</DetailLabelCol>
            <DetailContentCol className={"d-flex p-0"}>
              <Col className={"d-flex align-items-center"}>
                <TextInputBase
                  disabled={disabled}
                  name={"reservation"}
                  value={reservation}
                  onChange={onChange}
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>고장 부위1</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                className={"mb-4"}
                disabled={disabled}
                menuItems={BROKEN_LIST}
                initSelectedValue={{
                  label: BROKEN_STATUS[damagedPart01],
                  value: damagedPart01,
                }}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    damagedPart01: value as TBrokenStatus,
                  });
                }}
              />
              <div
                role={"button"}
                className={`text-${
                  damagedFilePart01.file?.item(0)?.name || fileNamePart01
                    ? "turu"
                    : "secondary text-opacity-50"
                } px-2`}
                onClick={() => {
                  const url = damagedFilePart01.url || fileUrlPart01;
                  if (url) {
                    window.open(url);
                  }
                }}
              >
                {damagedFilePart01.file?.item(0)?.name ||
                  fileNamePart01 ||
                  "등록된 이미지가 없습니다."}
              </div>
            </DetailContentCol>
            <DetailLabelCol sm={2}>고장 부위2</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                className={"mb-4"}
                disabled={disabled}
                menuItems={BROKEN_LIST}
                initSelectedValue={{
                  label: BROKEN_STATUS[damagedPart02],
                  value: damagedPart02,
                }}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({
                    damagedPart02: value as TBrokenStatus,
                  });
                }}
              />
              <div
                role={"button"}
                className={`text-${
                  damagedFilePart02.file?.item(0)?.name || fileNamePart02
                    ? "turu"
                    : "secondary text-opacity-50"
                } px-2`}
                onClick={() => {
                  const url = damagedFilePart02.url || fileUrlPart02;
                  if (url) {
                    window.open(url);
                  }
                }}
              >
                {damagedFilePart02.file?.item(0)?.name ||
                  fileNamePart02 ||
                  "등록된 이미지가 없습니다."}
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                title: "내용",
                type: "textarea",
                disabled: disabled,
                titleWidthRatio: 2,
                name: "brokenContent",
                content: brokenContent,
                onChange,
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                disabled: disabled,
                title: "관리자 내용",
                type: "textarea",
                titleWidthRatio: 2,
                name: "managerMemo",
                content: managerMemo,
                onChange,
              },
            ]}
          />
          <DetailRow>
            <DetailLabelCol sm={2}>운영자ID(운영자명)</DetailLabelCol>
            <DetailContentCol
              className={
                "d-flex align-items-center justify-content-center py-0"
              }
            >
              <TextInputBase disabled={true} name={"stationId"} value={""} />
              <ButtonBase
                label={"관리자 검색"}
                className={"mx-2 w-md"}
                outline={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>처리자ID(처리자명)</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <DropdownBase
                disabled={disabled}
                menuItems={[{ label: "선택", value: "-" }]}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>등록자</DetailLabelCol>
            <DetailContentCol>{reporterName || "-"}</DetailContentCol>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol>
              {data?.createDate
                ? standardDateFormat(data?.createDate, "YYYY.MM.DD")
                : "-"}
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>연락처</DetailLabelCol>
            <DetailContentCol>{reporterPhone || "-"}</DetailContentCol>
          </DetailRow>
        </RepairSection>
        <ProcessingSection className={"my-4"}>
          <Label className={"fw-semibold font-size-16 m-0 mb-3"}>
            처리상태
          </Label>
          <DetailRow>
            <DetailLabelCol sm={2}>처리상태</DetailLabelCol>

            <DetailContentCol className={"py-0"}>
              <RadioGroup
                name={"brokenStatus"}
                list={BROKEN_PROCESS_LIST.map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === brokenStatus,
                }))}
                onChange={onChange}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>처리일자</DetailLabelCol>
            <DetailContentCol>{processDate || "-"}</DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                title: "처리자 내용",
                type: "textarea",
                disabled: disabled,
                titleWidthRatio: 2,
                name: "processMemo",
                content: processMemo,
                onChange,
              },
            ]}
          />
        </ProcessingSection>
        <div className={"d-flex justify-content-center gap-3"}>
          <ButtonBase
            className={"w-sm"}
            outline={true}
            label={"목록"}
            onClick={goBack}
          />
          <ButtonBase
            className={"w-sm"}
            outline={true}
            color={"turu"}
            label={"삭제"}
            onClick={onChangeDeleteModalVisible}
          />
          <ButtonBase
            className={"w-sm"}
            color={"turu"}
            label={disabled ? "수정" : "저장"}
            onClick={onChangeDisabled}
          />
        </div>
      </BodyBase>

      <StationSearchModal
        size={"xl"}
        isOpen={isStationSearchModal}
        onClose={() => {
          setIsStationSearchModal(false);
        }}
        onChangeSelected={(data) => {
          onChangeSingle({
            stationKey: data?.stationId ?? "",
            stationName: data?.stationName ?? "",
            searchKey: (data?.searchKey ?? "").toString(),
            chargerKey: (data?.chargerKey ?? "").toString(),
          });
        }}
      />
      <DetailValidCheckModal
        isOpen={invalidModalOpen}
        onClose={() => setInvalidModalOpen(false)}
      />
      <DetailDeleteModal
        isOpen={deleteModalOpen}
        onClose={onChangeDeleteModalVisible}
        deleteHandler={deleteHandler}
        title={"충전기 고장/파손 정보 삭제 안내"}
        contents={"충전기 고장/파손 정보를 삭제하시겠습니까?"}
      />
      <DetailCompleteModal
        {...textModal}
        onClose={() => {
          setTextModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        }}
      />
    </ContainerBase>
  );
};

const RepairSection = styled.section``;
const ProcessingSection = styled.section``;
