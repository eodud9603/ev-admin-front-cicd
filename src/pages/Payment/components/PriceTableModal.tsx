import React, { ChangeEvent, useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import { Col, Label, Row } from "reactstrap";
import styled from "styled-components";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import event from "src/pages/Operate/Event";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

const tableHeader = [{ label: "시간구분(시)" }, { label: "요금(원)" }];
export const PriceTableModal = (props: IModalBaseProps) => {
  const { isOpen, onClose } = props;
  const [data, setData] = useState(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      arr.push({ time: `${i}~${i + 1}`, fee: "" });
    }
    return arr;
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(event.target.value);
    setData((prev) => {
      const arr = JSON.parse(JSON.stringify(prev));
      arr[index].fee = event.target.value;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return arr;
    });
  };

  return (
    <ModalBase
      title={"요금표 보기"}
      size={"lg"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <TypeSection className={"bg-light bg-opacity-10 p-3 rounded-3 mb-3"}>
          <Row>
            <Col>
              <RadioGroup
                require={true}
                title={"충전유형"}
                name={"type"}
                list={[
                  { label: "전체", value: "1" },
                  { label: "완속", value: "1" },
                  { label: "급속", value: "1" },
                ]}
              />
            </Col>
            <Col>
              <RadioGroup
                require={true}
                title={"회원구분"}
                name={"member"}
                list={[
                  { label: "전체", value: "1" },
                  { label: "회원", value: "1" },
                  { label: "비회원", value: "1" },
                ]}
              />
            </Col>
          </Row>
        </TypeSection>
        <Label className={"fw-semibold m-0 font-size-14 mt-4 mb-2"}>
          시간별 요금 설정<span className={"mx-2 text-danger"}>*</span>
        </Label>
        <div style={{ height: 350, overflow: "scroll" }}>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.map((e, i) => (
                <tr key={i}>
                  <td>{e.time}</td>
                  <td>
                    <TextInputBase
                      name={"text"}
                      value={e.fee.toString()}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </td>
                </tr>
              ))}
            </>
          </TableBase>
        </div>
        <div className={"d-flex justify-content-center mt-4"}>
          <ButtonBase
            label={"닫기"}
            outline={true}
            className={"w-xs"}
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const TypeSection = styled.section``;
