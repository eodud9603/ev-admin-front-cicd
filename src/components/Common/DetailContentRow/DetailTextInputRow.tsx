import React from "react";
import { Col, Input, Row } from "reactstrap";

interface IDetailTextInputRow {
  rows: Array<{
    title: string;
    content?: string;
    disabled?: boolean;
    type?: "textarea" | "text";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
}
export const DetailTextInputRow = (props: IDetailTextInputRow) => {
  const { rows } = props;

  return (
    <Row className={"border border-0 border-top border-2 border-light mx-1"}>
      {rows.map((item, index) => (
        <Col key={index} sm={rows.length > 1 && 6} className={"d-flex p-0"}>
          <Col
            xs={rows.length > 1 && 6 ? 4 : 2}
            className={
              "d-flex fw-bold align-items-center bg-light bg-opacity-10 p-3 "
            }
          >
            {item.title}
          </Col>
          <Col className={"bg-white p-3"}>
            <Input
              type={item?.type ?? "text"}
              value={item?.content ?? ""}
              disabled={item?.disabled}
              onChange={item?.onChange && item.onChange}
            />
          </Col>
        </Col>
      ))}
    </Row>
  );
};
