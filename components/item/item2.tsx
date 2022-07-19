import Link from 'next/link';
import React from 'react'
import { ItemModel } from '../../models';

type ItemProps = {
  id: number,
  by: string,
  time: number,
  type: "job" | "story" | "comment" | "poll" | "pollopt",
  title?: string,
  poll?: ItemModel,
  parts?: ItemModel,
  url?: string,
  parent?: ItemModel,
  descendants?: number,
  kids?: number[],
  dead?: boolean,
  deleted?: boolean,
  text?: string,
  score?: number,
  index?: number
};

const Item2 = (props: ItemProps) => {
  const { id, by, time, type, title, url, score } = props;

  const isAskHN = title && title.startsWith('Ask HN:'); 
  const isShowHN = title && title.startsWith('Show HN:'); 

  const renderIndex = () => {
    if (!props.index) return null;
    return (<div className='index'>{props.index}</div>);
  }

  const renderAskHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const question = title!.substring(colonIndex + 1).trim();

    return (
      <div>
        <h3><Link href={`/user/${by}`}><a className='font-bold'>{by}</a></Link> asks HN:</h3>
        <p className='ask-hn-text'>{question}</p>
      </div>
    );
  }

  const renderTitle = () => {
    if (!title) return null;

    if (isAskHN) return renderAskHNTitle();
    // if (isShowHN) return renderShowHNTitle();

    if (url) {
      let shortUrl = url.slice(url.indexOf('//') + 2).replace('www.', '');
      shortUrl = shortUrl.slice(0, shortUrl.indexOf('/'));

      return (
        <div>
          <h3 className='item-title '><a href={url} target='_blank' rel="noreferrer">{title}</a></h3>
          <a className='story-url' href={url}>({shortUrl})</a>
        </div>
      );
    }
    
    return <Link href={`/item/${id}`}><a className='item-title'>{title}</a></Link>;
  }

  return (
    <div className='item-wrapper'>
      {/* Top row */}
      <div className='truncate flex space-x-2'>
        {renderIndex()}
        {renderTitle()}
      </div>
    </div>
  )
}

export default Item2;