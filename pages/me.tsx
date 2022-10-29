import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from "../components/layout";

const Me: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Me Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Me page</h1>
    </Layout>
  )
}

export default Me

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
        protected: true,
        allowRoles: ["me"]
    }
  };
}

