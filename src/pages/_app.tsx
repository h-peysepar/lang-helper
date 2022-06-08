// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/main.scss';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  if (typeof window !== 'undefined') {
    const hasToken = localStorage.getItem('auth');
    if (Component.private) {
      if (!hasToken) {
        router.replace('/sign-in');
        return null;
      }
    } else if (Component.protected) {
      if (hasToken) {
        router.replace('/');
        return null;
      }
    }
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className='mx-auto bg h-full flex flex-col sm:w-[640px] pt-3 px-2 sm:px-5 relative'>
        <div className='main flex-1 overflow-y-auto'>
          <Component {...pageProps} />
        </div>
        <div className='menubar h-16 flex items-center justify-center bg'>
          <Menubar />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
