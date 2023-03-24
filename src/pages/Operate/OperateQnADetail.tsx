import React, { useState } from "react";
import { Col, Input } from "reactstrap";
import BreadcrumbBase from "src/components/Common/Breadcrumb/BreadcrumbBase";
import { ButtonBase } from "src/components/Common/Button/ButtonBase";
import {
  EditorContentCol,
  EditorTitleCol,
} from "src/components/Common/Editor/EditorCol";
import EditorHeader from "src/components/Common/Editor/EditorHeader";
import EditorRow from "src/components/Common/Editor/EditorRow";
import TextInputBase from "src/components/Common/Input/TextInputBase";
import BodyBase from "src/components/Common/Layout/BodyBase";
import ContainerBase from "src/components/Common/Layout/ContainerBase";
import HeaderBase from "src/components/Common/Layout/HeaderBase";
import TabGroup from "src/components/Common/Tab/TabGroup";
import useImages from "src/hooks/useImages";
import useInputs from "src/hooks/useInputs";
import styled from "styled-components";

const OperateQnADetail = () => {
  const [tabList, setTabList] = useState([{ label: "Q&A" }]);
  const [selectedIndex, setSelectedIndex] = useState("0");
  /* 수정 비활성화 여부 */
  const [disabled, setDisabled] = useState(true);
  /* 회원이 입력한 정보 (변경X) */
  const {
    regDate,
    category,
    userName,
    userId,
    answerDate,
    answerStatus,
    answerName,
    title,
    contents,
    questionImages,
  } = useInputs({
    regDate: "2022-11-31 12:00:00",
    category: "가입 승인",
    userName: "홍길동",
    userId: "EV123456",
    answerDate: "2022-11-31 12:00:00",
    answerStatus: "답변 완료",
    answerName: "백민규",
    title: "개인정보 처리 방침 변경 안내",
    contents: "안녕하세요! 문의드립니다.",
    questionImages: [
      {
        src: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
      },
    ],
  });
  /* 변경 가능 정보 */
  const { answerContent, onChange } = useInputs({
    answerContent: "안녕하세요! 모빌리티로 통하는 세상 트루입니다.",
  });
  const {
    images: answerImages,
    upload,
    drop,
    dropBlock,
    remove,
  } = useImages([]);

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
            { label: "Q&A", href: "/operate/qna" },
            { label: "Q&A 상세", href: "" },
          ]}
        />
        <div
          className={"mb-4 d-flex align-items-center justify-content-between"}
        >
          <h3 className={"m-0 font-size-24"}>Q&A 상세</h3>
          <div className={"d-flex gap-2"}>
            <ButtonBase
              label={disabled ? "수정하기" : "저장하기"}
              color={"turu"}
              onClick={() => {
                /** @TODO 저장(수정) 로직 추가 */

                setDisabled((prev) => !prev);
              }}
            />
          </div>
        </div>

        <EditorRow
          className={
            "pt-4 pb-2 d-flex align-items-center border-top border-bottom-0"
          }
        >
          <EditorContentCol
            className={"d-flex align-items-center gap-5"}
            sm={3}
          >
            <span>등록 일시</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"regDate"}
              value={regDate}
            />
          </EditorContentCol>
          <Col sm={3} />

          <EditorContentCol
            className={"d-flex align-items-center gap-3"}
            sm={2}
          >
            <span>카테고리</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              className={"flex-shirk-1"}
              disabled={true}
              bsSize={"lg"}
              name={"category"}
              value={category}
            />
          </EditorContentCol>

          <EditorContentCol
            className={"d-flex align-items-center gap-3"}
            sm={2}
          >
            <span>회원명</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"userName"}
              value={userName}
            />
          </EditorContentCol>

          <EditorContentCol
            className={"d-flex align-items-center gap-3"}
            sm={2}
          >
            <span>회원 ID</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"userId"}
              value={userId}
            />
          </EditorContentCol>
        </EditorRow>
        <EditorRow className={"d-flex align-items-center pb-4"}>
          <EditorContentCol
            className={"d-flex align-items-center gap-5"}
            sm={3}
          >
            <span>답변 일시</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"answerDate"}
              value={answerDate}
            />
          </EditorContentCol>
          <Col sm={3} />

          <EditorContentCol
            className={"d-flex align-items-center gap-3"}
            sm={2}
          >
            <span>답변 상태</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"answerStatus"}
              value={answerStatus}
            />
          </EditorContentCol>

          <EditorContentCol
            className={"d-flex align-items-center gap-3"}
            sm={2}
          >
            <span>답변자</span>
            <TextInputBase
              inputstyle={{ flex: 1 }}
              disabled={true}
              bsSize={"lg"}
              name={"answerName"}
              value={answerName}
            />
          </EditorContentCol>

          <Col sm={3} />
        </EditorRow>
        <EditorHeader
          className={"pb-3"}
          label={"문의 제목"}
          name={"title"}
          value={title}
          disabled={true}
        />

        <EditorRow className={"border-bottom-0 pb-3"}>
          <EditorTitleCol>문의 내용</EditorTitleCol>
          <EditorContentCol>
            <TextInputBase
              disabled={true}
              className={"rounded-0 border-0 bg-white"}
              inputstyle={{ height: 300 }}
              name={"contents"}
              value={contents}
              type={"textarea"}
            />
          </EditorContentCol>
        </EditorRow>

        <EditorRow className={"pb-3"}>
          <EditorTitleCol>이미지</EditorTitleCol>
          <EditorContentCol className={"d-flex gap-2"}>
            {questionImages.length > 0 ? (
              questionImages.map((image, index) => (
                <Image key={index} className={"rounded"} src={image.src} />
              ))
            ) : (
              <EmptyImage
                className={
                  "d-flex justify-content-center align-items-center " +
                  "bg-light bg-opacity-50 rounded " +
                  "font-size-14 fw-normal"
                }
              >
                없음
              </EmptyImage>
            )}
          </EditorContentCol>
        </EditorRow>

        <EditorRow className={"border-bottom-0 pb-3"}>
          <EditorTitleCol>답변 내용</EditorTitleCol>
          <EditorContentCol>
            <TextInputBase
              disabled={disabled}
              className={"rounded-0 border-0 bg-white"}
              inputstyle={{ height: 300 }}
              type={"textarea"}
              name={"answerContent"}
              value={answerContent}
              onChange={onChange}
              placeholder={"내용을 입력해주세요"}
            />
          </EditorContentCol>
        </EditorRow>
        <EditorRow className={"pb-3"}>
          <EditorTitleCol>이미지</EditorTitleCol>
          <EditorContentCol
            className={"d-flex flex-wrap gap-4"}
            onDragOver={(e) => e.preventDefault()}
            onDrop={disabled ? dropBlock : drop}
          >
            <>
              {answerImages.length > 0
                ? answerImages.map((image, index) => (
                    <div
                      key={index}
                      style={{ height: 100 }}
                      className={"d-flex position-relative flex-wrap"}
                    >
                      <Image className={"rounded"} src={image.src} />

                      {!disabled && (
                        <Icon
                          className={
                            "position-absolute top-0 start-100 " +
                            "translate-middle font-size-24 mdi mdi-close"
                          }
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      )}
                    </div>
                  ))
                : null}
              <EmptyImage
                className={
                  "d-flex justify-content-center align-items-center " +
                  "bg-light bg-opacity-50 rounded " +
                  "font-size-14 fw-normal"
                }
                onClick={() => {
                  if (!disabled) {
                    document.getElementById("images")?.click();
                  }
                }}
              >
                {answerImages.length === 0 ? "없음" : "추가"}
              </EmptyImage>

              <Input
                className={"visually-hidden"}
                multiple
                type={"file"}
                id={"images"}
                name={"images"}
                accept={"image/*"}
                onChange={upload}
              />
            </>
          </EditorContentCol>
        </EditorRow>
      </BodyBase>
    </ContainerBase>
  );
};

export default OperateQnADetail;

const Image = styled.img`
  height: 100px;
  object-fit: cover;
`;
const Icon = styled.i`
  :hover {
    cursor: pointer;
  }
`;
const EmptyImage = styled.div`
  width: 100px;
  height: 100px;

  :hover {
    cursor: pointer;
  }
`;
