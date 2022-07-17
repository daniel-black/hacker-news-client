import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "../../components/container";
import UserItem from "../../components/userItem";
import useUser from "../../hooks/useUser";
import { ItemModel, UserModel } from "../../models";
import { getAllItems, getItem } from "../../utils/hackerNewsCalls";
import { useState } from "react";
import UserInfo from "../../components/userInfo";
import UserCircleAndName from "../../components/userCircleAndName";
import { useEffect } from "react";

const UserPage: NextPage = () => {
  // Grab user id
  const router = useRouter();
  let { id } = router.query;
  id = id as string;

  // Get user 
  const { user, isLoading, isError } = useUser(id);

  // Handle use error and loading state
  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  // Setup itemCount and incrementBy state
  // const [itemCount, setItemCount] = useState(10);
  // const [incrementBy, setIncrementBy] = useState(10);


  // Concretize values
  const numPosts = user.submitted?.length || 0;
  const hasPosts = (): boolean => numPosts > 0;
  // if (numPosts < itemCount) setItemCount(numPosts);

  // useEffect(() => {
  //   const itemIds = user.submitted as number[];
  //   const x = getAllItems(itemIds);
  //   console.log(x);
  // }, 
  // [user, isLoading, isError]);

  // const renderIncrementSelectorBar = () => (
  //   <div className="flex items-baseline">
  //     <p className="mr-3">Increment by</p>
  //     <div className="bg-indigo-100 text-indigo-500 font-bold p-1 rounded-full shadow-inner flex space-x-5">
  //       <button onClick={() => setIncrementBy(10)} className={incrementBy === 10 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>10</button>
  //       <button onClick={() => setIncrementBy(20)} className={incrementBy === 20 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>20</button>
  //       <button onClick={() => setIncrementBy(50)} className={incrementBy === 50 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>50</button>
  //       { numPosts > 100 ? <button onClick={() => setIncrementBy(100)} className={incrementBy === 100 ? 'bg-indigo-500 text-white rounded-full px-2 py-1' : 'hover:bg-indigo-400 hover:text-white rounded-full px-2 py-1 duration-100'}>100</button> : null }
  //     </div>
  //   </div>
  // );


  // const renderItems = () => {
  //   const itemIds = user.submitted as number[];
  //   const items =  await getAllItems(itemIds);
  //   console.log(items);
    
  //   return (
  //     <p>items</p>
  //   );
  // }

  return (
    <Container>
      <div className="space-y-8 max-w-full">
        <UserCircleAndName id={user.id} />
        <UserInfo 
          about={user.about}
          created={user.created}
          karma={user.karma}
          numPosts={numPosts} 
        />       

        {/* <div className="text-xl flex items-center justify-between">
          <p>
            <span className="bg-indigo-100 text-indigo-500 font-bold px-2 py-1 rounded-lg shadow-inner">{itemCount}</span> most recent posts:
          </p>

          {numPosts >= 10 ? renderIncrementSelectorBar() : null }
        </div> */}

        {/* Items go here */}
        {/* {hasPosts() ? await renderItems() : null} */}

        {/* {numPosts > 10 ? 
          (
            <button 
              className="shadow hover:shadow-lg px-3 py-1 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
              onClick={() => console.log(itemCount)}
            >
              Show next {incrementBy} posts
            </button>
          ) : null} */}

      </div>
    </Container>
  );
}

export default UserPage;
