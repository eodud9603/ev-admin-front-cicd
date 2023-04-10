import { getManufactureDetail } from "src/api/manufactures/manufactureApi";
import { IRequestManufactureDetail } from "src/api/manufactures/manufactureApi.interface";

export const manufactureDetailLoader = async ({ params }: {params: IRequestManufactureDetail}) => {
  if(!params?.id) {
    return;
  }
   /* 상세 조회  */
   const { code, data } = await getManufactureDetail({ id: params.id });
   /** 조회 성공 */
   const success = code === "SUCCESS" && !!data;
 
   return success ? data : null;
};
