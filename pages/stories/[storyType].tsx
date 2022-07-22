import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Container from "../../components/structure/container";
import Item, { ItemProps } from "../../components/item/item";
import { StoryType, ItemModel } from "../../models";
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Head from "next/head";

type StoriesProps = {
  posts: ItemProps[],
  storyType: StoryType,
  initialStoryCount: number,
};

const Stories = (props: StoriesProps) => {
  const { posts, storyType, initialStoryCount } = props;

  const [items, setItems] = useState(posts);
  const [itemsOnPage, setItemsOnPage] = useState(initialStoryCount);

  useEffect(() => {
    async function getMoreItems() {
      const { data } = await axios.get(`/${storyType}stories.json?limitToFirst=${itemsOnPage}&orderBy="$key"`);
      const itemIds: number[] = data;

      const requests = itemIds.map(id => axios.get(`/item/${id}.json`));
      const responses = await Promise.all(requests);

      const newItems: ItemProps[] = responses.map(response => response.data)
      setItems(newItems);
    }
    getMoreItems();
  }, [itemsOnPage]);

  const getHeadingWording = () => {
    if (storyType === 'new') {
      return `Viewing the ${itemsOnPage} newest posts`;
    }
    return `Viewing the ${storyType} ${itemsOnPage} posts`;
  }

  return (
    <Container>
      <Head>
        <title>{storyType.charAt(0).toUpperCase() + storyType.slice(1)} Stories</title>
        <meta name="description" content={`A list of the ${storyType} stories on Hacker News`} />
      </Head>

      <div className="space-y-6">
        <h2 className="font-mono mt-2">{getHeadingWording()}</h2>
        <div className="space-y-5 ">
          {items.map((post, index) => <Item {...post} index={+index + 1} key={index} />)}
        </div>
        <button 
              className="tracking-wide shadow hover:shadow-lg px-3 py-2 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
              onClick={() => setItemsOnPage(itemsOnPage + initialStoryCount)}
            >
              Show next {initialStoryCount} posts
        </button>
      </div>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { storyType: 'new' } },
      { params: { storyType: 'top' } },
      { params: { storyType: 'best' } },
    ],
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const storyType = params?.storyType as StoryType;
  const initialStoryCount = 20;

  if (typeof storyType !== 'string') {
    return {
      notFound: true
    };
  }

  // get the itemIds
  const itemIdsRequests = await axios.get(`/${storyType}stories.json?limitToFirst=${initialStoryCount}&orderBy="$key"`);
  const itemIds: number[] = itemIdsRequests.data;  

  // get items from itemIds 
  const itemRequests = itemIds.map(id => axios.get(`/item/${id}.json`)); 
  const data = await Promise.all(itemRequests);

  const posts = data.map(i => i.data);

  return {
    props: { posts, storyType, initialStoryCount, key: storyType }
  };
}

export default Stories;
