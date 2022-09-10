import 'the-new-css-reset'
import '@styles/global.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tree</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
