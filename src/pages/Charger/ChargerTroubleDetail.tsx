import React from "react";
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
import { object, string } from "yup";
import { useLoaderData } from "react-router";
import { IBrokenDetailResponse } from "src/api/broken/brokenApi.interface";
import useInputs from "src/hooks/useInputs";
import { BROKEN_LIST } from "src/constants/list";

const contractValidation = object({
  stationKey: string().required("충전소 ID를 입력해주세요."),
  stationName: string().required("충전소명을 입력해주세요."),
  chargerKey: string().required("충전기 ID를 입력해주세요."),
});

const disabled = true;
export const ChargerTroubleDetail = () => {
  const data = useLoaderData() as IBrokenDetailResponse | null;
  console.log(data);

  const {
    stationKey,
    stationName,
    chargerKey,
    reservation,
    damagedPart01,
    fileNamePart01,
    damagedPart02,
    fileNamePart02,
    brokenContent,
    managerMemo,
    reporterName,
    createDate,
    brokenStatus,
    processDate,
    processMemo,
    onChange,
  } = useInputs({
    stationKey: data?.stationKey ?? "",
    stationName: data?.stationName ?? "",
    chargerKey: data?.chargerKey ?? "",
    reservation: (data?.reservation ?? "").toString(),
    /* 고장부위 1/2 */
    damagedPart01: data?.damagedPart01 ?? "",
    fileNamePart01: data?.fileNamePart01 ?? "",
    damagedPart02: data?.damagedPart02 ?? "",
    fileNamePart02: data?.fileNamePart02 ?? "",
    brokenContent: data?.brokenContent ?? "",
    managerMemo: data?.managerMemo ?? "",
    /* 운영자/처리자/등록자 정보 */
    reporterName: data?.reporterName ?? "-",
    createDate: data?.createDate ?? "-",
    /* 처리상태 */
    brokenStatus: data?.brokenStatus ?? "",
    processDate: data?.processDate ?? "-",
    processMemo: data?.processMemo ?? "",
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
                label={"충전소 검색"}
                className={"mx-2 w-md"}
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
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                disabled={true}
                name={"chargerKey"}
                value={chargerKey}
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
                disabled={disabled}
                menuItems={BROKEN_LIST}
                className={"mb-4"}
              />
              <div
                role={"button"}
                className={`text-${
                  fileNamePart01 ? "turu" : "secondary text-opacity-50"
                } px-2`}
              >
                {fileNamePart01 || "등록된 이미지가 없습니다."}
              </div>
            </DetailContentCol>
            <DetailLabelCol sm={2}>고장 부위2</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                disabled={disabled}
                menuItems={BROKEN_LIST}
                className={"mb-4"}
              />
              <div
                role={"button"}
                className={`text-${
                  fileNamePart02 ? "turu" : "secondary text-opacity-50"
                } px-2`}
              >
                {fileNamePart02 || "등록된 이미지가 없습니다."}
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
              <TextInputBase
                name={"stationId"}
                value={"1"}
                disabled={disabled}
              />
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
            <DetailContentCol>{reporterName}</DetailContentCol>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol>{createDate}</DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>연락처</DetailLabelCol>
            <DetailContentCol>{"-"}</DetailContentCol>
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
                list={[
                  { label: "접수", value: "SUBMIT" },
                  { label: "진행중", value: "PROGRESS" },
                  { label: "처리완료", value: "COMPLETE" },
                  { label: "접수제외", value: "EXCEPT" },
                ].map((data) => ({
                  ...data,
                  disabled,
                  checked: data.value === brokenStatus,
                }))}
                onChange={onChange}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>처리일자</DetailLabelCol>
            <DetailContentCol>{processDate}</DetailContentCol>
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
      </BodyBase>
    </ContainerBase>
  );
};

const RepairSection = styled.section``;
const ProcessingSection = styled.section``;
