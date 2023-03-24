import React, { Fragment, useState } from "react";
import ModalBase, {
  IModalBaseProps,
} from "src/components/Common/Modal/ModalBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import styled from "styled-components";
import { ModalContainer } from "src/pages/Member/components/MemberSearchModal";
import { TableBase } from "src/components/Common/Table/TableBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";

const tableHeader = [
  { label: "월/시간 구분" },
  { label: "1월" },
  { label: "2월" },
  { label: "3월" },
  { label: "4월" },
  { label: "5월" },
  { label: "6월" },
  { label: "7월" },
  { label: "8월" },
  { label: "9월" },
  { label: "10월" },
  { label: "11월" },
  { label: "12월" },
];
export const KepcoFeeTableModal = (props: IModalBaseProps) => {
  const { isOpen, onClose } = props;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(() => {
    const arr = [];
    for (let i = 1; i < 25; i++) {
      arr.push({ label: `${i}시`, values: [] });
    }
    return arr;
  });

  return (
    <ModalBase
      title={"회원 검색"}
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
          <div className={"d-flex"}>
            <RadioGroup
              require={true}
              title={"충전유형"}
              name={"status"}
              list={[
                { label: "전체", value: "1" },
                { label: "완속", value: "1" },
                { label: "급속", value: "1" },
              ]}
            />
            <div className={"mx-3"} />
            <RadioGroup
              require={true}
              title={"회원구분"}
              name={"affiliation"}
              list={[
                { label: "전체", value: "1" },
                { label: "회원", value: "1" },
                { label: "비회원", value: "1" },
              ]}
            />
          </div>
        </FilterSection>

        <ListSection className={"py-4"}>
          <div className={"d-flex justify-content-between mb-2"}>
            <span
              className={"fw-semibold font-size-14 d-flex align-items-center"}
            >
              월/시간별 전력량(kWh) 요금표 작성
              <span className={"mx-2 text-danger"}>*</span>
            </span>
            <ButtonBase label={"한전 전기요금표 보기"} color={"dark"} />
          </div>
          <div style={{ height: 400, overflow: "scroll" }}>
            <TableBase tableHeader={tableHeader}>
              <>
                {data.length > 0 &&
                  data.map((e, i) => (
                    <tr key={i}>
                      <td>{e.label}</td>
                      {tableHeader.map(
                        (el, idx) =>
                          idx !== 0 && (
                            <Fragment key={idx}>
                              <td>
                                <TextInputBase name={"text"} value={""} />
                              </td>
                            </Fragment>
                          )
                      )}
                    </tr>
                  ))}
              </>
            </TableBase>
          </div>
        </ListSection>
      </ModalContainer>
    </ModalBase>
  );
};

const FilterSection = styled.section``;
const ListSection = styled.section``;
