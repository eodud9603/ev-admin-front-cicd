import { Col, Row } from "reactstrap";
import React from "react";

interface IDetailTextRow {
  rows: Array<{ title: string; content: string }>;
}
export const DetailTextRow = (props: IDetailTextRow) => {
  const { rows } = props;

  return (
    <Row className={"border border-0 border-top border-2 border-light mx-1"}>
      {rows.map((item, index) => (
        <Col key={index} sm={rows.length > 1 && 6} className={"d-flex p-0"}>
          <Col
            xs={rows.length > 1 && 6 ? 4 : 2}
            className={"fw-bold bg-light bg-opacity-10 p-3 "}
          >
            {item.title}
          </Col>
          <Col className={"bg-white p-3"}>{item.content}</Col>
        </Col>
      ))}
    </Row>
  );
};
