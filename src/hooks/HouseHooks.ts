import config from "../config";
import { useEffect, useState } from "react";
import { House } from "../types/house";
import {useQuery} from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";


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

  

export default useFetchHouses;
export { useFetchHouse }