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

  const scrollTop = () => {
    window?.scrollTo(0, 0);
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
          <PaginationLink
            onClick={() => {
              props.setPage(pageNum - 1);
              scrollTop();
              !!onChangePage && void onChangePage(pageNum - 1);
            }}
          >
            <i className="mdi mdi-chevron-left" />
          </PaginationLink>
        </PaginationItem>
        {navigatePageNums &&
          navigatePageNums?.map((value, idx) => (
            <PaginationItem
              key={idx}
              className={`${pageNum === value ? "active" : ""}`}
            >
              <PaginationLink
                onClick={() => {
                  props.setPage(value);
                  scrollTop();
                  !!onChangePage && void onChangePage(value);
                }}
              >
                {value}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem className={`${!hasNextPage ? "disabled" : ""}`}>
          <PaginationLink
            onClick={() => {
              props.setPage(pageNum + 1);
              scrollTop();
              !!onChangePage && void onChangePage(pageNum + 1);
            }}
          >
            <i className="mdi mdi-chevron-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Row>
  );
};

export default PaginationBase;
