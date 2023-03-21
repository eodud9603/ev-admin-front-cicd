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
import { useNavigate } from "react-router-dom";
import { ChangeOperatorModal } from "src/pages/Counseling/components/ChangeOperatorModal";
import { StationSearchModal } from "src/pages/Charger/components/StationSearchModal";

export const ChargerTroubleRegistration = () => {
  const nav = useNavigate();
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 고장/파손 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [isChangeOperatorModal, setIsChangeOperatorModal] = useState(false);
  const [isStationSearchModal, setIsStationSearchModal] = useState(false);
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

  const onClickHistoryBack = () => {
    nav(-1);
  };

  const handleChangeOperatorModal = () => {
    setIsChangeOperatorModal((prev) => !prev);
  };

  const handleStationSearchModal = () => {
    setIsStationSearchModal((prev) => !prev);
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
            { label: "충전소 고장/파손 등록", href: "" },
          ]}
          title={"충전소 고장/파손 등록"}
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
                placeholder={"충전소ID 또는 충전소명 입력"}
                value={"1"}
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
                  name={"stationName"}
                  value={"1"}
                  placeholder={"충전소 검색 내역 중 관리자가 선택한 정보 노출"}
                />
              </Col>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase name={"chargerId"} value={"1"} />
            </DetailContentCol>
            <DetailLabelCol sm={2}>충전기명??</DetailLabelCol>
            <DetailContentCol>
              <TextInputBase name={"stationId"} value={"1"} />
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>예약번호</DetailLabelCol>
            <DetailContentCol className={"d-flex p-0"}>
              <Col className={"d-flex align-items-center"}>
                <TextInputBase name={"reservationNumber"} value={"1"} />
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
              <div
                className={"d-flex justify-content-between align-items-center"}
              >
                <div
                  role={"button"}
                  className={"text-secondary text-opacity-50 px-2"}
                >
                  이미지 파일을 등록해주세요.
                </div>
                <ButtonBase label={"업로드"} color={"turu"} outline={true} />
              </div>
            </DetailContentCol>
            <DetailLabelCol sm={2}>고장 부위2</DetailLabelCol>
            <DetailContentCol>
              <DropdownBase
                menuItems={[{ label: "액정", value: "1" }]}
                className={"mb-4"}
              />

              <div
                className={"d-flex justify-content-between align-items-center"}
              >
                <div
                  role={"button"}
                  className={"text-secondary text-opacity-50 px-2"}
                >
                  이미지 파일을 등록해주세요.
                </div>
                <ButtonBase label={"업로드"} color={"turu"} outline={true} />
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
                placeholder={"관리자ID 또는 관리자명 입력"}
              />
              <ButtonBase
                label={"관리자 검색"}
                className={"mx-2 w-md"}
                onClick={handleChangeOperatorModal}
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
          <ButtonBase label={"등록"} disabled={true} className={"w-xs"} />
        </div>
      </BodyBase>
      <ChangeOperatorModal
        isOpen={isChangeOperatorModal}
        onClose={handleChangeOperatorModal}
      />
      <StationSearchModal
        isOpen={isStationSearchModal}
        onClose={handleStationSearchModal}
        size={"xl"}
      />
    </ContainerBase>
  );
};

const RepairSection = styled.section``;
const ProcessingSection = styled.section``;
