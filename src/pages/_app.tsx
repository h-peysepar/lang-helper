// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/main.scss';
import { SessionProvider, useSession, getSession } from 'next-auth/react';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  function Main() {
    // const { data, status } = useSession();
    const [isLoading, setIsLoading] = useState();
    const router = useRouter();
    const isFirstRender = useRef(true)
    const session = useSession();
    const { data, status } = session
    console.log({data, status})
    useEffect(() => {
      
      const isAuthPage = ['/sign-up', '/sign-in'].includes(router.pathname)
      console.log(isAuthPage)
      if(data && isAuthPage){
        router.replace('/')
      }
      if(status === 'unauthenticated' && !isAuthPage){
        router.replace('/sign-in')
      }
    }, [session])
    // useEffect(async () => {
    //   const session = await getSession();
    //   if (!session && !['/sign-up', '/sign-in'].includes(router.pathname)) {
    //     router.push('/sign-in');
    //   } else {
    //     setIsLoading(false);
    //   }
    // }, []);
    // if (isLoading) return <Loading />;
    return (
      <QueryClientProvider client={new QueryClient()}>
        <div className="mx-auto bg h-full flex flex-col sm:w-[640px] pt-3 px-2 sm:px-5 relative">
          <div className="main flex-1 overflow-y-auto">
            <Component {...pageProps} />
          </div>
          <div className="menubar h-16 flex items-center justify-center bg">
            <Menubar />
          </div>
        </div>
      </QueryClientProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <Main />
    </SessionProvider>
  );
}

export default MyApp;
