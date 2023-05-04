import React from "react";
import { useNavigate } from "react-router";
import { Col, Input, Row } from "reactstrap";
import { INoticeDetailFileItem } from "src/api/board/noticeApi.interface";
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
import { UPLOAD_FILTER_LIST } from "src/constants/list";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

const OperateFAQAdd = () => {
  const navigate = useNavigate();

  const [
    { date, writer, uploadTarget, title, files },
    { onChange, onChangeSingle },
  ] = useInputs({
    date: "",
    writer: "",
    category: "",
    uploadTarget: "",
    title: "",
    contents: "",
    files: [] as INoticeDetailFileItem[],
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
              value={date}
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
                    onChangeSingle({ category: value });
                  },
                  menuItems: [
                    {
                      label: "가입 승인",
                      value: "1",
                    },
                    {
                      label: "기타",
                      value: "2",
                    },
                  ],
                },
              ]}
            />
          </Col>
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            삭제여부
          </Col>
          <Col sm={5}>
            <RadioGroup
              name={"deleteStatus"}
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
              name={"uploadTarget"}
              list={UPLOAD_FILTER_LIST.map((radio) => ({
                ...radio,
                checked: uploadTarget === radio.value,
              }))}
              onChange={onChange}
            />
          </Col>
        </Row>
        <EditorBody
          onChange={(e) => {
            onChangeSingle({ contents: e.editor.getData() });
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
              /** @TODO 저장(수정) 로직 추가 */
            }}
          />
        </div>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateFAQAdd;

const HoverP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
