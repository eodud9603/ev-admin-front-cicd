import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Col, Row } from "reactstrap";
import { INoticeDetailResponse } from "src/api/board/noticeApi.interface";
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

const OperateNoticeDetail = () => {
  const data = useLoaderData() as INoticeDetailResponse | null;

  const [disabled, setDisabled] = useState(true);

  const initContents = (data?.content ?? "").replace(/\n/gi, "<br>");
  const [
    { createAt, delete: isDelete, writer, readCount, uploadType, title, files },
    { onChange, onChangeSingle },
  ] = useInputs({
    createAt: data?.createAt ?? "",
    delete: data?.delete ?? "",
    writer: data?.writer ?? "",
    readCount: (data?.readCount ?? "").toString(),
    uploadType: data?.uploadType ?? "",
    title: data?.title ?? "",
    contents: initContents,
    files: data?.files ?? [],
  });

  return (
    <ContainerBase>
      <HeaderBase />

      <TabGroup />

      <BodyBase>
        <BreadcrumbBase
          list={[
            { label: "홈", href: "" },
            { label: "서비스 운영 관리", href: "" },
            { label: "공지사항", href: "" },
            { label: "공지사항 상세", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>공지사항 상세</h3>
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
              disabled={true}
              name={"createAt"}
              value={createAt}
              onChange={onChange}
            />
          </Col>
          <Col sm={4} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            삭제여부
          </Col>
          <Col sm={3}>
            <RadioGroup
              name={"delete"}
              list={[
                {
                  label: "Y",
                  value: "Y",
                  checked: isDelete === "Y",
                  disabled,
                },
                {
                  label: "N",
                  value: "N",
                  checked: isDelete === "N",
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
                disabled={true}
                inputstyle={{ flex: 1 }}
                name={"readCount"}
                value={readCount}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col sm={4} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={3}>
            <RadioGroup
              name={"uploadType"}
              list={UPLOAD_FILTER_LIST.map((radio) => ({
                ...radio,
                disabled,
                checked: uploadType === radio.value,
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
            attachmentList: files.map((data) => ({ name: data.fileName })),
          }}
        />
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateNoticeDetail;
