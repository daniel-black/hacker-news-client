import { NextPage } from "next";
import { useRouter } from "next/router";
import { Item } from "../../models";
import axios from 'axios';
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Item: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const route = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

  const { data, error } = useSWR(route, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const item: Item = data;

  return (
    <>
      {item.url ? 
        <a href={item.url}>{item.title}</a> :
        <h2>{item.title}</h2>
      }
      <p>by: {item.by}</p>
      <p>posted: {new Date(item.time * 1000).toLocaleDateString()}</p>
      <p>item id: {item.id}</p>
      <p>type: {item.type}</p>
      <p>score: {item.score}</p>
      <p># of descendants: {item.descendants}</p>
    </>
  );
}

export default Item;