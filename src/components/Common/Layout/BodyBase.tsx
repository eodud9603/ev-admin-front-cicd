import React from "react";

interface IBodyProps {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

const BodyBase = (props: IBodyProps) => {
  const {
    /* required */
    /* optional */
    children,
    className = "",
    /* rest */
    ...rest
  } = props;

  return (
    <section
      className={`d-flex-block flex-grow-1 p-0 m-0 bg-white ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
};

export default BodyBase;
