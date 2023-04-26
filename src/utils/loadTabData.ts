import { tabType } from "src/store/tabStore";

export const loadTabData = <T,>(path: string) => {
  const tabStorage: string | null = sessionStorage.getItem("tab-storage");

  const tabData: Array<tabType> =
    JSON.parse(tabStorage ?? "")?.state?.data?.filter(
      (e: tabType) => e.path === path
    ) ?? [];
  if (tabData && tabData.length > 0) {
    const data: T = tabData[0].data;

    return { data: data, editable: tabData[0].editable as boolean };
  }
};
