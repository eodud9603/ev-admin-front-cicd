import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { blogGridData } from "src/common/data/blog";

export type tabType = {
  // seq: number;
  index?: number;
  label: string;
  path: string;
  data: any | null;
  /**  /detail or /registration 과 같이 상세나 등록 페이지가 있을 경우 rootPath 필수 */
  rootPath: string;
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
export interface ICommonResProps {
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
            arr[index] = { ...tabData, rootPath: arr[index].rootPath };
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
