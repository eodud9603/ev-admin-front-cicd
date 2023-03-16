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
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { CounselingMemberSearchModal } from "src/pages/Counseling/components/CounselingMemberSearchModal";
import { PasswordResetModal } from "src/pages/Counseling/components/PasswordResetModal";
import { ChangeOperatorModal } from "src/pages/Counseling/components/ChangeOperatorModal";
import { DateGroup } from "src/components/Common/Filter/component/DateGroup";
import { TermsAgreeModal } from "src/pages/Counseling/components/TermsAgreeModal";
import {
  MemberInfoTemplate,
  NonMemberInfoTemplate,
} from "src/pages/Counseling/components/MemberInfoTemplates";

const CounselingHistoryTableHeader = [
  { label: "번호" },
  { label: "In/Out" },
  { label: "접수일시" },
  { label: "상담유형" },
  { label: "처리상태" },
  { label: "담당자" },
];

const UsageHistoryTableHeader = [
  { label: "번호" },
  { label: "주문ID" },
  { label: "충전소명" },
  { label: "충전기ID" },
  { label: "충전기상태" },
  { label: "충전시작일시" },
  { label: "충전종료일시" },
  { label: "종료(중단) 유형" },
  { label: "총 충전량(kWh)" },
  { label: "총 이용요금(원)" },
];

const counselingData = [];
const usageData = [
  {
    orderId: "OD2022120112345678",
    stationName: "휴맥스 카플랫 전용 A",
    chargerId: "0000",
    chargerStatus: "a",
    chargingStartDt: "YYYY.MM.DD 00:00:00",
    chargingEndDt: "YYYY.MM.DD 00:00:00",
    endType: "",
    amount: "000",
    fee: "000",
  },
];

const counselingDropdown = [
  { menuItems: [{ label: "선택", value: "1" }] },
  { menuItems: [{ label: "선택", value: "1" }] },
  { menuItems: [{ label: "선택", value: "1" }] },
];
const inoutRadio = [{ label: "전체" }, { label: "HEV" }, { label: "JEV" }];
const processingStatusRadio = [{ label: "처리완료" }, { label: "관리자 이관" }];

export const CounselingCustomer = () => {
  const [selected, setSelected] = useState("0");
  const [tab, setTab] = useState<"COUNSELING" | "USAGE">("COUNSELING");
  const [memberInfoTemplate, setMemberInfoTemplate] = useState<
    "MEMBER" | "NONMEMBER"
  >("MEMBER");
  const [isMemberSearchModal, setIsMemberSearchModal] = useState(false);
  const [isPasswordResetModal, setIsPasswordResetModal] = useState(false);
  const [isChangeOperatorModal, setIsChangeOperatorModal] = useState(false);
  const [isTermsAgreeModal, setIsTermsAgreeModal] = useState(false);

  const handleMemberSearchModal = () => {
    setIsMemberSearchModal((prev) => !prev);
    setMemberInfoTemplate("MEMBER");
  };
  const handlePasswordResetModal = () => {
    setIsPasswordResetModal((prev) => !prev);
  };
  const handleChangeOperatorModal = () => {
    setIsChangeOperatorModal((prev) => !prev);
  };
  const handleTermsAgreeModal = () => {
    setIsTermsAgreeModal((prev) => !prev);
  };
  const handleMemberInfoTemplate = (type: "MEMBER" | "NONMEMBER") => {
    setMemberInfoTemplate(type);
  };
  const handleHistorySearch = () => {};

  return (
    <ContainerBase>
      <HeaderBase />
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
              "d-flex bg-light bg-opacity-10 p-2 border border-2 " +
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
                  <ButtonBase
                    label={"회원 조회"}
                    color={"turu"}
                    onClick={handleMemberSearchModal}
                    outline={!(memberInfoTemplate === "MEMBER")}
                  />
                  <ButtonBase
                    label={"비회원 상담"}
                    className={"mx-2"}
                    color={"turu"}
                    outline={!(memberInfoTemplate === "NONMEMBER")}
                    onClick={() => handleMemberInfoTemplate("NONMEMBER")}
                  />
                  <ButtonBase
                    label={"비밀번호 초기화"}
                    outline={true}
                    onClick={handlePasswordResetModal}
                  />
                </div>
              </div>
              {memberInfoTemplate === "MEMBER" ? (
                <MemberInfoTemplate />
              ) : (
                <NonMemberInfoTemplate historySearch={handleHistorySearch} />
              )}
            </Col>
            {/*고객이력*/}
            <Col md={6}>
              <div
                className={
                  "d-flex justify-content-between align-items-center my-3"
                }
              >
                <Label className={"fw-bold m-0 font-size-16"}>고객이력</Label>
                <div className={"btn-group"}>
                  <ButtonBase
                    label={"상담이력"}
                    color={"turu"}
                    onClick={() => setTab("COUNSELING")}
                    outline={!(tab === "COUNSELING")}
                  />
                  <ButtonBase
                    onClick={() => setTab("USAGE")}
                    label={"이용내역"}
                    color={"turu"}
                    outline={!(tab === "USAGE")}
                  />
                </div>
              </div>
              {tab === "COUNSELING" ? (
                <CounselingHistoryTab />
              ) : (
                <UsageHistoryTab />
              )}
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
              rows={[
                { title: "질문내용", type: "textarea", titleWidthRatio: 1 },
              ]}
            />
            <DetailTextInputRow
              rows={[
                { title: "답변내용", type: "textarea", titleWidthRatio: 1 },
              ]}
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
                처리상태
              </Col>
              <Col className={"d-flex align-items-center"}>
                <RadioGroup
                  name={"processingStatus"}
                  list={processingStatusRadio}
                />
                <span className={"text-turu font-size-12"}>
                  이관할 관리자명(관리자ID)
                </span>
                <ButtonBase
                  label={"관리자 변경"}
                  color={"turu"}
                  outline={true}
                  className={"w-xs mx-2"}
                  onClick={handleChangeOperatorModal}
                />
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
      <CounselingMemberSearchModal
        isOpen={isMemberSearchModal}
        onClose={handleMemberSearchModal}
      />
      <PasswordResetModal
        size={"lg"}
        isOpen={isPasswordResetModal}
        onClose={handlePasswordResetModal}
      />
      <ChangeOperatorModal
        isOpen={isChangeOperatorModal}
        onClose={handleChangeOperatorModal}
      />
      <TermsAgreeModal
        isOpen={isTermsAgreeModal}
        onClose={handleTermsAgreeModal}
      />
    </ContainerBase>
  );
};

const CounselingHistoryTab = () => {
  return (
    <>
      <TableBase tableHeader={CounselingHistoryTableHeader}>
        <>
          {counselingData.length > 0 &&
            counselingData.map((e, i) => (
              <tr key={i}>
                <td></td>
              </tr>
            ))}
        </>
      </TableBase>
      <DetailTextInputRow
        rows={[
          {
            title: "질문내용",
            type: "textarea",
            titleWidthRatio: 2,
            disabled: true,
          },
        ]}
      />
      <DetailTextInputRow
        rows={[
          {
            title: "답변내용",
            type: "textarea",
            titleWidthRatio: 2,
            disabled: true,
          },
        ]}
      />
    </>
  );
};

const UsageHistoryTab = () => {
  return (
    <>
      <div
        className={
          "d-flex align-items-center justify-content-between " +
          "bg-light bg-opacity-10 py-2 px-3"
        }
      >
        <DateGroup
          label={"조회기간"}
          buttonState={[
            { label: "7일" },
            { label: "1개월" },
            { label: "3개월" },
          ]}
        />
        <ButtonBase label={"검색"} color={"dark"} />
      </div>

      <TableBase tableHeader={UsageHistoryTableHeader}>
        <>
          {usageData.length > 0 &&
            usageData.map((e, i) => (
              <tr key={i}>
                <td></td>
                <td>{e.orderId}</td>
                <td>
                  <HoverSpan className={"text-turu"}>
                    <u>{e.stationName}</u>
                  </HoverSpan>
                </td>
                <td>
                  <HoverSpan className={"text-turu"}>
                    <u>{e.chargerId}</u>
                  </HoverSpan>
                </td>
                <td>
                  <ChargerStatusButton chargerStatus={e.chargerStatus} />
                </td>
                <td>{e.chargingStartDt}</td>
                <td>{e.chargingEndDt}</td>
                <td>{e.endType}</td>
                <td>{e.amount}</td>
                <td>{e.fee}</td>
              </tr>
            ))}
        </>
      </TableBase>
    </>
  );
};

interface IChargerStatusButton {
  chargerStatus: string;
}
const ChargerStatusButton = (props: IChargerStatusButton) => {
  const { chargerStatus } = props;

  switch (chargerStatus) {
    case "a":
      return (
        <ButtonBase
          color={"info"}
          className={"w-xs rounded-5 py-1"}
          label={"충전대기"}
        />
      );
    case "b":
      return (
        <ButtonBase
          color={"success"}
          className={"w-xs rounded-5 py-1"}
          label={"충전중"}
        />
      );
    case "c":
      return (
        <ButtonBase
          label={"통신이상"}
          color={"danger"}
          className={"w-xs rounded-5 py-1"}
        />
      );
    case "d":
      return (
        <ButtonBase
          color={"white"}
          className={"w-xs rounded-5 py-1"}
          label={"수령완료"}
        />
      );
    default:
      return <></>;
  }
  return <></>;
};

const AmountSection = styled.section``;
const InfoSection = styled.section``;
const HoverSpan = styled.span`
  :hover {
    cursor: pointer;
  }
`;
