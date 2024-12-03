import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  follows: any[];
  followUnfollow: (data: any) => any;
  //   unfollow: (data: any) => any;
  //   getFollower: (query?: string) => any;
  //   getFollowing: (query?: string) => any;
};

export const useFollowStore = create<Type>()((set, get) => ({
  follows: [],
  followUnfollow: async (data) => {
    const url = `follow/follow-unfollow`;
    const response = (await axiosConfigV1.post(url, data)).data;
    return response;
  },
  //   unfollow: async (data) => {
  //     const url = `follow/unfollow`;
  //     const response = (await axiosConfigV1.post(url, data)).data;
  //     set({
  //       follows: get().follows.filter(
  //         (follow) => follow._id !== response.data._id
  //       ),
  //     });
  //     return response;
  //   },
  //   getFollower: async (query?: string) => {
  //     const url = `follow/get-follower?${query}`;
  //     const response = (await axiosConfigV1.get(url)).data;
  //     set({ follows: response.data });
  //     return response;
  //   },
  //   getFollowing: async (query?: string) => {
  //     const url = `follow/get-follower?${query}`;
  //     const response = (await axiosConfigV1.get(url)).data;
  //     set({ follows: response.data });
  //     return response;
  //   },
}));
