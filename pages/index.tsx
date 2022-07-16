import type { NextPage } from 'next'
import Head from 'next/head'
import { getMaxItemId } from '../utils/hackerNewsCalls';

const Home: NextPage = () => {

  const f = async () => {
    const id = await getMaxItemId();
    console.log(id);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hacker News Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
        Bing Bong
        </h1>
        <button onClick={f}>Click me</button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        yeehaw
      </footer>
    </div>
  )
}

export default Home;
