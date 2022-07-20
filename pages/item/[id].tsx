import { GetServerSideProps } from "next";
import axios from '../../utils/axios';
import Container from "../../components/structure/container";
import Item, { ItemProps } from "../../components/item/item";
import { useState } from "react";

type ItemPageProps = {
  item: ItemProps,
  childrenItems?: ItemProps[]
};

const ItemPage = (props: ItemPageProps) => {
  const { item, childrenItems } = props;

  const [isSticky, setIsSticky] = useState(true);

  return (
    <Container>
      <div className={isSticky ? "sticky top-3" : ''}>
        <Item {...item} />
        <button className={isSticky ? "flex items-center justify-center h-6 w-6 rounded-full bg-slate-400 font-mono absolute right-4 top-14 shadow-md" : 'hidden'} onClick={() => setIsSticky(false)}>X</button>
      </div>
      <div className="px-3 sm:px-6 space-y-3 mt-3">
        {childrenItems?.map((item, index) => (
          item.dead || item.deleted ? null : <Item {...item} key={index} />
        ))}
      </div>
    </Container>
  );
}

export default ItemPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const itemId = params!.id;

  const { data, status } = await axios.get(`/item/${itemId}.json`);

  // This check causes nextjs type error ??
  // if (!data || status !== 200) {
  //   return {
  //     noFound: true
  //   }
  // }

  const item: ItemProps = data;
  let childrenItems = [] as ItemProps[];

  if (item.kids && item.kids.length > 0) {
    const requests = item.kids.map(id => axios.get(`/item/${id}.json`));
    const responses = await Promise.all(requests);

    childrenItems = responses.map(r => r.data);
  }

  return {
    props: {
      item, childrenItems, key: item.by
    },
  }
}