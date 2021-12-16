import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { AiOutlinePlusCircle } from "react-icons/ai"

import { getUniqueID } from '../../utils/id'

const Index = () => {
  const router = useRouter()

  const createWhiteboard = () => {
    router.push(`/whiteboards/${getUniqueID()}`)
  }

  return (
    <div className="container mx-auto p-4 h-screen">
      <Head>
        <title>Whiteboards</title>
      </Head>
      <h1 className="text-5xl">
        Whiteboards
      </h1>
      <hr className="my-5" />
      <div className="grid grid-cols-6 gap-4">
        <div
          className="shadow-md hover:shadow-xl h-52 flex flex-col justify-center rounded-lg border-solid border-2 cursor-pointer items-center border-slate-400"
          onClick={createWhiteboard}
        >
          <AiOutlinePlusCircle className="text-5xl text-slate-700" />
        </div>        
      </div>
    </div>
  )
}

export default Index