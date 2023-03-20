import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DetailTextRadioRow } from "src/components/Common/DetailContentRow/DetailTextRadioRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import DetailBottomButton from "../Charger/components/DetailBottomButton";
import AuthLevelModal from "./components/AuthLevelModal";

const groupItems = [{ label: "휴맥스EV", value: "1" }];

const OperatorAccountDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "계정 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 수정 비활성화 */
  const [disabled, setDisabled] = useState(true);
  /* 권한등급 모달 */
  const [authModalOpen, setAuthModalOpen] = useState(false);

  /** Y/N 라디오 목록 */
  const radioList = [
    {
      label: "Y",
      value: "Y",
      checked: true,
      disabled,
    },
    {
      label: "N",
      value: "N",
      disabled,
    },
  ];

  /** 계정등급 라디오 목록 */
  const roleList = [
    { label: "최고 관리자", value: "1", checked: true, disabled },
    { label: "일반 관리자", value: "2", disabled },
    { label: "관계사", value: "3", disabled },
    { label: "제조사", value: "4", disabled },
  ];

  /** 계정상태 라디오 목록 */
  const accountStatusList = [
    { label: "정상", value: "1", checked: true, disabled },
    { label: "차단", value: "2", disabled },
  ];

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
      <HeaderBase />

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
            { label: "운영자 관리", href: "" },
            { label: "계정 관리", href: "" },
            { label: "계정 상세", href: "" },
          ]}
          title={"계정 상세"}
        />

        <Label className={"m-0 mb-4 font-size-20 fw-bold"}>기본정보</Label>
        <DetailTextInputRow
          rows={[
            {
              titleWidthRatio: 4,
              title: "운영자명",
              content: "이팀장",
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "계정 ID",
              content: "K05@humaxev.com",
              disabled,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>소속 그룹</DetailLabelCol>
          <DetailContentCol>
            <DropdownBase disabled={disabled} menuItems={groupItems} />
          </DetailContentCol>
          <DetailLabelCol sm={2}>비밀번호</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              disabled={disabled}
              bsSize={"lg"}
              name={"password"}
              type={"password"}
              value={"1234"}
              onChange={() => {}}
            />
          </DetailContentCol>
        </DetailRow>
        {/** @TODO 권한 row 추가 */}
        <DetailRow>
          <DetailLabelCol sm={2}>권한등급</DetailLabelCol>
          <DetailContentCol>
            <RadioGroup name={"roleLevel"} list={roleList} />
          </DetailContentCol>
          <DetailLabelCol sm={2}>권한등록</DetailLabelCol>
          <DetailContentCol>
            <ButtonBase
              className={"width-70"}
              outline
              label={disabled ? "보기" : "수정"}
              color={"turu"}
              onClick={() => {
                setAuthModalOpen(true);
              }}
            />
          </DetailContentCol>
        </DetailRow>
        <DetailTextInputRow
          rows={[
            {
              titleWidthRatio: 4,
              title: "전화번호",
              content: "0000-0000",
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "휴대전화 번호",
              content: "000-0000-0000",
              disabled,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>부서</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              name={"department"}
              bsSize={"lg"}
              disabled={disabled}
              value={"서비스 운영팀"}
              onChange={() => {}}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>계정상태</DetailLabelCol>
          <DetailContentCol>
            <RadioGroup name={"accountStatus"} list={accountStatusList} />
          </DetailContentCol>
        </DetailRow>
        <DetailTextRadioRow
          rows={[
            {
              title: "모바일 접속 허용 여부",
              list: radioList,
            },
            {
              title: "외부 접속 허용 여부",
              list: radioList,
            },
          ]}
        />
        <DetailTextInputRow
          className={"border-bottom border-2"}
          rows={[
            {
              titleWidthRatio: 2,
              title: "비고",
              content: "입력 정보 노출",
              disabled,
            },
          ]}
        />
        <DetailBottomButton
          containerClassName={"my-5"}
          rightButtonTitle={disabled ? "수정" : "저장"}
          listHandler={() => {
            navigate("/operator/account");
          }}
          rightButtonHandler={() => {
            /** @TODO disabled에 따라 수정 or 저장 로직 실행 */
            setDisabled((prev) => !prev);
          }}
        />
      </BodyBase>

      <AuthLevelModal
        type={disabled ? "READ" : "WRITE"}
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
        }}
      />
    </ContainerBase>
  );
};

export default OperatorAccountDetail;
