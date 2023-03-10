import React, { useState } from "react";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import styled from "styled-components";
import { Col, Input, Label, Row } from "reactstrap";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { TableBase } from "src/components/Common/Table/TableBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DetailTextRow } from "src/components/Common/DetailContentRow/DetailTextRow";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";

const MemberHistoryTableHeader = [
  { label: "번호" },
  { label: "In/Out" },
  { label: "접수일시" },
  { label: "상담유형" },
  { label: "처리상태" },
  { label: "담당자" },
];

const counselingDropdown = [
  { menuItems: [{ label: "선택", value: "1" }] },
  { menuItems: [{ label: "선택", value: "1" }] },
  { menuItems: [{ label: "선택", value: "1" }] },
];
const inoutRadio = [{ label: "전체" }, { label: "HEV" }, { label: "JEV" }];
export const CounselingCustomer = () => {
  const [selected, setSelected] = useState("0");

  return (
    <ContainerBase>
      <HeaderBase></HeaderBase>
      <TabGroup
        list={[{ label: "공지사항" }, { label: "고객 상담" }]}
        selectedIndex={selected}
        onClick={(e) => setSelected(e.currentTarget.value)}
      />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "#1" },
            { label: "상담 관리", href: "/counseling/customer" },
            { label: "고객 상담", href: "/counseling/customer" },
          ]}
          title={"고객 상담"}
        />
        <AmountSection>
          <div
            className={
              "d-flex bg-light bg-opacity-10 py-2 px-2 border border-2 " +
              "border-light border-start-0 border-end-0"
            }
          >
            <div className={"d-flex py-2 px-2 rounded-3 bg-white"}>
              <span className={"font-size-13"}>
                상담접수: <span className={"fw-bold"}>0건</span>
              </span>
              <span className={"fw-bold px-2"}> | </span>
              <span className={"font-size-13"}>
                상담완료: <span className={"fw-bold"}>0건</span>
              </span>
              <span className={"fw-bold px-2"}> | </span>
              <span className={"font-size-13"}>
                처리중: <span className={"fw-bold"}>0건</span>
              </span>
            </div>
          </div>
        </AmountSection>
        <InfoSection className={"mt-3 "}>
          <Row>
            {/*회원정보*/}
            <Col md={6}>
              <div
                className={
                  "d-flex justify-content-between align-items-center my-3"
                }
              >
                <Label className={"fw-bold m-0 font-size-16"}>회원정보</Label>
                <div className={"d-flex"}>
                  <ButtonBase label={"회원 조회"} color={"turu"} />
                  <ButtonBase
                    label={"비회원 상담"}
                    className={"mx-2"}
                    color={"turu"}
                    outline={true}
                  />
                  <ButtonBase label={"비밀번호 초기화"} outline={true} />
                </div>
              </div>
              <DetailTextRow
                rows={[
                  { title: "이름", content: "홍길동" },
                  { title: "회원 ID", content: "hong" },
                ]}
              />
              <DetailTextRow
                rows={[
                  { title: "생년월일", content: "0000.00.00" },
                  { title: "성별", content: "남성" },
                ]}
              />
              <DetailTextRow
                rows={[
                  { title: "휴대전화", content: "000-0000-0000" },
                  { title: "회원등급", content: "정회원" },
                ]}
              />
              <DetailTextRow
                rows={[{ title: "이메일", content: "Hh@humax.co.kr" }]}
              />
              <DetailTextRow
                rows={[{ title: "회원카드번호", content: "0000000000" }]}
              />
              <DetailTextRow
                rows={[
                  { title: "그룹정보", content: "휴맥스" },
                  { title: "사원번호", content: "111111" },
                ]}
              />
              <DetailTextRow
                rows={[{ title: "주소", content: "경기도 성남시" }]}
              />
            </Col>
            {/*고객이력*/}
            <Col>
              <div
                className={
                  "d-flex justify-content-between align-items-center my-3"
                }
              >
                <Label className={"fw-bold m-0 font-size-16"}>고객이력</Label>
                <div className={"btn-group"}>
                  <ButtonBase label={"상담이력"} color={"turu"} />
                  <ButtonBase
                    label={"이용내역"}
                    color={"turu"}
                    outline={true}
                  />
                </div>
              </div>
              <TableBase tableHeader={MemberHistoryTableHeader} />
              <DetailTextInputRow
                rows={[{ title: "질문내용", type: "textarea" }]}
              />
              <DetailTextInputRow
                rows={[{ title: "답변내용", type: "textarea" }]}
              />
            </Col>
          </Row>

          <Row className={"my-4"}>
            <div
              className={
                "d-flex justify-content-between align-items-center my-3"
              }
            >
              <Label className={"fw-bold m-0 font-size-16"}>상담정보</Label>
            </div>
          </Row>
          {/* # depth1 */}
          <Row
            className={"border border-0 border-2 border-top border-light mx-1"}
          >
            <Col sm={5} className={"d-flex p-0"}>
              <Col xs={3} className={"fw-bold p-3 bg-light bg-opacity-10"}>
                상담유형
              </Col>
              <DropboxGroup
                dropdownItems={counselingDropdown}
                className={"mx-2"}
              />
            </Col>
            <Col sm={3} className={"d-flex align-items-center"}>
              <Col xs={4} className={"fw-bold p-3 bg-light bg-opacity-10 me-2"}>
                In/Out
              </Col>
              <Col>
                <RadioGroup name={"inout"} list={inoutRadio} />
              </Col>
            </Col>
            <Col sm={4} className={"d-flex align-items-center"}>
              <Col xs={4} className={"fw-bold p-3 bg-light bg-opacity-10 me-2"}>
                접수일시
              </Col>
              <Col>0000.00.00</Col>
            </Col>
          </Row>
          <Col>
            <DetailTextInputRow
              rows={[{ title: "질문내용", type: "textarea" }]}
            />
            <DetailTextInputRow
              rows={[{ title: "답변내용", type: "textarea" }]}
            />
          </Col>
          {/* # depth4 */}
          <Row
            className={
              "border border-0 border-2 border-top" + " border-light mx-1"
            }
          >
            <Col className={"d-flex p-0 align-items-center"}>
              <Col xs={2} className={"fw-bold p-3 bg-light bg-opacity-10 me-2"}>
                In/Out
              </Col>
              <Col>
                <RadioGroup name={"inout"} list={inoutRadio} />
              </Col>
            </Col>
            <Col className={"d-flex p-0"}>
              <Col xs={2} className={"fw-bold p-3 bg-light bg-opacity-10"}>
                보상구분
              </Col>
              <DropboxGroup
                dropdownItems={counselingDropdown}
                className={"mx-2"}
              />
            </Col>
          </Row>

          {/* # depth5 */}
          <Row
            className={
              "border border-0 border-2 border-top" + " border-light mx-1"
            }
          >
            <Col className={"d-flex p-0 align-items-center"}>
              <Col xs={1} className={"fw-bold p-3 bg-light bg-opacity-10 me-2"}>
                접수일시
              </Col>
              <Col className={"d-flex align-items-center"}>
                <Input className={"width-80"} type={"number"} />
                <div className={"mx-2"}>-</div>
                <Input className={"width-120"} type={"number"} />
                <div className={"mx-2"}>-</div>
                <Input className={"width-100"} type={"number"} />
              </Col>
            </Col>
          </Row>

          <div className={"d-flex justify-content-center mb-5"}>
            <ButtonBase
              className={"w-xs mx-2"}
              label={"초기화"}
              outline={true}
              disabled={true}
            />
            <ButtonBase className={"w-xs"} label={"저장"} disabled={true} />
          </div>
        </InfoSection>
      </BodyBase>
    </ContainerBase>
  );
};

const AmountSection = styled.section``;
const InfoSection = styled.section``;
