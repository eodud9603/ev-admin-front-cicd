import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  Row,
} from "reactstrap";
import SalesByPeriodChart from "src/pages/Sales/components/SalesByPeriodChart";
import SalesByYearChart from "src/pages/Sales/components/SalesByYearChart";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";

export const SalesTotal = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "총 매출" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState("0");
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
            { label: "총 매출", href: "" },
          ]}
          title={"총 매출"}
        />

        <SearchSection>
          <div
            className={"d-flex align-items-center p-4 border-bottom border-top"}
          >
            <DateGroup
              label={"조회기간"}
              buttonState={[
                { label: "이번달", className: "me-2" },
                { label: "1년", className: "me-2" },
                { label: "3년", className: "me-2" },
                { label: "전체", className: "me-2" },
              ]}
            />
            <ButtonBase label={"검색"} color={"dark"} className={"w-xs"} />
            <Col md={1} />
            <RadioGroup
              name={"operator"}
              title={"운영사"}
              list={[
                { label: "전체", value: "" },
                { label: "HEV", value: "" },
                { label: "JEV", value: "" },
              ]}
            />
          </div>
        </SearchSection>
        <div className={"py-3"} />
        <TotalSection>
          <div
            className={"d-flex justify-content-between align-items-center mb-3"}
          >
            <Label className={"m-0 fw-semibold font-size-16"}>총 매출</Label>
            <ButtonGroup>
              <ButtonBase label={"전체"} color={"turu"} outline={false} />
              <ButtonBase label={"년도별"} color={"turu"} outline={true} />
            </ButtonGroup>
          </div>
          <Card>
            <CardHeader>
              <span>
                <span className={"fw-semibold"}>YYYY.MM.DD ~ YYYY.MM.DD </span>{" "}
                (조회기간 검색 값 기준 노출)
              </span>
            </CardHeader>
            <CardBody>
              <Row className={"py-3"}>
                <Col className={"text-center"}>
                  <div className={"font-size-12"}>총 매출(원)</div>
                  <div className={"fw-semibold text-turu font-size-24"}>
                    000,000,000
                  </div>
                </Col>
                <Col className={"text-center"}>
                  <div className={"font-size-12"}>회원 매출(원)</div>
                  <div className={"fw-semibold  font-size-24"}>000,000,000</div>
                </Col>
                <Col className={"text-center"}>
                  <div className={"font-size-12"}>로밍회원 매출(원)</div>
                  <div className={"fw-semibold  font-size-24"}>000,000,000</div>
                </Col>
                <Col className={"text-center"}>
                  <div className={"font-size-12"}>현장결제 매출(원)</div>
                  <div className={"fw-semibold  font-size-24"}>000,000,000</div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </TotalSection>
        <PeriodSection>
          <div
            className={"d-flex justify-content-between align-items-center mb-3"}
          >
            <Label className={"m-0 fw-semibold font-size-16"}>
              기간별 매출
            </Label>
            <ButtonGroup>
              <ButtonBase label={"기간별"} color={"turu"} outline={false} />
              <ButtonBase label={"월별"} color={"turu"} outline={true} />
            </ButtonGroup>
          </div>
          <Card>
            <CardHeader>
              <div className={"d-flex justify-content-between"}>
                <span>
                  <span className={"fw-semibold"}>
                    YYYY.MM.DD ~ YYYY.MM.DD{" "}
                  </span>{" "}
                  (일자 검색 값 기준 노출)
                </span>
                <DropdownBase
                  menuItems={[
                    { label: "전체", value: "" },
                    { label: "회원", value: "" },
                    { label: "로밍회원", value: "" },
                    { label: "현장결제", value: "" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody>
              <SalesByPeriodChart />
            </CardBody>
          </Card>
        </PeriodSection>
        <YearSection>
          <div
            className={"d-flex justify-content-between align-items-center mb-3"}
          >
            <Label className={"m-0 fw-semibold font-size-16"}>
              연도별 누적 매출
              <span className={"mx-3 fw-normal font-size-10"}>
                * 조회년도 기준 최근 3년간의 누적 매출 값이 보여집니다.
              </span>
            </Label>
            <ButtonGroup>
              <ButtonBase label={"전체"} color={"turu"} outline={false} />
              <ButtonBase label={"년도별"} color={"turu"} outline={true} />
            </ButtonGroup>
          </div>
          <Card>
            <CardHeader>
              <div className={"d-flex justify-content-between"}>
                <DropdownBase menuItems={[{ label: "2022년도", value: "" }]} />
                <DropdownBase
                  menuItems={[
                    { label: "전체", value: "" },
                    { label: "회원", value: "" },
                    { label: "로밍회원", value: "" },
                    { label: "현장결제", value: "" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody>
              <SalesByYearChart />
            </CardBody>
          </Card>
        </YearSection>
      </BodyBase>
    </ContainerBase>
  );
};

const SearchSection = styled.section``;
const TotalSection = styled.section``;
const PeriodSection = styled.section``;
const YearSection = styled.section``;
