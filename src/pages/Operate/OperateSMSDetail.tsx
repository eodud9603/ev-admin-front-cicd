import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { TextColGroup } from "src/pages/Operate/components/OperateCol";

/** 카테고리 목록, 임시 데이터 */
const commandList = [
  {
    label: "충전기 제어",
    value: "1",
  },
];

/** 제목 목록, 임시 데이터 */
const statusList = [
  {
    label: "요청",
    value: "1",
  },
];

const OperateSMSDetail = () => {
  const [tabList, setTabList] = useState([{ label: "제어 문자 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");

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
            { label: "서비스 운영 관리", href: "" },
            { label: "제어 문자 관리", href: "" },
            { label: "문자 발신 상세", href: "" },
          ]}
          title={"문자 발신 상세"}
        />

        <Row className={"mb-5"}>
          <Col sm={6} className={"pe-3"}>
            <Col className={"mb-5"} sm={12}>
              <p className={"mb-3 font-size-20 fw-semibold"}>충전기 정보</p>
              <Row>
                <TextColGroup title={"충전소명"} labelSm={2}>
                  휴맥스 빌리지
                </TextColGroup>
                <TextColGroup title={"충전기 ID"} labelSm={2}>
                  2
                </TextColGroup>
              </Row>
              <Row>
                <TextColGroup title={"충전기 CH."} labelSm={2}>
                  001122
                </TextColGroup>
                <TextColGroup title={"단말기 정보"} labelSm={2}>
                  22222
                </TextColGroup>
              </Row>
            </Col>
            <Col sm={12}>
              <p className={"mb-3 font-size-20 fw-semibold"}>제어 요청자</p>
              <Row>
                <TextColGroup title={"이름"} labelSm={2}>
                  백민규
                </TextColGroup>
                <TextColGroup title={"전화번호"} labelSm={2}>
                  010.1234.1234
                </TextColGroup>
              </Row>
              <Row>
                <TextColGroup title={"제어 요청일"} labelSm={2}>
                  2022.02.07 12:00:00
                </TextColGroup>
                <TextColGroup title={"제어 완료일"} labelSm={2}>
                  2022.02.07 12:00:00
                </TextColGroup>
              </Row>
            </Col>
          </Col>
          <Col sm={6} className={"ps-3"}>
            <p className={"mb-3 font-size-20 fw-semibold"}>발신 내용</p>
            <Row>
              <TextColGroup title={"제어 명령어"} labelSm={2}>
                <DropdownBase disabled menuItems={commandList} />
              </TextColGroup>
              <TextColGroup title={"제어 상태"} labelSm={2}>
                <DropdownBase disabled menuItems={statusList} />
              </TextColGroup>
            </Row>
            <Row>
              <TextColGroup title={"발신 내용"} labelSm={2}>
                <TextInputBase
                  /* init 높이, 유저 조절 가능 */
                  inputstyle={{ height: 300 }}
                  disabled
                  type={"textarea"}
                  name={"content"}
                  value={"충전 재시작"}
                  onChange={() => {}}
                />
              </TextColGroup>
            </Row>
          </Col>
        </Row>

        <div className={" d-flex justify-content-center"}>
          <ButtonBase
            className={"w-md"}
            outline
            label={"목록"}
            color={"secondary"}
            onClick={() => {
              navigate("/operate/sms");
            }}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateSMSDetail;
