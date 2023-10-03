import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../../components/Navbar'; 
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isWelcomePage = router.pathname === '/'; // assuming your welcome page route is '/welcome'

  return (
    <div>
      {!isWelcomePage && <Navbar />}
      <Component {...pageProps} />
    </div>
  );
}

