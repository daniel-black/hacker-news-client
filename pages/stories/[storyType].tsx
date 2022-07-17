import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Container from "../../components/container";
import Item from "../../components/item";
import { StoryType, ItemModel } from "../../models";
import { getXStories } from "../../utils/hackerNewsCalls";
import { useState } from 'react';

type StoriesProps = {
  posts: ItemModel[],
  storyType: StoryType,
  initialStoryCount: number
};

const Stories = (props: StoriesProps) => {
  const { posts, storyType, initialStoryCount } = props;
  const [itemsOnPage, setItemsOnPage] = useState(initialStoryCount);

  console.dir(posts);

  const getHeadingWording = () => {
    if (storyType === 'new') {
      return `Viewing the ${itemsOnPage} newest posts`;
    }
    return `Viewing the ${storyType} ${itemsOnPage} posts`;
  }

  return (
    <Container>
      <div className="space-y-4">
        <h2 className="font-mono">{getHeadingWording()}</h2>
        {posts.map((post, index) => <Item {...post} index={+index + 1} key={index} />)}
        <button 
              className="shadow hover:shadow-lg px-3 py-1 text-indigo-500 w-full text-xl font-extrabold bg-indigo-100 border-indigo-500 border-2 rounded-xl hover:bg-indigo-500 hover:text-white duration-100 ease-in-out"
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

  const posts = await getXStories(storyType, initialStoryCount) as ItemModel[];
  
  return {
    props: { posts, storyType, initialStoryCount }
  };
}

export default Stories;
