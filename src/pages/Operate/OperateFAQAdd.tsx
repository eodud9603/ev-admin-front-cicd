import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
import { postFileUpload } from "src/api/common/commonApi";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import EditorBody from "src/components/Common/Editor/EditorBody";
import { DropboxGroup } from "src/components/Common/Filter/component/DropboxGroup";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import RadioGroup from "src/components/Common/Radio/RadioGroup";
import TabGroup from "src/components/Common/Tab/TabGroup";
import { UPLOAD_FILTER_LIST, YN_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";
import { jwtDecode } from "src/utils/jwt";
import { BoardIdEnum, TUploadTypeKeys } from "src/constants/status";
import { getParams } from "src/utils/params";
import createValidation from "src/utils/validate";
import { YUP_OPERATE_NOTICE } from "src/constants/valid/operate";
import { IRequestFaqRegister } from "src/api/board/faqApi.interface";
import DetailValidCheckModal from "src/components/Common/Modal/DetailValidCheckModal";
import OperateTextModal from "src/pages/Operate/components/OperateTextModal";
import { postFaqRegister } from "src/api/board/faqApi";
import { useLoaderData } from "react-router-dom";
import { INIT_OPERATE_FAQ_ADD } from "src/pages/Operate/loader/faqAddLoader";
import { useTabs } from "src/hooks/useTabs";

const OperateFAQAdd = () => {
  const { data, categoryList } = useLoaderData() as {
    data: typeof INIT_OPERATE_FAQ_ADD;
    categoryList: { label: string; value: string }[];
  };

  const navigate = useNavigate();

  const [addModalOpen, setAddModalOpen] = useState(false);
  /* 미입력 안내 모달 */
  const [invalidModal, setInvalidModal] = useState({
    isOpen: false,
    content: "",
  });

  const [inputs, { onChange, onChangeSingle }] = useInputs(data);

  const { removeTabData } = useTabs({
    data: inputs,
    categoryList: categoryList,
    pageTitle: "FAQ 등록",
    pageType: "add",
  });

  const { writer, uploadType, title, files, categoryId, isExpose } = inputs;

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

    const user = jwtDecode();
    /* 등록 params */
    const params: IRequestFaqRegister = {
      ...registerParams,
      writer: user.name ?? "-",
      boardId: BoardIdEnum.FAQ,
      content: content,
      categoryId: categoryId
        ? Number(categoryId)
        : Number(categoryList[0].value),
      isExpose,
      uploadType: uploadType as TUploadTypeKeys,
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
    const { code } = await postFaqRegister(params);
    /** 성공 */
    const success = code === "SUCCESS";
    if (success) {
      setAddModalOpen((prev) => !prev);
      removeTabData();
      navigate("/operate/faq");
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
            { label: "FAQ", href: "" },
            { label: "FAQ 등록", href: "" },
          ]}
          title={"FAQ 등록"}
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
              placeholder={"자동 기입"}
            />
          </Col>
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            작성일
          </Col>
          <Col sm={2}>
            <TextInputBase
              name={"date"}
              disabled={true}
              value={""}
              onChange={onChange}
              placeholder={"자동 기입"}
            />
          </Col>
          <Col sm={6} />
        </Row>
        <Row
          className={
            "mb-3 py-3 row-gap-3 d-flex align-items-center " +
            "border-bottom border-2 border-light border-opacity-50"
          }
        >
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            카테고리
          </Col>
          <Col sm={5}>
            <DropboxGroup
              label={""}
              dropdownItems={[
                {
                  onClickDropdownItem: (_, value) => {
                    onChangeSingle({ categoryId: value });
                  },
                  menuItems: categoryList,
                  initSelectedValue: categoryList.find(
                    (e: { label: string; value: string }) =>
                      e.value === categoryId
                  ),
                },
              ]}
            />
          </Col>
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            노출여부
          </Col>
          <Col sm={5}>
            <RadioGroup
              name={"isExpose"}
              list={YN_FILTER_LIST.map((data) => ({
                ...data,
                checked: isExpose === data.value,
              }))}
              onChange={onChange}
            />
          </Col>

          <Col className={"font-size-14 fw-semibold"} sm={1}>
            제목
          </Col>
          <Col>
            <TextInputBase name={"title"} value={title} onChange={onChange} />
          </Col>

          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={5}>
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
        <EditorBody
          onChange={(e) => {
            onChangeSingle({ content: e.editor.getData() });
          }}
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

        <div
          className={"gap-3 d-flex align-items-center justify-content-center"}
        >
          <ButtonBase
            className={"w-xs"}
            label={"닫기"}
            color={"secondary"}
            onClick={() => {
              navigate(-1);
            }}
          />
          <ButtonBase
            className={"w-xs"}
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
        title={"faq 등록"}
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

export default OperateFAQAdd;

const HoverP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
