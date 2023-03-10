import React from "react";
import { Col, Row } from "reactstrap";

interface IDetailTextDateRow {
  rows: Array<{
    title: string;
    name?: string;
    disabled?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }>;
}

export const DetailTextDateRow = (props: IDetailTextDateRow) => {
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
            <input
              type={"date"}
              className={`form-control w-xs bg-${
                item.disabled === true ? "light" : "white"
              }`}
              disabled={item.disabled}
              name={item.name}
              value={item.value}
              onChange={item.onChange}
            />
          </Col>
        </Col>
      ))}
    </Row>
  );
};
