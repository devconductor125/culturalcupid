import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface types {
  token: string;
  setToken: (token: string) => void;
}

export const useStore = create<types>()(
  persist(
    set => ({
      token: "",
      setToken: (token: string) => {
        set(state => ({ ...state, token }));
      }
    }),
    {
      name: "main-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
