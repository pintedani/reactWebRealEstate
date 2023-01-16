import config from "../config";
import { useEffect, useState } from "react";
import { House } from "../types/house";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Problem from "../types/problem";


const useFetchHouses = ()=>{
    // const [houses, setHouses] = useState<House[]>([]);

    // useEffect(() => {
    //     const fetchHouses = async () => {
    //         const rsp = await fetch(`${config.baseApiUrl}/houses`);
    //         const houses = await rsp.json();
    //         setHouses(houses);
    //     }
    
    //     fetchHouses();
    // }, []);

    // return houses;

    return useQuery<House[], AxiosError>("houses", () =>
    axios.get(`${config.baseApiUrl}/houses`).then(
        (resp) => resp.data)
        );
}

const useFetchHouse = (id: number) => {
    return useQuery<House, AxiosError>(["houses", id], () =>
      axios.get(`${config.baseApiUrl}/house/${id}`).then((resp) => resp.data)
    );
  };


  const useAddHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, House>(
      (h) => axios.post(`${config.baseApiUrl}/houses`, h),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("houses");
          nav("/");
        },
      }
    );
  };
  
  const useUpdateHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError<Problem>, House>(
      (h) => axios.put(`${config.baseApiUrl}/houses`, h),
      {
        onSuccess: (_, house) => {
          queryClient.invalidateQueries("houses");
          nav(`/house/${house.id}`);
        },
      }
    );
  };
  
  const useDeleteHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, House>(
      (h) => axios.delete(`${config.baseApiUrl}/houses/${h.id}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("houses");
          nav("/");
        },
      }
    );
  };
  

export default useFetchHouses;
export { useFetchHouse, useAddHouse,
  useUpdateHouse,
  useDeleteHouse }