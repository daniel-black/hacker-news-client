import Image from "next/image";

const Promos = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">

      <div className='rotate-2 p-3 m-16 max-w-fit rounded-2xl shadow-lg bg-slate-100 brightness-[102%]  hover:scale-105 hover:-skew-y-1 duration-200 ease-in-out'>
          <Image 
            src={'/pg-profile.png'}
            width={611}
            height={315}
          />
        </div>

        <div>This is some text</div>
        
        <div>This is some text</div>

        <div className='-rotate-2 p-3 m-16 max-w-fit hover:scale-105 duration-200 ease-in-out'>
          <Image 
            src={'/dropbox-item.png'}
            width={710}
            height={160}
          />
        </div>

        <div className='rotate-2 p-3 m-16 max-w-fit hover:scale-105 duration-200 ease-in-out'>
          <Image 
            src={'/user-items-summary.png'}
            width={430}
            height={212}
          />
        </div>

        <div>This is some text</div>

    </div>
  )
}

export default Promos;