import { ItemModel } from "../models"

const Item = (props: ItemModel) => {
  return (
    <div className="bg-slate-300 p-3 rounded mb-3">
      {props.url ? 
        <a href={props.url}>{props.title}</a> :
        <h2>{props.title}</h2>
      }
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