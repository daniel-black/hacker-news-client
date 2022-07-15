import { baseUrl } from "../constants";
import { Item, User } from "../models";
import { GetServerSideProps } from 'next';

const TopStories = ({ posts }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      
      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 text-center space-y-10">
        <h1 className="text-6xl font-bold">
          Hacker News Client
        </h1>

        <ul>
          {posts.map(p => (
            <li className="text-left bg-slate-100 p-3 space-y-3 mb-5" key={p.id}>
              <a className="text-2xl font-bold hover:underline" href={p.url}>{p.title}</a>
              <p>By: {p.by}</p>
              <p>At: {new Date(p.time).toLocaleDateString()}</p>
              <p>Type: {p.type}</p>
              <p>Score: {p.score}</p>
              <p># of comments: {p.kids?.length}</p>
            </li>
          ))}
        </ul>
        
    
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        footer
      </footer>
    </div>
  );
}

export default TopStories;

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36';

export const getServerSideProps: GetServerSideProps = async ({}) => {
  // Get all the item ids from the api. Await them because we need them for the next step.
  const resItemIds = await fetch(
    `${baseUrl}topstories.json?`, 
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
        'User-Agent': userAgent
      }
    }
  );
  
  // Await the itemIds. itemIds is an array of integer ids.
  const itemIds: number[] = await resItemIds.json();

  // Create an array of api request urls.
  const urls = itemIds.map(id => `${baseUrl}item/${id}`);

  // Create an array of request promises to be resolved concurrently 
  const requests = urls.map(url => fetch(url));

  try {
    // requests to for each item have been made and returned as an array of promises. now resolve promises
    const promises = await Promise.all(requests);    // all these seem to come back with status 200 OK
    
    // idk man
    // const x = await Promise.allSettled(promises);
    // console.log(x.map(p => p.value))
  } catch(err) {
    console.log(Object.entries(err));
  }

  // Promise.all(requests)
  //   .then(responses => Promise.all(responses.map(r => r.json())))
  //   .then(posts => posts.forEach(p => console.log(p)))
  //   .catch(thing => console.log(thing));

  // if (!itemIds) return { notFound: true };
  
  // let posts = [];   // array of post objects
  // for (let i = 0; i < itemIds.length; i++) {
  //   const res = await fetch(`${baseUrl}item/${itemIds[i]}.json`)
  //   const post = await res.json();
  //   posts.push(post);
  // }


  // console.log('posts:');
  // console.log(posts);

  return {
    props: { posts: [{
      by: 'Tomte',
      descendants: 10,
      id: 32081589,
      kids: [ 32090739, 32091009, 32090472, 32081635, 32089850, 32091086 ],
      score: 80,
      time: 1657714543,
      title: 'Image revealed in reflection of centuries-old artifact',
      type: 'story',
      url: 'https://www.cnn.com/style/article/magic-mirror-cincinnati-art-museum-scn/index.html'
    }] }
  }
}