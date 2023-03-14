import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import {
  DetailContentCol,
  DetailGroupCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DetailTextRadioRow } from "src/components/Common/DetailContentRow/DetailTextRadioRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import styled from "styled-components";
import DetailBottomButton from "./components/DetailBottomButton";

const disabled = true;

const ChargerDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전기 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 기본정보 drop */
  const [isDefaultInfoDrop, setIsDefaultInfoDrop] = useState(true);
  /* 설치정보 drop */
  const [isInstallDrop, setIsInstallDrop] = useState(true);

  const navigate = useNavigate();

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
      <HeaderBase></HeaderBase>

      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "충전기 관리", href: "" },
            { label: "충전기 상세", href: "" },
          ]}
          title={"충전기 상세"}
        />

        <div>
          <div
            className={"mb-3 d-flex align-items-center justify-content-between"}
          >
            <DropArea
              className={"gap-1"}
              onClick={() => setIsDefaultInfoDrop((prev) => !prev)}
            >
              <span className={"font-size-20 fw-bold"}>기본정보</span>
              <Icon
                isOpen={isDefaultInfoDrop}
                className={"mdi mdi-chevron-up font-size-24"}
              />
            </DropArea>

            <div className={"d-flex align-items-center gap-3"}>
              <ButtonBase
                className={"width-110"}
                label={"충전기 제어"}
                color={"turu"}
                outline
              />
              <ButtonBase
                className={"width-110"}
                label={"펌웨어 관리"}
                color={"turu"}
                outline
              />
            </div>
          </div>

          {/* 기본정보 */}
          {isDefaultInfoDrop && (
            <Row className={"mb-5 border-bottom border-2"}>
              <DetailRow>
                <DetailLabelCol sm={2}>충전소명</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"gap-3"}>
                    <TextInputBase
                      name={"충전소명"}
                      bsSize={"lg"}
                      disabled={disabled}
                      value={"휴맥스 카플랫 전용 A"}
                      onChange={() => {}}
                    />
                    <ButtonBase
                      className={"width-110"}
                      disabled={disabled}
                      label={"충전소 검색"}
                      outline
                    />
                  </DetailGroupCol>
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 ID</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"충전기 ID"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력 내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 자산번호</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"충전기 자산번호"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력 내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>종별</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"충전기 ID"}
                    list={[
                      {
                        label: "급속",
                        checked: true,
                        value: "1",
                        disabled,
                      },
                      {
                        label: "완속",
                        value: "2",
                        disabled,
                      },
                      {
                        label: "과금형 콘센트",
                        value: "3",
                        disabled,
                      },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailDropdownRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    title: "설치타입",
                    disabled,
                    dropdownItems: [
                      {
                        menuItems: [
                          {
                            label: "스탠드형",
                            value: "1",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    titleWidthRatio: 4,
                    title: "충전 용량",
                    disabled,
                    dropdownItems: [
                      {
                        menuItems: [
                          {
                            label: "100",
                            value: "1",
                          },
                        ],
                      },
                    ],
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>서버통신채널</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol>
                    <CheckBoxBase
                      disabled={disabled}
                      name={"듀얼형"}
                      label={"듀얼형"}
                      value={"1"}
                      onChange={() => {}}
                    />
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "CH1",
                          value: "1",
                        },
                      ]}
                      onClickDropdownItem={() => {}}
                    />
                  </DetailGroupCol>
                </DetailContentCol>
                <DetailLabelCol sm={2}>환경변수버전</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"환경변수버전"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextRadioRow
                rows={[
                  {
                    title: "자사/위탁 구분",
                    list: [
                      {
                        disabled,
                        label: "자사",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "위탁사",
                        value: "2",
                      },
                    ],
                  },
                  {
                    title: "사용/전용 구분",
                    list: [
                      {
                        disabled,
                        label: "사용",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "미사용",
                        value: "2",
                      },
                      {
                        disabled,
                        label: "전용",
                        value: "3",
                      },
                    ],
                  },
                ]}
              />

              {/* TODO: (CPO, 계약된 법인, 개인회원-미확정 선택 가능) */}
              <DetailRow>
                <DetailLabelCol sm={2}>위탁사명</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "위탁사(운영사)명 노출",
                        value: "1",
                      },
                    ]}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>제조사</DetailLabelCol>
                <DetailContentCol>
                  <DetailGroupCol className={"gap-4"}>
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "제조사명 노출",
                          value: "1",
                        },
                      ]}
                    />
                    <DropdownBase
                      disabled={disabled}
                      menuItems={[
                        {
                          label: "모델명 노출",
                          value: "1",
                        },
                      ]}
                    />
                  </DetailGroupCol>
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 설치 상태</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"충전기 설치 상태"}
                    list={[
                      { disabled, label: "정상", value: "1", checked: true },
                      { disabled, label: "수리중", value: "2" },
                      { disabled, label: "철거", value: "3" },
                      { disabled, label: "철거예정", value: "4" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전 커넥터 종류</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "DC 콤보",
                        value: "1",
                      },
                    ]}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>고장유무</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"고장유무"}
                    list={[
                      { disabled, label: "정상", value: "1", checked: true },
                      { disabled, label: "고장", value: "2" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>충전기 상태</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "충전중",
                        value: "1",
                      },
                    ]}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>결제단말기 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"결제단말기 여부"}
                    list={[
                      { disabled, label: "Y", value: "1", checked: true },
                      { disabled, label: "N", value: "2" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>결제단말기 PG사</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[
                      {
                        label: "스마트로",
                        value: "1",
                      },
                    ]}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailRow>
                <DetailLabelCol sm={2}>연동 규격</DetailLabelCol>
                <DetailContentCol>
                  <DropdownBase
                    disabled={disabled}
                    menuItems={[{ label: "OCPP 1.6", value: "1" }]}
                    onClickDropdownItem={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>
                  최대 충전 시간(분) - 급속
                </DetailLabelCol>
                {/* TODO: 완속 또는 과금형인 경우 해당 텍스트 필드 미노출, 입력 비활성화 분기처리 필요 */}
                <DetailContentCol>
                  <TextInputBase
                    name={"최대 충전 시간(분) - 급속"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={
                      "입력 내용 노출  * 완속 또는 과금형인 경우 해당 텍스트 필드 미노출, 입력 비활성화"
                    }
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "미사용 전송 주기(분)",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "충전중 전송 주기(분)",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextRadioRow
                rows={[
                  {
                    title: "환경부 연동 여부",
                    list: [
                      {
                        disabled,
                        label: "연동",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                      },
                    ],
                  },
                  {
                    title: "한전 연동 여부",
                    list: [
                      {
                        disabled,
                        label: "연동",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "미연동",
                        value: "2",
                      },
                    ],
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>앱 충전 가능 여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"앱 충전 가능 여부"}
                    list={[
                      { disabled, label: "Y", value: "1", checked: true },
                      { disabled, label: "N", value: "2" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>계약 단가(원)</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"계약 단가(원)"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력 내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextRadioRow
                rows={[
                  {
                    title: "QR 연동여부",
                    list: [
                      {
                        disabled,
                        label: "없음",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "카카오",
                        value: "2",
                      },
                      {
                        disabled,
                        label: "티맵",
                        value: "3",
                      },
                      {
                        disabled,
                        label: "현대 E-PIT",
                        value: "4",
                      },
                    ],
                  },
                  {
                    title: "예약 가능 여부",
                    list: [
                      {
                        disabled,
                        label: "비예약",
                        checked: true,
                        value: "1",
                      },
                      {
                        disabled,
                        label: "예약",
                        value: "2",
                      },
                      {
                        disabled,
                        label: "시범",
                        value: "3",
                      },
                    ],
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 2,
                    disabled,
                    title: "특이사항",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />
            </Row>
          )}

          {/* 계약정보 */}
          <DropArea
            className={"gap-1"}
            onClick={() => setIsInstallDrop((prev) => !prev)}
          >
            <span className={"font-size-20 fw-bold"}>계약정보</span>
            <Icon
              isOpen={isInstallDrop}
              className={"mdi mdi-chevron-up font-size-24"}
            />
          </DropArea>
          {isInstallDrop && (
            <Row className={"mb-5 border-bottom border-2"}>
              <DetailRow>
                <DetailLabelCol sm={2}>설치구분</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"설치구분"}
                    list={[
                      { disabled, label: "자체", value: "1", checked: true },
                      { disabled, label: "보조금", value: "2" },
                      { disabled, label: "납품", value: "3" },
                      { disabled, label: "위탁", value: "4" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>설치업체</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"설치업체"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력 내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "설치 연도",
                    content: "YYYY",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "설치 월",
                    content: "MM",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "서버 도메인",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "서버 PORT",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailRow>
                <DetailLabelCol sm={2}>충전기 S/N</DetailLabelCol>
                <DetailContentCol>
                  <TextInputBase
                    name={"충전기 S/N"}
                    bsSize={"lg"}
                    disabled={disabled}
                    value={"입력 내용 노출"}
                    onChange={() => {}}
                  />
                </DetailContentCol>
                <DetailLabelCol sm={2}>TR 설치여부</DetailLabelCol>
                <DetailContentCol>
                  <RadioGroup
                    name={"TR 설치여부"}
                    list={[
                      { disabled, label: "Y", value: "1", checked: true },
                      { disabled, label: "N", value: "2" },
                    ]}
                    onChange={() => {}}
                  />
                </DetailContentCol>
              </DetailRow>

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "충전기 펌웨어",
                    content:
                      "펌웨어 정보 노출(자사 관리/ 충전기가 보고하는 펌웨어 정보)",
                    onChange: () => {},
                  },
                  /* TODO: 자동 노출 표시로 disabled true 고정 */
                  {
                    titleWidthRatio: 4,
                    disabled: true,
                    title: "현재 충전기 펌웨어",
                    content:
                      "펌웨어 업데이트 또는 충전기 on/off 시 업로드 되는 펌웨어 정보 자동 노출 영역",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 2,
                    disabled,
                    title: "모뎀개통 번호",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 제조사",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 제조사 연락처",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀명",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "모뎀 S/N",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "통신사",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "통신요금",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />

              <DetailTextInputRow
                rows={[
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "개통사",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                  {
                    titleWidthRatio: 4,
                    disabled,
                    title: "개통사 연락처",
                    content: "입력 내용 노출",
                    onChange: () => {},
                  },
                ]}
              />
            </Row>
          )}
        </div>

        <DetailBottomButton
          listHandler={() => navigate("/charger/charger")}
          editDisabled={true}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargerDetail;

const DropArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.i<{ isOpen: boolean }>`
  transition: all ease 0.5s;
  transform: rotate(${({ isOpen }) => (isOpen ? 0 : 180)}deg);
`;
