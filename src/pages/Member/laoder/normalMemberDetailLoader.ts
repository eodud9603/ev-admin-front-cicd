import { getNormalMemberDetail,  } from "src/api/member/memberApi";
import { IRequestNormalMemberDetail } from "src/api/member/memberApi.interface";

export const normalMemberDetailLoader = async ({ params }: {params: Partial<IRequestNormalMemberDetail>}) => {
  const { id } = params;
  if(!id) {
    return null;
  }
  
  /* 상세 조회  */
  const { code, data } = await getNormalMemberDetail({ id });
  /** 성공 */
  const success = code === "SUCCESS" && !!data;

  return success ? data : null;
};
