import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

export const UseRegisterHospital = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/register/hospital", props)).data,
  });

export const UseLoginHospital = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/login/hospital", props)).data,
  });

export const UseEditHospital = () =>
  useMutation({
    mutationFn: async ({ id, ...rest }) =>
      await axios.put(`/hospital/${id}`, rest),
  });

export const useUpdatePasswordHospital = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/updatePassword/hospital", props)).data,
  });

export const useGetHospital = () =>
  useQuery({
    queryKey: ["hospitals"],
    queryFn: async () => (await axios.get("/hospital")).data,
  });

export const useGetHospitalById = (_id) =>
  useQuery({
    queryKey: ["hospital", { _id }],
    queryFn: async () => {
      const response = await axios.get(`/hospital/${_id}`);
      return response.data;
    },
  });

export const useSendOtpHospital = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/send/otp/hospital", props)).data,
  });

export const useVerifyOtpHospital = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/verify/otp/hospital", props)).data,
  });

export const UseFeedBackClinic = () =>
  useMutation({
    mutationFn: async (props) =>
      (await axios.post("/clinic/feedback", props)).data,
  });

export const useFetchFeedbacksByClinicId = (clinicName) => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => (await axios.get(`/getFeedbacks/${clinicName}`)).data,
  });
};
