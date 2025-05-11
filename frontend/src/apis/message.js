import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";

export const UseGetMessages = (props) => {
  const { sender_id, recipient_id } = props || {
    sender_id: "",
    recipient_id: "",
  };
  return useQuery({
    queryKey: ["messages", sender_id, recipient_id],
    queryFn: async () => {
      const response = await axios.get("/messages", {
        params: { sender_id: sender_id, recipient_id },
      });
      return response.data;
    },
    enabled: !!sender_id && !!recipient_id,
  });
};

export const useDeleteMessage = () =>
  useMutation({
    mutationFn: async (_id) => await axios.delete(`/message/delete/${_id}`),
  });

export const useEditMessage = () =>
  useMutation({
    mutationFn: async ({ id, message }) =>
      await axios.put(`/message/edit/${id}`, { message }),
  });
