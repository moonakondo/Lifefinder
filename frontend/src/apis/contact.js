import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";

export const useContact = () => 
    useMutation({
        mutationFn: async (props) => (await axios.post("/contactAdmin", props)).data,
    });