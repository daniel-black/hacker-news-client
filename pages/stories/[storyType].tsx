import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Item from "../../components/item";
import { StoryType, ItemModel } from "../../models";
import { getXStories } from "../../utils/hackerNewsCalls";

const Stories = (props: { posts: ItemModel[]; }) => {
  const { posts } = props;
  console.dir(posts)

  return (
    <>
      {posts.map(post => {
        <Item {...post} />
      })}
    </>
  );
}

export default Stories;

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

  if (typeof storyType !== 'string') {
    return {
      notFound: true
    };
  }

  const posts = await getXStories(storyType, 40) as ItemModel[];
  
  return {
    props: { posts }
  };
}