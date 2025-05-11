import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "../services/axios";

export const useBooking = () =>
  useMutation({
    mutationFn: async (props) => (await axios.post("/addBooking", props)).data,
  });

export const useGetBookings = (clinicId) =>
  useQuery({
    queryKey: ["bookings"],
    queryFn: async () => (await axios.get(`/getBookings/${clinicId}`)).data,
    // mutationFn: async (props) => (await axios.post("/getBookings", props)).data,
  });

export const useDeleteBooking = () =>
  useMutation({
    mutationFn: async (id) => (await axios.delete(`/deleteBooking/${id}`)).data,
  });
