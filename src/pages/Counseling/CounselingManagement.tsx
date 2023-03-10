import React, { useMemo, useState } from "react";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import styled from "styled-components";
import { Col, Row } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { TableBase } from "src/components/Common/Table/TableBase";

const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const tableHeader = [
  { label: "checkbox" },
  { label: "번호", sort: () => {} },
  { label: "구분" },
  { label: "1차 유형" },
  { label: "2차 유형" },
  { label: "3차 유형" },
  { label: "등록일시" },
  { label: "등록자명" },
  { label: "수정일시" },
  { label: "수정자명" },
  { label: "유형 수정" },
];

type TabType = "ALL" | "COUNSELING" | "REWARD";

export const CounselingManagement = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("0");
  const [text, setText] = useState("");
  const [tab, setTab] = useState<TabType>("ALL");

  const tabButton: { label: string; type: TabType }[] = useMemo(
    () => [
      {
        label: "전체",
        type: "ALL",
      },
      {
        label: "상담유형",
        type: "COUNSELING",
      },
      {
        label: "보상유형",
        type: "REWARD",
      },
    ],
    []
  );

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "공지사항" }, { label: "상담/보상유형 관리" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "상담 관리", href: "/counseling/customer" },
            { label: "상담/보상유형 관리", href: "/counseling/management" },
          ]}
          title={"상담/보상유형 관리"}
        />

        <ListSection className={"py-4"}>
          <div className={"btn-group mb-4"}>
            {tabButton.map((item, index) => (
              <ButtonBase
                key={index}
                className={`w-xs ${tab === item.type ? "active" : ""}`}
                label={item.label}
                outline={true}
                color={"turu"}
                onClick={() => {
                  setTab(item.type);
                }}
              />
            ))}
          </div>
          <Row className={"mb-4"}>
            <Col>
              <AmountInfo className={"text-size-13 fw-bold"}>
                총 <AmountInfo className={"text-turu"}>0건</AmountInfo>의
                상담/보상유형 정보가 있습니다.
              </AmountInfo>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase label={"신규 등록"} color={"turu"} />
                <ButtonBase
                  label={"선택 삭제"}
                  outline={true}
                  color={"secondary"}
                  disabled={true}
                />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}></TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
    </ContainerBase>
  );
};

const ListSection = styled.section``;
const AmountInfo = styled.span``;
