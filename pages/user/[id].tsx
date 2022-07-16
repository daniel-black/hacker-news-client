import { NextPage } from "next";
import { useRouter } from "next/router";
import { User } from "../../models";
import axios from 'axios';
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const User: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const route = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;

  const { data, error } = useSWR(route, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const user: User = data;



  return (
    <>
      <p>User: {user.id}</p>
      <p>About: {user.about}</p>
      <p>Joined: {new Date(user.created * 1000).toLocaleDateString()}</p>
      <p>Karma: {user.karma}</p>
      <p>Posts: [{user.submitted?.toString()}]</p>
    </>
  );
}

export default User;