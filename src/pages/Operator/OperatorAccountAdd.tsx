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
import AuthLevelModal from "./components/AuthLevelModal";
import AddButton from "src/pages/Operator/components/AddButton";
import useInputs from "src/hooks/useInputs";

/** 소속그룹 목록 */
const groupItems = [
  { label: "선택", value: "0" },
  { label: "휴맥스EV", value: "1" },
];

/** Y/N 라디오 목록 */
const radioList = [
  {
    label: "Y",
    value: "Y",
  },
  {
    label: "N",
    value: "N",
  },
];

/** 계정등급 라디오 목록 */
const roleList = [
  { label: "최고 관리자", value: "1" },
  { label: "일반 관리자", value: "2" },
  { label: "관계사", value: "3" },
  { label: "제조사", value: "4" },
];

/** 계정상태 라디오 목록 */
const accountStatusList = [
  { label: "정상", value: "1" },
  { label: "차단", value: "2" },
];

const OperatorAccountAdd = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "계정 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const { name, id, password, tel, mobileTel, department, etc, onChange } =
    useInputs({
      name: "",
      id: "",
      password: "",
      tel: "",
      mobileTel: "",
      department: "",
      etc: "",
    });
  /* 권한등급 모달 */
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
            { label: "계정 신규 등록", href: "" },
          ]}
          title={"계정 신규 등록"}
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
              placeholder: "입력해주세요.",
            },
            {
              titleWidthRatio: 4,
              title: "계정 ID",
              name: "id",
              content: id,
              onChange,
              placeholder: "입력해주세요.",
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>소속 그룹</DetailLabelCol>
          <DetailContentCol>
            <DropdownBase menuItems={groupItems} />
          </DetailContentCol>
          <DetailLabelCol sm={2}>비밀번호</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              bsSize={"lg"}
              name={"password"}
              type={"password"}
              value={password}
              onChange={onChange}
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
              outline
              label={"권한등록"}
              color={"secondary"}
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
              placeholder: "입력해주세요.",
              onChange,
            },
            {
              titleWidthRatio: 4,
              title: "휴대전화 번호",
              name: "mobileTel",
              content: mobileTel,
              placeholder: "입력해주세요.",
              onChange,
            },
          ]}
        />
        <DetailRow>
          <DetailLabelCol sm={2}>부서</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              name={"department"}
              bsSize={"lg"}
              value={department}
              onChange={onChange}
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
              name: "mobileAccess",
              title: "모바일 접속 허용 여부",
              list: radioList,
            },
            {
              name: "externalAccess",
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
              name: "etc",
              content: etc,
              placeholder: "입력해주세요.",
              onChange,
            },
          ]}
        />

        <AddButton
          disabled={true}
          listHandler={() => {
            navigate("/operator/account");
          }}
          addHandler={() => {}}
        />
      </BodyBase>

      <AuthLevelModal
        type={"WRITE"}
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
        }}
      />
    </ContainerBase>
  );
};

export default OperatorAccountAdd;
