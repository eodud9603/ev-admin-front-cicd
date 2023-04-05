import React from "react";
import { Label } from "reactstrap";
import TextInputBase, {
  ITextInputBaseProps,
} from "src/components/Common/Input/TextInputBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";

interface ITextInputFilterProps extends ITextInputBaseProps {
  title: string;
  menuItems?: Array<{ label: string; value: string }>;

  disabled?: boolean;
  onClickDropdownItem?: (label: string, value: string) => void;

  onClick?: () => void | Promise<void>;
}

const SearchTextInput = (props: ITextInputFilterProps) => {
  const {
    /* required */
    title = "검색어",
    menuItems = [],
    /* optional */
    /* dropdown */
    disabled,
    onClickDropdownItem,
    /* button */
    onClick,
    /* rest > textinput props */
    className = "",
    ...rest
  } = props;

  return (
    <div className={"input-group d-flex align-items-center"}>
      <Label htmlFor={rest.name} className={"fw-bold m-0 w-xs"}>
        {title}
      </Label>
      {menuItems.length > 0 && (
        <DropdownBase
          className={"me-3"}
          disabled={disabled}
          menuItems={menuItems}
          onClickDropdownItem={onClickDropdownItem}
        />
      )}

      <div className={"d-flex flex-grow-1"}>
        <TextInputBase bsSize={"lg"} className={`${className}`} {...rest} />
      </div>
      <div>
        <ButtonBase
          className={"width-60"}
          label={"검색"}
          color={"dark"}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default SearchTextInput;
