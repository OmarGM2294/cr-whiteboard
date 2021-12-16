import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { AiOutlinePlusCircle } from "react-icons/ai"
import { getSession, useSession } from "next-auth/react"

import Nav from '../../components/Nav'

import { getUniqueID } from '../../utils/id'

const Index = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [boards, setBoards] = React.useState([])

  const createWhiteboard = () => {
    const currentBoards = JSON.parse(localStorage.getItem('boards')) || []
    const id = getUniqueID()
    currentBoards.push({
      id,
      property: session.user.email
    })
    localStorage.setItem('boards', JSON.stringify(currentBoards))
    router.push(`/whiteboards/${id}`)
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined' && session) {
      const currentBoards = localStorage.getItem('boards')
      if (currentBoards) {
        setBoards(JSON.parse(currentBoards).filter(board => board.property === session.user.email))
      }
    }
  }, [session])

  return (
    <div className="container mx-auto p-4 h-screen">
      <Head>
        <title>Whiteboards</title>
      </Head>
      <Nav />
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
        { boards.map(board => (
          <Link
            key={board.id}
            href={`/whiteboards/${board.id}`}
          >
            <div
              className="bg-cover shadow-md hover:shadow-xl h-52 flex flex-col justify-center rounded-lg border-solid border-2 cursor-pointer items-center border-slate-400"
              style={{ backgroundImage: `url(${board.img})` }}
            />
          </Link>
        )) }
      </div>
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
    }
  }
}

export default Index