import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import styled, { keyframes } from "styled-components";

interface IColProps {
  ratio: number;
  className?: string;
  children?: string | React.ReactElement | React.ReactElement[];
  isBorder?: boolean;
}

interface IRoleMainItemProps {
  name: string;
  index: number;

  disabled?: boolean;
  initialOpen?: boolean;
  detailList: { name: string; read: boolean; write: boolean }[];
}

interface IRoleSubItemProps {
  name: string;
  index: number;
  disabled: boolean;

  lastIndex: number;
  mainWrite: boolean;
  mainRead: boolean;

  getSubRoleList: () => {
    list: IRoleSubItemRef[];
    setRead: React.Dispatch<React.SetStateAction<boolean>>;
    setWrite: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface IRoleSubItemRef {
  write: boolean;
  read: boolean;
  onChangeSubWrite: (bool: boolean) => void;
  onChangeSubRead: (bool: boolean) => void;
}

/** 권한 테이블형식 공통 border css */
const borderCSS = "border-bottom border-2";
/** 2차 권한 row 크기 */
const DEFAULT_ROW_HEIGHT = "55px";

/* 권한 테이블형식 UI Col */
const RoleCol = ({ ratio, children, className = "", ...rest }: IColProps) => {
  return (
    <Col
      sm={ratio}
      md={ratio}
      lg={ratio}
      xl={ratio}
      xs={ratio}
      xxl={ratio}
      className={`py-3 ${className}`}
      {...rest}
    >
      {children}
    </Col>
  );
};

const TextCol = (props: Omit<IColProps, "ratio">) => {
  return <RoleCol ratio={5} {...props} />;
};

const CheckBoxCol = ({
  className = "",
  isBorder = true,
  ...rest
}: Omit<IColProps, "ratio">) => {
  return (
    <RoleCol
      ratio={1}
      className={`ps-0 ${isBorder ? borderCSS : ""} ${className}`}
      {...rest}
    />
  );
};

/** 권한 헤더뷰 */
export const RoleHeaderItem = () => {
  return (
    <Row
      className={
        "px-3 py-1 bg-light bg-opacity-50 " +
        `fw-bold font-size-16 ${borderCSS}`
      }
    >
      <TextCol>1차</TextCol>
      <TextCol>2차</TextCol>
      <CheckBoxCol isBorder={false}>편집</CheckBoxCol>
      <CheckBoxCol isBorder={false}>조회</CheckBoxCol>
    </Row>
  );
};

/** 1차 권한 목록뷰 */
export const RoleMainItem = (props: IRoleMainItemProps) => {
  const {
    initialOpen = false,
    disabled = false,
    name,
    index,
    detailList,
  } = props;

  const [isOpen, setIsOpen] = useState(initialOpen);

  /** 편집/조회 */
  const [write, setWrite] = useState(true);
  const [read, setRead] = useState(true);

  const subRef = useRef<IRoleSubItemRef[]>([]);

  const isSubListOpened = isOpen && detailList.length > 0;

  const onChangeOpenHandler = () => {
    if (detailList.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  const getSubRoleList = () => {
    const list = [...subRef.current];

    return {
      list,
      setWrite,
      setRead,
    };
  };

  return (
    <div>
      <Row>
        <TextCol className={`${!isSubListOpened ? borderCSS : ""}`}>
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
        </TextCol>
        <TextCol className={borderCSS}>전체</TextCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-write-${name}-${index}`}
            checked={write}
            disabled={disabled}
            onChange={() => {
              for (const sub of subRef.current) {
                sub?.onChangeSubWrite(!write);
              }
              setWrite((prev) => !prev);
            }}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-read-${name}-${index}`}
            checked={read}
            disabled={disabled}
            onChange={() => {
              for (const sub of subRef.current) {
                sub?.onChangeSubRead(!read);
              }
              setRead((prev) => !prev);
            }}
          />
        </CheckBoxCol>
      </Row>
      {isOpen &&
        detailList.map((detail, detailIndex) => (
          <RoleSubItem
            ref={(ref: IRoleSubItemRef) => (subRef.current[detailIndex] = ref)}
            key={detailIndex}
            index={detailIndex}
            lastIndex={detailList.length - 1}
            getSubRoleList={getSubRoleList}
            disabled={disabled}
            mainWrite={write}
            mainRead={read}
            {...detail}
          />
        ))}
    </div>
  );
};

/** 2차 권한 목록뷰 */
const RoleSubItem = forwardRef<IRoleSubItemRef, IRoleSubItemProps>(
  (props, ref) => {
    const {
      index,
      lastIndex,
      name,
      disabled,
      mainWrite,
      mainRead,
      getSubRoleList,
    } = props;
    /** 편집/조회 */
    const [write, setWrite] = useState(mainWrite);
    const [read, setRead] = useState(mainRead);

    useImperativeHandle(
      ref,
      () => ({
        write,
        read,
        onChangeSubWrite: (bool: boolean) => setWrite(bool),
        onChangeSubRead: (bool: boolean) => setRead(bool),
      }),
      [write, read]
    );

    return (
      <RoleSubItemRow>
        <TextCol className={`${index === lastIndex ? borderCSS : ""}`} />
        <TextCol className={borderCSS}>{name}</TextCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`sub-write-${name}-${index}`}
            checked={write}
            disabled={disabled}
            /** @TODO 코드 정리 필요 */
            onChange={() => {
              const { list, setWrite: setMainWrite } = getSubRoleList();
              const listCount = lastIndex + 1;
              const checkCount =
                list.filter((item) => item.write).length + (!write ? 1 : -1);

              if (listCount === checkCount && !mainWrite) {
                setMainWrite(true);
              }
              if (listCount !== checkCount && mainWrite) {
                setMainWrite(false);
              }

              setWrite((prev) => !prev);
            }}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`sub-read-${name}-${index}`}
            checked={read}
            disabled={disabled}
            /** @TODO 코드 정리 필요 */
            onChange={() => {
              const { list, setRead: setMainRead } = getSubRoleList();
              const listCount = lastIndex + 1;
              const checkCount =
                list.filter((item) => item.read).length + (!read ? 1 : -1);

              if (listCount === checkCount && !mainRead) {
                setMainRead(true);
              }
              if (listCount !== checkCount && mainRead) {
                setMainRead(false);
              }

              setRead((prev) => !prev);
            }}
          />
        </CheckBoxCol>
      </RoleSubItemRow>
    );
  }
);

const DropArea = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Icon = styled.i<{ isOpen: boolean }>`
  transition: all ease 0.5s;
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 360)}deg);
`;

const breatheAnimation = keyframes`
 from { max-height: 0px; opacity: 0; }
 to { max-height: ${DEFAULT_ROW_HEIGHT}; opacity: 1; }
`;

const RoleSubItemRow = styled(Row)`
  overflow: hidden;
  max-height: auto;
  animation-name: ${breatheAnimation};
  animation-duration: 0.7s;
  animation-iteration-count: 1;
`;
