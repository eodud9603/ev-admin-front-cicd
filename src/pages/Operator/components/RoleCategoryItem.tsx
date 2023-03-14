import React, { useState } from "react";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import styled from "styled-components";

interface IRoleMainCategoryItemProps {
  initialOpen?: boolean;
  index: number;
  name: string;
  detailList: { name: string; read: boolean; write: boolean }[];
  write: boolean;
  read: boolean;
}

interface IRoleSubCategoryItemProps {
  index: number;
  name: string;
}

const RoleCategoryItem = (props: IRoleMainCategoryItemProps) => {
  const { initialOpen = false, index, name, detailList } = props;

  const [isOpen, setIsOpen] = useState(initialOpen);

  const onChangeOpenHandler = () => {
    if (detailList.length > 0) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <>
      <tr>
        <td
          className={"align-top"}
          rowSpan={isOpen ? detailList.length + 1 : 1}
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
                className={"mdi mdi-chevron-up font-size-20"}
              />
            )}
          </DropArea>
        </td>
        <td>{detailList.length > 0 && "전체"}</td>
        <td>
          <CheckBoxBase
            label={""}
            name={`write-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </td>
        <td>
          <CheckBoxBase
            label={""}
            name={`read-${name}-${index}`}
            checked={true}
            disabled={true}
          />
        </td>
      </tr>
      {isOpen &&
        (detailList ?? []).map((detail, detailIndex) => (
          <RoleSubCategoryItem
            key={detailIndex}
            index={detailIndex}
            {...detail}
          />
        ))}
    </>
  );
};

export default RoleCategoryItem;

const RoleSubCategoryItem = (props: IRoleSubCategoryItemProps) => {
  const { index, name } = props;

  return (
    <DetailTr>
      <td>{name}</td>
      <td>
        <CheckBoxBase
          label={""}
          name={`write-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </td>
      <td>
        <CheckBoxBase
          label={""}
          name={`read-${name}-${index}`}
          checked={true}
          disabled={true}
        />
      </td>
    </DetailTr>
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

const DetailTr = styled.tr`
  overflow: hidden;
  max-height: 0;
  transition: all 10s ease;
`;
