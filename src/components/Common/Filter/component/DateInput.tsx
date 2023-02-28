import React from "react";
import { Button, Col, Label, Row } from "reactstrap";

interface Props {
  startLabel?: string;
  endLabel?: string;
}

export const DateInput = (props: Props) => {
  return (
    <Row className={"mb-3"}>
      <Col>
        <div className={"input-group d-flex align-items-center"}>
          <Label className={"fw-bold m-0 w-xs"}>가입일</Label>
          <input type={"date"} className={"form-control w-xs"} />
          <div className={"px-2 text-center"}>~</div>
          <input type={"date"} className={"form-control w-xs"} />
        </div>
      </Col>
      <Col>
        <div className={"input-group d-flex align-items-center"}>
          <Label className={"fw-bold m-0 w-xs"}>종료일</Label>
          <input type={"date"} className={"form-control w-xs"} />
          <div className={"px-2 text-center"}>~</div>
          <input type={"date"} className={"form-control w-xs"} />
        </div>
      </Col>
      <Col>
        <div className={"btn-group"}>
          <Button>7일</Button>
          <Button>3개월</Button>
          <Button>6개월</Button>
          {/*<Button>9개월</Button>*/}
          {/*<Button>1년</Button>*/}
          {/*<Button>전체</Button>*/}
        </div>
      </Col>
      {/*<Col>*/}
      {/*  <div className={"input-group d-flex align-items-center"}>*/}
      {/*    <Label className={"fw-bold m-0 w-xs"}>운영상태</Label>*/}
      {/*    <input type={"date"} className={"form-control"} />*/}
      {/*    <div className={"px-2 text-center"}>~</div>*/}
      {/*    <input type={"date"} className={"form-control"} />*/}
      {/*  </div>*/}
      {/*</Col>*/}
      <Col md={2} />
    </Row>
  );
};
