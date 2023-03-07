import React, { Dispatch, SetStateAction } from "react";
import { Label } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import Colors from "src/assets/colors";

interface IDateInputProps {
  label?: string;
  dateState?: { startDt: string; endDt: string };
  setData?: Dispatch<SetStateAction<{ [key: string]: string }>>;
  buttonState?: {
    label: string;
    onClick?: () => void;
    className?: string;
  }[];
}

export const DateGroup = (props: IDateInputProps) => {
  const { label, dateState, buttonState, setData, ...extraProps } = props;

  return (
    <div className={"mb-3 d-flex"} {...extraProps}>
      <div className={"input-group d-flex align-items-center"}>
        <Label className={"fw-bold m-0 w-xs"}>{label}</Label>
        <input type={"date"} className={"form-control w-xs"} />
        <div className={"px-2 text-center"}>~</div>
        <input type={"date"} className={"form-control w-xs"} />
      </div>
      {buttonState && buttonState.length > 0 && (
        <div className={"btn-group"}>
          {buttonState.map((e, i) => (
            <ButtonBase key={i} label={e.label} />
          ))}
        </div>
      )}
    </div>
  );
};
