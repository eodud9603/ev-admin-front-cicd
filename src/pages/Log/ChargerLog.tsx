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
import { COUNT_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";

const PAGE_NAME = "충전기 로그";

/** 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "번호",
  },
  {
    label: "충전소명",
  },
  {
    label: "충전기 ID",
  },
  {
    label: "서버 통신채널",
  },
  {
    label: "서버 수신시간",
  },
  {
    label: "단말기 수집시간",
  },
  {
    label: "단말기 전화번호",
  },
  {
    label: "충전기 유형",
  },
  {
    label: "충전기 상태",
  },
  {
    label: "케이블 상태",
  },
  {
    label: "충전 이상 상태",
  },
  {
    label: "버튼 상태",
  },
  {
    label: "RF 상태",
  },
  {
    label: "사용 전력량",
  },
  {
    label: "누적 전력량",
  },
  {
    label: "이벤트 코드",
  },
  {
    label: "펌웨어 버전",
  },
  {
    label: "H/W 버전",
  },
  {
    label: "음원 버전",
  },
  {
    label: "환경변수 버전",
  },
  {
    label: "수신감도",
  },
  {
    label: "순간 충전량",
  },
  {
    label: "충전기 내부 온도",
  },
  {
    label: "냉각장치",
  },
];

/** 임시 데이터 */
const list: unknown[] = [];

const ChargerLog = () => {
  const [page, setPage] = useState(1);

  const [{ searchText }, { onChange, onChangeSingle }] = useInputs({
    startDate: "",
    endDate: "",
    searchRange: "",
    searchText: "",
    count: "10",
  });

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "로그 관리", href: "" },
            { label: PAGE_NAME, href: "" },
          ]}
          title={PAGE_NAME}
        />

        <Row
          className={"d-flex align-items-center pt-4 mb-3 border-top border-1"}
        >
          <Col md={4}>
            <DateGroup label={"조회기간"} onChangeDate={onChangeSingle} />
          </Col>
          <Col md={8} />
        </Row>
        <Row className={"mb-3"}>
          <Col md={8}>
            <SearchTextInput
              title={"검색어"}
              placeholder={"검색어를 입력해주세요."}
              menuItems={searchList}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ searchRange: value });
              }}
              name={"searchText"}
              value={searchText}
              onChange={onChange}
            />
          </Col>
          <Col className={"d-flex align-items-center gap-3"} md={4} />
        </Row>
        <Row className={"mb-5 pb-4 border-bottom border-1"}>
          <Col>
            <DropboxGroup
              label={"정렬기준"}
              dropdownItems={[
                {
                  menuItems: [
                    {
                      label: "기본",
                      value: "",
                    },
                  ],
                },
              ]}
              className={"me-2"}
            />
          </Col>
        </Row>

        <div
          className={"d-flex align-items-center justify-content-between mb-4"}
        >
          <span className={"font-size-13 fw-bold"}>
            총 <span className={"text-turu"}>{list.length}개</span>의 로그
            내역이 있습니다.
          </span>

          <div className={"d-flex align-items-center gap-3"}>
            <span className={"font-size-10 text-muted"}>
              2023-04-01 14:51기준
            </span>
            <DropdownBase
              menuItems={COUNT_FILTER_LIST}
              onClickDropdownItem={(_, value) => {
                onChangeSingle({ count: value });
              }}
            />
            <ButtonBase label={"엑셀 저장"} outline={true} color={"turu"} />
          </div>
        </div>

        <TableBase tableHeader={tableHeader}>
          <>
            {list.length > 0 ? (
              list.map((data, index) => (
                <tr key={index}>
                  <td colSpan={24} className={"py-5 text-center text"}>
                    {/** @TODO 서버 api 연동 시, 추가 필요  */}-
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={24} className={"py-5 text-center text"}>
                  로그 내역이 없습니다.
                </td>
              </tr>
            )}
          </>
        </TableBase>
        <PaginationBase setPage={setPage} data={{}} />
      </BodyBase>
    </ContainerBase>
  );
};

export default ChargerLog;
