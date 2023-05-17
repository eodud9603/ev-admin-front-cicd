import React, { Dispatch, SetStateAction } from "react";
import { Row, Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface IPaginationBase {
  setPage: Dispatch<SetStateAction<number>>;
  data: {
    navigatePageNums?: Array<number>;
    pageNum?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    onChangePage?: (page: number) => void;
  };
}
const PaginationBase = (props: IPaginationBase) => {
  const {
    navigatePageNums = [1],
    pageNum = 1,
    hasPreviousPage,
    hasNextPage,
    onChangePage,
  } = props.data;

  const onChangeNumber = (pageNumber: number) => {
    props.setPage(pageNumber);
    !!onChangePage && void onChangePage(pageNumber);
  };

  const previousHandler = () => {
    onChangeNumber(pageNum - 1);
  };

  const pageHandler = (number: number) => () => {
    const isActive = pageNum === number;
    if (isActive) {
      return;
    }

    onChangeNumber(number);
  };

  const nextHandler = () => {
    onChangeNumber(pageNum + 1);
  };

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
          <PaginationLink onClick={previousHandler}>
            <i className="mdi mdi-chevron-left" />
          </PaginationLink>
        </PaginationItem>
        {navigatePageNums &&
          navigatePageNums?.map((value, idx) => (
            <PaginationItem
              key={idx}
              className={`${pageNum === value ? "active" : ""}`}
            >
              <PaginationLink onClick={pageHandler(value)}>
                {value}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem className={`${!hasNextPage ? "disabled" : ""}`}>
          <PaginationLink onClick={nextHandler}>
            <i className="mdi mdi-chevron-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Row>
  );
};

export default PaginationBase;
