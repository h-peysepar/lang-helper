// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/main.scss';
import { useRouter } from 'next/router';
import { getToken } from '../utils/helpers';
import Styled from '../components/Styled';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: err => console.log('##', {err})
    },
  },
});
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const hasToken = getToken();
    // @ts-ignore
    if (Component.private) {
      if (!hasToken) {
        router.replace('/sign-in');
        return null;
      }
      // @ts-ignore
    } else if (Component.protected) {
      if (hasToken) {
        router.replace('/');
        return null;
      }
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
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
`;
