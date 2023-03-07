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
    /* rest */
    ...rest
  } = props;

  return (
    <>
      {Boolean(title) && (
        <Label className={"fw-bold m-0 w-xs me-3"}>{title}</Label>
      )}
      {list.map(({ label }, index) => (
        <RadioBase
          key={index}
          label={label}
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
