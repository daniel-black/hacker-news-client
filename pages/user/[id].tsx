import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "../../components/container";
import UserItem from "../../components/userItem";
import useUser from "../../hooks/useUser";
import { ItemModel, UserModel } from "../../models";

const UserPage: NextPage = () => {

  const router = useRouter();
  let { id } = router.query;
  id = id as string;

  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

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
        <UserItem />
        {/* <p>Posts: [{user.submitted?.toString()}]</p> */}
        
      </div>
    </Container>
  );
}

export default UserPage;
