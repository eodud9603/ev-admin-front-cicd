import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioBase from "src/components/Common/Radio/RadioBase";

const Example = () => {
  const [text, setText] = useState("");

  return (
    <div style={{ width: "100%" }}>
      <HeaderBase>children</HeaderBase>
      <CheckBoxBase name="checkboxGroup" id={"checkBox1"} label={"체크박스1"} />
      <CheckBoxBase name="checkboxGroup" id={"checkBox2"} label={"체크박스2"} />
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
    </div>
  );
};

export default Example;
