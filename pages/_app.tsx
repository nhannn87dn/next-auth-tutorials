import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { AuthProvider } from "../components/auth";

function MyApp({ Component, pageProps }: AppProps) {
  type StaticProps = {
    protected?: boolean,
    allowRoles?: string[],
    redirectNotAuth?: string
 }
 const staticProps: StaticProps = {...pageProps};

 console.log("1.staticProps - Myapp")

  return (
      <AuthProvider staticProps={staticProps}>
        <Component {...pageProps} />
      </AuthProvider>
    )
}

export default MyApp
