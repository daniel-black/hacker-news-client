import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Item, { ItemProps } from '../../components/item/item';
import Spinner from '../../components/placeholders/spinner';
import TilePlaceholders from '../../components/placeholders/tilePlaceholders';
import Container from '../../components/structure/container';
import TileData from '../../components/user/tileData';
import UserCircleAndName from '../../components/user/userCircleAndName';
import UserInfo from '../../components/user/userInfo';
import UserItemsSummary from '../../components/user/userItemsSummary';
import { ItemModel, UserModel } from '../../models';
import axios from '../../utils/axios';

type UserPageProps = { 
  user: UserModel,
  items: ItemProps[]
};

const UserPage = (props: UserPageProps) => {
  const requestLimit = 1300;  // anything past this bricks your computer

  const { user } = props;

  const [items, setItems] = useState(props.items);
  const [itemCount, setItemCount] = useState(props.items.length);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    async function loadItems() {
      console.time('load items');
      if(!user.submitted) return;
      const itemIds = user.submitted!.slice(items.length, itemCount);
      const requests = itemIds.map(id => axios.get(`/item/${id}.json`));
      const responses = await Promise.all(requests);

      const newItems: ItemProps[] = responses.map(response => response.data);
      setItems(items.concat(newItems));
      setLoadingItems(false);
      console.timeEnd('load items');
    }
    loadItems();
  }, [itemCount]);

  const renderLoadMoreItemsButton = () => {
    if (itemCount === user.submitted!.length) return null;

    const oneLoadFromDone = itemCount < user.submitted!.length && itemCount + 15 > user.submitted!.length;
    const n = oneLoadFromDone ? user.submitted!.length - itemCount : 15;

    return(
      <button 
        className="group mt-6 tracking-wide shadow hover:shadow-lg px-1 py-2 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out relative"
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

    return (
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3'>
        {loadingItems ? 
          <TilePlaceholders /> : 
          <UserItemsSummary 
            numStories={stories.length}  
            numComments={comments.length}
            numAskHN={askHN.length}
            numShowHN={showHN.length}
            numJobs={jobs.length}
            numPolls={polls.length}
          />}
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
    const canLoad = user.submitted!.length > 15 || itemCount === user.submitted?.length;
    const canLoadAll = user.submitted!.length - itemCount < requestLimit;

    return (
      <div className='relative'>
        <div className={`${loadingItems ? 'z-10' : '-z-10'} true-center`}><Spinner spin={loadingItems} /></div>
        <div className={`${loadingItems ? 'blur-sm -z-10 ease-in-out duration-75' : ''} item-controls-wrapper`}>
          <span className='font-bold text-slate-50 bg-indigo-500 px-1.5 md:px-2 py-1 rounded-lg'>
            {itemCount} {itemCount === user.submitted!.length ? 'total' : 'latest'} posts
          </span>
          {canLoad ? 
            (<>
              <div className={user.submitted && itemCount === user.submitted.length ? 'hidden' : 'flex items-center'}>
                <p className='mr-2'>Load <span className='hidden sm:inline'>more</span></p>
                <button value={15} onClick={(e) => handleClick(e)} className='rounded-l-full load-option' disabled={itemCount === user.submitted!.length}>15</button>
                <button value={30} onClick={(e) => handleClick(e)} className={canLoadAll ? 'mx-0.5 load-option' : 'rounded-r-full ml-0.5 load-option'} disabled={itemCount === user.submitted!.length}>30</button>
                {canLoadAll ? <button value={user.submitted!.length - itemCount} onClick={(e) => handleClick(e)} className='rounded-r-full load-option' disabled={itemCount === user.submitted!.length}>All</button> : null}
              </div>
            </>) : null}
        </div>
      </div>
    );
  }

  const renderItems = () => (
    <div className='mt-6 space-y-6'>
      {items.map((item, index) => (
        item.dead || item.deleted ? null : <Item {...item} key={index} />
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