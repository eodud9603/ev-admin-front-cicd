import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Checkbox } from "src/components/Common/Checkbox";
import { AreaCheckbox } from "src/components/Common/Filter/component/AreaCheckbox";
import styled, { keyframes } from "styled-components";
import { LabelDropDown } from "src/components/Common/LabelDropDown";
import { DateInput } from "src/components/Common/Filter/component/DateInput";

interface Props {
  setData: Dispatch<SetStateAction<any>>;
}
export type AreaCheckType = { [key: string]: boolean };

export const SearchFilter = (props: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const [checkbox, setCheckbox] = useState({});

  const { setData } = props;
  const operator_status = ["전체", "설치예정", "설치완료", "철거예정"];
  const charger_division = ["전체", "알수없음", "급속", "완속"];
  const network_connect = ["전체", "연결", "미연결"];

  const manufacturer = [
    { label: "전체", value: "1" },
    { label: "C:휴맥스2", value: "2" },
    { label: "H:휴맥스3", value: "3" },
    { label: "H:휴맥스4", value: "4" },
    { label: "H:휴맥스5", value: "5" },
  ];
  const [drp_primary1, setDrp_primary1] = useState(false);
  const aa = [<div key={1}>111</div>, <div key={2}>222</div>];
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const onClickSearchBtn = () => {
    setData({
      keyword: keyword,
      area: checkbox,
    });
  };

  return (
    <Card>
      <CardHeader className={"bg-light bg-opacity-50"}>
        <h4 className="card-title m-0">검색 필터</h4>
      </CardHeader>
      <CardBody>
        <DateInput />
        <Row className={"my-3"}>
          <Col className={"d-flex align-items-center"}>
            <Label className={"fw-bold m-0 w-xs"}>운영상태</Label>
            {operator_status.map((os, i) => (
              <Checkbox
                key={i}
                id={"operator" + i}
                name={"operator"}
                label={os}
                type={"radio"}
                value={i + ""}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            ))}
          </Col>
          <Col className={"d-flex align-items-center"}>
            <Label className={"fw-bold m-0 w-xs"}>통신연결</Label>
            {network_connect.map((os, i) => (
              <Checkbox
                key={i}
                id={"network" + i}
                name={"network"}
                label={os}
                type={"radio"}
                value={i + ""}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            ))}
          </Col>
          <Col md={4} />
        </Row>
        {/*지역*/}
        <AreaCheckbox setCheckboxData={setCheckbox} />

        <Row md={12}>
          <Col className={"d-flex align-items-center"}>
            <Label className={"fw-bold m-0 w-xs"}>충전기 구분</Label>
            {charger_division.map((os, i) => (
              <Checkbox
                key={i}
                id={"charger_division" + i}
                name={"charger_division"}
                label={os}
                type={"radio"}
                value={i + ""}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            ))}
          </Col>
          {/*검색 키워드*/}
          <Col md={8} className={"my-2"}>
            <Col className={"input-group d-flex align-items-center"}>
              <Label className={"fw-bold m-0 w-xs"}>검색어</Label>
              <div className="btn-group">
                <Dropdown
                  isOpen={drp_primary1}
                  toggle={() => setDrp_primary1(!drp_primary1)}
                >
                  <DropdownToggle
                    tag="button"
                    className="btn btn-outline-light w-xs"
                  >
                    전체 <i className="mdi mdi-chevron-down ms-5" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>전체</DropdownItem>
                    <DropdownItem>충전소명충전소명</DropdownItem>
                    <DropdownItem>충전소번호충전소번호충전소번호</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <Input className="form-control" onChange={onChangeKeyword} />
              <button
                type="button"
                className="btn btn-outline-light waves-effect"
                onClick={onClickSearchBtn}
              >
                검색
              </button>
            </Col>
          </Col>
        </Row>
        <div className={"d-flex flex-wrap gap-4"}>
          <LabelDropDown label={"제조사"} menuItems={manufacturer} />
          <LabelDropDown label={"제조사"} menuItems={manufacturer} />
          <LabelDropDown label={"제조사"} menuItems={manufacturer} />
          <LabelDropDown label={"제조사"} menuItems={manufacturer} />
          <LabelDropDown label={"제조사"} menuItems={manufacturer} />
        </div>
      </CardBody>
    </Card>
  );
};
