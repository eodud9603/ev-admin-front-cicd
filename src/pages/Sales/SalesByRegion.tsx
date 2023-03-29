import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Input, Row } from "reactstrap";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import {
  AreaCheckbox,
  AreaCheckType,
} from "src/components/Common/Filter/component/AreaCheckbox";
import { SalesByRegionTable } from "src/pages/Sales/components/SalesByRegionTable";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";

const data = [
  {
    listSeq: 1,
    region: "경기",
    charger: "N",
    fast: "N",
    slow: "N",
    usageCount: 31,
    usageTime: "21.03",
    usageAmount: 77.93,
    allSales: 20214000,
  },
  {
    listSeq: 1,
    region: "제주",
    charger: "N",
    fast: "N",
    slow: "N",
    usageCount: 31,
    usageTime: "21.03",
    usageAmount: 77.93,
    allSales: 20214000,
  },
];
export const SalesByRegion = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "총 매출" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [check, setCheck] = useState<AreaCheckType>(undefined);
  const tabClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedIndex(e.currentTarget.value);
  };

  const tabDeleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tabList.length === 1) {
      return;
    }

    const tempList = [...tabList];
    const deleteIndex = Number(e.currentTarget.value);
    tempList.splice(deleteIndex, 1);

    const isExistTab = tempList[Number(selectedIndex)];
    if (!isExistTab) {
      setSelectedIndex(`${tempList.length - 1}`);
    }

    setTabList(tempList);
  };

  return (
    <ContainerBase>
      <HeaderBase />
      <TabGroup
        list={tabList}
        selectedIndex={selectedIndex}
        onClick={tabClickHandler}
        onClose={tabDeleteHandler}
      />
      <BodyBase className={"pb-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "매출 모니터링", href: "" },
            { label: "지역 매출", href: "" },
          ]}
          title={"지역 매출"}
        />
        <FilterSection className={"border-top border-bottom py-4"}>
          <Row className={"align-items-center justify-content-center mb-3"}>
            <Col>
              <Row className={"align-items-center justify-content-center"}>
                <Col sm={2} className={"fw-semibold"}>
                  대상(연)
                </Col>
                <Col>
                  <Input type={"date"} />
                </Col>
                <Col sm={2} className={"fw-semibold"}>
                  대상(월)
                </Col>
                <Col>
                  <DropdownBase menuItems={[{ label: "01", value: "01" }]} />
                </Col>
              </Row>
            </Col>
            <Col>
              <RadioGroup
                title={"운영사"}
                name={"operator"}
                list={[
                  { label: "전체", value: "" },
                  { label: "HEV", value: "" },
                  { label: "JEV", value: "" },
                ]}
              />
            </Col>
          </Row>
          <AreaCheckbox setCheckboxData={setCheck} />
        </FilterSection>
        <ListSection>
          <div className={"d-flex justify-content-end my-4"}>
            <ButtonBase label={"엑셀 저장"} color={"turu"} outline={true} />
          </div>
          <SalesByRegionTable data={data} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

const FilterSection = styled.section``;
const ListSection = styled.section``;
