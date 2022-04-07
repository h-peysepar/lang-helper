// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import {QueryClient,QueryClientProvider } from 'react-query'
import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
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

export default MyApp;
