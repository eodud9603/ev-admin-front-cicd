import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
import { YNType } from "src/api/api.interface";
import { putNoticeModify } from "src/api/board/noticeApi";
import {
  INoticeDetailResponse,
  IRequestNoticeModify,
} from "src/api/board/noticeApi.interface";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import { TUploadTypeKeys } from "src/constants/status";
import {
  YUP_OPERATE_NOTICE,
  YUP_OPERATE_NOTICE_EXTRA,
} from "src/constants/valid/operate";
import useInputs from "src/hooks/useInputs";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import { standardDateFormat } from "src/utils/day";
import EditorBody from "src/components/Common/Editor/EditorBody";
import styled from "styled-components";
import { postFileUpload } from "src/api/common/commonApi";
import { useTabs } from "src/hooks/useTabs";

const OperateNoticeDetail = () => {
  const { data, editable = true } = useLoaderData() as {
    data: INoticeDetailResponse | null;
    editable: boolean;
  };

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(editable);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });

  const initContents = (data?.content ?? "").replace(/\n\n/gi, "<br>");

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    id: Number(data?.id ?? -1),
    createAt: data?.createAt
      ? standardDateFormat(data?.createAt, "YYYY.MM.DD HH:mm:ss")
      : "",
    delete: (data?.delete ?? "") as YNType,
    writer: data?.writer ?? "",
    readCount: (data?.readCount ?? "").toString(),
    uploadType: (data?.uploadType ?? "") as TUploadTypeKeys,
    title: data?.title ?? "",
    content: initContents,
    files: data?.files ?? [],
  });

  const {
    createAt,
    delete: isDelete,
    writer,
    readCount,
    uploadType,
    title,
    files,
  } = inputs;

  useTabs({
    data: inputs,
    pageTitle: "공지사항 상세",
    pageType: "detail",
    editable: disabled,
  });

  /** 첨부파일 업로드 */
  const upload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }

    const uploadCount = e.target.files.length;
    const totalCount = files.length + e.target.files.length;
    if (uploadCount === 0) {
      return;
    }
    if (totalCount > 3) {
      return alert("최대 3개까지 등록 가능합니다.");
    }

    /* 첨부파일 업로드 요청 */
    void postFileUpload(e.target.files).then(({ code, data }) => {
      /** 성공 */
      const success = code === "SUCCESS" && !!data;
      if (success) {
        onChangeSingle({
          files: [
            ...files,
            ...data.elements.map((data) => ({ ...data, filePath: data.url })),
          ],
        });
      }

      e.target.value = "";
    });
  };

  /** 수정 */
  const modify = async () => {
    if (disabled) {
      setDisabled(false);
      return;
    }

    /* 수정 params */
    const { delete: isDelete, content, files, ...modifyParams } = inputs;

    const params: IRequestNoticeModify = {
      ...modifyParams,
      deleted: isDelete,
      /** @description initContent에서 replace해주므로 insert시, replace제거하여도 문제없을 것으로 판단하나 미확인, 추후 불필요시 제거 */
      content: content.replace(/\n\n/gi, "<br>"),
      files: files.map((data) => data.id),
    };
    getParams(params);

    /* 유효성 체크 */
    const scheme = createValidation({
      ...YUP_OPERATE_NOTICE,
      ...YUP_OPERATE_NOTICE_EXTRA,
    });
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 수정요청 */
    const { code } = await putNoticeModify(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setDisabled((prev) => !prev);
    }
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
            { label: "공지사항", href: "" },
            { label: "공지사항 상세", href: "" },
          ]}
          title={"공지사항 상세"}
        />
        <Row
          className={
            "py-3 d-flex align-items-center " +
            "border-top border-bottom border-2 border-light border-opacity-50"
          }
        >
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            작성자
          </Col>
          <Col className={"d-flex gap-5"} sm={3}>
            <TextInputBase
              className={"d-flex"}
              placeholder={""}
              name={"writer"}
              disabled={true}
              value={writer}
              onChange={onChange}
            />
          </Col>
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
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            조회 수
          </Col>
          <Col sm={2}>
            <TextInputBase
              disabled={true}
              inputstyle={{ flex: 1 }}
              name={"readCount"}
              value={readCount}
              onChange={onChange}
            />
          </Col>
        </Row>

        <Row
          className={
            "d-flex align-items-center " +
            "border-bottom border-2 border-light border-opacity-50 py-3 mb-3"
          }
        >
          <Col className={"font-size-16 fw-semibold"} sm={1}>
            제목
          </Col>
          <Col sm={5}>
            <TextInputBase
              disabled={disabled}
              name={"title"}
              value={title}
              onChange={onChange}
            />
          </Col>
          <Col sm={1} />
          <Col sm={5} className={"d-flex flex-column gap-3"}>
            <Row>
              <Col className={"font-size-14 fw-semibold"} sm={2}>
                업로드 대상
              </Col>
              <Col sm={10}>
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
            <Row>
              <Col className={"font-size-14 fw-semibold"} sm={2}>
                삭제여부
              </Col>
              <Col sm={10}>
                <RadioGroup
                  name={"delete"}
                  list={[
                    {
                      label: "Y",
                      value: "Y",
                    },
                    {
                      label: "N",
                      value: "N",
                    },
                  ].map((data) => ({
                    ...data,
                    disabled,
                    checked: data.value === isDelete,
                  }))}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <EditorBody
          disabled={disabled}
          onChange={(e) => {
            onChangeSingle({ content: e.editor.getData() });
          }}
          initData={initContents}
          onFileUploadResponse={(args: unknown) => {
            /** @TODO 파일 업로드 시, attachmentList state 파일명 추가 필요 */
            /* 현재 파일 업로드 불가로 해당 로직 대기 */
          }}
        />

        <Row
          className={
            "mb-4 pb-3 d-flex align-items-center " +
            "border-bottom border-2 border-light border-opacity-50"
          }
        >
          <Col className={"font-size-16 fw-semibold"} sm={1}>
            첨부 파일
          </Col>
          <Col sm={11}>
            <div className={files.length > 0 ? "mb-3" : ""}>
              {files.map((data, index) => (
                <HoverP
                  key={data.id}
                  className={"position-relative m-0 p-0 text-turu"}
                  onClick={() => {
                    if (data.filePath) {
                      window.open(data.filePath);
                    }
                  }}
                >
                  <u>{data.fileName}</u>

                  <i
                    className={
                      "position-absolute bx bx-x font-size-24 text-black"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      if (disabled) {
                        return;
                      }

                      const tempList = [...files];
                      tempList.splice(index, 1);

                      onChangeSingle({ files: tempList });
                    }}
                  />
                </HoverP>
              ))}
            </div>
            <ButtonBase
              disabled={disabled}
              label={"업로드"}
              outline={true}
              color={"turu"}
              onClick={() => {
                document.getElementById("files")?.click();
              }}
            />
            <Input
              className={"visually-hidden"}
              type={"file"}
              id={"files"}
              name={"files"}
              multiple={true}
              accept={"*"}
              onChange={upload}
            />
          </Col>
        </Row>

        <div className={"d-flex justify-content-center gap-3"}>
          <ButtonBase
            label={"목록"}
            color={"secondary"}
            onClick={() => navigate(-1)}
          />
          <ButtonBase
            label={disabled ? "수정" : "저장"}
            color={"turu"}
            onClick={modify}
          />
        </div>
      </BodyBase>

      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
    </ContainerBase>
  );
};

export default OperateNoticeDetail;

const HoverP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
