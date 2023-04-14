import { useEffect } from "react";
import { ICommonListResProps, useTabStore } from "src/store/tabStore";
import { useLocation } from "react-router-dom";

interface IUseTabsProps {
  data: ICommonListResProps | { [key: string]: any } | null;
  pageTitle: string;
  pageType?: "detail" | "registration" | "add";
}
export const useTabs = (props: IUseTabsProps) => {
  const { pathname } = useLocation();
  const { data, pageTitle, pageType } = props;
  const tabStore = useTabStore();

  useEffect(() => {
    const index = tabStore.data.findIndex((e) => pathname.includes(e.path));
    const saveData = {
      data: data,
      label: pageTitle,
      path: pathname,
      rootPath: pageType ? pathname.split(`/${pageType}`)[0] : pathname,
    };

    if (pageType && index > -1) {
      tabStore.changeData(pathname, saveData);
    } else if (!pageType && index < 0) {
      tabStore.setData(saveData);
    }
    tabStore.setActive(pathname);
  }, []);
};
