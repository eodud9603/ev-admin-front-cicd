import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import FormBase from "src/components/Common/Form/FormBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

interface ISearchDropdownProps<T> {
  list: (T & { label: string; value: string })[];

  disabled?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  label?: string;
  selectedLabel?: string;
  onClickItem?: (data: T) => void;
  searchHandler?: (text: string) => void | Promise<void>;
}

export const SearchDropdownBase = <T,>(props: ISearchDropdownProps<T>) => {
  const {
    list = [],
    disabled = false,
    placeholder,
    emptyMessage,
    label,
    selectedLabel,
    onClickItem,
    searchHandler,
  } = props;

  return (
    <div className="btn-group d-flex align-items-center">
      {Boolean(label) && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
      <DropdownBase
        className={"me-2 w-xs"}
        list={list}
        disabled={disabled}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        selectedLabel={selectedLabel}
        onClickItem={onClickItem}
        searchHandler={searchHandler}
      />
    </div>
  );
};

interface IDropdownBaseProps<T> {
  list: (T & { label: string; value: string })[];

  disabled?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  label?: string;
  selectedLabel?: string;
  onClickItem?: (data: T) => void;
  searchHandler?: (text: string) => void | Promise<void>;
  className?: string;
}
export const DropdownBase = <T,>(props: IDropdownBaseProps<T>) => {
  const {
    list,

    disabled,
    placeholder,
    emptyMessage = "검색결과가 없습니다.",
    selectedLabel,
    onClickItem,
    searchHandler,
    className,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { text, onChange } = useInputs({
    text: "",
  });

  const onToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickItemHandler = (index: number) => () => {
    !!onClickItem && onClickItem(list[index]);
  };

  const search = () => {
    !!searchHandler && void searchHandler(text);
  };

  return (
    <div className="btn-group d-flex align-items-center">
      <Dropdown
        isOpen={isOpen}
        toggle={onToggleDropdown}
        disabled={disabled}
        className={`text-nowrap ${className ?? ""}`}
      >
        {/* 선택한 값 */}
        <DropdownToggle tag="button" className="btn btn-outline-light w-xs">
          {selectedLabel} <i className="mdi mdi-chevron-down ms-5" />
        </DropdownToggle>
        <Menu>
          {/* 검색 인풋 */}
          <DropdownItem toggle={false}>
            <FormBase onSubmit={search}>
              <InputGroup>
                <TextInputBase
                  name={"text"}
                  placeholder={placeholder}
                  value={text}
                  onChange={onChange}
                />
                <InputGroupText onClick={search}>
                  <i className={"font-size-17 bx bx-search-alt-2 color-dark"} />
                </InputGroupText>
              </InputGroup>
            </FormBase>
            {/*  */}
            {list.length === 0 && (
              <div className={"d-flex justify-content-center text-wrap"}>
                <PWrapper
                  className={"my-4 text-center text-secondary text-opacity-70"}
                >
                  {emptyMessage}
                </PWrapper>
              </div>
            )}
          </DropdownItem>
          {/* 검색 결과 목록 */}
          {list.map(({ label, value }, index) => (
            <DropdownItem
              key={`${value}${index}`}
              onClick={onClickItemHandler(index)}
              value={value}
              aria-label={label}
            >
              {label}
            </DropdownItem>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
};

const Menu = styled(DropdownMenu)`
  width: 347px;
  max-height: 322px;
  overflow: hidden;
  overflow-y: scroll;
`;

const PWrapper = styled.p`
  white-space: pre-wrap;
`;
