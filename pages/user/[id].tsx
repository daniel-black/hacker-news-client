import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserModel } from "../../models";
// import User from "../../components/user";
import axios from 'axios';
import useSWR from "swr";
import Container from "../../components/container";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const UserPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const route = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;

  const { data, error } = useSWR(route, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const user: UserModel = data;

  const renderAbout = () => {
    if (!user.about) return null;

    return (
      <p className="italic text-xl">"{user.about}"</p>
    );
  }

  return (
    <Container>
      <div className="bg-slate-200 p-3 rounded-xl space-y-8 max-w-full">
        <div className="flex">
          <div className="h-32 w-32 rounded-full mr-3 bg-gradient-to-br from-rose-200 to-indigo-400 shadow-lg"></div>
          <p className="text-8xl font-bold flex items-center">{user.id}</p>
        </div>
        {renderAbout()}
        <p>Joined: {new Date(user.created * 1000).toLocaleDateString()}</p>
        <p>Karma: {user.karma}</p>
        <p>Posts: [{user.submitted?.toString()}]</p>
      </div>
    </Container>
  );
}

export default UserPage;