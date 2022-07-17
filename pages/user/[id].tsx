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
      <div className="flex items-start border-b-2 border-dashed border-slate-300 pb-2 mb-2">
        <span>✨&nbsp;</span>
        <span dangerouslySetInnerHTML={{ __html: user.about }}></span>
      </div>
      
    );
  }

  return (
    <Container>
      <div className="space-y-8 max-w-full">
        <div className="flex">
          <div className="h-32 w-32 rounded-full mr-5 bg-gradient-to-br from-rose-200 to-indigo-400 shadow-lg"></div>
          <p className="text-8xl font-bold flex items-center">{user.id}</p>
        </div>
        <div className="bg-slate-200/70 text-xl py-3 px-6 rounded-xl max-w-fit shadow-inner">
          {renderAbout()}
          <p>📅 Joined in {new Date(user.created * 1000).getFullYear()}</p>
          <p>🔼 {user.karma} Karma</p>
        </div>
        {/* <p>Posts: [{user.submitted?.toString()}]</p> */}
      </div>
    </Container>
  );
}

export default UserPage;