import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

export const useGetClinics = () =>
  useQuery({
    queryKey: ["clinics"],
    queryFn: async () => (await axios.get("/get/clinics")).data,
  });

export const useGetLatestClinics = () =>
  useQuery({
    queryKey: ["clinics_latest"],
    queryFn: async () => (await axios.get("/latest/clinics")).data,
  });

export const useGetSearchOptions = () =>
  useQuery({
    queryKey: ["clinics_search_otpions"],
    queryFn: async () => (await axios.get("/clinic/categories/search")).data,
  });

export const useGetClinicsById = (_id) =>
  useQuery({
    queryKey: ["clinics", { _id }],
    queryFn: async () => {
      const response = await axios.get(`/clinic/${_id}`);
      return response.data;
    },
  });

export const useGetClinicsBySearch = ({ start, searchParams }) =>
  useQuery({
    queryKey: ["clinics", { start, searchParams }],
    queryFn: async () => {
      try {
        const response = await axios.get("/clinics/search", {
          params: {
            start,
            ...searchParams,
            limit: 12,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching clinics:", error);
        throw new Error("Failed to fetch clinics");
      }
    },
  });

export const useGetAvailableCountries = ({ searchString }) =>
  useQuery({
    queryKey: ["clinics", { searchString }],
    queryFn: async () => {
      try {
        const response = await axios.get("/get/country", {
          params: {
            searchString,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching clinics:", error);
        throw new Error("Failed to fetch clinics");
      }
    },
  });
