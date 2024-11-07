import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Type = {
  user: any;
  getMe: () => any;
  updateProfile: (data: any) => any;
  changePassword: (data: any) => any;
  signup: (data: any) => any;
  signin: (data: any) => any;
  logginWithPassportSuccess: () => any;
  loggout: () => any;
  isAuthenticated: boolean;
};

export const useAuthStore = create<Type>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      signup: async (data) => {
        const url = `/auth/signup`;
        const response = await (await axiosConfig.post(url, data)).data;
        return response;
      },
      signin: async (data) => {
        const url = `/auth/signin`;
        const response = await (await axiosConfig.post(url, data)).data;
        response.data && set({ user: response.data, isAuthenticated: true });
        return response;
      },
      getMe: async () => {
        const url = `/auth/get-me`;
        const response = await (await axiosConfig.get(url)).data;
        set({ user: { ...get().user, ...response.data } });
        return response;
      },
      updateProfile: async (data) => {
        const url = `/auth/update-profile`;
        const response = await (await axiosConfig.put(url, data)).data;
        set({ user: { ...get().user, ...response.data } });
        return response;
      },
      changePassword: async (data) => {
        const url = `/auth/change-password`;
        const response = await (await axiosConfig.put(url, data)).data;
        return response;
      },
      logginWithPassportSuccess: async () => {
        const url = `/passport/signin-passport/success`;
        const response = (await axiosConfig.get(url)).data;
        if (response?.status === 200) {
          set({
            user: response.data,
            isAuthenticated: true,
          });
          if (response) {
            localStorage.setItem(`_tracking_id`, response.data?._id);
          }
        } else {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
      loggout: async () => {
        const url = `/auth/signout`;
        const response = await axiosConfig.delete(url);
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem(`_tracking_id`);

        window.location.reload();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
