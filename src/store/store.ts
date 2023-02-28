import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface BearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      {
        name: "bear-storage1",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

const createFishSlice = () => ({
  fishes: 0,
});

const createBearSlice = () => ({
  bears: 0,
});

export const useBoundStore = create(
  devtools(
    persist(
      (...state) => ({
        ...createBearSlice(...state),
        ...createFishSlice(...state),
      }),
      { name: "asd", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
export { useBearStore };
