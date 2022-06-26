// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/main.scss';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getToken } from '../utils/helpers';
import Styled from '../components/Styled';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  if (typeof window !== 'undefined') {
    const hasToken = getToken();
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
      <App>
        <Content>
          <Component {...pageProps} />
        </Content>
        <MenuContainer className='menubar bg'>
          <Menubar />
        </MenuContainer>
      </App>
    </QueryClientProvider>
  );
}

export default MyApp;
const App = Styled('div')`
  mx-auto 
  bg
  h-full
  flex
  flex-col
  sm:w-[440px]
  pt-3
  px-2
  sm:px-5
  relative
`;
const MenuContainer = Styled('div')` 
  h-16 
  flex 
  items-center 
  justify-center
`;
const Content = Styled('div')`
  main
  flex-1
  overflow-y-auto
`