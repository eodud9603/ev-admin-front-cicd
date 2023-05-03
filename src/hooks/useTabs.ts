import { useCallback, useEffect, useRef } from "react";
import { ICommonListResProps, useTabStore } from "src/store/tabStore";
import { useLocation } from "react-router-dom";

interface IUseTabsProps {
  //페이지 데이터
  data: ICommonListResProps | { [key: string]: any } | null | undefined;
  //탭 명칭
  pageTitle: string;
  //페이지 형태 ( 없을 경우 리스트 페이지 )
  pageType?: "detail" | "registration" | "add";
  //등록 페이지 => 수정 state 변환 시 해당 state 저장
  editable?: boolean;
  filterData?: { [key: string]: string };
}
export const useTabs = ({
  data,
  pageTitle,
  pageType,
  editable = false,
  filterData,
}: IUseTabsProps) => {
  const { pathname } = useLocation();
  const tabStore = useTabStore();

  const index = tabStore.data.findIndex((e) => pathname.includes(e.path));
  const saveData = {
    data: data,
    label: pageTitle,
    path: pathname,
    rootPath: pageType ? pathname.split(`/${pageType}`)[0] : pathname,
    editable: editable,
    filterData: filterData,
  };

  const dataRef = useRef(data);
  const filterRef = useRef(filterData);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    filterRef.current = filterData;
  }, [filterData]);

  useEffect(() => {
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

  useEffect(() => {
    /** 업데이트된 데이터 정보 가져오기 */
    return () => {
      /* unmounted 시점 최신 데이터 저장 */
      if (pageType && index > -1) {
        tabStore.changeData(pathname, { ...saveData, data: dataRef.current });
      } else if (index > -1) {
        tabStore.changeData(pathname, {
          ...saveData,
          filterData: filterRef.current,
        });
      }
    };
  }, [tabStore.data.length, saveData.editable]);

  // 검색 시 데이터 저장
  const searchDataStorage = useCallback((data: any) => {
    saveData.data = data;
    tabStore.changeData(pathname, saveData);
  }, []);

  return {
    searchDataStorage,
  };
};
