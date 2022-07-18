import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
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

  const renderNoItems = () => <h3 className='text-2xl p-3 bg-amber-200 font-extrabold text-amber-500 rounded-xl w-full shadow-inner text-center'>No posts</h3>;

  const renderItemControls = () => {
    return (
      <div className='text-xl flex items-center justify-between h-16 py-3 px-6 rounded-xl w-full shadow-inner bg-indigo-100 text-indigo-500 relative'>
        <p><span className='font-bold text-slate-50 bg-indigo-500 px-2 py-1 rounded-lg'>{itemCount}</span> latest posts</p>
        {user.submitted!.length > 15 ? 
          (<>
              <span className={loadingItems ? 'text-3xl absolute left-1/2 animate-spin opacity-100 duration-300 ease-in-out' : 'opacity-0 animate-none'}>🌀</span>
              <div className='flex items-center'>
                <p className='mr-2'>Load more</p>
                <button className='bg-indigo-300 px-3 py-1 rounded-l-full shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75'>15</button>
                <button className='bg-indigo-300 px-3 py-1 mx-0.5 shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75'>30</button>
                <button className='bg-indigo-300 px-3 py-1 rounded-r-full shadow font-bold hover:bg-indigo-500 hover:text-slate-50 hover:shadow-inner duration-75'>All</button>
              </div>
          </>) : null}
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
        {renderItems()}
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