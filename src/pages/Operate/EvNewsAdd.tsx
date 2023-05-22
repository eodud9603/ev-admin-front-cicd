import React, { useState } from "react";
import { Col, Input, Row } from "reactstrap";
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
import { useLoaderData, useNavigate } from "react-router-dom";
import { INIT_EV_NEWS_ADD } from "src/pages/Operate/loader/evNewsAddLoader";
import { useTabs } from "src/hooks/useTabs";
import { postFileUpload } from "src/api/common/commonApi";
import { jwtDecode } from "src/utils/jwt";
import { BoardIdEnum, TUploadTypeKeys } from "src/constants/status";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import { YUP_OPERATE_NOTICE } from "src/constants/valid/operate";
import { IRequestEvNewsRegister } from "src/api/board/evNewsApi.interface";
import { postEvNewsRegister } from "src/api/board/evNewsApi";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";

const EvNewsAdd = () => {
  const { data } = useLoaderData() as {
    data: typeof INIT_EV_NEWS_ADD;
  };
  const navigate = useNavigate();

  const [addModalOpen, setAddModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs(data);
  const { writer, uploadType, title, files, banners, isExpose } = inputs;

  const { removeTabData } = useTabs({
    data: inputs,
    pageTitle: "EV 뉴스 등록",
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
    const { content, files, banners, ...registerParams } = inputs;

    const user = jwtDecode();
    /* 등록 params */
    const params: IRequestEvNewsRegister = {
      ...registerParams,
      writer: user.name ?? "-",
      boardId: BoardIdEnum.EV_NEWS,
      content: content,
      isExpose,
      uploadType: uploadType as TUploadTypeKeys,
      files: files.map((data) => data.id),
      banners: banners.map((data) => data.id),
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
    const { code } = await postEvNewsRegister(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setAddModalOpen((prev) => !prev);
      removeTabData();
      navigate("/operate/evNews");
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
            { label: "EV 뉴스", href: "/operate/evNews" },
            { label: "EV 뉴스 등록", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>EV 뉴스 등록</h3>
          <div className={"d-flex gap-2"}>
            <ButtonBase
              label={"저장하기"}
              color={"turu"}
              onClick={() => setAddModalOpen(true)}
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
          <Col sm={3} />
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={4}>
            <RadioGroup
              name={"uploadTarget"}
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
              onChangeSingle({ content: e.editor.getData() });
            },
            onFileUploadResponse: (args: unknown) => {
              /** @TODO 파일 업로드 시, attachmentList state 파일명 추가 필요 */
              /* 현재 파일 업로드 불가로 해당 로직 대기 */
            },
            initData: data?.content,
          }}
          isAttachments={false}
        />

        <Row
          className={
            "mb-4 pb-3 d-flex align-items-center " +
            "border-bottom border-2 border-light border-opacity-50"
          }
        >
          <Col className={"font-size-16 fw-semibold"} sm={1}>
            배너 이미지
          </Col>
          <Col sm={11}>
            <div className={files.length > 0 ? "mb-3" : ""}>
              {banners.map((data, index) => (
                <p
                  role={"button"}
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

                      onChangeSingle({ banners: tempList });
                    }}
                  />
                </p>
              ))}
            </div>
            <ButtonBase
              label={"업로드"}
              outline={true}
              color={"turu"}
              onClick={() => {
                document.getElementById("banners")?.click();
              }}
            />
            <Input
              className={"visually-hidden"}
              type={"file"}
              id={"banners"}
              name={"banners"}
              multiple={true}
              accept={"*"}
              onChange={upload}
            />
          </Col>
        </Row>

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
                <p
                  role={"button"}
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
                </p>
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
        title={"EV뉴스 등록"}
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

export default EvNewsAdd;
