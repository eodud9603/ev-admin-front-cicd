import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";

interface Props {
  type?: "checkbox" | "radio";
  id: string;
  name: string;
  label: string;
  className?: string;
  setData?: Dispatch<SetStateAction<any>>;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}
export const Checkbox = (props: Props) => {
  const {
    id,
    name,
    type,
    label,
    className,
    onChange,
    setData,
    value,
    checked,
    ...extraProps
  } = props;
  return (
    <div className={`form-check ${type === "radio" && "me-3"}`}>
      <input
        className="form-check-input"
        type={type ?? "checkbox"}
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
        value={value}
        {...extraProps}
      />
      <label className="form-check-label text-nowrap" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
