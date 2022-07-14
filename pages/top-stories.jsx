import { baseUrl } from "../constants";

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


export async function getServerSideProps() {
  const resItemIds = await fetch(`${baseUrl}topstories.json`);
  const itemIds = await resItemIds.json();

  const urls = itemIds.map(id => `${baseUrl}item/${id}`);
  const requests = urls.map(url => fetch(url));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(posts => posts.forEach(p => console.log(p)))
    .catch(thing => console.log(thing));

  if (!itemIds) return { notFound: true };
  
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