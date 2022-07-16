import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/container';

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Hacker News Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div>
          <h1 className="text-6xl font-bold">
          Bing Bong
          </h1>
        </div>
      </Container>
    </>
  )
}

export default Home;
