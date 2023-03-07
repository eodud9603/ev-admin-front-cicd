import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioBase from "src/components/Common/Radio/RadioBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TabBase from "src/components/Common/Tab/TabBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";

const Example = () => {
  const [text, setText] = useState("");
  const dropdownData = [
    { label: "전체", value: "1" },
    { label: "C:휴맥스2", value: "2" },
    { label: "H:휴맥스3", value: "3" },
    { label: "H:휴맥스4", value: "4" },
    { label: "H:휴맥스5", value: "5" },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <ContainerBase>
      <HeaderBase>children</HeaderBase>
      <div className={"mt-4 mx-5"}>
        <TabBase
          text={"공지사항"}
          selected={selected === 0}
          onClick={() => {
            setSelected(0);
          }}
        />
        <TabBase
          text={"충전소 관리"}
          selected={selected === 1}
          onClick={() => {
            setSelected(1);
          }}
        />
      </div>
      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "dep 1", href: "#1" },
            { label: "dep 2", href: "#2" },
            { label: "dep 3", href: "#3" },
          ]}
        />

        <CheckBoxBase
          name="checkboxGroup"
          id={"checkBox1"}
          label={"체크박스1"}
        />
        <CheckBoxBase
          name="checkboxGroup"
          id={"checkBox2"}
          label={"체크박스2"}
        />
        <CheckBoxBase
          name="checkboxGroup"
          id={"checkBox3"}
          label={"체크박스3"}
          disabled={true}
        />

        <FormGroup tag="fieldset">
          <RadioBase id={"radio1"} name={"radioGroup"} label={"라디오1"} />
          <RadioBase id={"radio2"} name={"radioGroup"} label={"라디오2"} />
          <RadioBase
            id={"radio3"}
            name={"radioGroup"}
            label={"라디오3"}
            disabled={true}
          />
          <TextInputBase
            name={"charger"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FormGroup>
        <ButtonBase label={"버튼1"} />
        <ButtonBase
          label={"버튼2"}
          className={"width-120"}
          outline={true}
          color={"turu"}
        />
        <DropdownBase menuItems={dropdownData} />
        <DropboxGroup
          label={"xptmxm"}
          className={"me-2"}
          dropdownItems={[
            { menuItems: [{ label: "테스트1", value: "test1" }] },
            { menuItems: [{ label: "테스트2", value: "test2" }] },
          ]}
        />
        <DateGroup label={"접수일"} />
      </BodyBase>
    </ContainerBase>
  );
};

export default Example;
