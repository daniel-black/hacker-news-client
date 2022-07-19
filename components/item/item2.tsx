import { spawn } from 'child_process';
import Link from 'next/link';
import React from 'react'
import { render } from 'react-dom';
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

  const renderComment = () => {
    return <span>{props.text}</span>
  }

  const renderAskHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const question = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3>Ask HN:</h3>
        <p className='x-hn-text ask-hn'>"{question}"</p>
        <p className='text-right mr-6'>- <Link href={`/user/${by}`}><a className='font-bold'>{by}</a></Link></p>
      </div>
    );
  }

  const renderShowHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const shinyThing = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3>Show HN:</h3>
        <p className='x-hn-text show-hn'>{shinyThing}</p>
      </div>
    );
  }

  const renderTitle = () => {
    if (!title) return renderComment();

    if (isAskHN) return renderAskHNTitle();
    if (isShowHN) return renderShowHNTitle();

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

  const renderTime = () => {
    const past = new Date(1000 * time);
    const pres = new Date();

    let n: number;
    let unit: string;
    
    // This is disgusting lmao
    if (pres.getFullYear() - past.getFullYear() > 0) {
      n = pres.getFullYear() - past.getFullYear();
      unit = 'yr';
    } else if (pres.getMonth() - past.getMonth() > 0) {
      n = pres.getMonth() - past.getMonth();
      unit = 'month'
    } else if (pres.getDate() - past.getDate() > 0) {
      n = pres.getDate() - past.getDate();
      unit = 'd';
    } else if (pres.getHours() - past.getHours() > 0) {
      n = pres.getHours() - past.getHours();
      unit = 'h';
    } else if (pres.getMinutes() - past.getHours() > 1) {
      n = pres.getMinutes() - past.getMinutes(); 
      unit = 'min';
    } else {
      n = 1;
      unit = 'min';  
    }
    
    return <span>🕑{`${n}${unit}`}</span> 
  }

  const renderScore = () => (score ? <span>🔼{score}</span> : null);

  const renderDiscussionLink = () => {
    const { kids, descendants } = props;

    if (!descendants || descendants === 0 || !kids || kids.length === 0) return null;

    // Come back to this. Might want to send kid ids to Item page
    return (<Link href={`/item/${id}`}><a>{descendants} comments</a></Link>);
  }

  const renderUserId = () => (isAskHN ? null : <Link href={`/user/${by}`}><a>{by}</a></Link>);

  return (
    <div className='item-wrapper'>
      <div className='truncate flex space-x-2'>
        {/* Small left column */}
        {renderIndex()}
        {/* Big right column */}
        <div className='text-sm flex flex-col space-x-2 w-full'>
          {renderTitle()}
          {/* Bottom row */}
          <div className='flex justify-between'>
            {renderTime()}
            {renderScore()}
            {renderDiscussionLink()}
            {renderUserId()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item2;