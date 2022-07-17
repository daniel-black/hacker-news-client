import React from 'react'

type UserInfoProps = {
  about: string | undefined,
  created: number,
  karma: number,
  numPosts: number
}

const UserInfo = (props: UserInfoProps) => {
  const { about, created, karma, numPosts } = props;

  return (
    <div className="bg-slate-200/70 text-xl py-3 px-6 rounded-xl w-full shadow-inner">
      { about ? 
        (
        <div className="flex items-start border-b-2 border-dashed border-slate-300 pb-2 mb-2">
          <span>✨&nbsp;</span>
          <span dangerouslySetInnerHTML={{ __html: about }}></span>
        </div>
        ) : 
        null 
      }
      <p>📅 Joined in {new Date(created * 1000).getFullYear()}</p>
      <p>🔼 {karma} Karma</p>
      <p>✍️ {numPosts} post{numPosts === 1 ? '' : 's'}</p>
    </div>
  );
}

export default UserInfo;