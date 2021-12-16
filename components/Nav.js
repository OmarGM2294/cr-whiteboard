import Link from 'next/link'

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { FaHome } from 'react-icons/fa'

const Nav = () => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-row gap-4 absolute right-5 top-5 items-center">
      { session ?
        <img
          src={session.user.image}
          className="w-10 h-10 rounded-full shadow-lg border-2 border-white"
        />
      : null }
      <Link
        href="/whiteboards"
      >
        <FaHome className="text-4xl cursor-pointer" />
      </Link>
      <button
        onClick={signOut}
        className="border-2 border-slate-700 rounded-lg px-3 py-1"
      >
        Sign out
      </button>
    </div>
  )
}

export default Nav