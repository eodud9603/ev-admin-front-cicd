import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
import { postNoticeRegister } from "src/api/board/noticeApi";
import { IRequestNoticeRegister } from "src/api/board/noticeApi.interface";
import { postFileUpload } from "src/api/common/commonApi";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBody from "src/components/Common/Editor/EditorBody";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import { BoardIdEnum } from "src/constants/status";
import { YUP_OPERATE_NOTICE } from "src/constants/valid/operate";
import useInputs from "src/hooks/useInputs";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { INIT_OPERATE_NOTICE_ADD } from "src/pages/Operate/loader/noticeAddLoader";
import { useTabs } from "src/hooks/useTabs";

const OperateNoticeAdd = () => {
  const data = useLoaderData() as typeof INIT_OPERATE_NOTICE_ADD;
  /* 등록확인 모달 */
  const [addModalOpen, setAddModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });

  const navigate = useNavigate();

  const [inputs, { onChange, onChangeSingle }] = useInputs(data);
  const { writer, uploadType, title, files } = inputs;

  useTabs({
    data: inputs,
    pageTitle: "공지사항 등록",
    pageType: "add",
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

  /** 등록 */
  const register = async () => {
    const { content, files, ...registerParams } = inputs;
    /* 등록 params */
    const params: IRequestNoticeRegister = {
      ...registerParams,
      writer: "임시 기입(서버 수정 후, 제거)",
      boardId: BoardIdEnum.NOTICE,
      content: content,
      deleted: "N",
      files: files.map((data) => data.id),
    };

    getParams(params);

    /* 유효성 체크 */
    const scheme = createValidation(YUP_OPERATE_NOTICE);
    const [invalid] = scheme(params);

    if (invalid) {
      setInvalidModal({
        isOpen: true,
        content: invalid.message,
      });
      return;
    }

    /* 등록 요청 */
    const { code } = await postNoticeRegister(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setAddModalOpen((prev) => !prev);
      navigate("/operate/notice");
      return;
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
            { label: "공지사항 등록", href: "" },
          ]}
          title={"공지사항 등록"}
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
          <Col sm={1} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            작성일
          </Col>
          <Col sm={2}>
            <TextInputBase
              name={"date"}
              disabled={true}
              value={""}
              onChange={onChange}
              placeholder={"자동기입"}
            />
          </Col>
          <Col sm={4} />
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
            <TextInputBase name={"title"} value={title} onChange={onChange} />
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
                    checked: uploadType === radio.value,
                  }))}
                  onChange={onChange}
                />
              </Col>
            </Row>
            <Row>
              <Col className={"font-size-14 fw-semibold"} sm={2}>
                노출여부
              </Col>
              <Col sm={10}>
                <RadioGroup
                  name={"delete"}
                  list={[
                    {
                      disabled: true,
                      label: "Y",
                      value: "Y",
                    },
                    {
                      disabled: true,
                      label: "N",
                      value: "N",
                      checked: true,
                    },
                  ]}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <EditorBody
          onChange={(e) => {
            onChangeSingle({ content: e.editor.getData() });
          }}
          onFileUploadResponse={(args: unknown) => {
            /** @TODO 파일 업로드 시, attachmentList state 파일명 추가 필요 */
            /* 현재 파일 업로드 불가로 해당 로직 대기 */
          }}
          initData={data?.content}
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

                      const tempList = [...files];
                      tempList.splice(index, 1);

                      onChangeSingle({ files: tempList });
                    }}
                  />
                </HoverP>
              ))}
            </div>
            <ButtonBase
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
            label={"닫기"}
            color={"secondary"}
            onClick={() => {
              navigate("/operate/notice");
            }}
          />
          <ButtonBase
            label={"등록"}
            color={"turu"}
            onClick={() => {
              setAddModalOpen(true);
            }}
          />
        </div>
      </BodyBase>

      <DetailValidCheckModal
        {...invalidModal}
        onClose={() =>
          setInvalidModal((prev) => ({ ...prev, isOpen: !prev.isOpen }))
        }
      />
      <OperateTextModal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen((prev) => !prev);
        }}
        title={"공지사항 작성"}
        contents={"저장 후 사용자에게 즉시 노출됩니다.\n저장하시겠습니까?"}
        buttons={[
          {
            label: "아니요",
            color: "secondary",
          },
          {
            label: "저장",
            color: "turu",
            onClick: register,
          },
        ]}
      />
    </ContainerBase>
  );
};

export default OperateNoticeAdd;

const HoverP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
