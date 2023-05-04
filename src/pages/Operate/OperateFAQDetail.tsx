import React, { useState } from "react";
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

const OperateFAQDetail = () => {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  const initContents =
    "<pre>안녕하세요! 모빌리티로 통하는 세상 트루입니다.</pre>";
  const [
    { date, deleteStatus, writer, views, uploadTarget, title, files },
    { onChange, onChangeSingle },
  ] = useInputs({
    date: "2022-11-31 12:00:00",
    deleteStatus: "Y",
    writer: "홍길동",
    views: "1",
    category: "1",
    uploadTarget: "1",
    title: "개인정보 처리 방침 변경 안내",
    contents: initContents,
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

  /** 수정 */
  const modify = () => {
    setDisabled((prev) => !prev);
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
            { label: "FAQ 상세", href: "" },
          ]}
          title={"FAQ 상세"}
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
            />
          </Col>
          <Col className={"font-size-14 fw-semibold"} sm={1}>
            조회 수
          </Col>
          <Col sm={2}>
            <TextInputBase
              name={"views"}
              disabled={true}
              value={views}
              onChange={onChange}
            />
          </Col>
          <Col sm={3} />
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
                  disabled,
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

          <Col className={"font-size-14 fw-semibold"} sm={1}>
            제목
          </Col>
          <Col>
            <TextInputBase
              disabled={disabled}
              name={"title"}
              value={title}
              onChange={onChange}
            />
          </Col>

          <Col className={"font-size-14 fw-semibold"} sm={1}>
            업로드 대상
          </Col>
          <Col sm={5}>
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

        <EditorBody
          initData={initContents}
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
    </ContainerBase>
  );
};

export default OperateFAQDetail;

const HoverP = styled.p`
  :hover {
    cursor: pointer;
  }
`;
