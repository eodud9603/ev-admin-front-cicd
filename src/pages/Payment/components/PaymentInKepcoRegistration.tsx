import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import styled from "styled-components";
import { Col, Label, Row } from "reactstrap";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { useLocation, useNavigate } from "react-router-dom";
import { TableBase } from "src/components/Common/Table/TableBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import { AddStationModal } from "src/pages/Payment/components/AddStationModal";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { KepcoFeeTableModal } from "src/pages/Payment/components/KepcoFeeTableModal";
const dropdownData = [
  { label: "10개씩 보기", value: "1" },
  { label: "20개씩 보기", value: "2" },
  { label: "50개씩 보기", value: "3" },
];

const tableHeader = [
  { label: "번호" },
  { label: "충전소명" },
  { label: "충전소ID" },
  { label: "주소" },
];

const data = [
  {
    applyStationSeq: 1,
    stationName: "충전소명",
    stationId: "충전소ID",
    addr: "wnth",
  },
];
export const PaymentInKepcoRegistration = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "한전 요금제 관리" },
  ]);

  const [feeName, setFeeName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);
  const [addStationModal, setAddStationModal] = useState(false);
  const [isKepcoFeeTableModal, setIsKepcoFeeTableModal] = useState(false);
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

  const handleAddStationModal = () => {
    setAddStationModal((prev) => !prev);
  };

  const handleKepcoFeeTableModal = () => {
    setIsKepcoFeeTableModal((prev) => !prev);
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
            { label: "충전소 및 충전기 관리", href: "" },
            { label: "한전 요금제 관리", href: "" },
            { label: "한전 요금제 신규등록", href: "" },
          ]}
          title={"한전 요금제 신규등록"}
        />
        <BasicInfoSection className={"my-5"}>
          <Label className={"m-0 fw-semibold font-size-16 mb-3"}>
            기본정보
          </Label>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>요금제ID</DetailLabelCol>
            <DetailContentCol className={"d-flex align-items-center"}>
              고유번호 자동
            </DetailContentCol>
            <DetailLabelCol sm={2}>
              <span>
                자가소비 여부<span className={"mx-2 text-danger"}>*</span>
              </span>
            </DetailLabelCol>
            <DetailContentCol className={"d-flex align-items-center"}>
              <RadioGroup
                name={"consumption"}
                list={[
                  { label: "Y", value: "Y" },
                  { label: "N", value: "N" },
                ]}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>
              <span>
                전압선택<span className={"mx-2 text-danger"}>*</span>
              </span>
            </DetailLabelCol>
            <DetailContentCol className={"d-flex align-items-center"}>
              <RadioGroup
                name={"consumption"}
                list={[
                  { label: "저압", value: "Y" },
                  { label: "고압", value: "N" },
                ]}
              />
            </DetailContentCol>
          </DetailRow>
          <DetailRow className={"bg-light bg-opacity-10"}>
            <DetailLabelCol sm={2}>
              <span>
                요금제명<span className={"text-danger mx-2"}>*</span>
              </span>
            </DetailLabelCol>
            <DetailContentCol>
              <TextInputBase
                name={"paymentName"}
                value={feeName}
                onChange={(e) => setFeeName(e.target.value)}
              />
            </DetailContentCol>
            <DetailLabelCol sm={2}>
              <span>
                요금제 적용기간(시작~종료)
                <span className={"text-danger mx-2"}>*</span>
              </span>
            </DetailLabelCol>
            <DetailContentCol>
              <div className={"d-flex align-items-center"}>
                <DateGroup />
                <div className={"mx-2"} />
                <CheckBoxBase name={"endDt"} label={"종료기간 미지정"} />
              </div>
            </DetailContentCol>
          </DetailRow>
          <DetailRow>
            <DetailLabelCol sm={2}>
              <span>
                요금표 관리<span className={"mx-2 text-danger"}>*</span>
              </span>
            </DetailLabelCol>
            <DetailContentCol>
              <ButtonBase
                label={"요금표 등록"}
                color={"turu"}
                className={"w-xs"}
                onClick={handleKepcoFeeTableModal}
              />
            </DetailContentCol>
          </DetailRow>
        </BasicInfoSection>

        <ListSection className={"mb-5"}>
          <Label className={"m-0 fw-semibold font-size-16 mb-2"}>
            적용대상 충전소
          </Label>
          <Row className={"mb-3"}>
            <Col className={"d-flex align-items-center"}>
              <span className={"text-size-13 fw-bold"}>
                총 <span className={"text-turu"}>0건</span>의 적용 대상 충전소
                정보가 있습니다.
              </span>
            </Col>
            <Col className={"d-flex justify-content-end"}>
              <div className={"d-flex align-items-center gap-3"}>
                <span className={"font-size-10 text-muted"}>
                  2023-04-01 14:51기준
                </span>
                <DropdownBase menuItems={dropdownData} />
                <ButtonBase
                  label={"충전소 등록"}
                  color={"turu"}
                  onClick={handleAddStationModal}
                />
                <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
              </div>
            </Col>
          </Row>
          <TableBase tableHeader={tableHeader}>
            <>
              {data.length > 0 &&
                data.map((e, i) => (
                  <tr key={i}>
                    <td></td>
                    <td>
                      <u className={"text-turu"}>{e.stationName}</u>
                    </td>
                    <td>{e.stationId}</td>
                    <td>{e.addr}</td>
                  </tr>
                ))}
            </>
          </TableBase>
        </ListSection>
        <PaginationBase setPage={setPage} data={{}} />
        <div className={"d-flex justify-content-center mt-5"}>
          <ButtonBase label={"목록"} outline={true} className={"w-xs mx-2"} />
          <ButtonBase label={"저장"} color={"turu"} className={"w-xs"} />
        </div>
      </BodyBase>
      <AddStationModal
        isOpen={addStationModal}
        onClose={handleAddStationModal}
      />
      <KepcoFeeTableModal
        isOpen={isKepcoFeeTableModal}
        onClose={handleKepcoFeeTableModal}
      />
    </ContainerBase>
  );
};

const BasicInfoSection = styled.section``;
const ListSection = styled.section``;
