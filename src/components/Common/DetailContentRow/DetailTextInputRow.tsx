import React from "react";
import { Col, Input, InputGroup, Row } from "reactstrap";
import styled from "styled-components";

interface IDetailTextInputRow {
  rows: Array<{
    title: string;
    placeholder?: string;
    content?: string;
    disabled?: boolean;
    required?: boolean;
    type?: "textarea" | "text";
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerWidthRatio?: number;
    titleWidthRatio?: number;

    children?: string | JSX.Element | JSX.Element[];
  } | null>;
  hasMargin?: boolean;
  className?: string;
}
export const DetailTextInputRow = (props: IDetailTextInputRow) => {
  const { rows, hasMargin = true, className } = props;

  return (
    <Row
      className={`border border-0 border-top border-2 border-light ${
        hasMargin ? "mx-1" : "m-0"
      } 
      align-items-center ${className ?? ""}`}
    >
      {rows.map((item, index) =>
        item ? (
          <Col
            key={index}
            sm={item?.containerWidthRatio}
            className={"d-flex p-0"}
          >
            <Col
              xs={item?.titleWidthRatio}
              className={
                "d-flex fw-bold align-items-center " +
                `bg-light bg-opacity-10 p-3 ${item.required ? "gap-1" : ""}`
              }
            >
              {item.title}
              {item.required && <span className={"text-danger"}>*</span>}
            </Col>
            <Col className={"bg-white p-3"}>
              <InputGroup>
                <DetailInput
                  className={`${
                    item?.disabled
                      ? "bg-light bg-opacity-50 " +
                        "border-1 border-secondary border-opacity-50"
                      : ""
                  }`}
                  placeholder={item.placeholder}
                  type={item?.type ?? "text"}
                  name={item?.name}
                  value={item?.content}
                  disabled={item?.disabled}
                  onChange={item.onChange}
                />
                {item.children}
              </InputGroup>
            </Col>
          </Col>
        ) : (
          <Col key={index} />
        )
      )}
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
