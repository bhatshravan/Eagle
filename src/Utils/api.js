import axios from "axios";

import { useQuery } from "react-query";

export const API = axios.create({
  baseURL: "https://trade.bitstreak.in",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function fetchData(method, url, data) {
  const { apiData } = await API({
    method: method,
    url: url,
    data: data,
  });
  return apiData;
}

export function useLocalCall(query, method, url, dataInput={}) {
  return useQuery(
    query,
    async () => {
      const { data } = await API({
        method,
        url,
        data: dataInput,
      });
      return data;
    }
  );
}
export function useApiCall(query, method, url, dataInput={},options={}) {
  return useQuery(
    query,
    async () => {
      const { data } = await API({
        method,
        url,
        data: dataInput,
      });
      return data;
    },
    options
  );
}

export async function runAxios(method, url, data) {
  let resp = await API({
    method: method,
    url: url,
    data: data,
    headers: { Authorization: `Bearer ${localStorage.getItem("Auth")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return { status: "error" };
    });
  return resp;
}
