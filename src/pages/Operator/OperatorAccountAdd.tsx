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
import AuthLevelModal from "src/pages/Operator/components/AuthLevelModal";
import AddButton from "src/pages/Operator/components/AddButton";
import useInputs from "src/hooks/useInputs";
import { objectToArray } from "src/utils/convert";
import { ROLE_TYPE, TRoleTypeKey } from "src/constants/status";

/** 소속그룹 목록 */
const groupItems = [
  { label: "선택", value: "" },
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
const roleList = objectToArray(ROLE_TYPE).map((data) => ({
  ...data,
}));

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
  const [
    {
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
      // accountStatus,
      // mobileAccess,
      // externalAccess,
      etc,
    },
    { onChange, onChangeSingle },
  ] = useInputs({
    name: "",
    id: "",
    agencyGroup: "",
    password: "",
    roleLevel: "" as TRoleTypeKey,
    tel: "",
    mobileTel: "",
    department: "",
    accountStatus: "",
    mobileAccess: "",
    externalAccess: "",
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
            <DropdownBase
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
                bsSize={"lg"}
                name={"password"}
                type={"password"}
                value={password}
                onChange={onChange}
                autoComplete={"off"}
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
              outline
              label={"권한등록"}
              color={"secondary"}
              onClick={() => {
                if (!roleLevel) {
                  /** @TODO 권한등급 우선 선택 필요 > 메세지 표시 추가 필요 */
                  return;
                }
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
              bsSize={"lg"}
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
              list: radioList,
              name: "mobileAccess",
              onChange,
            },
            {
              title: "외부 접속 허용 여부",
              list: radioList,
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
        role={roleLevel}
      />
    </ContainerBase>
  );
};

export default OperatorAccountAdd;
