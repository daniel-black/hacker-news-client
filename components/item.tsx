import { ItemModel } from "../models";
import Link from "next/link";
import ItemTitle from "./itemTitle";

type ItemModelProps = ItemModel & { index?: number };

const Item = (props: ItemModelProps) => {

  return (
    <div className={`bg-slate-200 py-3 px-6 rounded-2xl shadow border-l-4 border border-indigo-500`}>
      <span>{props.index}</span>
      <ItemTitle id={props.id} title={props.title} url={props.url} />
      <div className="flex items-baseline">
        <p className="font-mono mr-2 text-slate-500">🔼{props.score}</p>
        <Link href={`/user/${props.by}`}>
          <a className="text-indigo-500">
            @{props.by}
          </a>
        </Link>
      </div>
      <span className="block text-slate-500">
        ❇️{new Date(props.time * 1000).toLocaleString(
          'en-us', 
          { year: 'numeric', month:'2-digit', day: 'numeric', hour: 'numeric', minute: '2-digit' }
        )}
      </span>
    </div>
  );
}

export default Item;