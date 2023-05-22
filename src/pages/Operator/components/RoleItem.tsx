import React, { memo, useCallback, useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "reactstrap";
import {
  IAdminMainRoleItem,
  IAdminSubRoleItem,
} from "src/api/admin/adminApi.interface";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import styled, { keyframes } from "styled-components";

type PermissionType =
  | "isView"
  | "isCreate"
  | "isModify"
  | "isDelete"
  | "isExcel"
  | "isExecute";

interface IColProps {
  ratio: number;
  className?: string;
  children?: string | React.ReactElement | React.ReactElement[];
  isBorder?: boolean;
}

interface IRoleMainItemProps extends IAdminMainRoleItem {
  disabled?: boolean;
  initialOpen?: boolean;
  children: IAdminSubRoleItem[];
  setList: React.Dispatch<React.SetStateAction<IAdminMainRoleItem[]>>;
}

interface IRoleSubItemProps extends IAdminSubRoleItem {
  disabled: boolean;
  isLast: boolean;
  onChangePermission: (
    id: number,
    name: PermissionType,
    isActive: boolean
  ) => () => void;
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
  return <RoleCol ratio={3} {...props} />;
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
      <CheckBoxCol isBorder={false}>조회</CheckBoxCol>
      <CheckBoxCol isBorder={false}>등록</CheckBoxCol>
      <CheckBoxCol isBorder={false}>수정</CheckBoxCol>
      <CheckBoxCol isBorder={false}>삭제</CheckBoxCol>
      <CheckBoxCol isBorder={false}>엑셀</CheckBoxCol>
      <CheckBoxCol isBorder={false}>실행</CheckBoxCol>
    </Row>
  );
};

/** 1차 권한 목록뷰 */
export const RoleMainItem = (props: IRoleMainItemProps) => {
  const {
    initialOpen = false,
    disabled = false,
    id,
    name,
    children,
    setList,
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
        if (cur.isExcel === "Y") {
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
      isExcel: subsCount === exelCount,
      isExecute: subsCount === executeCount,
    };
  };
  const { isView, isCreate, isModify, isDelete, isExcel, isExecute } =
    initCheck();

  const [isOpen, setIsOpen] = useState(initialOpen);
  const isSubListOpened = isOpen && children.length > 0;

  const onChangeOpenHandler = () => {
    if (children.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  /** 소분류 권한 전체 일괄 변경 */
  const onChangePermission =
    (name: PermissionType, isActive: boolean) => () => {
      setList((prevList) => {
        const updateList = [...prevList];

        const roleIndex = updateList.findIndex((item) => item.id === id);
        if (roleIndex > -1) {
          updateList[roleIndex] = {
            ...updateList[roleIndex],
            children: updateList[roleIndex].children.map((subItem) => ({
              ...subItem,
              [name]: isActive ? "N" : "Y",
            })),
          };
        }

        return updateList;
      });
    };

  /** 소분류 권한 변경 */
  const onChangeSinglePermission = useCallback(
    (subItemId: number, name: PermissionType, isActive: boolean) => () => {
      setList((prevList) => {
        const updateList = [...prevList];

        const roleIndex = updateList.findIndex((item) => item.id === id);
        if (roleIndex > -1) {
          updateList[roleIndex] = {
            ...updateList[roleIndex],
            children: updateList[roleIndex].children.map((subItem) => {
              if (subItem.id === subItemId) {
                return { ...subItem, [name]: isActive ? "N" : "Y" };
              }

              return subItem;
            }),
          };
        }

        return updateList;
      });
    },
    [id, setList]
  );

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

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
            name={`main-view-${name}-${id}`}
            checked={isView}
            disabled={disabled}
            onChange={onChangePermission("isView", isView)}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-create-${name}-${id}`}
            checked={isCreate}
            disabled={disabled}
            onChange={onChangePermission("isCreate", isCreate)}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-modify-${name}-${id}`}
            checked={isModify}
            disabled={disabled}
            onChange={onChangePermission("isModify", isModify)}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-delete-${name}-${id}`}
            checked={isDelete}
            disabled={disabled}
            onChange={onChangePermission("isDelete", isDelete)}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-exel-${name}-${id}`}
            checked={isExcel}
            disabled={disabled}
            onChange={onChangePermission("isExcel", isExcel)}
          />
        </CheckBoxCol>
        <CheckBoxCol>
          <CheckBoxBase
            label={""}
            name={`main-execute-${name}-${id}`}
            checked={isExecute}
            disabled={disabled}
            onChange={onChangePermission("isExecute", isExecute)}
          />
        </CheckBoxCol>
      </Row>
      {isOpen &&
        children.map((detail, index) => (
          <RoleSubItem
            key={detail.id}
            isLast={children.length - 1 === index}
            disabled={disabled}
            onChangePermission={onChangeSinglePermission}
            {...detail}
          />
        ))}
    </div>
  );
};

/** 2차 권한 목록뷰 */
const RoleSubItem = memo((props: IRoleSubItemProps) => {
  const {
    isLast,
    id,
    name,
    disabled,
    isView,
    isCreate,
    isModify,
    isDelete,
    isExcel,
    isExecute,
    onChangePermission,
  } = props;

  return (
    <RoleSubItemRow>
      <TextCol className={`${isLast ? borderCSS : ""}`} />
      <TextCol className={borderCSS}>{name}</TextCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-view-${name}-${id}`}
          checked={isView === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isView", isView === "Y")}
        />
      </CheckBoxCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-create-${name}-${id}`}
          checked={isCreate === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isCreate", isCreate === "Y")}
        />
      </CheckBoxCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-modify-${name}-${id}`}
          checked={isModify === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isModify", isModify === "Y")}
        />
      </CheckBoxCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-delete-${name}-${id}`}
          checked={isDelete === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isDelete", isDelete === "Y")}
        />
      </CheckBoxCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-exel-${name}-${id}`}
          checked={isExcel === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isExcel", isExcel === "Y")}
        />
      </CheckBoxCol>
      <CheckBoxCol>
        <CheckBoxBase
          label={""}
          name={`sub-execute-${name}-${id}`}
          checked={isExecute === "Y"}
          disabled={disabled}
          onChange={onChangePermission(id, "isExecute", isExecute === "Y")}
        />
      </CheckBoxCol>
    </RoleSubItemRow>
  );
});

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
