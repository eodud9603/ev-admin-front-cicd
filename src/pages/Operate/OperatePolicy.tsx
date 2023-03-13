import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_LIST } from "src/constants/list";
import styled from "styled-components";

/* 검색어 필터 */
const searchList = [{ label: "전체", value: "1" }];

/* 버전 필터 */
const versionList = [
  {
    menuItems: [{ label: "1", value: "1" }],
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "선택" },
  { label: "번호", sort: () => {} },
  { label: "제목", sort: () => {} },
  { label: "작성자", sort: () => {} },
  { label: "Ver.", sort: () => {} },
  { label: "등록일", sort: () => {} },
];

/* 임시 목록 데이터 */
const policyList: unknown[] = [];

const OperatePolicy = () => {
  const [tabList, setTabList] = useState([{ label: "정책 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
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

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "정책 관리", href: "" },
          ]}
          title={"정책 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={5}>
              <DateGroup className={"mb-0"} label={"등록일"} />
            </Col>
            <Col md={7} />
          </Row>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={8}>
              <SearchTextInput
                title={"검색어"}
                name={"searchText"}
                menuItems={searchList}
                placeholder={"검색어를 입력해주세요."}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
            <Col className={"d-flex"} md={4}>
              <DropboxGroup
                label={"Ver."}
                dropdownItems={versionList}
                className={"me-2 w-xs"}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{policyList.length}개</span>의
              정책이 있습니다.
            </span>

            <div className={"d-flex align-items-center gap-3"}>
              <span className={"font-size-10 text-muted"}>
                2023-04-01 14:51기준
              </span>
              <DropdownBase menuItems={COUNT_LIST} />
              <ButtonBase label={"신규 등록"} color={"turu"} />
              <ButtonBase label={"선택 삭제"} outline={true} color={"turu"} />
            </div>
          </div>

          <div className={"table-responsive"}>
            <TableBase tableHeader={tableHeader}>
              <>
                {policyList.length > 0 ? (
                  policyList.map((policy, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{index + 1}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={"py-5 text-center text"}>
                      등록된 정책이 없습니다.
                    </td>
                  </tr>
                )}
              </>
            </TableBase>
          </div>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatePolicy;

const SearchSection = styled.section``;
const ListSection = styled.section``;
