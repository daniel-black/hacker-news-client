import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { StoryType, Item } from "../../models";
import { getXStories } from "../../utils/hackerNewsCalls";

const Stories = (props: { posts: Item[]; }) => {
  const { posts } = props;
  console.dir(posts)

  return (
    <>
      {posts.map(p => {
        <div>
          {p.url ? 
            <a href={p.url}>{p.title}</a> :
            <h2>{p.title}</h2>
          }
          <p>by: {p.by}</p>
          <p>posted: {new Date(p.time * 1000).toLocaleDateString()}</p>
          <p>item id: {p.id}</p>
          <p>type: {p.type}</p>
          <p>score: {p.score}</p>
          <p># of descendants: {p.descendants}</p>
        </div>
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

  const posts = await getXStories(storyType, 40) as Item[];
  
  return {
    props: { posts }
  };
}