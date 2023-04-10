import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type tabType = {
  // seq: number;
  index?: number;
  label: string;
  path: string;
  data: any | null;
  rootPath?: string;
};
export interface ITabState {
  data: Array<tabType>;
  active: string;
  setData: (tabType: tabType) => void;
  setActive: (path: string) => void;
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
        setActive: (path) => set(() => ({ active: path })),
      }),
      {
        name: "tab-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
