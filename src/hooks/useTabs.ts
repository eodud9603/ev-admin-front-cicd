import { useCallback, useEffect } from "react";
import { ICommonListResProps, useTabStore } from "src/store/tabStore";
import { useLocation } from "react-router-dom";

interface IUseTabsProps {
  //페이지 데이터
  data: ICommonListResProps | { [key: string]: any } | null | undefined;
  //탭 명칭
  pageTitle: string;
  //페이지 형태 ( 없을 경우 리스트 페이지 )
  pageType?: "detail" | "registration" | "add";
  inputData?: any;
}
export const useTabs = (props: IUseTabsProps) => {
  const { pathname } = useLocation();
  const { data, pageTitle, pageType, inputData } = props;
  const tabStore = useTabStore();
  const tabStoreData = tabStore.data;

  useEffect(() => {
    const index = tabStore.data.findIndex((e) => pathname.includes(e.path));
    const saveData = {
      data: data,
      label: pageTitle,
      path: pathname,
      rootPath: pageType ? pathname.split(`/${pageType}`)[0] : pathname,
    };
    //데이터 로딩 시 타임아웃에 걸려 데이터를 가져오지 못한 경우 데이터를 가져왔을때 change 처리
    if (data && !tabStore?.data[index]?.data && !pageType && index > -1) {
      tabStore.changeData(pathname, saveData);
    } else if (pageType && index > -1) {
      //리스트 페이지가 아니고 데이터가 있을때
      tabStore.changeData(pathname, saveData);
    } else if (!pageType && index < 0) {
      //리스트 페이지이고 데이터가 없을때
      tabStore.setData(saveData);
    }

    //탭 활성화
    tabStore.setActive(pathname);
  }, []);

  const changeTabData = useCallback(
    ({ data }: Pick<IUseTabsProps, "data">) => {
      const index = tabStore.data.findIndex((e) => pathname.includes(e.path));

      const saveData = {
        data: data,
        label: pageTitle,
        path: pathname,
        rootPath: pageType ? pathname.split(`/${pageType}`)[0] : pathname,
      };
      //데이터 로딩 시 타임아웃에 걸려 데이터를 가져오지 못한 경우 데이터를 가져왔을때 change 처리
      if (data && !tabStore?.data[index]?.data && !pageType && index > -1) {
        tabStore.changeData(pathname, saveData);
      } else if (pageType && index > -1) {
        //리스트 페이지가 아니고 데이터가 있을때
        tabStore.changeData(pathname, saveData);
      } else if (!pageType && index < 0) {
        //리스트 페이지이고 데이터가 없을때
        tabStore.setData(saveData);
      }

      //탭 활성화
      tabStore.setActive(pathname);
    },
    [tabStore]
  );

  return {
    changeTabData,
    tabStoreData,
  };
};
