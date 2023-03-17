import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { DetailDropdownRow } from "src/components/Common/DetailContentRow/DetailDropdownRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TextColGroup } from "src/pages/Operate/components/OperateCol";

/** 카테고리 목록, 임시 데이터 */
const categoryList = [
  {
    label: "회원",
    value: "1",
  },
];

/** 제목 목록, 임시 데이터 */
const titleList = [
  {
    label: "회원 방침 변경",
    value: "1",
  },
];

const OperateNotificationTalkDetail = () => {
  const [tabList, setTabList] = useState([{ label: "알림톡 관리" }]);
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

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "알림톡 관리", href: "" },
            { label: "문자 발신 상세", href: "" },
          ]}
          title={"문자 발신 상세"}
        />

        <section className={"mb-5"}>
          <p className={"mb-3 font-size-20 fw-semibold"}>수신자</p>
          <Row>
            <TextColGroup title={"이름"}>홍길동</TextColGroup>
            <TextColGroup title={"전화번호"}>010.1234.1234</TextColGroup>
            <TextColGroup title={"분류"}>카카오톡</TextColGroup>
            <Col sm={3} />
          </Row>
        </section>

        <Row>
          <Col sm={6} className={"pe-3"}>
            <p className={"mb-3 font-size-20 fw-semibold"}>발신자 정보</p>
            <Row>
              <TextColGroup title={"이름"} labelSm={2}>
                백민규
              </TextColGroup>
              <TextColGroup title={"전화번호"} labelSm={2}>
                1800.3188
              </TextColGroup>
            </Row>
            <Row>
              <TextColGroup title={"발송일"} labelSm={2}>
                2022.02.07 12:00:00
              </TextColGroup>
              <TextColGroup title={"발송 예약일"} labelSm={2}>
                2022.02.07 12:00:00
              </TextColGroup>
            </Row>
            <Row>
              <TextColGroup title={"등록일"} labelSm={2}>
                2022.02.07 12:00:00
              </TextColGroup>
              <TextColGroup title={"진행 상태"} labelSm={2}>
                발송
              </TextColGroup>
            </Row>
          </Col>
          <Col sm={6} className={"ps-3"}>
            <p className={"mb-3 font-size-20 fw-semibold"}>발신 내용</p>
            <Row>
              <TextColGroup title={"카테고리"} labelSm={2}>
                <DropdownBase disabled menuItems={categoryList} />
              </TextColGroup>
              <TextColGroup title={"제목"} labelSm={2}>
                <DropdownBase disabled menuItems={titleList} />
              </TextColGroup>
            </Row>
            <Row>
              <TextColGroup title={"발신 내용"} labelSm={4}>
                <TextInputBase
                  /* init 높이, 유저 조절 가능 */
                  inputstyle={{ height: 300 }}
                  disabled
                  type={"textarea"}
                  name={"content"}
                  value={"입력내용"}
                  onChange={() => {}}
                />
              </TextColGroup>
            </Row>
          </Col>
        </Row>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateNotificationTalkDetail;
