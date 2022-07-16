import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserModel } from "../../models";
import User from "../../components/user";
import axios from 'axios';
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const route = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;

  const { data, error } = useSWR(route, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const user: UserModel = data;

  return <User {...user} />;
}

export default UserPage;