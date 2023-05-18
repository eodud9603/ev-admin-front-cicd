import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import CheckBoxBase from "src/components/Common/Checkbox/CheckBoxBase";
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

const PAGE_NAME = "관리자 접근 로그";

/** 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/** 테이블 헤더 */
const tableHeader = [
  {
    label: "checkbox",
  },
  {
    label: "번호",
  },
  {
    label: "관리자 ID",
  },
  {
    label: "접근 메뉴",
  },
  {
    label: "접근 상세 내용",
  },
  {
    label: "접근 IP",
  },
  {
    label: "접근일",
  },
];

/** 임시 데이터 */
const list = [
  {
    id: 1,
    adminId: "휴맥스 빌리지",
    accessMenu: "로그 관리",
    accessContent: "관리자 접근 로그(781)",
    accessIp: "127.0.0.1",
    accessDate: "2022.02.07 12:00:00",
  },
];

const AdminAccessLog = () => {
  /* 체크 리스트 */
  const [checkList, setCheckList] = useState<number[]>([]);

  const [page, setPage] = useState(1);

  const [{ searchText }, { onChange, onChangeSingle }] = useInputs({
    startDate: "",
    endDate: "",
    searchRange: "",
    searchText: "",
    count: "10",
  });

  /** 전체 체크 변경 콜백 */
  const onChangeCheck = (check: boolean) => {
    if (check) {
      setCheckList(list.map((data) => data.id));
    } else {
      setCheckList([]);
    }
  };

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

        <Row className={"pt-4 mb-3 border-top border-1"}>
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
          <Col className={"d-flex align-items-center gap-3"} md={4}>
            <DropdownBase
              label={"접근 메뉴"}
              menuItems={[
                {
                  label: "전체",
                  value: "",
                },
              ]}
            />
            <ButtonBase className={"w-xs"} color={"dark"} label={"추가"} />
          </Col>
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
            총 <span className={"text-turu"}>{list.length}개</span>의 접근
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

        <TableBase
          tableHeader={tableHeader}
          allCheck={list.length > 0 && checkList.length === list.length}
          onClickAllCheck={onChangeCheck}
        >
          <>
            {list.length > 0 ? (
              list.map((data, index) => (
                <tr key={data.id}>
                  <td>
                    <CheckBoxBase
                      name={`list-${data.id}-checkbox`}
                      checked={checkList.indexOf(data.id) > -1}
                      label={""}
                      onChange={() => {
                        const list = [...checkList];
                        const findIndex = checkList.indexOf(data.id);

                        if (findIndex > -1) {
                          list.splice(findIndex, 1);
                        } else {
                          list.push(data.id);
                        }

                        setCheckList(list);
                      }}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{data.adminId}</td>
                  <td>{data.accessMenu}</td>
                  <td>{data.accessContent}</td>
                  <td>{data.accessIp}</td>
                  <td>{data.accessDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={"py-5 text-center text"}>
                  관리자 접근 내역이 없습니다.
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

export default AdminAccessLog;
