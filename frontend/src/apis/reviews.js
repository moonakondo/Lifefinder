import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";

export const useSaveReview = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/addReview", props)).data,
  });

// export const useFetchReviewsByClinicId = (clinic_id) =>
//   useQuery({
//     queryKey: ["reviews", { clinic_id }],
//     queryFn: async () => {
//       const response = await axios.get(`/getReviews/${clinic_id}`);
//       return response.data;
//     },
//   });

export const useFetchReviewsByClinicId = (clinic_id) =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: async () => (await axios.get(`/getReviews/${clinic_id}`)).data,
  });


export const useFetchReviewsByClinicIdConditional = (clinic_id) =>
  useQuery({
    queryKey: ["reviews"],
    queryFn: async () => (await axios.get(`/get/review`, { params: clinic_id })).data,
  });