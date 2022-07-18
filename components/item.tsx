import { ItemModel } from "../models";
import Link from "next/link";
import ItemTitle from "./itemTitle";

type ItemModelProps = ItemModel & { index?: number };

const Item = (props: ItemModelProps) => {
  const { by, id, title, url, score, index, time } = props;

  return (
    <div className={`bg-slate-200 py-3 px-6 rounded-2xl shadow border-l-4 border border-indigo-500`}>
      <ItemTitle id={id} title={title} url={url} />
      <div className="mt-1 flex items-baseline">
        <p className="font-mono mr-2 text-slate-500">🔼{score}</p>
        <Link href={`/user/${by}`}>
          <a className="text-indigo-500">
            @{by}
          </a>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <span className="block text-slate-500">
          ❇️{new Date(time * 1000).toLocaleString(
            'en-us', 
            { year: 'numeric', month:'2-digit', day: 'numeric', hour: 'numeric', minute: '2-digit' }
          )}
        </span>
        {index ? (<span className="shadow-inner bg-indigo-200 text-indigo-500 font-extrabold px-4 py-1 rounded-xl">{index}</span>) : null}
      </div>
    </div>
  );
}

export default Item;