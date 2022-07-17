import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import Container from '../components/container';

const Home: NextPage = () => {

  return (
    <div className='flex-grow'>
      <Head>
        <title>Hacker News Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className='text-center pt-6'>
          <h1 className="text-5xl font-bold leading-loose">
            Clone of the popular website 
            <a className='flex items-end justify-center'
              href="https://news.ycombinator.com" target="_blank" rel="norefferer">
              <Image 
                src="/Y_Combinator_logo.webp"
                alt='Y Combinator Logo'
                width={88}
                height={88}
              />
              <span className='ml-4 font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-400 hover:from-orange-500 hover:to-yellow-500 hover:via-amber-400 duration-300 ease-in-out'>
                Hacker News
              </span>
            </a>
          </h1>
        </div>
      </Container>
    </div>
  )
}

export default Home;
