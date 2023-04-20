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
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import useInputs from "src/hooks/useInputs";
import AddButton from "src/pages/Operator/components/AddButton";

const groupItems = [
  { label: "선택", value: "" },
  {
    label: "소속그룹1",
    value: "1",
  },
];

const OperatorCounselorAdd = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "상담사 정보 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [
    {
      name,
      id,
      password,
      /* dropdown */
      // agencyGroup,
      agency,
      cti,
      acd,
      extension,
      zipCode,
      address,
      addressDetail,
      etc,
    },
    { onChange, onChangeSingle },
  ] = useInputs({
    name: "",
    id: "",
    password: "",
    agencyGroup: "",
    agency: "",
    cti: "",
    acd: "",
    extension: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    etc: "",
  });

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

  const validCheck = () => {
    /** @TODO 인풋값 유효 체크 로직 추가 */

    return false;
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
            { label: "상담사 정보 관리", href: "" },
            { label: "상담사 신규 등록", href: "" },
          ]}
          title={"상담사 신규 등록"}
        />

        <Label className={"m-0 mb-4 font-size-20 fw-bold"}>기본정보</Label>
        <DetailTextInputRow
          rows={[
            {
              titleWidthRatio: 4,
              title: "상담사명",
              name: "name",
              content: name,
              onChange,
              placeholder: "입력해주세요.",
            },
            {
              titleWidthRatio: 4,
              title: "상담사 ID",
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
              onClickDropdownItem={(label, value) => {
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
        <DetailRow>
          <DetailLabelCol sm={2}>소속사</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              bsSize={"lg"}
              name={"agency"}
              value={agency}
              onChange={onChange}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>소프트폰</DetailLabelCol>

          <DetailContentCol className={"d-flex align-items-center gap-3"}>
            <span>CTI</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              bsSize={"lg"}
              name={"cti"}
              value={cti}
              onChange={onChange}
            />
            <span>ACD</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              bsSize={"lg"}
              name={"acd"}
              value={acd}
              onChange={onChange}
            />
            <span>내선</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              bsSize={"lg"}
              name={"extension"}
              value={extension}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>

        <DetailRow>
          <DetailLabelCol sm={2}>주소</DetailLabelCol>
          <DetailContentCol>
            <div className={"d-flex gap-4"}>
              <TextInputBase
                inputstyle={{ flex: 1 }}
                bsSize={"lg"}
                disabled={true}
                className={"mb-4"}
                name={"zipCode"}
                value={zipCode}
                placeholder={""}
                onChange={onChange}
              />
              <div style={{ flex: 3 }}>
                <ButtonBase
                  className={"width-110"}
                  outline
                  label={"우편번호 검색"}
                  color={"turu"}
                />
              </div>
            </div>
            <div className={"d-flex gap-4"}>
              <TextInputBase
                bsSize={"lg"}
                disabled={true}
                name={"address"}
                value={address}
                placeholder={""}
                onChange={onChange}
              />
              <TextInputBase
                bsSize={"lg"}
                name={"addressDetail"}
                value={addressDetail}
                placeholder={"상세 주소를 입력해주세요"}
                onChange={onChange}
              />
            </div>
          </DetailContentCol>
        </DetailRow>
        <DetailTextInputRow
          className={"border-bottom border-2"}
          rows={[
            {
              titleWidthRatio: 2,
              title: "비고",
              name: "etc",
              content: etc,
              onChange,
            },
          ]}
        />

        <AddButton
          disabled={!validCheck()}
          listHandler={() => {
            navigate("/operator/counselor");
          }}
          addHandler={() => {}}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorCounselorAdd;
