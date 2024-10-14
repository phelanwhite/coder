import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Type = {
  user: any;
  getMe: () => any;
  updateProfile: (data: any) => any;
  loggin: (data: any) => any;
  logginWithPassportSuccess: () => any;
  loggout: () => any;
  isAuthenticated: boolean;
};

export const useAuthStore = create<Type>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loggin: async (data) => {},
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
      logginWithPassportSuccess: async () => {
        const url = `/passport/signin-passport/success`;
        const response = (await axiosConfig.get(url)).data;

        set({
          user: response.data,
          isAuthenticated: true,
        });
        if (response) {
          localStorage.setItem(`_tracking_id`, response.data?._id);
        }
        window.location.reload();
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
