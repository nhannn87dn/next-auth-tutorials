import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from "../components/layout";
import { useAuth } from '../components/auth';

const Dashboard: NextPage = () => {
    console.log("3.Dashboard Component")
    const {auth} = useAuth();
    console.log("4.Dashboard useAuth Hook",auth)
  return (
    <Layout>
      <Head>
        <title>Dashboard Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Dashboard page</h1>
      {auth.isLoading && (<div>Loading....</div>)}
      {!auth.isLoading && auth.user && (
          <div>
          <h2>Admin name: {auth.user.name}</h2>
          <h2>Admin Role: {auth.user.role} </h2>
         </div>
      )}
     
    </Layout>
  )
}

export default Dashboard


export const getStaticProps: GetStaticProps = async (context) => {
    console.log("0.etStaticProps")
    return {
    props: {
        protected: true,
        allowRoles: ["admin", "booking"],
    }
  };
}
