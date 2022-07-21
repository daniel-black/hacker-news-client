import React from 'react'
import TileData from './tileData';

type UserItemsSummaryProps = {
  numStories: number,
  numComments: number,
  numAskHN: number,
  numShowHN: number,
  numJobs: number,
  numPolls: number,
}

const UserItemsSummary = (props: UserItemsSummaryProps) => {
  return (
    <>
      <div className='tile story-base md:col-span-2'><TileData title='Stories' value={props.numStories} /></div>
      <div className='tile comment-base md:col-span-2'><TileData title='Comments' value={props.numComments} /></div>
      <div className='tile ask-hn-base'><TileData title='Ask HN' value={props.numAskHN} /></div>
      <div className='tile show-hn-base'><TileData title='Show HN' value={props.numShowHN} /></div>
      <div className='tile job-base'><TileData title='Jobs' value={props.numJobs} /></div>
      <div className='tile poll-base'><TileData title='Polls' value={props.numPolls} /></div>
    </>
  )
}

export default UserItemsSummary;