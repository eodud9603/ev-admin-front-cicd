import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import styled from "styled-components";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { Col, Label, Row } from "reactstrap";
import { TableBase } from "src/components/Common/Table/TableBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import Arrow from "src/assets/icon/arrow-right-left.svg";

const dropdownGroupSearch = [
  { label: "충전소명", value: "1" },
  { label: "충전소ID", value: "1" },
];

export const AddStationModal = (props: IModalBaseProps) => {
  const { isOpen, onClose } = props;

  const [data, setData] = useState([
    { stationSeq: 1, stationName: "충전소1", stationId: "id1" },
    { stationSeq: 2, stationName: "충전소2", stationId: "id2" },
    { stationSeq: 3, stationName: "충전소3", stationId: "id3" },
    { stationSeq: 4, stationName: "충전소4", stationId: "id4" },
    { stationSeq: 5, stationName: "충전소5", stationId: "id5" },
  ]);
  const [selectedData, setSelectedData] = useState<
    Array<{ stationSeq: number; stationName: string; stationId: string }>
  >([]);
  const checkboxRef = useRef<{ add: Array<any>; delete: Array<any> }>({
    add: [],
    delete: [],
  });
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const handleRegistryStation = () => {
    setSelectedData((prev) => [...prev, ...checkboxRef.current.add]);
    const arr: Array<{
      stationSeq: number;
      stationName: string;
      stationId: string;
    }> = JSON.parse(JSON.stringify(data));
    setData(
      arr.filter(
        (e) =>
          !checkboxRef.current.add.some((el) => e.stationSeq === el.stationSeq)
      )
    );
    checkboxRef.current.add = [];
  };

  useEffect(() => {
    console.log("check ::", checkboxRef.current);
  }, [data]);

  const handleDeletedStation = () => {
    setData((prev) => [...prev, ...checkboxRef.current.delete]);
    const arr: Array<{
      stationSeq: number;
      stationName: string;
      stationId: string;
    }> = JSON.parse(JSON.stringify(selectedData));
    setSelectedData(
      arr.filter(
        (e) =>
          !checkboxRef.current.delete.some(
            (el) => e.stationSeq === el.stationSeq
          )
      )
    );
    checkboxRef.current.delete = [];
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = Number(event.target.value);
    const type = event.target.name;
    if (type === "add" || type === "delete") {
      if (isChecked) {
        const arr = type === "add" ? data : selectedData;
        checkboxRef.current[type].push(arr.find((e) => e.stationSeq === value));
        console.log(checkboxRef.current);
      } else {
        checkboxRef.current[type] = checkboxRef.current[type].filter(
          (item) => item.stationSeq !== value
        );
      }
    }
  };

  return (
    <ModalBase
      title={"충전소 등록"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContainer>
        <FilterSection
          className={
            "flex-column justify-content-center bg-light " +
            "bg-opacity-10 p-3 rounded-3 mb-3"
          }
        >
          <div className={"mb-4"}>
            <DropboxGroup
              className={"me-2 bg-white"}
              dropdownItems={[
                { menuItems: [{ label: "시, 도", value: "1" }] },
                { menuItems: [{ label: "구, 군", value: "1" }] },
                { menuItems: [{ label: "동, 읍", value: "1" }] },
              ]}
              label={"지역"}
            />
            <div className={"my-3"} />
            <SearchTextInput
              title={"검색어"}
              menuItems={dropdownGroupSearch}
              placeholder={"충전소를 입력해주세요"}
              name={"searchText"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </FilterSection>
        <StationSection className={"mt-3"}>
          <SelectStation className={"border-bottom border-light"}>
            <Label className={"fw-semibold font-size-14 m-0 my-2"}>
              충전소 선택
            </Label>
            <TableBase
              tableHeader={[
                { label: "선택" },
                { label: "충전소명" },
                { label: "충전소ID" },
              ]}
            >
              <>
                {data.length > 0 &&
                  data.map((e) => (
                    <tr key={`${e.stationId}${e.stationSeq}`}>
                      <td>
                        <CheckBoxBase
                          name={"add"}
                          label={""}
                          onChange={handleCheckboxChange}
                          value={e.stationSeq.toString()}
                        />
                      </td>
                      <td>{e.stationName}</td>
                      <td>{e.stationId}</td>
                    </tr>
                  ))}
              </>
            </TableBase>
          </SelectStation>
          <Col
            md={2}
            className={
              "d-flex flex-column justify-content-md-center align-items-center"
            }
          >
            <ButtonBase
              label={"등록"}
              className={"w-xs"}
              onClick={handleRegistryStation}
            />
            <img src={Arrow} alt={"arrow"} />
            <ButtonBase
              label={"삭제"}
              className={"w-xs"}
              outline={true}
              onClick={handleDeletedStation}
            />
          </Col>
          <RegisteredStation className={"border-bottom border-light"}>
            <Label className={"fw-semibold font-size-14 m-0 my-2"}>
              등록된 충전소
            </Label>
            <TableBase
              tableHeader={[
                { label: "선택" },
                { label: "충전소명" },
                { label: "충전소ID" },
              ]}
            >
              <>
                {selectedData.length > 0 &&
                  selectedData.map((e, i) => (
                    <tr key={i}>
                      <td>
                        <CheckBoxBase
                          name={"delete"}
                          label={""}
                          onChange={handleCheckboxChange}
                          value={e.stationSeq.toString()}
                        />
                      </td>
                      <td>{e.stationName}</td>
                      <td>{e.stationId}</td>
                    </tr>
                  ))}
              </>
            </TableBase>
          </RegisteredStation>
        </StationSection>
        <div className={"d-flex justify-content-center my-4"}>
          <ButtonBase label={"닫기"} className={"w-xs"} outline={true} />
          <ButtonBase label={"적용"} className={"w-xs mx-2"} />
        </div>
      </ModalContainer>
    </ModalBase>
  );
};

const FilterSection = styled.section``;
const StationSection = styled(Row)``;
const SelectStation = styled(Col)`
  height: 400px;
`;
const RegisteredStation = styled(Col)`
  height: 400px;
`;
