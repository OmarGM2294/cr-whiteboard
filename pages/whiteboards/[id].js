import React from 'react'
import Head from 'next/head'

import Draw from '../../components/Draw'

const Id = () => {
  return (
    <div
      className="h-screen w-screen overflow-hidden"
    >
      <Head>
        <title>Whiteboard - Edit</title>
      </Head>
      <Draw />
    </div>
  )
}

export default Id