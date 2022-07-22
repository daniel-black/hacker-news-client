import Image from "next/image";

const BuyMeACoffee = () => {
  return (
    <>
      <a href='https://www.buymeacoffee.com/blackdan' target='_blank' rel='noreferrer' className='p-2 bg-indigo-100 rounded-3xl hover:bg-indigo-200 duration-150 ease-in-out'>
        <Image src='/buy-me-a-coffee.svg' height='36' width='36' alt='buy me a coffee logo' />
      </a>
      <p className='font-mono text-sm mt-2 text-center px-4'>If you like my work, pls consider buying me a coffee and helping me reach my goal of making <span className='font-bold'>$1</span> on the internet this year :&nbsp;)</p>
    </>
  )
}

export default BuyMeACoffee;