import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import { DetailTextInputRow } from "src/components/Common/DetailContentRow/DetailTextInputRow";
import { DropdownBase } from "src/components/Common/Dropdown/DropdownBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";

import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import useInputs from "src/hooks/useInputs";
import { TextColGroup } from "src/pages/Operate/components/OperateCol";

const InstallChargerDetail = () => {
  const [tabList, setTabList] = useState([{ label: "충전기 설치 신청 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 수정모드 비활성화 */
  const [disabled, setDisabled] = useState(true);
  /** @TODO 상세정보 불러오면 initial값 넣어주기 */
  const {
    personalAgreement,
    application,
    self,
    open,
    contents,
    telStart,
    telMiddle,
    telEnd,
    onChange,
    onChangeSingle,
  } = useInputs({
    personalAgreement: "1",
    application: "1",
    self: "1",
    open: "1",
    contents: "충전기 미작동",
    telStart: "000",
    telMiddle: "0000",
    telEnd: "0000",
  });
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

      <BodyBase className={"pe-5"}>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "상세", href: "" },
          ]}
        />
        <div className={"d-flex justify-content-between"}>
          <p className={"font-size-24 fw-semibold"}>
            충전기 살치 신청 내역 상세
          </p>
          <div>
            <ButtonBase
              className={"me-2"}
              label={"삭제"}
              onClick={() => {}}
              color={"dark"}
            />
            <ButtonBase
              label={disabled ? "수정하기" : "저장하기"}
              onClick={() => {
                setDisabled((prev) => !prev);
              }}
              color={"turu"}
            />
          </div>
        </div>

        <section className={"mb-5"}>
          <p className={"mb-3 font-size-20 fw-semibold"}>충전기 설치 신청자</p>
          <Row className={"m-0 mb-3"}>
            <TextColGroup title={"이름"}>홍길동</TextColGroup>
            <TextColGroup title={"휴대전화"}>000-0000-0000</TextColGroup>
            <TextColGroup title={"이메일"}>
              mgbaek@humaxmobility.co.kr
            </TextColGroup>
            <Col sm={3} />
          </Row>
          <RadioGroup
            title={"개인정보 수집 및 이용 동의"}
            name={"personalAgreement"}
            onChange={onChange}
            list={[
              {
                disabled,
                label: "동의",
                value: "1",
                checked: personalAgreement === "1",
              },
              {
                disabled,
                label: "미동의",
                value: "2",
                checked: personalAgreement === "2",
              },
            ]}
          />
        </section>

        <section>
          <p className={"mb-3 font-size-20 fw-semibold"}>신청 정보</p>
          <Row className={"m-0"}>
            <TextColGroup title={"접수자명"}>백민규</TextColGroup>
            <TextColGroup title={"신청일"}>YYYY.MM.DD</TextColGroup>
            <TextColGroup title={"신청 상태"}>
              <DropdownBase
                disabled={disabled}
                menuItems={[
                  {
                    label: "신청",
                    value: "1",
                  },
                ]}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ application: value });
                }}
              />
            </TextColGroup>
            <Col
              sm={3}
              className={"mb-2 d-flex justify-content-end align-items-end"}
            >
              <ButtonBase label={"주소 검색"} color={"dark"} />
            </Col>
          </Row>
          <Row className={"m-0"}>
            <TextColGroup title={"지역"}>경기</TextColGroup>
            <TextColGroup title={"주차면 수"}>30</TextColGroup>
            <TextColGroup title={"자가 여부"}>
              <DropdownBase
                disabled={disabled}
                menuItems={[
                  {
                    label: "자가",
                    value: "1",
                  },
                ]}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ self: value });
                }}
              />
            </TextColGroup>
            <TextColGroup title={"개방 여부"}>
              <DropdownBase
                disabled={disabled}
                menuItems={[
                  {
                    label: "완전 개방",
                    value: "1",
                  },
                  {
                    label: "부분 개방",
                    value: "2",
                  },
                ]}
                onClickDropdownItem={(_, value) => {
                  onChangeSingle({ open: value });
                }}
              />
            </TextColGroup>
          </Row>
          <Row className={"m-0"}>
            <TextColGroup title={"도로명 주소"}>
              경기 성남시 분당구 황새울로 216 휴맥스빌리지
            </TextColGroup>
            <TextColGroup title={"지번 주소"}>
              경기 성남시 분당구 수내동 11-5
            </TextColGroup>
            <TextColGroup title={"상세 주소"}>지하 2층</TextColGroup>
          </Row>
          <DetailTextInputRow
            hasMargin={false}
            className={"m-0"}
            rows={[
              {
                titleWidthRatio: 1,
                title: "신청 상세 내용",
                disabled,
                type: "textarea",
                name: "contents",
                content: contents,
                onChange: onChange,
              },
            ]}
          />
          <Row className={"m-0"}>
            <TextColGroup
              title={"담당자명"}
              sm={2}
              className={"justify-content-between"}
            >
              <span className={"font-size-14"}>백민규</span>
              <ButtonBase
                className={"w-xs"}
                label={"조회"}
                color={"dark"}
                onClick={() => {}}
              />
            </TextColGroup>
            <TextColGroup title={"연락처"} sm={5} className={"gap-3"}>
              <TextInputBase
                disabled={disabled}
                name={"telStart"}
                value={telStart}
                onChange={onChange}
              />
              <span>-</span>
              <TextInputBase
                disabled={disabled}
                name={"telMiddle"}
                value={telMiddle}
                onChange={onChange}
              />
              <span>-</span>
              <TextInputBase
                disabled={disabled}
                name={"telEnd"}
                value={telEnd}
                onChange={onChange}
              />
            </TextColGroup>
            <TextColGroup title={"확인일"}>YYYY.MM.DD</TextColGroup>
          </Row>
        </section>

        <div className={"my-5 d-flex justify-content-center"}>
          <ButtonBase
            className={"w-md"}
            outline
            label={"목록"}
            color={"secondary"}
            onClick={() => {
              navigate("/operate/installCharger");
            }}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

export default InstallChargerDetail;
