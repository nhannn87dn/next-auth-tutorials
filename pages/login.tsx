import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import { Layout } from "../components/layout";
import {useRouter} from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
      localStorage.setItem("accessToken","accessToken");
      router.push("/dashboard")
  }
  return (
    <Layout>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login page</h1>
      <button type='button' onClick={handleLogin}>Login</button>
    </Layout>
  )
}

export default Login

