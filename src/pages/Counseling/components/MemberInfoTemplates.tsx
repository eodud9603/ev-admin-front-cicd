import React, { ChangeEvent, useState } from "react";
import { DetailTextRow } from "src/components/Common/DetailContentRow/DetailTextRow";
import {
  DetailContentCol,
  DetailLabelCol,
  DetailRow,
} from "src/components/Common/DetailContentRow/Detail";

export const MemberInfoTemplate = () => {
  return (
    <>
      <DetailTextRow
        rows={[
          { title: "이름", content: "홍길동" },
          { title: "회원 ID", content: "hong" },
        ]}
      />
      <DetailTextRow
        rows={[
          { title: "생년월일", content: "0000.00.00" },
          { title: "성별", content: "남성" },
        ]}
      />
      <DetailTextRow
        rows={[
          { title: "휴대전화", content: "000-0000-0000" },
          { title: "회원등급", content: "정회원" },
        ]}
      />
      <DetailTextRow rows={[{ title: "이메일", content: "Hh@humax.co.kr" }]} />
      <DetailTextRow
        rows={[{ title: "회원카드번호", content: "0000000000" }]}
      />
      <DetailTextRow
        rows={[
          { title: "그룹정보", content: "휴맥스" },
          { title: "사원번호", content: "111111" },
        ]}
      />
      <DetailTextRow rows={[{ title: "주소", content: "경기도 성남시" }]} />
    </>
  );
};

interface INonMemberInfoTemplate {
  // name?: string;
  historySearch: () => void;
}
export const NonMemberInfoTemplate = (props: INonMemberInfoTemplate) => {
  const { historySearch } = props;
  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <DetailRow>
        <DetailLabelCol sm={2}>이름</DetailLabelCol>
        <DetailContentCol>
          {/*<TextInputBase name={"name"} value={} onChange={} />*/}
        </DetailContentCol>
        <DetailLabelCol sm={2}>회원 ID</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
      <DetailRow>
        <DetailLabelCol sm={2}>생년월일</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
        <DetailLabelCol sm={2}>성별</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
      <DetailRow>
        <DetailLabelCol sm={2}>휴대전화</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
        <DetailLabelCol sm={2}>회원등급</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
      <DetailRow>
        <DetailLabelCol sm={2}>이메일</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
      <DetailRow>
        <DetailLabelCol sm={2}>
          <span>
            개인정보 <br />
            이용/저장 동의
          </span>
        </DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
      <DetailRow>
        <DetailLabelCol sm={2}>동의 일시</DetailLabelCol>
        <DetailContentCol></DetailContentCol>
      </DetailRow>
    </>
  );
};
