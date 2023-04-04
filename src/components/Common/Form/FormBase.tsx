import React from "react";
import { Form, FormProps } from "reactstrap";

interface IFormBaseProps extends Omit<FormProps, "onSubmit"> {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const FormBase = (props: IFormBaseProps) => {
  const { children, onSubmit, ...rest } = props;

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    !!onSubmit && void onSubmit(e);
  };

  return (
    <Form onSubmit={submitHandler} {...rest}>
      {children}
    </Form>
  );
};
export default FormBase;
