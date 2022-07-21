import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ItemModel } from '../../models';

export type ItemProps = {
  id: number,
  by: string,
  time: number,
  type: "job" | "story" | "comment" | "poll" | "pollopt",
  title?: string,
  poll?: ItemModel,
  parts?: ItemModel,
  url?: string,
  parent?: string,
  descendants?: number,
  kids?: number[],
  dead?: boolean,
  deleted?: boolean,
  text?: string,
  score?: number,
  index?: number,
};

const Item = (props: ItemProps) => {
  const { id, by, time, type, title, url, score, parent } = props;

  const isAskHN = title && title.startsWith('Ask HN:'); 
  const isShowHN = title && title.startsWith('Show HN:'); 

  const getBaseClass = () => {
    if (type === 'comment') return 'comment-base';
    if (type === 'pollopt') return 'pollopt-base';
    if (type === 'poll')return 'poll-base';
    if (type === 'job') return 'job-base';
    if (isShowHN) return 'show-hn-base';
    if (isAskHN) return 'ask-hn-base';
    return 'story-base';
  }

  const renderIndex = () => {
    if (!props.index) return null;
    return (<div className='index'>{props.index}</div>);
  }

  const renderComment = () => {
    return (
      <div className='space-y-3'>
        <h3 className='font-bold leading-tight whitespace-normal font-mono flex items-center'>
          <span className='mr-2 inline-block h-4 w-4 bg-gradient-to-br from-pink-600 via-pink-700 to-pink-500 shadow-md rounded-full'></span>
          <Link href={`/item/${props.parent}`}><a className='hover:underline'>(Replying to <span className='text-pink-600'>PARENT</span> post)</a></Link>
        </h3>
        <div className='whitespace-normal border-l-2 pl-2 ml-2 border-pink-500' suppressHydrationWarning dangerouslySetInnerHTML={{__html: props?.text || ''}}></div>
      </div>
    );
  }

  const renderAskHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const question = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3 className='item-title'>Ask HN:</h3>
        <p className='x-hn-text ask-hn'>
          <Link href={`/item/${id}`}>
            <a>"{question}"</a>
          </Link>
        </p>
      </div>
    );
  }

  const renderShowHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const shinyThing = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3 className='item-title'>Show HN:</h3>
        <p className='x-hn-text show-hn'>
          <a href={url} target="_blank" rel="noreferrer">"{shinyThing}"</a>
        </p>
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
      unit = 'y';
    } else if (pres.getMonth() - past.getMonth() > 0) {
      n = pres.getMonth() - past.getMonth();
      unit = 'mo'
    } else if (pres.getDate() - past.getDate() > 0) {
      n = pres.getDate() - past.getDate();
      unit = 'd';
    } else if (pres.getHours() - past.getHours() > 0) {
      n = pres.getHours() - past.getHours();
      unit = 'h';
    } else if (pres.getMinutes() - past.getHours() > 1) {
      n = pres.getMinutes() - past.getMinutes(); 
      unit = 'm';
    } else {
      n = 1;
      unit = 'm';  
    }
    
    return <span className='text-slate-500'>🕑{`${n}${unit}`}</span> 
  }

  const renderScore = () => <span className='text-slate-500'>🔼{score || 0}</span>;

  const renderDiscussionLink = () => (props.descendants ? 
    <Link href={`/item/${id}`}><a className='comments-link' title='Comments'>🗨️{props.descendants}</a></Link> : 
    <span className='text-slate-500'>🗨️0</span>);

  const renderUserId = () => (<Link href={`/user/${by}`}><a className='user-link'>👤{by}</a></Link>);

  return (
    <div className={`item-wrapper ${getBaseClass()}`}>
      <div className='truncate flex space-x-2'>
        {/* Small left column */}
        {renderIndex()}

        {/* Big right column */}
        <div className='flex flex-col space-y-3 w-full'>
          {renderTitle()}
          {/* Bottom row */}
          <div className='font-mono text-md sm:text-lg  flex justify-start space-x-4 sm:space-x-8'>
            {renderUserId()}
            {renderTime()}            
        
            {renderScore()}
            {renderDiscussionLink()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item;