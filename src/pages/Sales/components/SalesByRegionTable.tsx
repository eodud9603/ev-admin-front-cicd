import React from "react";
import { Table } from "reactstrap";
import styled from "styled-components";

interface ISalesByRegionTable {
  data: Array<{ [key: string]: string | number | undefined | null }>;
}
export const SalesByRegionTable = ({ data }: ISalesByRegionTable) => {
  return (
    <Table className={"table"}>
      <thead>
        <tr className={"table-light"}>
          <AlignHeader rowSpan={2}>지역</AlignHeader>
          <AlignHeader rowSpan={2}>충전소</AlignHeader>
          <th colSpan={2}>충전기</th>
          <th colSpan={4}>2023</th>
        </tr>
        <tr className={"align-middle"}>
          <th>급속</th>
          <th>완속</th>
          <th>이용횟수</th>
          <th>이용시간</th>
          <th>이용량(kW)</th>
          <th className={"text-turu"}>총 매출(원)</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((e, i) => (
            <tr key={i}>
              <td>{e.region}</td>
              <td>{e.charger}</td>
              <td>{e.fast}</td>
              <td>{e.slow}</td>
              <td>{e.usageCount}</td>
              <td>{e.usageTime}</td>
              <td>{e.usageAmount}</td>
              <td className={"text-turu"}>{e.allSales}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const AlignHeader = styled.th`
  display: table-cell;
  vertical-align: top;
`;
