import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface ICheckBoxBaseProps {
  name: string;
  label: string;

  id?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBoxBase = (props: ICheckBoxBaseProps) => {
  const {
    /* required */
    name = "checkbox",
    label = "label 텍스트",
    /* optional */
    id,
    disabled,
    checked,
    value,
    onChange,
    /* rest */
    ...rest
  } = props;

  return (
    <FormGroup className={"form-check-turu"} check inline disabled={disabled}>
      <Input
        id={id}
        type={"checkbox"}
        name={name}
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <Label className={"text-nowrap"} htmlFor={id} disabled={disabled} check>
        {label}
      </Label>
    </FormGroup>
  );
};

export default CheckBoxBase;
