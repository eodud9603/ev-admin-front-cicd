import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

interface IRadioBaseProps {
  name: string;
  label: string;

  id?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioBase = (props: IRadioBaseProps) => {
  const {
    /* required */
    name = "radio",
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
    <FormGroup
      className={`form-check-${disabled ? "dark" : "turu"}`}
      check
      inline
      disabled={disabled}
    >
      <Input
        id={id}
        type={"radio"}
        name={name}
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <Label check className={"text-nowrap"} htmlFor={id} disabled={disabled}>
        {label}
      </Label>
    </FormGroup>
  );
};

export default RadioBase;
