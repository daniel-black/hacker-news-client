import Link from "next/link";

type ItemTitleProps = {
  id: number,
  url?: string,
  title: string
};

const ItemTitle = ({ id, url, title }: ItemTitleProps) => {
  

  if (url) {
    return (
      <span className="flex items-center">
        <a className="text-xl font-bold text-indigo-500" href={url} target='_blank' rel="noreferrer">{title}</a>
        <a className="ml-2 text-slate-600" href={url} target='_blank' rel="noreferrer">
          {`(${url.slice(url.indexOf('//') + 2)})`}
        </a>
      </span>
    );
  }

  return (
    <Link href={`/item/${id}`}>
      <a className="text-xl font-bold text-indigo-500">{title}</a>
    </Link>
  );
}

export default ItemTitle;