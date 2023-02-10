// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Menubar from '../components/Menubar';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/main.scss';
import { useRouter } from 'next/router';
import { clearToken, getToken, Token } from '../utils/helpers';
import Styled from '../components/Styled';
import AppHead from '../components/Head';
import jwt from 'jwt-decode';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const token = getToken();
    const hasToken = !!token;
    // @ts-ignore
    if (Component.private) {
      let isExpired: boolean = false;
      if(token){
        const decoded: Token = jwt(token)
        isExpired = decoded.exp * 1000 < Date.now()
      }
      console.log('here', hasToken, isExpired)
      if (!hasToken || isExpired) {
        clearToken();
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
    <>
      <AppHead />
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
    </>
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
