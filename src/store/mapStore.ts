import { StoreNameEnum } from "src/constants/store";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IMapState {
  /* 줌 */
  zoom: number;
  setZoom: (zoom: number) => void;
  /* 위/경도 */
  setLocation: (location: { lat: number; long: number }) => void;
  /* 마커 */
  createMarker?: () => void;
  setMarker: (func: any) => void;
  /* init */
  initMap: () => void;
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
        name: StoreNameEnum.MAP,
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useMapStore;
