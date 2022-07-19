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
    return <span className='whitespace-normal' dangerouslySetInnerHTML={{__html: props?.text || ''}}></span>
  }

  const renderAskHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const question = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3 className='item-title'>Ask HN:</h3>
        <p className='x-hn-text ask-hn'>"{question}"</p>
      </div>
    );
  }

  const renderShowHNTitle = () => {
    const colonIndex = title!.indexOf(':');
    const shinyThing = title!.substring(colonIndex + 1).trim();

    return (
      <div className='pr-2'>
        <h3 className='item-title'>Show HN:</h3>
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
        <div className='text-sm flex flex-col space-y-3 w-full'>
          {renderTitle()}
          {/* Bottom row */}
          <div className='font-mono flex justify-between sm:justify-start sm:space-x-8'>
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

export default Item2;