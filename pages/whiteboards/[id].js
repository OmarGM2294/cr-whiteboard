import React from 'react'
import Head from 'next/head'

import { getSession } from "next-auth/react"

import Draw from '../../components/Draw'
import Nav from '../../components/Nav'

const Id = (props) => {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
    >
      <Head>
        <title>Whiteboard - Edit</title>
      </Head>
      <Nav />
      <Draw id={props.id} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      id: ctx.query.id
    }
  }
}

export default Id