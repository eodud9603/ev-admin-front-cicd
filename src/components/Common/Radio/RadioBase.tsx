import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import styled from "styled-components";

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
    disabled = false,
    checked,
    value,
    onChange,
    /* rest */
    ...rest
  } = props;

  return (
    <FormGroupBase
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
    </FormGroupBase>
  );
};

export default RadioBase;

const FormGroupBase = styled(FormGroup)<{ disabled: boolean }>`
  :hover {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;
