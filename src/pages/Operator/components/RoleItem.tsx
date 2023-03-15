import React from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import styled from "styled-components";

export const RoleHeaderItem = () => {
  return (
    <Row
      className={
        "px-3 py-4 bg-light bg-opacity-50 " +
        "fw-bold font-size-16 border-bottom border-2"
      }
    >
      <Col sm={5} md={5} lg={5} xl={5} xs={5} xxl={5}>
        1차
      </Col>
      <Col sm={5} md={5} lg={5} xl={5} xs={5} xxl={5}>
        2차
      </Col>
      <Col sm={1} md={1} lg={1} xl={1} xs={1} xxl={1}>
        편집
      </Col>
      <Col sm={1} md={1} lg={1} xl={1} xs={1} xxl={1}>
        조회
      </Col>
    </Row>
  );
};

export const RoleMainItem = (props: {
  initialOpen?: boolean;
  name: string;
  detailList: { name: string; read: boolean; write: boolean }[];
  index: number;
}) => {
  const { initialOpen = false, name, index, detailList } = props;

  const [isOpen, setIsOpen] = useState(initialOpen);

  const onChangeOpenHandler = () => {
    if (detailList.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  const isSubListOpened = isOpen && detailList.length > 0;

  return (
    <div>
      <Row key={index}>
        <Col
          className={`py-3 ${!isSubListOpened ? "border-bottom border-2" : ""}`}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          xs={5}
          xxl={5}
        >
          <DropArea
            className={
              "d-flex flex-row align-items-center justify-content-between"
            }
            onClick={onChangeOpenHandler}
          >
            <span>{name}</span>
            {/* 2차 항목이 있는 경우 */}
            {detailList.length > 0 && (
              <Icon
                isOpen={isOpen}
                className={"mdi mdi-chevron-up font-size-14"}
              />
            )}
          </DropArea>
        </Col>
        <Col
          className={"py-3 border-bottom border-2"}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          xs={5}
          xxl={5}
        >
          전체
        </Col>
        <Col
          className={"ps-0 py-3 border-bottom border-2"}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xs={1}
          xxl={1}
        >
          <CheckBoxBase
            label={""}
            name={`main-write-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </Col>
        <Col
          className={"ps-0 py-3 border-bottom border-2"}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xs={1}
          xxl={1}
        >
          <CheckBoxBase
            label={""}
            name={`main-read-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </Col>
      </Row>
      {isOpen &&
        (detailList ?? []).map((detail, detailIndex) => (
          <RoleSubItem
            key={detailIndex}
            index={detailIndex}
            lastIndex={detailList.length - 1}
            {...detail}
          />
        ))}
    </div>
  );
};

const RoleSubItem = ({
  index,
  lastIndex,
  name,
}: {
  name: string;
  lastIndex: number;
  index: number;
}) => {
  return (
    <Row key={index}>
      <Col
        className={`py-3 ${
          index === lastIndex ? " border-bottom border-2" : ""
        }`}
        sm={5}
        md={5}
        lg={5}
        xl={5}
        xs={5}
        xxl={5}
      />
      <Col
        className={"py-3 border-bottom border-2"}
        sm={5}
        md={5}
        lg={5}
        xl={5}
        xs={5}
        xxl={5}
      >
        {name}
      </Col>
      <Col
        className={"ps-0 py-3 border-bottom border-2"}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        xs={1}
        xxl={1}
      >
        <CheckBoxBase
          label={""}
          name={`sub-write-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </Col>
      <Col
        className={"ps-0 py-3 border-bottom border-2"}
        sm={1}
        md={1}
        lg={1}
        xl={1}
        xs={1}
        xxl={1}
      >
        <CheckBoxBase
          label={""}
          name={`sub-read-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </Col>
    </Row>
  );
};

const DropArea = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.i<{ isOpen: boolean }>`
  transition: all ease 0.5s;
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 360)}deg);
`;
