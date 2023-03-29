import React from "react";
import { Table } from "reactstrap";
import styled from "styled-components";

interface ISalesByChargerTable {
  data: Array<{ [key: string]: string | number | undefined | null }>;
}
export const SalesByChargerTable = ({ data }: ISalesByChargerTable) => {
  return (
    <Table className={"table"}>
      <thead>
        <tr className={"table-light"}>
          <AlignHeader rowSpan={2}>지역</AlignHeader>
          <AlignHeader rowSpan={2}>운영사</AlignHeader>
          <AlignHeader rowSpan={2}>충전소명</AlignHeader>
          <AlignHeader rowSpan={2}>충전소ID</AlignHeader>
          <AlignHeader rowSpan={2}>충전기ID</AlignHeader>
          <AlignHeader rowSpan={2}>주소</AlignHeader>
          <AlignHeader rowSpan={2}>구분</AlignHeader>
          <AlignHeader colSpan={4} className={"text-center"}>
            2023-01
          </AlignHeader>
        </tr>
        <tr className={"align-middle"}>
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
              <td>{e.operator}</td>
              <td>{e.stationName}</td>
              <td>{e.stationId}</td>
              <td>{e.chargerId}</td>
              <td>{e.address}</td>
              <td>{e.division}</td>
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
