import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Row } from "reactstrap";
import { postNoticeRegister } from "src/api/board/noticeApi";
import { IRequestNoticeRegister } from "src/api/board/noticeApi.interface";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBase from "src/components/Common/Editor/EditorBase";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import { BoardIdEnum, TUploadTypeKeys } from "src/constants/status";
import { YUP_OPERATE_NOTICE } from "src/constants/valid/operate";
import useInputs from "src/hooks/useInputs";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";

const OperateNoticeAdd = () => {
  /* 등록확인 모달 */
  const [addModalOpen, setAddModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });

  const navigate = useNavigate();

  const [inputs, { onChange, onChangeSingle }] = useInputs({
    writer: "",
    readCount: "",
    uploadType: "" as TUploadTypeKeys,
    title: "",
    contents: "",
    files: [] as { id: number; fileName: string }[],
  });
  const { writer, uploadType, title, files } = inputs;

  /** 등록 */
  const register = async () => {
    const { contents, ...registerParams } = inputs;
    /* 등록 params */
    const params: IRequestNoticeRegister = {
      ...registerParams,
      writer: "임시 기입(서버 수정 후, 제거)",
      boardId: BoardIdEnum.NOTICE,
      content: contents,
      deleted: "N",
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
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>공지사항 등록</h3>
          <div className={"d-flex gap-2"}>
            <ButtonBase
              label={"저장하기"}
              color={"turu"}
              onClick={() => {
                setAddModalOpen(true);
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
              value={""}
              onChange={onChange}
              placeholder={"자동기입"}
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
              placeholder={"자동기입"}
            />
            <Col sm={5} />
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
                checked: uploadType === radio.value,
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
          footerProps={{
            attachmentList: files.map((data) => ({ name: data.fileName })),
          }}
        />
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
