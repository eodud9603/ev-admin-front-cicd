import React, { useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { Label } from "reactstrap";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";

const dropdownGroupSearch = [{ label: "충전소명", value: "1" }];

const tableHeader = [
  { label: "번호" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "충전기ID" },
  { label: "급속/완속" },
  { label: "커넥터 종류" },
  { label: "주소" },
];

const data = [
  {
    stationName: "휴맥스 카플랫 전용 A",
    stationId: "KEP0000020",
    chargerId: "충전기 ID",
    fast: "급속",
    slow: "",
    connectorType: "DC콤보",
    address: "경기도 성남시 분당구 황새울로 216, 902호 (수내동, 휴맥스빌리지)",
  },
];
export const StationSearchModal = (props: IModalBaseProps) => {
  const { isOpen, onClose, title, size } = props;
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  return (
    <ModalBase
      title={title ?? "충전소 검색"}
      size={size ?? "xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <FilterSection
          className={
            "flex-column justify-content-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3 py-4"
          }
        >
          <DropboxGroup
            className={"me-2 bg-white"}
            label={"지역"}
            dropdownItems={[
              { menuItems: [{ label: "시, 도", value: "1" }] },
              { menuItems: [{ label: "구, 군", value: "1" }] },
              { menuItems: [{ label: "동, 읍", value: "1" }] },
            ]}
          />
          <div className={"my-3"} />
          <SearchTextInput
            title={"검색어"}
            menuItems={dropdownGroupSearch}
            placeholder={"입력해주세요"}
            name={"searchText"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FilterSection>

        <ListSection>
          <Label className={"fw-bold font-size-16 my-4 m-0"}>운영자 선택</Label>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td>{}</td>
                    <td>
                      <HoverSpan className={"text-turu"}>
                        <u>{e.stationName}</u>
                      </HoverSpan>
                    </td>
                    <td>{e.stationId}</td>
                    <td>{e.chargerId}</td>
                    <td>{e.fast}</td>
                    <td>{e.connectorType}</td>
                    <td>{e.address}</td>
                  </tr>
                ))}
            </>
          </TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
        <div className={"d-flex justify-content-center"}>
          <ButtonBase
            label={"닫기"}
            outline={true}
            className={"w-xs my-4"}
            onClick={onClose}
          />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};
const ModalContainer = styled.section`
  padding: 15px;
`;
const FilterSection = styled.section``;
const ListSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
