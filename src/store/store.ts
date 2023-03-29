import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IBearState {
  bears: number;
  increase: () => void;
}

const useBearStore = create<IBearState>()(
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

interface IMapState {
  /* 줌 */
  zoom: number
  setZoom: (zoom: number) => void
  /* 위/경도 */
  setLocation: (location: {lat: number; long: number}) => void
  /* 마커 */
  createMarker?: () => void
  setMarker: (func: any) => void
  /* init */
  initMap: () => void
}
const useMapStore = create<IMapState>()(
  devtools(
    persist(
      (set) => ({
        zoom: 17,
        setZoom: (zoom) => {
          set((state) => ({ ...state, zoom: state.zoom + zoom }));
        },
        setLocation: (location) => set((state) => ({ ...state, location })),
        createMarker: undefined,
        setMarker: (func) => set((state) => ({ ...state, createMarker: func })),
        initMap: () => {
          set((state) => ({ ...state, zoom: 17, createMarker: undefined }));
        },
      }),
      {
        name: "map-storage",
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
export { useBearStore, useMapStore };
