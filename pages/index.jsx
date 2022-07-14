import Head from 'next/head';
import { baseUrl } from '../constants';

const Home = () => {

  const callApi = async () => {
    try {
      const res = await fetch(`${baseUrl}item/32089522.json`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2">
      <Head>
        <title>Hacker News Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-start px-20 text-center space-y-10">
        <h1 className="text-6xl font-bold">
          Hacker News Client
        </h1>

        <button className='bg-emerald-400 p-4 rounded-lg text-xl' onClick={callApi}>Make API call</button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        footer
      </footer>
    </div>
  )
}

export default Home;
