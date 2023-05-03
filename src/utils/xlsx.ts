import { standardDateFormat } from "src/utils/day";

/** 다운로드한 blob 데이터 형식 -> xlsx형식으로 다운 */
export const blobToExcel = (data: Blob, name: string) => {
  const url = URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    name ?? `${standardDateFormat(undefined, "YYYY_MM_DD_HH_mm_ss")}.xlsx`
  );
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
};
