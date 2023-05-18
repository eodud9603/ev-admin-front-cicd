import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import { IAdminSubRoleItem } from "src/api/admin/adminApi.interface";
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
  children: IAdminSubRoleItem[];
}

interface IRoleSubItemProps extends IAdminSubRoleItem {
  name: string;
  index: number;
  disabled: boolean;

  lastIndex: number;
  mainView: boolean;
  mainCreate: boolean;

  getSubRoleList: () => {
    list: IRoleSubItemRef[];
    setView: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface IRoleSubItemRef {
  view: boolean;
  create: boolean;
  onChangeSubView: (bool: boolean) => void;
  onChangeSubCreate: (bool: boolean) => void;
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
      <CheckBoxCol isBorder={false}>등록</CheckBoxCol>
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
    children,
  } = props;

  /** 하위 항목 전체 체크 여부 */
  const initCheck = () => {
    const subsCount = children.length;
    const {
      viewCount,
      createCount,
      modifyCount,
      deleteCount,
      executeCount,
      exelCount,
    } = children.reduce(
      (acc, cur) => {
        if (cur.isView === "Y") {
          acc.viewCount += 1;
        }
        if (cur.isCreate === "Y") {
          acc.createCount += 1;
        }
        if (cur.isModify === "Y") {
          acc.modifyCount += 1;
        }
        if (cur.isDelete === "Y") {
          acc.deleteCount += 1;
        }
        if (cur.isExel === "Y") {
          acc.exelCount += 1;
        }
        if (cur.isExecute === "Y") {
          acc.executeCount += 1;
        }

        return acc;
      },
      {
        viewCount: 0,
        createCount: 0,
        modifyCount: 0,
        deleteCount: 0,
        exelCount: 0,
        executeCount: 0,
      }
    );

    return {
      isView: subsCount === viewCount,
      isCreate: subsCount === createCount,
      isModify: subsCount === modifyCount,
      isDelete: subsCount === deleteCount,
      isExel: subsCount === exelCount,
      isExecute: subsCount === executeCount,
    };
  };
  const { isView, isCreate, isModify, isDelete, isExel, isExecute } =
    initCheck();

  const [isOpen, setIsOpen] = useState(initialOpen);

  /** 편집/조회 */
  const [view, setView] = useState(isView);
  const [create, setCreate] = useState(isCreate);

  const subRef = useRef<IRoleSubItemRef[]>([]);

  const isSubListOpened = isOpen && children.length > 0;

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  const onChangeOpenHandler = () => {
    if (children.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  const getSubRoleList = () => {
    const list = [...subRef.current];

    return {
      list,
      setView,
      setCreate,
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
            {children.length > 0 && (
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
            name={`main-create-${name}-${index}`}
            checked={create}
            disabled={disabled}
            onChange={() => {
              for (const sub of subRef.current) {
                sub?.onChangeSubCreate(!create);
              }
              setCreate((prev) => !prev);
            }}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-view-${name}-${index}`}
            checked={view}
            disabled={disabled}
            onChange={() => {
              for (const sub of subRef.current) {
                sub?.onChangeSubView(!view);
              }
              setView((prev) => !prev);
            }}
          />
        </CheckBoxCol>
      </Row>
      {isOpen &&
        children.map((detail, detailIndex) => (
          <RoleSubItem
            ref={(ref: IRoleSubItemRef) => (subRef.current[detailIndex] = ref)}
            key={detailIndex}
            index={detailIndex}
            lastIndex={children.length - 1}
            getSubRoleList={getSubRoleList}
            disabled={disabled}
            mainView={view || detail.isView === "Y"}
            mainCreate={create || detail.isCreate === "Y"}
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
      mainView,
      mainCreate,
      getSubRoleList,
    } = props;
    /** 조회/쓰기 */
    const [view, setView] = useState(mainView);
    const [create, setCreate] = useState(mainCreate);

    useImperativeHandle(
      ref,
      () => ({
        view,
        create,
        onChangeSubView: (bool: boolean) => setView(bool),
        onChangeSubCreate: (bool: boolean) => setCreate(bool),
      }),
      [view, create]
    );

    return (
      <RoleSubItemRow>
        <TextCol className={`${index === lastIndex ? borderCSS : ""}`} />
        <TextCol className={borderCSS}>{name}</TextCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`sub-create-${name}-${index}`}
            checked={create}
            disabled={disabled}
            /** @TODO 코드 정리 필요 */
            onChange={() => {
              const { list, setCreate: setMainCreate } = getSubRoleList();
              const listCount = lastIndex + 1;
              const checkCount =
                list.filter((item) => item.create).length + (!create ? 1 : -1);

              if (listCount === checkCount && !mainCreate) {
                setMainCreate(true);
              }
              if (listCount !== checkCount && mainCreate) {
                setMainCreate(false);
              }

              setCreate((prev) => !prev);
            }}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`sub-read-${name}-${index}`}
            checked={view}
            disabled={disabled}
            /** @TODO 코드 정리 필요 */
            onChange={() => {
              const { list, setView: setMainView } = getSubRoleList();
              const listCount = lastIndex + 1;
              const checkCount =
                list.filter((item) => item.view).length + (!view ? 1 : -1);

              if (listCount === checkCount && !mainView) {
                setMainView(true);
              }
              if (listCount !== checkCount && mainView) {
                setMainView(false);
              }

              setView((prev) => !prev);
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
