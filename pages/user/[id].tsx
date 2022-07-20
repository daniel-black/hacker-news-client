import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Item, { ItemProps } from '../../components/item/item';
import TilePlaceholders from '../../components/placeholders/tilePlaceholders';
import Container from '../../components/structure/container';
import TileData from '../../components/user/tileData';
import UserCircleAndName from '../../components/user/userCircleAndName';
import UserInfo from '../../components/user/userInfo';
import { ItemModel, UserModel } from '../../models';
import axios from '../../utils/axios';

type UserPageProps = { 
  user: UserModel,
  items: ItemProps[]
};

const UserPage = (props: UserPageProps) => {
  const { user } = props;

  const [items, setItems] = useState(props.items);
  const [itemCount, setItemCount] = useState(props.items.length);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    async function loadItems() {
      if(!user.submitted) return;
      const itemIds = user.submitted!.slice(items.length, itemCount);
      const requests = itemIds.map(id => axios.get(`/item/${id}.json`));
      const responses = await Promise.all(requests);

      const newItems: ItemProps[] = responses.map(response => response.data);
      setItems(items.concat(newItems));
      setLoadingItems(false);
    }
    loadItems();
  }, [itemCount]);

  const renderLoadMoreItemsButton = () => {
    if (itemCount === user.submitted!.length) return null;

    const oneLoadFromDone = itemCount < user.submitted!.length && itemCount + 15 > user.submitted!.length;
    const n = oneLoadFromDone ? user.submitted!.length - itemCount : 15;

    return(
      <button 
        className="group mt-3 tracking-wide shadow hover:shadow-lg px-1 py-2 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out relative"
        onClick={() => setItemCount(itemCount + n)}
      >
        <span>Show next {n} posts</span>
        <span className='absolute right-2 sm:right-3 font-normal text-xs top-4 sm:top-3 md:top-2 sm:text-md md:text-lg text-indigo-400 group-hover:text-indigo-100'>({itemCount}/{user.submitted!.length})</span>
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
        <div className='tile story-base md:col-span-2'><TileData title='Stories' value={stories.length} /></div>
        <div className='tile comment-base md:col-span-2'><TileData title='Comments' value={comments.length} /></div>
        <div className='tile ask-hn-base'><TileData title='Ask HN' value={askHN.length} /></div>
        <div className='tile show-hn-base'><TileData title='Show HN' value={showHN.length} /></div>
        <div className='tile job-base'><TileData title='Jobs' value={jobs.length} /></div>
        <div className='tile poll-base'><TileData title='Polls' value={polls.length} /></div>
      </>
    );

    return (
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
        {loadingItems ? <TilePlaceholders /> : realData}
      </div>
    );
  }

  const renderNoItems = () => <h3 className='text-2xl p-3 bg-amber-200 font-extrabold text-amber-500 rounded-xl w-full shadow-inner text-center'><span className='animate-bounce inline-block'>👻</span> No posts yet</h3>;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const increment = +e.currentTarget.value;
    if (increment + itemCount > user.submitted!.length) return;
    setLoadingItems(true);
    setItemCount(increment + itemCount);
  }

  const renderItemControls = () => {
    return (
      <div className='relative'>
        <span className={`${loadingItems ? ' animate-loading opacity-100' : 'opacity-0 animate-none'} text-3xl sm:text-4xl md:5xl absolute left-1/2 top-2 md:top-3 z-10 duration-300 ease-in-out my-auto`}>🌀</span>
        
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
    <div className='mt-6 space-y-6'>
      {items.map((item, index) => (
        <Item {...item} key={index} />
      ))}
    </div>
  );

  const renderItemContent = () => {
    return (
      <>
        <Head>
          <title>{user.id}</title>
        </Head>
        
        <div>
          {renderItemControls()}
          {renderSummaryOfItems()}
          {renderItems()}
          {renderLoadMoreItemsButton()}
        </div>
      </>
    );
  }

  // const getGradientColors = () => {
  //   const idHash = sha1(user.id);
  //   const colors = `from-[#${idHash.slice(0, 6)}] via-[#${idHash.slice(6, 12)}] to-[#${idHash.slice(12, 18)}]`;
  //   console.log(colors);
  // };

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