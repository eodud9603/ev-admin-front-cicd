import React from "react";
import { Input } from "reactstrap";
import styled from "styled-components";

interface ITextInputBaseProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  placeholder?: string;
  disabled?: boolean;
  bsSize?: "sm" | "lg";
  inputstyle?: React.CSSProperties;
}

const TextInputBase = (props: ITextInputBaseProps) => {
  const {
    /* required */
    name,
    value,
    onChange,
    /* optional */
    placeholder = "입력해주세요.",
    bsSize = "sm",
    disabled = false,
    inputstyle,
    /* rest */
    ...rest
  } = props;

  return (
    <InputBase
      className={"font-size-14"}
      inputstyle={inputstyle}
      type={"text"}
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
