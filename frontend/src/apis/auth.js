import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";

export const UseLoginUser = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/login", props)).data,
  });

export const UseSignupUser = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/register", props)).data,
  });

export const UseEditUser = () =>
  useMutation({
    mutationFn: async ({ _id, ...rest }) =>
      await axios.put(`/user/${_id}`, rest),
  });

export const UseUploadImage = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/upload", props)).data,
  });

export const useSendOtp = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/sendOtp", props)).data,
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/verifyOtp", props)).data,
  });

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/updatePassword", props)).data,
  });

export const useGetAdmin = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: async () => (await axios.get("/admins")).data,
  });

export const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axios.get("/users")).data,
  });

export const useGetUserById = (_id) =>
  useQuery({
    queryKey: ["users", { _id }],
    queryFn: async () => {
      const response = await axios.get(`/user/${_id}`);
      return response.data;
    },
  });
