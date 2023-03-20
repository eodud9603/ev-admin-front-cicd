import React from "react";
import { Input } from "reactstrap";
import styled from "styled-components";

export interface ITextInputBaseProps {
  name: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  autoComplete?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  bsSize?: "sm" | "lg";
  inputstyle?: React.CSSProperties;
  maxLength?: number;
  className?: string;
}

const TextInputBase = (props: ITextInputBaseProps) => {
  const {
    /* required */
    name,
    value,
    onChange,
    /* optional */
    type = "text",
    placeholder = "입력해주세요.",
    autoComplete,
    bsSize = "sm",
    disabled = false,
    inputstyle,
    className = "",
    /* rest */
    ...rest
  } = props;

  return (
    <InputBase
      className={`font-size-14 ${
        disabled
          ? "bg-light bg-opacity-50 border-secondary border-opacity-50"
          : "bg-white"
      } ${className}`}
      inputstyle={inputstyle}
      id={name}
      type={type}
      autoComplete={autoComplete}
      valid={false}
      invalid={false}
      bsSize={bsSize}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default TextInputBase;

const InputBase = styled(Input)<Pick<ITextInputBaseProps, "inputstyle">>`
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    border-color: #fc6c00;
  }

  ${(props) => ({ ...props.inputstyle })};
`;
