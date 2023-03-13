import React from "react";
import { Col, Row } from "reactstrap";
import RadioBase from "../Radio/RadioBase";

interface IDetailTextRadioRow {
  rows: Array<{
    name?: string;

    title: string;
    list: {
      label: string;

      disabled?: boolean;
      checked?: boolean;
      value?: string;
    }[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }>;
}

export const DetailTextRadioRow = (props: IDetailTextRadioRow) => {
  const { rows } = props;

  return (
    <Row
      className={
        "border border-0 border-top border-2 border-light mx-1 align-items-center"
      }
    >
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
            {(item.list ?? []).map((radio, index) => (
              <RadioBase
                key={index}
                name={item.name ?? item.title}
                {...radio}
                onChange={item.onChange}
              />
            ))}
          </Col>
        </Col>
      ))}
    </Row>
  );
};
