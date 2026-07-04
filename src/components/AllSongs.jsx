import React from 'react'

import { Music, Play } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

function AllSongs() {

  const {allSongs, handlePlaySong, currentTrackIndex} = useMusic()

  return (
    <div className='bg-slate-900 text-white p-5 w-md rounded-2xl'>
      <h2 className='mb-5 text-2xl text-center font-bold'>All Songs ({allSongs.length})</h2>

      <div>
      {allSongs.map((song, key) => (
        
        <div key={key} 
            onClick={()=>handlePlaySong(song, key)} 
            className={` ${currentTrackIndex === key ? "bg-blue-400" : "bg-slate-700"} flex justify-between items-center mb-3 p-3 rounded-2xl hover:bg-slate-600`}>
          
          <div>
            <h3 className='font-semibold mb-1 text-xl '>{song.title}</h3>
            <p className='text-white/50'>{song.artist}</p>
            <span className='text-white/50'>{song.duration}</span>
          </div>
          <div>
            {currentTrackIndex === key ? <Music/> : <Play/>}
          </div>

        </div>
        
      ))}
    </div>

    </div>
  )

    
    
}

export default AllSongs