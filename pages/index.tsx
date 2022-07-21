import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import Container from '../components/structure/container';

const Home: NextPage = () => {

  return (
    <div className='flex-grow'>
      <Head>
        <title>Hacolyte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className='text-center pt-6'>
          <h2 className="text-amber-600 text-5xl font-bold">Reader app for</h2>
          <a className='flex flex-col items-center space-y-6 justify-center lg:flex-row lg:space-y-0 lg:space-x-3'
            href="https://news.ycombinator.com" target="_blank" rel="norefferer">
            <div className='w-32 h-32 order-last lg:order-first mt-6 relative hover:brightness-110 hover:scale-105 hover:shadow-2xl shadow-lg duration-200 ease-in-out'>
              <Image 
                src="/Y_Combinator_logo.webp"
                alt='Y Combinator Logo'
                layout='fill'
              />
            </div>
            <span className='font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-400'>
              Hacker News
            </span>
          </a>
        </div>
        
      </Container>
    </div>
  )
}

export default Home;
