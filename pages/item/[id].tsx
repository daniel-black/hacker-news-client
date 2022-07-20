import { GetServerSideProps } from "next";
import axios from '../../utils/axios';
import Container from "../../components/structure/container";
import Item, { ItemProps } from "../../components/item/item";

type ItemPageProps = {
  item: ItemProps,
  childrenItems: ItemProps[]
};

const ItemPage = (props: ItemPageProps) => {
  const { item, childrenItems } = props;


  return (
    <Container>
      <Item {...item} />
      <div className="px-6 space-y-3 mt-3">
        {childrenItems.map((item, index) => (
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

  if (!data || status !== 200) {
    return {
      noFound: true
    }
  }

  const item: ItemProps = data;
  let childrenItems = [] as ItemProps[];

  if (item.kids && item.kids.length > 0) {
    const requests = item.kids.map(id => axios.get(`/item/${id}.json`));
    const responses = await Promise.all(requests);

    childrenItems = responses.map(r => r.data);
  }

  return {
      props: {
      item,
      childrenItems,
      key: item.id
    }
  }
}