import Head from 'next/head'

import { FaGoogle } from 'react-icons/fa'
import { useSession, signIn, getSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className="min-h-screen flex flex-row">
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex-1 bg-slate-700 flex flex-col items-center justify-center">
        <h1 className="text-6xl text-gray-50 mb-4">
          Welcome!
        </h1>
        <p className="text-gray-50 text-2xl">
          This is my sample whiteboard project. Enjoy!
        </p>
        <p className="text-gray-50 text-lg mt-4">
          Develop by Omar Gonzalez
        </p>
      </div>
      <div className="flex-1 items-center justify-center flex">
        <button
          className="text-2xl cursor-pointer shadow-xl hover:shadow-2xl rounded-lg bg-red-600 p-4 text-gray-50 flex items-center gap-3"
          onClick={() => signIn('google')}
        >
          Sign in with Google <FaGoogle />
        </button>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: '/whiteboards',
        permanent: false,
      },
    }
  }

  return {
    props: {
    }
  }
}
