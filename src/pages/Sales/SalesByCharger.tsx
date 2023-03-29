import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import { Col, Input, Row } from "reactstrap";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import {
  AreaCheckbox,
  AreaCheckType,
} from "src/components/Common/Filter/component/AreaCheckbox";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import styled from "styled-components";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { SalesByChargerTable } from "src/pages/Sales/components/SalesByChargerTable";

const data = [
  {
    listSeq: 1,
    region: "제주",
    operator: "HEV",
    stationName: "바우네 나주곰탕 애월점",
    stationId: "KEP0000020",
    chargerId: "KEP0000020-01",
    address: "제주특별자치도",
    division: "급속",
    usageCount: 31,
    usageTime: "21.03",
    usageAmount: 77.93,
    allSales: 20214000,
  },
  {
    listSeq: 2,
    region: "제주",
    operator: "HEV",
    stationName: "소노벨제주",
    stationId: "KEP0000020",
    chargerId: "KEP0000020-02",
    address: "제주특별자치도",
    division: "완속",
    usageCount: 31,
    usageTime: "21.03",
    usageAmount: 77.93,
    allSales: 20214000,
  },
];
export const SalesByCharger = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "총 매출" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [check, setCheck] = useState<AreaCheckType>(undefined);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
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
            { label: "충전기 매출", href: "" },
          ]}
          title={"충전기 매출"}
        />
        <FilterSection className={"border-top border-bottom py-4"}>
          <Row className={"align-items-center justify-content-center"}>
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
            <Col>
              <RadioGroup
                title={"충전기 구분"}
                name={"division"}
                list={[
                  { label: "전체", value: "" },
                  { label: "완속", value: "" },
                  { label: "급속", value: "" },
                  { label: "알수없음", value: "" },
                ]}
              />
            </Col>
          </Row>
          <div className={"my-3"}>
            <AreaCheckbox setCheckboxData={setCheck} />
          </div>
          <Col md={6}>
            <SearchTextInput
              title={"검색어"}
              name={"search"}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              menuItems={[
                { label: "전체", value: "" },
                { label: "충전소명", value: "" },
                { label: "충전소ID", value: "" },
                { label: "주소", value: "" },
              ]}
            />
          </Col>
        </FilterSection>
        <ListSection>
          <Row className={"my-4 align-items-center"}>
            <Col>
              <span className={"text-size-13 fw-bold"}>
                총 <span className={"text-turu"}>0건</span>의 충전기 매출 정보가
                있습니다.
              </span>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={[{ label: "10개", value: "10" }]} />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <DashBoardSection
            className={
              "border border-turu border-opacity-50 " +
              "bg-turu bg-opacity-10 rounded-2 mb-4"
            }
          >
            <DetailRow className={"border border-turu border-opacity-50"}>
              <DetailLabelCol className={"bg-turu bg-opacity-10"}>
                총 이용횟수
              </DetailLabelCol>
              <DetailContentCol>NN</DetailContentCol>
              <DetailLabelCol className={"bg-turu bg-opacity-10"}>
                총 이용시간
              </DetailLabelCol>
              <DetailContentCol>NN</DetailContentCol>
              <DetailLabelCol className={"bg-turu bg-opacity-10"}>
                총 이용량(kW)
              </DetailLabelCol>
              <DetailContentCol>NN</DetailContentCol>
              <DetailLabelCol className={"bg-turu bg-opacity-10"}>
                총 매출(원)
              </DetailLabelCol>
              <DetailContentCol>
                <span className={"text-turu"}>0000</span>
              </DetailContentCol>
            </DetailRow>
          </DashBoardSection>
          <SalesByChargerTable data={data} />
          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

const FilterSection = styled.section``;
const ListSection = styled.section``;
const DashBoardSection = styled.section`
  padding: 15px;
`;
