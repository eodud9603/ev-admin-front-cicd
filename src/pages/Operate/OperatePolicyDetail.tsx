import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBase from "src/components/Common/Editor/EditorBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import useInputs from "src/hooks/useInputs";

const OperatePolicyDetail = () => {
  const [tabList, setTabList] = useState([{ label: "정책 관리" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [disabled, setDisabled] = useState(true);

  const initContents =
    "<pre>안녕하세요! 모빌리티로 통하는 세상 트루입니다.</pre>";
  const {
    date,
    writer,
    version,
    title,
    attachmentList,
    onChange,
    onChangeSingle,
  } = useInputs({
    date: "2022-11-31 12:00:00",
    writer: "홍길동",
    version: "1",
    title: "개인정보 취급 방침",
    contents: initContents,
    attachmentList: [{ name: "2023.01.07 개인정보 처리 방침.pdf" }],
  });

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
            { label: "정책 관리", href: "/operate/policy" },
            { label: "정책 관리 상세", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>정책 관리 상세</h3>
          <div className={"d-flex gap-2"}>
            {disabled && <ButtonBase label={"삭제"} color={"dark"} />}
            <ButtonBase
              label={disabled ? "수정하기" : "저장하기"}
              color={"turu"}
              onClick={() => {
                if (!disabled) {
                  /** @TODO 저장(수정) 로직 추가 */
                }

                setDisabled((prev) => !prev);
              }}
            />
          </div>
        </div>

        <Row
          className={
            "py-3 d-flex align-items-center " +
            "border-top border-2 border-light border-opacity-50 pt-4"
          }
        >
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            작성일
          </Col>
          <Col sm={3}>
            <TextInputBase
              name={"date"}
              disabled={true}
              value={date}
              onChange={onChange}
            />
          </Col>
          <Col sm={8} />
        </Row>
        <Row
          className={
            "d-flex align-items-center " +
            "border-bottom border-2 border-light border-opacity-50 pb-2"
          }
        >
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            작성자
          </Col>
          <Col className={"d-flex gap-5"} sm={3}>
            <TextInputBase
              className={"d-flex"}
              name={"writer"}
              disabled={true}
              value={writer}
              onChange={onChange}
            />
            <div className={"d-flex gap-3 align-items-center"}>
              <span className={"font-size-14 fw-semibold"}>버전</span>
              <TextInputBase
                inputstyle={{ flex: 1 }}
                name={"version"}
                disabled={disabled}
                value={version}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col sm={8} />
        </Row>

        <EditorBase
          disabled={disabled}
          headerProps={{ name: "title", value: title, onChange }}
          bodyProps={{
            initData: initContents,
            onChange: (e) => {
              onChangeSingle({ contents: e.editor.getData() });
            },
            onFileUploadResponse: (args: unknown) => {
              /** @TODO 파일 업로드 시, attachmentList state 파일명 추가 필요 */
              /* 현재 파일 업로드 불가로 해당 로직 대기 */
            },
          }}
          footerProps={{
            attachmentList,
          }}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperatePolicyDetail;
