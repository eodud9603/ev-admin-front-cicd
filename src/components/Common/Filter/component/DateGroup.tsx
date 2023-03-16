import React, { Dispatch, SetStateAction } from "react";
import { Label } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

interface IDateInputProps {
  label?: string;
  dateState?: { startDt: string; endDt: string };
  setData?: Dispatch<SetStateAction<{ [key: string]: string }>>;
  buttonState?: {
    label: string;
    onClick?: () => void;
    className?: string;
  }[];
  className?: string;
}

export const DateGroup = (props: IDateInputProps) => {
  const { label, dateState, buttonState, setData, ...extraProps } = props;

  return (
    <div className={"d-flex"} {...extraProps}>
      <div className={"d-flex align-items-center"}>
        {Boolean(label) && (
          <Label className={"fw-bold m-0 w-xs"}>{label}</Label>
        )}
        <input type={"date"} className={"form-control w-xs bg-white"} />
        <div className={"px-2 text-center"}>~</div>
        <input type={"date"} className={"form-control w-xs bg-white"} />
        {buttonState && buttonState.length > 0 && (
          <div className={"ms-2 d-flex"}>
            {buttonState.map((e, i) => (
              <ButtonBase
                key={i}
                label={e.label}
                className={`w-xs me-2 ${e.className ?? ""}`}
                color={"turu"}
                outline={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
