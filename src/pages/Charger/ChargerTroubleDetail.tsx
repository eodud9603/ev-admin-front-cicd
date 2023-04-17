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

const disabled = true;
export const ChargerTroubleDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 고장/파손 관리" },
  ]);

  const [selectedIndex, setSelectedIndex] = useState("0");
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
      <HeaderBase />
      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />
      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전소 고장/파손 관리", href: "" },
            { label: "충전소 고장/파손 상세", href: "" },
          ]}
          title={"충전소 고장/파손 상세"}
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
                name={"stationId"}
                value={"1"}
                disabled={disabled}
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
                  name={"stationName"}
                  value={"1"}
                  disabled={disabled}
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"chargerId"}
                value={"1"}
                disabled={disabled}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>충전기명??</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"stationId"}
                value={"1"}
                disabled={disabled}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>예약번호</DetailLabelCol>
            <DetailContentCol className={"d-flex p-0"}>
              <Col className={"d-flex align-items-center"}>
                <TextInputBase
                  name={"reservationNumber"}
                  value={"1"}
                  disabled={disabled}
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>고장 부위1</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                menuItems={[{ label: "액정", value: "1" }]}
                className={"mb-4"}
              />
              <u role={"button"} className={"text-turu px-2"}>
                액정파손01.jpeg
              </u>
            </DetailContentCol>
            <DetailLabelCol sm={2}>고장 부위2</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                menuItems={[{ label: "액정", value: "1" }]}
                className={"mb-4"}
              />
              <div
                role={"button"}
                className={"text-secondary text-opacity-50 px-2"}
              >
                등록된 이미지가 없습니다.
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
              },
            ]}
          />
          <DetailTextInputRow
            rows={[
              {
                title: "관리자 내용",
                type: "textarea",
                disabled: disabled,
                titleWidthRatio: 2,
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
              <DropdownBase menuItems={[{ label: "C 코스텔", value: "1" }]} />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>등록자</DetailLabelCol>
            <DetailContentCol>홍길동</DetailContentCol>
            <DetailLabelCol sm={2}>등록일</DetailLabelCol>
            <DetailContentCol>
              YYYY.MM.DD 00:00:00 (등록 시점의 일시정보 자동 노출)
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>연락처</DetailLabelCol>
            <DetailContentCol></DetailContentCol>
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
                name={"processingStatus"}
                list={[
                  { label: "접수", value: "SUBMIT" },
                  { label: "진행중", value: "PROGRESS" },
                  { label: "처리완료", value: "COMPLETE" },
                  { label: "접수제외", value: "EXCEPT" },
                ]}
              />
            </DetailContentCol>

            <DetailLabelCol sm={2}>처리일자</DetailLabelCol>
            <DetailContentCol>
              YYYY.MM.DD 00:00:00 (처리가 완료된 시점의 일시정보 자동 노출)
            </DetailContentCol>
          </DetailRow>
          <DetailTextInputRow
            rows={[
              {
                title: "처리자 내용",
                type: "textarea",
                disabled: disabled,
                titleWidthRatio: 2,
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
