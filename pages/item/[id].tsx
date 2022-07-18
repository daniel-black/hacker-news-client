import { NextPage } from "next";
import { useRouter } from "next/router";
import { ItemModel } from "../../models";
import Item from "../../components/item/item";
import axios from 'axios';
import useSWR from "swr";
import Container from "../../components/structure/container";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ItemPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const route = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

  const { data, error } = useSWR(route, fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const item: ItemModel = data;

  return (
    <Container>
      <Item {...item} />
    </Container>
  );
}

export default ItemPage;