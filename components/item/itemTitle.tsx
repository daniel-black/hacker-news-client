import Link from "next/link";

type ItemTitleProps = {
  id: number,
  url?: string,
  title: string,
};

const ItemTitle = ({ id, url, title }: ItemTitleProps) => {

  if (url) {
    return (
      <span className="flex items-center">
        <a className="text-xl font-bold text-indigo-500 hover:underline" href={url} target='_blank' rel="noreferrer">{title}</a>
        <a className="ml-2 text-slate-500 hover:text-slate-600 hover:underline hidden md:inline" href={url} target='_blank' rel="noreferrer">
          {`(${url.slice(url.indexOf('//') + 2)})`}
        </a>
      </span>
    );
  }

  return (
    <Link href={`/item/${id}`}>
      <span className="flex items-center">
        <a className="text-xl font-bold text-indigo-500 hover:underline">{title}</a>
      </span>
    </Link>
  );
}

export default ItemTitle;