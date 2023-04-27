import React, { InputHTMLAttributes } from "react";
import { Col, Input, InputGroup, Row } from "reactstrap";
import styled from "styled-components";

interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  title: string;
  placeholder?: string;
  content?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "textarea" | "text" | "number";
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerWidthRatio?: number;
  titleWidthRatio?: number;

  children?: string | JSX.Element | JSX.Element[];
}

interface IDetailTextInputRow {
  rows: Array<IInputProps | null>;
  hasMargin?: boolean;
  className?: string;
  itemClassName?: string;
}
export const DetailTextInputRow = (props: IDetailTextInputRow) => {
  const { rows, hasMargin = true, className, itemClassName = "" } = props;

  return (
    <Row
      className={`border border-0 border-top border-2 border-light ${
        hasMargin ? "mx-1" : "m-0"
      } 
      align-items-center ${className ?? ""}`}
    >
      {rows.map((item, index) => {
        if (item) {
          const {
            containerWidthRatio,
            titleWidthRatio,
            title,
            required,
            disabled,
            placeholder,
            type,
            content,
            children,
            ...rest
          } = item;

          return (
            <Col
              key={index}
              sm={containerWidthRatio}
              className={"d-flex p-0 " + itemClassName}
            >
              <Col
                xs={titleWidthRatio}
                className={
                  "d-flex fw-bold align-items-center " +
                  `bg-light bg-opacity-10 p-3 ${required ? "gap-1" : ""}`
                }
              >
                {title}
                {required && <span className={"text-danger"}>*</span>}
              </Col>
              <Col className={"bg-white p-3"}>
                <InputGroup>
                  <DetailInput
                    className={`${
                      disabled
                        ? "bg-light bg-opacity-50 " +
                          "border-1 border-secondary border-opacity-50"
                        : ""
                    }`}
                    placeholder={placeholder ?? "입력해주세요"}
                    type={type ?? "text"}
                    value={content}
                    disabled={disabled}
                    {...rest}
                  />
                  {children}
                </InputGroup>
              </Col>
            </Col>
          );
        }

        return <Col key={index} />;
      })}
    </Row>
  );
};

const DetailInput = styled(Input)`
  ::placeholder {
    color: #bdbdbd;
  }
  :focus {
    border-color: #fc6c00;
  }
`;
