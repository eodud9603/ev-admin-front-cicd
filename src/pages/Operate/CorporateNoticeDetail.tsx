import React, { useState } from "react";
import { Col, Label, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBase from "src/components/Common/Editor/EditorBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";

const CorporateNoticeDetail = () => {
  const [tabList, setTabList] = useState([{ label: "법인 공지사항" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [disabled, setDisabled] = useState(true);

  const initContents =
    "<pre>안녕하세요! 모빌리티로 통하는 세상 트루입니다.</pre>";
  const [
    {
      date,
      deleteStatus,
      writer,
      views,
      corporateName,
      uploadTarget,
      title,
      attachmentList,
    },
    { onChange, onChangeSingle },
  ] = useInputs({
    date: "2022-11-31 12:00:00",
    deleteStatus: "Y",
    writer: "홍길동",
    views: "1",
    corporateName: "휴맥스",
    uploadTarget: "1",
    title: "개인정보 처리 방침 변경 안내",
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
            { label: "법인 공지사항", href: "/operate/corporateNotice" },
            { label: "법인 공지사항 상세", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>법인 공지사항 상세</h3>
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
          <Col sm={3} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            삭제여부
          </Col>
          <Col sm={4}>
            <RadioGroup
              name={"deleteStatus"}
              list={[
                {
                  label: "Y",
                  value: "Y",
                  checked: deleteStatus === "Y",
                  disabled,
                },
                {
                  label: "N",
                  value: "N",
                  checked: deleteStatus === "N",
                  disabled,
                },
              ]}
              onChange={onChange}
            />
          </Col>
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
              <span className={"font-size-14 fw-semibold"}>조회 수</span>
              <TextInputBase
                inputstyle={{ flex: 1 }}
                name={"views"}
                disabled={true}
                value={views}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col sm={2}>
            <div className={"d-flex align-items-center gap-3"}>
              <Label className={"m-0 fw-semibold"}>법인명</Label>
              <TextInputBase
                inputstyle={{ flex: 1 }}
                disabled={disabled}
                name={"corporateName"}
                value={corporateName}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col sm={1} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={4}>
            <RadioGroup
              name={"uploadTarget"}
              list={UPLOAD_FILTER_LIST.map((radio) => ({
                ...radio,
                disabled,
                checked: uploadTarget === radio.value,
              }))}
              onChange={onChange}
            />
          </Col>
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

export default CorporateNoticeDetail;
