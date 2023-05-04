import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Input, Label } from "reactstrap";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChangeOperatorModal } from "src/pages/Counseling/components/ChangeOperatorModal";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";
import useInputs from "src/hooks/useInputs";
import { postBrokenRegister } from "src/api/broken/brokenApi";
import { BROKEN_LIST } from "src/constants/list";
import DetailCompleteModal from "src/components/Common/Modal/DetailCompleteModal";
import { fileUpload } from "src/utils/upload";
import { BROKEN_STATUS, TBrokenStatus } from "src/constants/status";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import { YUP_CHARGER_BROKEN } from "src/constants/valid/charger";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import { useTabs } from "src/hooks/useTabs";
import { INIT_BROKEN_ADD } from "src/pages/Charger/loader/brokenRegistrationLoader";

export const ChargerTroubleRegistration = () => {
  const data = useLoaderData() as typeof INIT_BROKEN_ADD;
  const nav = useNavigate();
  const [isChangeOperatorModal, setIsChangeOperatorModal] = useState(false);
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });
  /* 등록완료 모달 */
  const [isAddComplete, setIsAddComplete] = useState(false);

  const [inputs, { onChangeSingle, onChange }] = useInputs(data);
  const {
    stationKey,
    stationName,
    searchKey,
    reservation,
    damagedPart01,
    damagedPart02,
    managerMemo,
    brokenContent,
    managerName,
  } = inputs;

  useTabs({
    data: inputs,
    pageTitle: "충전기 고장/파손 등록",
    pageType: "registration",
  });

  /* 고장1 */
  const [damagedFilePart01, setDamagedFilePart01] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({});
  /* 고장2 */
  const [damagedFilePart02, setDamagedFilePart02] = useState<
    Partial<{
      url?: string;
      file: FileList | null;
    }>
  >({});

  const onClickHistoryBack = () => {
    nav(-1);
  };

  const handleChangeOperatorModal = () => {
    setIsChangeOperatorModal((prev) => !prev);
  };

  const handleStationSearchModal = () => {
    setIsStationSearchModal((prev) => !prev);
  };

  /** 등록
   * @TODO 운영자ID 검색(데이터), 처리자ID(dropdown data)
   */
  const registerHandler = async () => {
    /* 유효성 체크 */
    const scheme = createValidation(YUP_CHARGER_BROKEN);
    const [invalid] = scheme(inputs);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 파일 업로드 */
    const fileParams01 = await fileUpload(damagedFilePart01);
    const fileParams02 = await fileUpload(damagedFilePart02);

    /** 파일 params */
    const fileParams = {
      fileIdPart01: fileParams01.id,
      fileIdPart02: fileParams02.id,
    };

    /** 등록 params */
    const params = { ...inputs };
    void getParams({
      ...params,
      reservation: Number(reservation),
      searchKey: Number(searchKey),
    });

    /** 등록 요청 */
    const { code } = await postBrokenRegister({
      ...params,
      reservation: Number(reservation),
      searchKey: Number(searchKey),
      ...fileParams,
    });
    /** 성공 */
    const success = code === "SUCCESS";
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
            { label: "충전기 고장/파손 관리", href: "" },
            { label: "충전기 고장/파손 등록", href: "" },
          ]}
          title={"충전기 고장/파손 등록"}
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
                placeholder={"충전소ID 또는 충전소명 입력"}
              />
              <ButtonBase
                label={"충전소 검색"}
                className={"mx-2 w-md"}
                onClick={handleStationSearchModal}
                outline={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>충전소명</DetailLabelCol>
            <DetailContentCol>
              <Col className={"d-flex p-0"}>
                <TextInputBase
                  disabled={true}
                  name={"stationName"}
                  value={stationName}
                  placeholder={"충전소 검색 내역 중 관리자가 선택한 정보 노출"}
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
                placeholder={"충전소 검색 내역 중 관리자가 선택한 정보 노출"}
              />
            </DetailContentCol>
            <Col sm={6} />
            {/** @TODO 충전기 등록시에도 충전기명은 없음 */}
            {/* <DetailLabelCol sm={2}>충전기명</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                disabled={true}
                name={"chargerName"}
                value={chargerName}
                placeholder={"충전소 검색 내역 중 관리자가 선택한 정보 노출"}
              />
            </DetailContentCol> */}
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>예약번호</DetailLabelCol>
            <DetailContentCol className={"d-flex p-0"}>
              <Col className={"d-flex align-items-center"}>
                <TextInputBase
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
                className={"d-flex justify-content-between align-items-center"}
              >
                <div
                  role={"button"}
                  className={`px-2 text-${
                    damagedFilePart01.file?.item(0)?.name
                      ? "turu"
                      : "secondary text-opacity-50"
                  }`}
                  onClick={() => {
                    if (damagedFilePart01.url) {
                      window?.open(damagedFilePart01.url);
                    }
                  }}
                >
                  {damagedFilePart01.file?.item(0)?.name ||
                    "이미지 파일을 등록해주세요."}
                </div>
                <ButtonBase
                  label={"업로드"}
                  color={"turu"}
                  outline={true}
                  onClick={() => {
                    document.getElementById("damagedPart01")?.click();
                  }}
                />
                <Input
                  className={"visually-hidden"}
                  type={"file"}
                  id={"damagedPart01"}
                  name={"damagedPart01"}
                  accept={"image/png, image/jpeg"}
                  onChange={(e) => {
                    if (!e.target.files) {
                      return;
                    }

                    const localUrl = URL.createObjectURL(
                      Array.from(e.target.files)[0]
                    );
                    setDamagedFilePart01({
                      url: localUrl,
                      file: e.target.files,
                    });
                  }}
                />
              </div>
            </DetailContentCol>
            <DetailLabelCol sm={2}>고장 부위2</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                className={"mb-4"}
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
                className={"d-flex justify-content-between align-items-center"}
              >
                <div
                  role={"button"}
                  className={`px-2 text-${
                    damagedFilePart02.file?.item(0)?.name
                      ? "turu"
                      : "secondary text-opacity-50"
                  }`}
                  onClick={() => {
                    if (damagedFilePart02.url) {
                      window?.open(damagedFilePart02.url);
                    }
                  }}
                >
                  {damagedFilePart02.file?.item(0)?.name ||
                    "이미지 파일을 등록해주세요."}
                </div>
                <ButtonBase
                  label={"업로드"}
                  color={"turu"}
                  outline={true}
                  onClick={() => {
                    document.getElementById("damagedPart02")?.click();
                  }}
                />
                <Input
                  className={"visually-hidden"}
                  type={"file"}
                  id={"damagedPart02"}
                  name={"damagedPart02"}
                  accept={"image/png, image/jpeg"}
                  onChange={(e) => {
                    if (!e.target.files) {
                      return;
                    }

                    const localUrl = URL.createObjectURL(
                      Array.from(e.target.files)[0]
                    );
                    setDamagedFilePart02({
                      url: localUrl,
                      file: e.target.files,
                    });
                  }}
                />
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                title: "내용",
                type: "textarea",
                placeholder: "내용을 입력해주세요.",
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
                title: "관리자 내용",
                type: "textarea",
                placeholder: "관리자 내용을 입력해주세요.",
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
              <TextInputBase
                disabled={true}
                placeholder={"관리자ID 또는 관리자명 입력"}
                name={"managerName"}
                value={managerName}
                onChange={onChange}
              />
              <ButtonBase
                disabled={true}
                label={"관리자 검색"}
                className={"mx-2 w-md"}
                onClick={handleChangeOperatorModal}
                outline={true}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>처리자ID(처리자명)</DetailLabelCol>
            <DetailContentCol className={"py-0"}>
              <DropdownBase menuItems={[{ label: "선택", value: "" }]} />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>등록자</DetailLabelCol>
            <DetailContentCol className={"text-secondary"}>
              상세 화면에서 등록자명 자동 노출
            </DetailContentCol>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol className={"text-secondary"}>
              등록 시점의 일시정보 자동 노출
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>연락처</DetailLabelCol>
            <DetailContentCol className={"text-secondary"}>
              상세 화면에서 등록자 연락처 자동 노출
            </DetailContentCol>
          </DetailRow>
        </RepairSection>
        <div className={"px-4 mt-3"}>
          <span>
            * 정보 등록시 입력된&nbsp;
            <span className={"fw-semibold text-turu"}>
              관리자와 처리자에게 충전기 고장/파손 신규 등록 알림
            </span>
            이 전송됩니다.
          </span>
        </div>
        <div className={"mt-4 d-flex justify-content-center"}>
          <ButtonBase
            label={"목록"}
            outline={true}
            className={"w-xs mx-2"}
            onClick={onClickHistoryBack}
          />
          <ButtonBase
            label={"등록"}
            color={"turu"}
            className={"w-xs"}
            onClick={registerHandler}
          />
        </div>
      </BodyBase>
      <ChangeOperatorModal
        isOpen={isChangeOperatorModal}
        onClose={handleChangeOperatorModal}
      />
      <StationSearchModal
        size={"xl"}
        isOpen={isStationSearchModal}
        onClose={handleStationSearchModal}
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
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <DetailCompleteModal
        isOpen={isAddComplete}
        onClose={() => {
          setIsAddComplete((prev) => !prev);
        }}
        confirmHandler={() => {
          nav(-1);
        }}
        title={"신규 충전기 고장/파손 정보 등록 완료"}
        contents={"충전기 고장/파손 정보가 등록되었습니다."}
      />
    </ContainerBase>
  );
};

const RepairSection = styled.section``;
