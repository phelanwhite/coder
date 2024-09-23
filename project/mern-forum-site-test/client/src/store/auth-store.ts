import axiosConfig from "@/config/axios-config";
import { create } from "zustand";
import { createJSONStorage, persist, devtools } from "zustand/middleware";

type Type = {
  user: any;
  signinWithPassportSuccess: () => any;
  signout: () => any;
  updateProfile: (data: any) => any;
};

export const useAuthStore = create<Type>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        signinWithPassportSuccess: async () => {
          const url = `/passport/signin-passport/success`;
          const response = (await axiosConfig.get(url)).data;
          set({
            user: response.data,
          });
          return response;
        },
        signout: async () => {
          const url = `/auth/signout`;
          const response = await axiosConfig.delete(url);
          set({ user: null });
          return response;
        },
        updateProfile: async (data) => {
          const url = `/auth/update-profile`;
          const response = (await axiosConfig.put(url, data)).data;
          set({
            user: response.data,
          });
          return response;
        },
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
