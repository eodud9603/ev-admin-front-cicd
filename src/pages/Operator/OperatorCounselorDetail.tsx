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
import DetailBottomButton from "../Charger/components/DetailBottomButton";

const groupItems = [{ label: "선택", value: "1" }];

const OperatorCounselorDetail = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "상담사 정보 관리" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 수정 비활성화 */
  const [disabled, setDisabled] = useState(true);

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
              content: "강상담",
              disabled,
            },
            {
              titleWidthRatio: 4,
              title: "상담사 ID",
              content: "KKS@humaxev.com",
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
        <DetailRow>
          <DetailLabelCol sm={2}>소속사</DetailLabelCol>
          <DetailContentCol>
            <TextInputBase
              disabled={disabled}
              bsSize={"lg"}
              name={"agencyName"}
              value={"입력 정보 노출"}
              onChange={() => {}}
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
              value={"입력 정보 노출"}
              onChange={() => {}}
            />
            <span>ACD</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={disabled}
              bsSize={"lg"}
              name={"acd"}
              value={"입력 정보 노출"}
              onChange={() => {}}
            />
            <span>내선</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={disabled}
              bsSize={"lg"}
              name={"내선"}
              value={"입력 정보 노출"}
              onChange={() => {}}
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
                name={"우편번호"}
                value={"우편번호 노출"}
                onChange={() => {}}
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
                name={"주소"}
                value={"검색된 주소 정보 노출"}
                onChange={() => {}}
              />
              <TextInputBase
                bsSize={"lg"}
                disabled={disabled}
                name={"상세주소"}
                value={"입력한 상세 주소 정보 노출"}
                onChange={() => {}}
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
              content: "입력 정보 노출",
              disabled,
            },
          ]}
        />

        <DetailBottomButton
          containerClassName={"my-5"}
          editDisabled={disabled}
          listHandler={() => {
            navigate("/operator/counselor");
          }}
          editHandler={() => {
            setDisabled(false);
          }}
          saveHandler={() => {
            /** @TODO 저장로직 추가 */

            setDisabled(true);
          }}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatorCounselorDetail;