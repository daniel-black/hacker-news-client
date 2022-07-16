import { ItemModel } from "../models";
import Link from "next/link";
import ItemTitle from "./itemTitle";

const Item = (props: ItemModel) => {
  return (
    <div className="bg-slate-300 py-3 px-6 rounded-xl">
      <ItemTitle id={props.id} title={props.title} url={props.url} />
      <p>by: {props.by}</p>
      <p>posted: {new Date(props.time * 1000).toLocaleDateString()}</p>
      <p>item id: {props.id}</p>
      <p>type: {props.type}</p>
      <p>score: {props.score}</p>
      <p># of descendants: {props.descendants}</p>
    </div>
  );
}

export default Item;