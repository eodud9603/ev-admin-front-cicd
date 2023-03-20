import React, { useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import styled from "styled-components";
import { Col, Label, Row } from "reactstrap";
import { NewTypeAddRow } from "src/pages/Counseling/components/NewTypeAddRow";

export const NewTypeRegistrationModal = (props: IModalBaseProps) => {
  const { isOpen, onClose } = props;
  const [isSelected, setIsSelected] = useState(1);

  const handleIsSelected = (value: number) => {
    setIsSelected(value);
  };

  return (
    <ModalBase
      title={"유형 신규 등록"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer className={"my-3"}>
        <Row>
          <Col>
            <FirstTypeTag
              isSelected={isSelected === 1}
              onClick={() => handleIsSelected(1)}
            >
              <Label className={"fw-semibold font-size-16 m-0"}>1차 유형</Label>
            </FirstTypeTag>
            <NewTypeAddRow isActive={isSelected === 1} />
          </Col>
          <Col style={{ paddingInline: 2 }}>
            <SecondTypeTag
              isSelected={isSelected === 2}
              onClick={() => handleIsSelected(2)}
            >
              <Label className={"fw-semibold font-size-16 m-0"}>2차 유형</Label>
            </SecondTypeTag>
            <NewTypeAddRow isActive={isSelected === 2} />
          </Col>
          <Col>
            <SecondTypeTag
              isSelected={isSelected === 3}
              onClick={() => handleIsSelected(3)}
            >
              <Label className={"fw-semibold font-size-16 m-0"}>3차 유형</Label>
            </SecondTypeTag>
            <NewTypeAddRow isActive={isSelected === 3} />
          </Col>
        </Row>
        {/*<TypeContainer2 />*/}
      </ModalContainer>
    </ModalBase>
  );
};

const FirstTypeTag = styled.div<{ isSelected?: boolean }>`
  position: relative;
  padding-inline: 15px;
  display: flex;
  align-items: center;
  height: 54px;
  background: ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
  margin-bottom: 20px;
  :after {
    content: "";
    border-top: 27px solid transparent;
    border-left: 8px solid
      ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
    border-bottom: 27px solid transparent;
    position: absolute;
    right: -8px;
  }
  :hover:after {
    border-left-color: #e1e4ea;
  }
  :hover {
    background-color: #e1e4ea;
  }
`;
const SecondTypeTag = styled.div<{ isSelected?: boolean }>`
  position: relative;
  padding-inline: 15px;
  display: flex;
  align-items: center;
  height: 54px;
  background: ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
  margin-bottom: 20px;

  :before {
    content: "";
    border-top: 27px solid
      ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
    border-left: 8px solid transparent;
    border-bottom: 27px solid
      ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
    position: absolute;
    left: -8px;
  }
  :after {
    content: "";
    border-top: 27px solid transparent;
    border-left: 8px solid
      ${({ isSelected }) => (isSelected ? "#e1e4ea" : "#f1f3f6")};
    border-bottom: 27px solid transparent;
    position: absolute;
    right: -8px;
  }
  :hover:after {
    border-left-color: #e1e4ea;
  }
  :hover:before {
    border-top-color: #e1e4ea;
    border-bottom-color: #e1e4ea;
  }
  :hover {
    background-color: #e1e4ea;
  }
`;
