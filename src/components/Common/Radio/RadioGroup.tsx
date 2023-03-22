import React from "react";
import { Label } from "reactstrap";
import RadioBase from "src/components/Common/Radio/RadioBase";

interface IRadioGroupProps {
  name: string;
  list: {
    label: string;

    disabled?: boolean;
    checked?: boolean;
    value?: string;
  }[];

  title?: string;
  require?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioGroup = (props: IRadioGroupProps) => {
  const {
    /* required */
    name = "radioGroup",
    list = [],
    /* optional */
    title = "",
    onChange,
    require,
    /* rest */
    ...rest
  } = props;

  return (
    <>
      {Boolean(title) && (
        <Label className={"fw-bold m-0 w-xs me-3"}>
          {title}
          {require && <span className={"text-danger mx-2"}>*</span>}
        </Label>
      )}
      {list.map(({ label, disabled, value, checked }, index) => (
        <RadioBase
          key={index}
          label={label}
          disabled={disabled}
          value={value}
          checked={checked}
          name={name}
          id={`${name}-${index}`}
          onChange={onChange}
          {...rest}
        />
      ))}
    </>
  );
};

export default RadioGroup;
