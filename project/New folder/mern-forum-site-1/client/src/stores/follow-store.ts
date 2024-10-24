import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  following: number;
  followers: number;
  followingUnfollowing: (authorId: string) => any;
  getFollower: (followerId: string) => any;
  getFollowing: (followingId: string) => any;
};

export const useFollowStore = create<Type>()((set) => ({
  followers: 0,
  following: 0,
  followingUnfollowing: async (authorId) => {
    const url = `follow/following-unfollowing?followingId=${authorId}`;
    const response = (await axiosConfig.post(url)).data;
    console.log({ response });

    return response;
  },
  getFollower: async (followerId) => {
    const url = `follow/get-all-follower?followerId=${followerId}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      followers: response?.data?.total_row,
    });
    return response;
  },
  getFollowing: async (followingId) => {
    const url = `follow/get-all-following?followingId=${followingId}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      following: response?.data?.total_row,
    });
    return response;
  },
}));
