import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IAuthProps {
  accessToken: string;
  refreshToken: string;
  expiredTime: string;
}

interface IAuthStoreState extends IAuthProps {
  setAuth: (info: IAuthProps) => void;
  initAuth: () => void;
}

const useAuthStore = create<IAuthStoreState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: "",
        refreshToken: "",
        expiredTime: "",
        setAuth: (auth) => {
          set((state) => ({ ...state, ...auth }));
        },
        initAuth: () => {
          set(() => ({
            accessToken: "",
            refreshToken: "",
            expiredTime: "",
          }));
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAuthStore;
