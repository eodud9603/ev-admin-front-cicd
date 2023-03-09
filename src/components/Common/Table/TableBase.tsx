import React, { ReactElement } from "react";
import { Table } from "reactstrap";
import styled from "styled-components";
import Arrow from "src/assets/icon/arrow-down-up.svg";

interface IEmptyTableBody {
  text: string;
}
interface ITableBase {
  label?: string;
  sideLabel?: string;
  tableHeader: Array<{ label: string | "checkbox"; sort?: () => void }>;
  children?: ReactElement;
  theadClassName?: string;
  tableClassName?: string;
  onClickAllCheck?: () => void;
  subtitle?: string;
}
export const EmptyTableBody = (props: IEmptyTableBody) => {
  const { text } = props;

  return (
    <tr>
      <td className={"text-center mb-10 mt-10"} colSpan={20}>
        <div className={"pb-10 pt-10"}>
          <br />
          <br />
          <br />
          {text}
          <br />
          <br />
          <br />
          <br />
        </div>
      </td>
    </tr>
  );
};

export const TableBase = (props: ITableBase) => {
  const { tableHeader, children, theadClassName, tableClassName } = props;

  return (
    <TableWrapper className={`table table-hover ${tableClassName ?? ""}`}>
      <thead className={theadClassName ?? "table-light"}>
        <tr>
          {tableHeader.map((headerOption, index) => (
            <TableHeader key={index}>
              {headerOption.label === "checkbox" ? (
                <input type={"checkbox"} />
              ) : (
                <div>
                  <div className={"d-flex"}>
                    <div
                      dangerouslySetInnerHTML={{ __html: headerOption.label }}
                    />
                    <div className={"flex-fill"} />
                    {headerOption?.sort && (
                      <img
                        alt={"sort"}
                        onClick={() =>
                          headerOption?.sort && headerOption.sort()
                        }
                        src={Arrow}
                      />
                    )}
                  </div>
                </div>
              )}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableWrapper>
  );
};

const TableWrapper = styled(Table)`
  vertical-align: middle;
`;
const TableHeader = styled.th`
  maxwidth: 130;
  display: table-cell;
  verticalalign: middle;
`;