import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type tabType = {
  // seq: number;
  index?: number;
  /**  탭 명칭 */
  label: string;
  /**  현재 페이지 경로 */
  path: string;
  data: any | null;
  /**  인덱스 (리스트) 페이지 경로 */
  rootPath: string;
  /**  수정 여부 데이터 */
  editable?: boolean;
  filterData?: { [key: string]: string };
};
export interface ITabState {
  data: Array<tabType>;
  active: string;
  setActive: (path: string) => void;
  /** tab data 추가 */
  setData: (tabType: tabType) => void;
  /** tab data 삭제 */
  removeData: (path: string) => void;
  /** tab data 변경 */
  changeData: (path: string, tabData: tabType) => void;
}
export interface ICommonListResProps {
  elements: Array<any>;
  totalElements: number;
  totalPages: number;
}

export const useTabStore = create<ITabState>()(
  devtools(
    persist(
      (set) => ({
        active: "",
        data: [],
        setData: (data) => {
          set((state) => ({ data: [...(state.data ?? []), { ...data }] }));
        },
        removeData: (path: string) => {
          set((state) => {
            const arr = JSON.parse(JSON.stringify(state.data));

            return { data: arr.filter((e: tabType) => !e.path.includes(path)) };
          });
        },
        changeData: (path: string, tabData) => {
          set((state) => {
            const arr = JSON.parse(JSON.stringify(state.data));
            const index = arr.findIndex((e: tabType) => {
              return path.includes(e.rootPath);
            });
            arr[index] = arr[index]?.rootPath && {
              ...tabData,
              rootPath: arr[index].rootPath,
            };
            return { data: arr };
          });
        },
        setActive: (path) => set(() => ({ active: path })),
      }),
      {
        name: "tab-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
