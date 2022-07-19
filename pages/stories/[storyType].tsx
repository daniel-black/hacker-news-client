import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Container from "../../components/structure/container";
import Item from "../../components/item/item";
import Item2 from "../../components/item/item2";
import { StoryType, ItemModel } from "../../models";
import { getXStories } from "../../utils/hackerNewsCalls";
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Head from "next/head";

type StoriesProps = {
  posts: ItemModel[],
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

      const newItems: ItemModel[] = responses.map(response => response.data)

      setItems(newItems);
    }
    getMoreItems();
  }, [itemsOnPage]);

  console.dir(posts);

  const getHeadingWording = () => {
    if (storyType === 'new') {
      return `Viewing the ${itemsOnPage} newest posts`;
    }
    return `Viewing the ${storyType} ${itemsOnPage} posts`;
  }

  return (
    <Container>
      <Head>
        <title>{storyType} stories</title>
      </Head>

      <div className="space-y-4">
        <h2 className="font-mono">{getHeadingWording()}</h2>
        {items.map((post, index) => <Item2 {...post} index={+index + 1} key={index} />)}
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
  const initialStoryCount = 15;

  if (typeof storyType !== 'string') {
    return {
      notFound: true
    };
  }

  const posts = await getXStories(storyType, initialStoryCount) as ItemModel[];
  
  return {
    props: { posts, storyType, initialStoryCount, key: storyType }
  };
}

export default Stories;
