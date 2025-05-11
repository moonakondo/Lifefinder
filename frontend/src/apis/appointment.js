import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";

export const useAppointment = () => 
    useMutation({
        mutationFn: async (props) => (await axios.post("/addAppointment", props)).data,
    });

export const useGetAppointments = (clinicId) =>
    useQuery({
    queryKey: ["appointments"],
    queryFn: async () => (await axios.get(`/meetings/${clinicId}`)).data,
    // mutationFn: async (props) => (await axios.post("/getAppointments", props)).data,
});