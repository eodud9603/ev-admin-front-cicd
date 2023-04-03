import React from "react";
import { Label } from "reactstrap";

interface IMonthGroupProps {
  label?: string;
  inputProps?: {
    startName: string;
    startValue: string;
    endName: string;
    endValue: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

/** input type: month (year/month) */
const MonthGroup = (props: IMonthGroupProps) => {
  const { label, inputProps } = props;

  return (
    <div className={"d-flex align-items-center"}>
      {Boolean(label) && <Label className={"fw-bold m-0 w-xs"}>{label}</Label>}
      <input
        type={"month"}
        className={"form-control w-xs bg-white"}
        name={inputProps?.startName}
        value={inputProps?.startValue}
        onChange={inputProps?.onChange}
      />
      <div className={"px-2 text-center"}>~</div>
      <input
        type={"month"}
        className={"form-control w-xs bg-white"}
        name={inputProps?.endName}
        value={inputProps?.endValue}
        onChange={inputProps?.onChange}
      />
    </div>
  );
};

export default MonthGroup;
