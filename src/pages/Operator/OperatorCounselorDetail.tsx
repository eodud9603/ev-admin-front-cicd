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
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import useInputs from "src/hooks/useInputs";
import DetailBottomButton from "../Charger/components/DetailBottomButton";

const groupItems = [
  { label: "선택", value: "" },
  {
    label: "소속그룹1",
    value: "1",
  },
];

const OperatorCounselorDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "상담사 정보 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 수정 비활성화 */
  const [disabled, setDisabled] = useState(true);
  const {
    name,
    id,
    password,
    // agencyGroup,
    agency,
    cti,
    acd,
    extension,
    zipCode,
    address,
    addressDetail,
    etc,
    onChange,
    onChangeSingle,
  } = useInputs({
    name: "강상담",
    id: "KKS@humaxev.com",
    password: "1234",
    agencyGroup: "",
    agency: "입력 정보 노출",
    cti: "입력 정보 노출",
    acd: "입력 정보 노출",
    extension: "입력 정보 노출",
    zipCode: "우편번호 노출",
    address: "검색된 주소 정보 노출",
    addressDetail: "입력한 상세 주소 정보 노출",
    etc: "입력 정보 노출",
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
            { label: "상담사 상세", href: "" },
          ]}
          title={"상담사 상세"}
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
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "상담사 ID",
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
              onClickDropdownItem={(label, value) => {
                onChangeSingle({ agencyGroup: value });
              }}
            />
          </DetailContentCol>
          <DetailLabelCol sm={2}>비밀번호</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              disabled={disabled}
              bsSize={"lg"}
              name={"password"}
              type={"password"}
              value={password}
              onChange={onChange}
            />
          </DetailContentCol>
        </DetailRow>
        <DetailRow>
          <DetailLabelCol sm={2}>소속사</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              disabled={disabled}
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
              disabled={disabled}
              bsSize={"lg"}
              name={"cti"}
              value={cti}
              onChange={onChange}
            />
            <span>ACD</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={disabled}
              bsSize={"lg"}
              name={"acd"}
              value={acd}
              onChange={onChange}
            />
            <span>내선</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={disabled}
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
                onChange={onChange}
              />
              <div style={{ flex: 3 }}>
                {!disabled && (
                  <ButtonBase
                    className={"width-110"}
                    outline
                    label={"우편번호 검색"}
                    color={"turu"}
                    onClick={() => {}}
                  />
                )}
              </div>
            </div>
            <div className={"d-flex gap-4"}>
              <TextInputBase
                bsSize={"lg"}
                disabled={true}
                name={"address"}
                value={address}
                onChange={onChange}
              />
              <TextInputBase
                bsSize={"lg"}
                disabled={disabled}
                name={"addressDetail"}
                value={addressDetail}
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
              disabled,
            },
          ]}
        />

        <DetailBottomButton
          containerClassName={"my-5"}
          rightButtonTitle={disabled ? "수정" : "저장"}
          listHandler={() => {
            navigate("/operator/counselor");
          }}
          rightButtonHandler={() => {
            /** @TODO disabled에 따라 수정 or 저장 로직 실행 */
            setDisabled((prev) => !prev);
          }}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorCounselorDetail;
