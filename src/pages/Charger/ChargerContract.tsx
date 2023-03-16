import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";

/* 주소(지역) 필터 */
const addressList = [
  {
    menuItems: [{ label: "시,도", value: "1" }],
  },
  {
    menuItems: [{ label: "구,군", value: "1" }],
  },
  {
    menuItems: [{ label: "동,읍", value: "1" }],
  },
];

/* 계약여부 필터 */
const contractFilterList = [
  {
    label: "전체",
  },
  {
    label: "계약",
  },
  {
    label: "해지대기",
  },
  {
    label: "해지",
  },
];

/* 사용여부 필터 */
const useList = [
  {
    label: "전체",
  },
  {
    label: "사용",
  },
  {
    label: "미사용",
  },
];

/* 검색어 필터 */
const searchList = [
  { label: "계약장소명", value: "1" },
  { label: "충전소 ID", value: "2" },
  { label: "영업업체", value: "3" },
];

/* 정렬기준 */
const sortList = [
  {
    menuItems: [
      { label: "기본", value: "1" },
      { label: "계약 체결일", value: "2" },
    ],
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "계약번호" },
  { label: "사용여부" },
  { label: "계약여부" },
  { label: "계약장소명" },
  { label: "환경부 충전소ID" },
  { label: "행정동 주소" },
  { label: "영업업체" },
  { label: "장소 담당자명" },
  { label: "장소 담당자연락처" },
  { label: "계약기간" },
  { label: "최종 연결" },
  { label: "계약체결일" },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const contractList = [
  {
    contractNum: "######",
    isUse: "Y",
    isContract: "계약",
    contractAddress: "계약장소명",
    contractAddressDetail: "계약장소 상세",
    MinistryId: "환경부 충전소ID 노출",
    AdministrativeAddress: "행정동 주소",
    AdministrativeAddressDetail: "행정동 주소 상세",
    salesCompany: "영업업체 정보 노출",
    managerName: "홍길동",
    managerTel: "000-0000-0000",
    term: "YYYY.MM.DD ~ YYYY.MM.DD",
    contractDate: "YYYY.MM.DD",
    date: "YYYY.MM.DD",
  },
  {
    contractNum: "######",
    isUse: "N",
    isContract: "계약",
    contractAddress: "계약장소명",
    contractAddressDetail: "계약장소 상세",
    MinistryId: "환경부 충전소ID 노출",
    AdministrativeAddress: "행정동 주소",
    AdministrativeAddressDetail: "행정동 주소 상세",
    salesCompany: "영업업체 정보 노출",
    managerName: "홍길동",
    managerTel: "000-0000-0000",
    term: "YYYY.MM.DD ~ YYYY.MM.DD",
    contractDate: "YYYY.MM.DD",
    date: "YYYY.MM.DD",
  },
];

const ChargerContract = () => {
  const [tabList, setTabList] = useState([
    { label: "공지사항" },
    { label: "충전소 계약 관리" },
  ]);
  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

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

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "충전소 및 충전 관리", href: "" },
            { label: "충전소 계약 관리", href: "" },
          ]}
          title={"충전소 계약 관리"}
        />

        <section className={"py-4 border-top border-bottom"}>
          <Row className={"d-flex align-items-center"}>
            <Col md={7}>
              <DropboxGroup
                label={"지역"}
                dropdownItems={addressList}
                className={"me-2 w-xs"}
              />
            </Col>
            <Col md={5}>
              <RadioGroup
                title={"계약여부"}
                name={"contractGroup"}
                list={contractFilterList}
              />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                placeholder={"계약장소명을 입력해주세요."}
                menuItems={searchList}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col md={5}>
              <RadioGroup title={"사용여부"} name={"useGroup"} list={useList} />
            </Col>
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <DropboxGroup
                label={"정렬기준"}
                dropdownItems={sortList}
                className={"me-2"}
              />
            </Col>
          </Row>
        </section>

        <section className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{contractList.length}개</span>의
              충전소 정보가 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={COUNT_FILTER_LIST} />
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={() => {
                  navigate("/charger/contract/add");
                }}
              />
              <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
            </div>
          </div>

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {contractList.length > 0 ? (
                  contractList.map(
                    (
                      {
                        contractNum,
                        isUse,
                        isContract,
                        contractAddress,
                        contractAddressDetail,
                        MinistryId,
                        AdministrativeAddress,
                        AdministrativeAddressDetail,
                        salesCompany,
                        managerName,
                        managerTel,
                        term,
                        contractDate,
                        date,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{contractNum}</td>
                        <td>{isUse === "Y" ? "사용" : "미사용"}</td>
                        <td>{isContract}</td>
                        <td>
                          <HoverSpan
                            className={"text-turu"}
                            onClick={() => {
                              navigate(`/charger/contract/detail/${index}`);
                            }}
                          >
                            <u>
                              {contractAddress}, {contractAddressDetail}
                            </u>
                          </HoverSpan>
                        </td>
                        <td>{MinistryId}</td>
                        <td>
                          {AdministrativeAddress}, {AdministrativeAddressDetail}
                        </td>
                        <td>{salesCompany}</td>
                        <td>{managerName}</td>
                        <td>
                          <p>{managerTel}</p>
                        </td>
                        <td>{term}</td>
                        <td>{contractDate}</td>
                        <td>{date}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={14} className={"py-5 text-center text"}>
                      등록된 충전소 계약 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </>
            </TableBase>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </section>
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargerContract;

const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
