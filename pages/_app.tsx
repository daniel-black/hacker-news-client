import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/structure/layout';

// _app.tsx contains the Layout component which contains the Container component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
