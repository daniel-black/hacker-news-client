import Image from "next/image";

const Promos = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 mb-12 mt-16 text-3xl md:4xl lg:text-5xl font-bold">

      <div className="order-1 flex items-center justify-center text-center mx-6 py-3 md:px-16 leading-relaxed">Explore the profiles of your favorite contributors</div>

      <div className='order-2 rotate-2 p-3 m-5 max-w-fit rounded-2xl shadow-lg bg-slate-100 brightness-[102%]  hover:scale-105 hover:-skew-y-1 duration-200 ease-in-out'>
          <Image 
            src={'/pg-profile.png'}
            width={611}
            height={315}
          />
        </div>
      
      <div className="order-3 md:order-4 flex items-center justify-center text-center mx-6 py-3 md:px-16 leading-relaxed">Stay up to date with the latest in tech</div>

      <div className='order-4 md:order-3 -rotate-2 p-3 max-w-fit hover:scale-105 hover:skew-y-1 duration-200 ease-in-out'>
        <Image 
          src={'/dropbox-item.png'}
          width={710}
          height={160}
        />
      </div>

      <div className="order-5 flex items-center justify-center text-center mx-6 py-3 md:px-16 leading-relaxed">See what types of things your peers are posting about</div>

      <div className='order-6 rotate-2 p-3 max-w-fit rounded-2xl shadow-lg bg-slate-100 brightness-[102%] hover:scale-105 hover:-skew-y-1 duration-200 ease-in-out'>
        <Image 
          src={'/tiles.png'}
          width={607}
          height={288}
        />
      </div>

    </div>
  )
}

export default Promos;