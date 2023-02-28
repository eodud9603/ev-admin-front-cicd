import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Col, Row } from "reactstrap";
import { Checkbox } from "src/components/Common/Checkbox";
import { AreaCheckType } from "src/components/Common/Filter/SearchFilter";

interface Props {
  setCheckboxData: Dispatch<SetStateAction<AreaCheckType>>;
}

const area = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "대전",
  "세종",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주",
];

export const AreaCheckbox = (props: Props) => {
  const { setCheckboxData } = props;
  const [checkbox, setCheckbox] = useState<AreaCheckType>({
    area0: true,
    area1: true,
    area2: true,
    area3: true,
    area4: true,
    area5: true,
    area6: true,
    area7: true,
    area8: true,
    area9: true,
    area10: true,
    area11: true,
    area12: true,
    area13: true,
    area14: true,
    area15: true,
    area16: true,
  });
  const [allCheck, setAllCheck] = useState(true);

  const handleCheckboxAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCheckboxStates: { [key: string]: boolean } = {};
    for (const label in checkbox) {
      newCheckboxStates[label] = e.target.checked;
    }
    setAllCheck(e.target.checked);
    setCheckbox({ ...newCheckboxStates });
  };
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const obj = JSON.parse(JSON.stringify(checkbox));
    console.log(checkbox);
    obj[e.target.name] = e.target.checked;
    setCheckbox({
      ...checkbox,
      [e.target.name]: e.target.checked,
    });

    if (allCheck) {
      for (const label in checkbox) {
        if (obj[label]) {
          setAllCheck(false);
        }
      }
    } else {
      if (Object.keys(obj).findIndex((e) => !obj[e]) < 0) {
        setAllCheck(true);
      }
    }
  };

  useEffect(() => {
    setCheckboxData(checkbox);
  }, [checkbox]);

  return (
    <Row md={12}>
      <Col className={"w-xs"}>
        <p className={"fw-bold"}>지역</p>
      </Col>
      <Col>
        <Checkbox
          id={"allArea"}
          name={"allArea"}
          value={"all"}
          label={"전체"}
          checked={allCheck}
          onChange={handleCheckboxAllChange}
        />
      </Col>
      {area.map((ar, index) => (
        <Col key={index}>
          <Checkbox
            id={"area" + index}
            name={"area" + index}
            value={ar}
            label={ar}
            checked={checkbox[`area${index}`]}
            onChange={handleCheckBoxChange}
          />
        </Col>
      ))}
    </Row>
  );
};
