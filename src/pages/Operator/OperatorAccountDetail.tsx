import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Label } from "reactstrap";
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
import useInputs from "src/hooks/useInputs";
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
  const {
    name,
    id,
    /* dropdown */
    // agencyGroup,
    password,
    /* radio */
    roleLevel,
    tel,
    mobileTel,
    department,
    /* radio */
    accountStatus,
    mobileAccess,
    externalAccess,
    etc,
    onChange,
    onChangeSingle,
  } = useInputs({
    name: "이팀장",
    id: "K05@humaxev.com",
    agencyGroup: "1",
    password: "1234",
    roleLevel: "1",
    tel: "0000-0000",
    mobileTel: "000-0000-0000",
    department: "서비스 운영팀",
    accountStatus: "1",
    mobileAccess: "Y",
    externalAccess: "Y",
    etc: "입력 정보 노출",
  });
  /* 권한등급 모달 */
  const [authModalOpen, setAuthModalOpen] = useState(false);

  /** Y/N 라디오 목록 */
  const radioList = [
    {
      label: "Y",
      value: "Y",
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
    { label: "최고 관리자", value: "1", checked: roleLevel === "1", disabled },
    { label: "일반 관리자", value: "2", checked: roleLevel === "2", disabled },
    { label: "관계사", value: "3", checked: roleLevel === "3", disabled },
    { label: "제조사", value: "4", checked: roleLevel === "4", disabled },
  ];

  /** 계정상태 라디오 목록 */
  const accountStatusList = [
    { label: "정상", value: "1", checked: accountStatus === "1", disabled },
    { label: "차단", value: "2", checked: accountStatus === "2", disabled },
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
              name: "name",
              content: name,
              onChange,
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "계정 ID",
              name: "id",
              content: id,
              onChange,
              disabled,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>소속 그룹</DetailLabelCol>
          <DetailContentCol>
            <DropdownBase
              disabled={disabled}
              menuItems={groupItems}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ agencyGroup: value });
              }}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>비밀번호</DetailLabelCol>
          <DetailContentCol>
            <Form
              /* 비밀번호 input에서 enter 클릭시, submit 리로드 액션 block */
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextInputBase
                autoComplete={"off"}
                disabled={disabled}
                bsSize={"lg"}
                name={"password"}
                type={"password"}
                value={password}
                onChange={onChange}
              />
            </Form>
          </DetailContentCol>
        </DetailRow>
        {/** @TODO 권한 row 추가 */}
        <DetailRow>
          <DetailLabelCol sm={2}>권한등급</DetailLabelCol>
          <DetailContentCol>
            <RadioGroup
              list={roleList}
              name={"roleLevel"}
              onChange={onChange}
            />
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
              name: "tel",
              content: tel,
              onChange,
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "휴대전화 번호",
              name: "mobileTel",
              content: mobileTel,
              onChange,
              disabled,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>부서</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              bsSize={"lg"}
              disabled={disabled}
              name={"department"}
              value={department}
              onChange={onChange}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>계정상태</DetailLabelCol>
          <DetailContentCol>
            <RadioGroup
              list={accountStatusList}
              name={"accountStatus"}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>
        <DetailTextRadioRow
          rows={[
            {
              title: "모바일 접속 허용 여부",
              list: radioList.map((item) => ({
                ...item,
                checked: mobileAccess === item.value,
              })),
              name: "mobileAccess",
              onChange,
            },
            {
              title: "외부 접속 허용 여부",
              list: radioList.map((item) => ({
                ...item,
                checked: externalAccess === item.value,
              })),
              name: "externalAccess",
              onChange,
            },
          ]}
        />
        <DetailTextInputRow
          className={"border-bottom border-2"}
          rows={[
            {
              titleWidthRatio: 2,
              title: "비고",
              name: "etc",
              content: etc,
              onChange,
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
        role={roleList.find((role) => role.checked === true)}
      />
    </ContainerBase>
  );
};

export default OperatorAccountDetail;
