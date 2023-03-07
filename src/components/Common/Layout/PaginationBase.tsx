import React, { Dispatch, SetStateAction } from "react";
import { Row, Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface IPaginationBase {
  setPage: Dispatch<SetStateAction<number>>;
  data: {
    navigatePageNums: Array<number>;
    pageNum: number;
    hasPreviousPage: number;
    hasNextPage: number;
    prePage: number;
    nextPage: number;
  };
}
const PaginationBase = (props: IPaginationBase) => {
  const {
    navigatePageNums,
    pageNum,
    hasPreviousPage,
    hasNextPage,
    prePage,
    nextPage,
  } = props.data;

  return (
    <Row
      className="justify-content-md-end justify-content-center
                align-items-center"
    >
      <Pagination
        aria-label="Page navigation"
        className="d-flex justify-content-center"
      >
        <PaginationItem className={`${!hasPreviousPage ? "disabled" : ""}`}>
          <PaginationLink onClick={() => props.setPage(prePage)}>
            <i className="mdi mdi-chevron-left" />
          </PaginationLink>
        </PaginationItem>
        {navigatePageNums &&
          navigatePageNums?.map((value, idx) => (
            <PaginationItem
              key={idx}
              className={`${pageNum === value ? "active" : ""}`}
            >
              <PaginationLink href="#" onClick={() => props.setPage(value)}>
                {value}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem className={`${!hasNextPage ? "disabled" : ""}`}>
          <PaginationLink href="#" onClick={() => props.setPage(nextPage)}>
            <i className="mdi mdi-chevron-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Row>
  );
};

export default PaginationBase;
