import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from "../components/layout";

const Deny: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Deny Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Deny page</h1>
    </Layout>
  )
}

export default Deny

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true
    }
  };
}

