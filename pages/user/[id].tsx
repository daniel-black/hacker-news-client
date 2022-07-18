import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import Item from '../../components/item/item';
import Container from '../../components/structure/container';
import UserCircleAndName from '../../components/user/userCircleAndName';
import UserInfo from '../../components/user/userInfo';
import { ItemModel, UserModel } from '../../models';
import axios from '../../utils/axios';

type UserPageProps = { 
  user: UserModel,
  items: ItemModel[]
};

const UserPage = (props: UserPageProps) => {
  const { user } = props;

  const [items, setItems] = useState(props.items);
  const [itemCount, setItemCount] = useState(props.items.length);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    async function loadItems() {
      const itemIds = user.submitted!.slice(items.length, itemCount);
      const requests = itemIds.map(id => axios.get(`/item/${id}.json`));
      const responses = await Promise.all(requests);

      const newItems: ItemModel[] = responses.map(response => response.data);
      setItems(items.concat(newItems));
      setLoadingItems(false);
    }
    loadItems();
  }, [itemCount]);

  const renderLoadMoreItemsButton = () => {
    const n = 15;

    return(
      <button 
        className="mt-3 tracking-wide shadow hover:shadow-lg px-3 py-2 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
        onClick={() => setItemCount(itemCount + n)}
      >
        Show next {n} posts
      </button>
    );
  }

  const renderSummaryOfItems = () => {
    if (itemCount !== user.submitted!.length) return null;

    const stories = [];
    const askHN = [];
    const showHN = [];
    const comments = [];
    const polls = [];
    const jobs = [];

    items.forEach((item) => {
      if (item.title?.startsWith('Ask HN:')) askHN.push(item);
      if (item.title?.startsWith('Show HN:')) askHN.push(item);
      if (item.type === 'story') stories.push(item);
      if (item.type === 'comment') comments.push(item);
      if (item.type === 'poll') polls.push(item);
      if (item.type === 'job') jobs.push(item);
    });
    
    const realData = (
      <>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-emerald-100 text-emerald-500'><span className='absolute font-mono top-2 left-2'>Stories</span><span className='font-extrabold text-7xl'>{stories.length}</span></div>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-orange-100 text-orange-500'><span className='absolute font-mono top-2 left-2'>Ask HN</span><span className='font-extrabold text-7xl'>{askHN.length}</span></div>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-red-100 text-red-500'><span className='absolute font-mono top-2 left-2'>Show HN</span><span className='font-extrabold text-7xl'>{showHN.length}</span></div>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-pink-100 text-pink-500'><span className='absolute font-mono top-2 left-2'>Comments</span><span className='font-extrabold text-7xl'>{comments.length}</span></div>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-purple-100 text-purple-500'><span className='absolute font-mono top-2 left-2'>Polls</span><span className='font-extrabold text-7xl'>{polls.length}</span></div>
        <div className='p-2 rounded-xl shadow h-32 w-auto flex items-center justify-center relative bg-sky-100 text-sky-500'><span className='absolute font-mono top-2 left-2'>Jobs</span><span className='font-extrabold text-7xl'>{jobs.length}</span></div>
      </>
    );

    const placeHolderStructure = (
      <>
        <div className='animate-pulse p-2 rounded-xl shadow h-32 w-auto space-y-2 bg-emerald-100'><div className='h-4 w-[20%] bg-emerald-400 rounded-full'></div><div className='rounded-xl bg-emerald-400 h-4 ml-8 w-[50%]'></div><div className='rounded-xl bg-emerald-400 h-4 ml-4 w-[80%]'></div><div className='rounded-xl bg-emerald-400 h-4 ml-4 w-[70%]'></div></div>
        <div className='animate-pulse p-2 rounded-xl shadow h-32 w-auto space-y-2 bg-pink-100'><div className='h-4 w-[20%] bg-pink-400 rounded-full'></div><div className='rounded-xl bg-pink-500 h-4 ml-8 w-[50%]'></div><div className='rounded-xl bg-pink-500 h-4 ml-4 w-[80%]'></div><div className='rounded-xl bg-pink-500 h-4 ml-4 w-[70%]'></div></div>
        <div className='animate-pulse p-2 rounded-xl shadow h-32 w-auto space-y-2 bg-purple-100'><div className='h-4 w-[20%] bg-purple-400 rounded-full'></div><div className='rounded-xl bg-purple-400 h-4 ml-8 w-[50%]'></div><div className='rounded-xl bg-purple-400 h-4 ml-4 w-[80%]'></div><div className='rounded-xl bg-purple-400 h-4 ml-4 w-[70%]'></div></div>
        <div className='animate-pulse p-2 rounded-xl shadow h-32 w-auto space-y-2 bg-sky-100'><div className='h-4 w-[20%] bg-sky-400 rounded-full'></div><div className='rounded-xl bg-sky-400 h-4 ml-8 w-[50%]'></div><div className='rounded-xl bg-sky-400 h-4 ml-4 w-[80%]'></div><div className='rounded-xl bg-sky-400 h-4 ml-4 w-[70%]'></div></div>
      </>
    );

    return (
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
        {loadingItems ? placeHolderStructure : realData}
      </div>
    );
  }

  const renderNoItems = () => <h3 className='text-2xl p-3 bg-amber-200 font-extrabold text-amber-500 rounded-xl w-full shadow-inner text-center'>No posts</h3>;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const increment = +e.currentTarget.value;
    if (increment + itemCount > user.submitted!.length) return;
    setLoadingItems(true);
    setItemCount(increment + itemCount);
  }

  const renderItemControls = () => {
    return (
      <div className='relative'>
        <span className={`${loadingItems ? ' animate-spin opacity-100' : 'opacity-0 animate-none'} text-3xl sm:text-4xl md:5xl absolute left-1/2 top-2 md:top-3 z-10 duration-300 ease-in-out my-auto`}>🌀</span>
        
        <div className={`${loadingItems ? 'blur-sm -z-10 ease-in-out duration-75' : ''} text-sm md:text-xl flex items-center justify-between h-12 md:h-16 py-1 md:py-3 px-2 md:px-6 rounded-xl w-full shadow-inner bg-indigo-100 text-indigo-500`}>
        <p><span className='font-bold text-slate-50 bg-indigo-500 px-1.5 md:px-2 py-1 rounded-lg'>{itemCount}</span> {itemCount === user.submitted!.length ? 'total' : 'latest'} posts</p>
        {user.submitted!.length > 15 ? 
          (<>
            <div className='flex items-center'>
              <p className='mr-2'>Load more</p>
              <button value={15} onClick={(e) => handleClick(e)} className='bg-indigo-300 px-2 md:px-3 py-1 rounded-l-full shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75' disabled={itemCount === user.submitted!.length}>15</button>
              <button value={30} onClick={(e) => handleClick(e)} className='bg-indigo-300 px-2 md:px-3 py-1 mx-0.5 shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75' disabled={itemCount === user.submitted!.length}>30</button>
              <button value={user.submitted!.length - itemCount} onClick={(e) => handleClick(e)} className='bg-indigo-300 px-2 md:px-3 py-1 rounded-r-full shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75' disabled={itemCount === user.submitted!.length}>All</button>
            </div>
          </>) : null}
      </div>
      </div>
    );
  }

  const renderItems = () => (
    <div className='mt-6 space-y-3'>
      {items.map((item, index) => (
        <Item {...item} key={index} />
      ))}
    </div>
  );

  const renderItemContent = () => {
    return (
      <div>
        {renderItemControls()}
        {renderSummaryOfItems()}
        {renderItems()}
        {renderLoadMoreItemsButton()}
      </div>
    );
  }

  console.log(props)
  return (
    <Container>
      <div className="space-y-6 max-w-full">
        <UserCircleAndName id={user.id} />
        <UserInfo 
          about={user.about}
          created={user.created}
          karma={user.karma}
          numPosts={user.submitted?.length || 0} 
        />  
        {user.submitted && user.submitted.length > 0 ? renderItemContent() : renderNoItems()}
      </div>
    </Container>
  );
}

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params!.id;
  
  const { data, status } = await axios.get(`/user/${userId}.json`);

  if (!data || status !== 200) {
    return {
      notFound: true
    }
  }

  const user: UserModel = data;
  let items = [] as ItemModel[];

  if (user.submitted && user.submitted.length > 0) {
    const initialItemCount = user.submitted.length < 15 ? user.submitted.length : 15;
    const itemIds = user.submitted.slice(0, initialItemCount);

    const requests = itemIds.map(id => axios.get(`/item/${id}.json`));
    const responses = await Promise.all(requests);

    items = responses.map(response => response.data);

  }

  return {
    props: {
      user, 
      items,
      key: user.id
    }
  }
}