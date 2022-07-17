import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "../../components/container";
import UserItem from "../../components/userItem";
import useUser from "../../hooks/useUser";
import { ItemModel, UserModel } from "../../models";
import { getItem } from "../../utils/hackerNewsCalls";
import { useState } from "react";
import UserInfo from "../../components/userInfo";
import UserCircleAndName from "../../components/userCircleAndName";

const UserPage: NextPage = () => {
  const [itemCount, setItemCount] = useState(10);
  const [incrementBy, setIncrementBy] = useState(10);

  const router = useRouter();

  let { id } = router.query;
  id = id as string;

  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const hasPosts = (): boolean => {
    if (user.submitted && user.submitted.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <Container>
      <div className="space-y-8 max-w-full">
        
        <UserCircleAndName id={user.id} />

        <UserInfo 
          about={user.about}
          created={user.created}
          karma={user.karma}
          numPosts={user.submitted ? user.submitted.length : 0} 
        />        
      
        <div className="text-xl flex items-center justify-between">
          {/* Most Recent Posts Count */}
          <p>
            <span className="bg-indigo-100 text-indigo-500 font-bold px-2 py-1 rounded-lg shadow-inner">{itemCount}</span> most recent posts:
          </p>

          {/* Increment */}
          <div className="flex items-baseline">
            <p className="mr-3">Increment by</p>
            <div className="bg-indigo-100 text-indigo-500 font-bold p-1 rounded-full shadow-inner flex space-x-5">
              <button onClick={() => setIncrementBy(10)} className={incrementBy === 10 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>10</button>
              <button onClick={() => setIncrementBy(20)} className={incrementBy === 20 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>20</button>
              <button onClick={() => setIncrementBy(50)} className={incrementBy === 50 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>50</button>
              <button onClick={() => setIncrementBy(100)} className={incrementBy === 100 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>100</button>
            </div>
          </div>
        </div>

        <button 
            className="shadow hover:shadow-lg px-3 py-1 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
            onClick={() => console.log(itemCount)}
          >
              Show next {incrementBy} posts
            </button>

        {/* <div className="flex flex-col items-start space-y-3">
          <div className="flex">
            <p className="text-xl"><span className="bg-indigo-100 text-indigo-500 font-bold px-2 py-1 rounded-lg shadow-inner">{itemCount}</span> most recent posts:</p>
            <div className="flex items-baseline">
              <p className="text-xl flex items-end">Increment by </p>
              <div className="flex bg-indigo-100 py-1 px-2 justify-around rounded-lg space-x-4">
                <button>10</button>
                <button>20</button>
                <button>50</button>
                <button>100</button>
              </div>
            </div>
          </div>
          <button 
            className="shadow hover:shadow-lg px-3 py-1 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
            onClick={() => console.log(itemCount)}
          >
              Show next {incrementBy} posts
            </button>
        </div> */}
        
        
      </div>
    </Container>
  );
}

export default UserPage;
