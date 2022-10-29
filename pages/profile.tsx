import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from "../components/layout";

const Profile: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Profile Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Profile page</h1>
    </Layout>
  )
}

export default Profile

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      protected: true
    }
  };
}

