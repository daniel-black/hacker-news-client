import useSWR from "swr";
import axios from 'axios';
import { UserModel } from "../models";

type useUserTypes = { user: UserModel, isLoading: boolean, isError: boolean };

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function useUser(userId: string) {
  const route = `https://hacker-news.firebaseio.com/v0/user/${userId}.json`;
  
  const { data, error } = useSWR(route, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  } as useUserTypes;
}