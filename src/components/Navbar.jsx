import { Music } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

function Navbar() {

const location = useLocation()

  return (
    <nav className='bg-slate-900 w-[915px] m-2 rounded-2xl flex justify-between h-15 items-center p-5'>
        <div className='text-blue-400 '>
            <Link className='flex items-center gap-1 text-xl font-semibold' to="/"><Music/> Music Player</Link>
        </div>
    

        <div className='text-white flex gap-5'>
            <Link className={`${location.pathname === "/" ? "" : "text-white/50"}`} to="/">All songs</Link>
            <Link className={`${location.pathname === "/Playlists" ? "" : "text-white/50"}`} to="/Playlists">Playlists</Link>

        </div>
    </nav>
  )
}

export default Navbar