import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home page</h1>
    </Layout>
  )
}

export default Home
