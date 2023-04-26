import React, { Dispatch, SetStateAction } from "react";
import { Col, Input, Row } from "reactstrap";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";

interface IDetailDropdownRow {
  rows: Array<{
    title: string;
    dropdownItems: Array<{
      disabled?: boolean;
      menuItems: Array<{
        label: string;
        value: string;
        setData?: Dispatch<SetStateAction<{ label: string; value: string }>>;
      }>;
      initSelectedValue?: { label: string; value: string };
      onClickDropdownItem?: (label: string, value: string) => void;
    }>;
    disabled?: boolean;
    type?: "textarea" | "text";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerWidthRatio?: number;
    titleWidthRatio?: number;
  }>;
}
export const DetailDropdownRow = (props: IDetailDropdownRow) => {
  const { rows } = props;

  return (
    <Row className={"border border-0 border-top border-2 border-light mx-1"}>
      {rows.map((item, index) => (
        <Col
          key={index}
          sm={item?.containerWidthRatio}
          className={"d-flex p-0"}
        >
          <Col
            xs={item?.titleWidthRatio}
            className={
              "d-flex fw-bold align-items-center bg-light bg-opacity-10 p-3 "
            }
          >
            {item.title}
          </Col>
          <Col className={"bg-white p-3"}>
            <DropboxGroup dropdownItems={item.dropdownItems} />
          </Col>
        </Col>
      ))}
    </Row>
  );
};
