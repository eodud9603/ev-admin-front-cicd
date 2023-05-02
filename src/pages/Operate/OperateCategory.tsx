import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import SearchTextInput from "src/components/Common/Filter/component/SearchTextInput";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import PaginationBase from "src/components/Common/Layout/PaginationBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TableBase } from "src/components/Common/Table/TableBase";
import { COUNT_FILTER_LIST, YN_FILTER_LIST } from "src/constants/list";
import styled from "styled-components";
import useInputs from "src/hooks/useInputs";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import { YNType } from "src/api/api.interface";
import CategoryModal from "src/pages/Operate/components/CategoryModal";

/* 검색어 필터 */
const searchList = [{ label: "전체", value: "" }];

/** 분야 필터 */
const fieldList = [
  {
    label: "전체",
    value: "",
  },
];

/* 목록 헤더 */
const tableHeader = [
  { label: "번호" },
  { label: "분야" },
  { label: "카테고리명" },
  { label: "노출 여부" },
  { label: "등록자" },
  { label: "등록일" },
];

/* 임시 목록 데이터 */
const codeList: Omit<IListItemProps, "index" | "setCodeModal">[] = [
  {
    id: 1,
    field: "FAQ",
    name: "카테고리명",
    isExposed: "N",
    regName: "김아무개",
    regDate: "2022.02.07 12:00:00",
  },
];

interface IListItemProps {
  id: number;
  field: string;
  name: string;
  isExposed: YNType;
  regName: string;
  regDate: string;
}

const OperateCategory = () => {
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    type: "MODIFY" | "REGISTER";
  }>({
    isOpen: false,
    type: "REGISTER",
  });
  const [page, setPage] = useState(1);

  const [{ isExposed, searchText, count }, { onChange, onChangeSingle }] =
    useInputs({
      isExposed: "",
      searchRange: "",
      searchText: "",
      sort: "",
      count: "10",
    });

  const onChangeCategoryModal =
    (data?: Partial<typeof categoryModal>) => () => {
      setCategoryModal((prev) => ({ ...prev, ...(data ?? {}) }));
    };

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "카테고리 관리", href: "" },
          ]}
          title={"카테고리 관리"}
        />

        <SearchSection className={"pt-2 pb-4 border-top border-bottom"}>
          <Row className={"mt-3 d-flex align-items-center"}>
            <Col md={7}>
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
            <Col md={5}>
              <RadioGroup
                title={"노출 여부"}
                name={"isExposed"}
                list={YN_FILTER_LIST.map((data) => ({
                  ...data,
                  checked: isExposed === data.value,
                }))}
                onChange={onChange}
              />
            </Col>
          </Row>

          <Row className={"mt-3 d-flex align-items-center"}>
            <Col>
              <DropboxGroup
                label={"분야"}
                dropdownItems={[
                  {
                    onClickDropdownItem: (_, value) => {
                      onChangeSingle({ sort: value });
                    },
                    menuItems: fieldList,
                  },
                ]}
              />
            </Col>
          </Row>
        </SearchSection>

        <ListSection className={"py-4"}>
          <div
            className={"d-flex align-items-center justify-content-between mb-4"}
          >
            <span className={"font-size-13 fw-bold"}>
              총 <span className={"text-turu"}>{codeList.length}개</span>의
              카테고리가 있습니다.
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
              <ButtonBase
                label={"신규 등록"}
                color={"turu"}
                onClick={onChangeCategoryModal({
                  type: "REGISTER",
                  isOpen: true,
                })}
              />
            </div>
          </div>

          <TableBase tableHeader={tableHeader}>
            <>
              {codeList.length > 0 ? (
                codeList.map((data, index) => (
                  <tr key={data.id}>
                    <td>{(page - 1) * Number(count) + index + 1}</td>
                    <td>{data.field}</td>
                    <td
                      onClick={onChangeCategoryModal({
                        type: "MODIFY",
                        isOpen: true,
                      })}
                    >
                      <HoverSpan className={"text-turu"}>
                        <u>{data.name}</u>
                      </HoverSpan>
                    </td>
                    <td>{data.isExposed}</td>
                    <td>{data.regName}</td>
                    <td>{data.regDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={"py-5 text-center text"}>
                    등록된 카테고리가 없습니다.
                  </td>
                </tr>
              )}
            </>
          </TableBase>

          <PaginationBase setPage={setPage} data={{}} />
        </ListSection>
      </BodyBase>

      <CategoryModal
        {...categoryModal}
        onClose={onChangeCategoryModal({ isOpen: false })}
      />
    </ContainerBase>
  );
};

export default OperateCategory;

const SearchSection = styled.section``;
const ListSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
