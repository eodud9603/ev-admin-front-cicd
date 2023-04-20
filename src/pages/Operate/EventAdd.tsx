import React, { useState } from "react";
import { Col, Input, Row } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBase from "src/components/Common/Editor/EditorBase";
import {
  EditorTitleCol,
  EditorContentCol,
} from "src/components/Common/Editor/EditorCol";
import EditorFooter from "src/components/Common/Editor/EditorFooter";
import EditorRow from "src/components/Common/Editor/EditorRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import useImages from "src/hooks/useImages";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

const EventAdd = () => {
  const [tabList, setTabList] = useState([{ label: "이벤트" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");

  const [
    { date, startDate, endDate, writer, uploadTarget, title, attachmentList },
    { onChange, onChangeSingle },
  ] = useInputs({
    date: "",
    startDate: "",
    endDate: "",
    progressStatus: "",
    writer: "",
    views: "",
    category: "",
    uploadTarget: "",
    title: "",
    contents: "",
    attachmentList: [],
  });
  /* 배너 이미지 */
  const [images, { upload, drop, remove }] = useImages([]);

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
            { label: "이벤트", href: "" },
            { label: "이벤트 등록", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>이벤트 등록</h3>
          <div className={"d-flex gap-2"}>
            <ButtonBase
              label={"저장하기"}
              color={"turu"}
              onClick={() => {
                /** @TODO 저장(수정) 로직 추가 */
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
              placeholder={"자동기입"}
            />
          </Col>
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            이벤트 기간
          </Col>
          <Col className={"d-flex align-items-center"} sm={3}>
            <input
              type={"date"}
              className={"form-control w-xs bg-white"}
              name={"startDate"}
              value={startDate}
              onChange={onChange}
            />
            <div className={"px-2 text-center"}>~</div>
            <input
              type={"date"}
              className={"form-control w-xs bg-white"}
              name={"endDate"}
              value={endDate}
              onChange={onChange}
            />
          </Col>
          <Col sm={4} />
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
          <Col className={"d-flex gap-5"} sm={2}>
            <TextInputBase
              className={"d-flex"}
              name={"writer"}
              disabled={true}
              value={writer}
              onChange={onChange}
              placeholder={"자동기입"}
            />
          </Col>
          <Col sm={5} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={3}>
            <RadioGroup
              name={"uploadTarget"}
              list={UPLOAD_FILTER_LIST.map((radio) => ({
                ...radio,
                checked: uploadTarget === radio.value,
              }))}
              onChange={onChange}
            />
          </Col>
        </Row>

        <EditorBase
          headerProps={{ name: "title", value: title, onChange }}
          bodyProps={{
            onChange: (e) => {
              onChangeSingle({ contents: e.editor.getData() });
            },
            onFileUploadResponse: (args: unknown) => {
              /** @TODO 파일 업로드 시, attachmentList state 파일명 추가 필요 */
              /* 현재 파일 업로드 불가로 해당 로직 대기 */
            },
          }}
          isAttachments={false}
        />
        {/* 배너 이미지 */}
        <EditorRow className={"pb-2"}>
          <EditorTitleCol>배너 이미지</EditorTitleCol>
          <EditorContentCol
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}
          >
            <>
              {images.map(({ src }, index) => (
                <div className={"mb-3"} key={src}>
                  <div
                    style={{ height: 100 }}
                    className={"d-inline-block position-relative"}
                  >
                    <BannerImage className={"rounded"} src={src} />

                    <Icon
                      className={
                        "position-absolute top-0 start-100 translate-middle " +
                        "font-size-24 mdi mdi-close"
                      }
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
            <Col sm={6}>
              <AddImage
                className={
                  "py-5 d-flex justify-content-center align-items-center " +
                  "bg-light bg-opacity-50 rounded"
                }
                onClick={() => {
                  document.getElementById("images")?.click();
                }}
              >
                <span className={"font-size-14 fw-normal"}>
                  {images.length === 0 ? "없음" : "추가"}
                </span>
              </AddImage>
            </Col>
            <Input
              className={"visually-hidden"}
              multiple
              type={"file"}
              id={"images"}
              name={"images"}
              accept={"image/*"}
              onChange={upload}
            />
          </EditorContentCol>
        </EditorRow>
        {/* editor 첨부 파일 */}
        <EditorFooter attachmentList={attachmentList} />
      </BodyBase>
    </ContainerBase>
  );
};

export default EventAdd;

const BannerImage = styled.img`
  height: 100%;
  object-fit: cover;
`;
const AddImage = styled.div`
  :hover {
    cursor: pointer;
  }
`;
const Icon = styled.i`
  :hover {
    cursor: pointer;
  }
`;
