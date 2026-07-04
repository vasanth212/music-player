import React, { use, useEffect, useRef } from 'react'

import { FastForward, Pause, Play, Rewind, Volume } from 'lucide-react'
import { useMusic } from '../contexts/MusicContext'

function MusicPlayer() {

const {currentTrack,volume, setVolume, play, pause, isPlaying, formatTime, currentTime, duration, setDuration, setCurrentTime, nextTrack, prevTrack} = useMusic()
const audioRef = useRef(null)


const handleTimeChange = (e) =>{
  const audio = audioRef.current
  if(!audio) return

  const newTime = parseFloat(e.target.value)
  audio.currentTime(newTime)

  setCurrentTime(newTime)
}

const handleVolumeChange = (e) =>{
  const newVolume = parseFloat(e.target.value)
  setVolume(newVolume)
}

useEffect(()=>{
const audio = audioRef.current
if(!audio) return

audio.volume = volume

},[volume])

useEffect(()=>{
 const audio = audioRef.current
if(!audio) return

audio.load()
setCurrentTime(0)
setDuration(0)


}, [currentTrack, setCurrentTime, setDuration])



useEffect(()=>{
const audio = audioRef.current
if(!audio) return

if (isPlaying) {
  audio.play().catch((err) => console.error(err))

} else {
  audio.pause()
}

},[isPlaying])




useEffect(()=>{

const audio = audioRef.current
if(!audio) return

const handleLoadedMetadata = () => {
  setDuration(audio.duration)
  
}

const handleTimeUpdate = () => {
 setCurrentTime(audio.currentTime) 
}

const handleEnded = () => {
nextTrack()
}

audio.addEventListener("loadedmetadata", handleLoadedMetadata)
audio.addEventListener("canplay", handleLoadedMetadata)
audio.addEventListener("timeupdate", handleTimeUpdate)
audio.addEventListener("ended", handleEnded)


return () => {
  audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
  audio.removeEventListener("canplay", handleLoadedMetadata)
  audio.removeEventListener("timeupdate", handleTimeUpdate)
  audio.removeEventListener("ended", handleEnded)
}


},[setDuration, setCurrentTime, currentTrack, nextTrack])

  return (
    <div className='bg-slate-900 text-white p-5 w-md rounded-2xl flex flex-col items-center gap-3'>
      <audio ref={audioRef} src={currentTrack.url} preload='metadata' crossOrigin='anonymous'/>

      {/* title,artist */}
      <div className='flex flex-col items-center mb-3'>
        <h3 className='font-semibold mb-1 text-xl '>{currentTrack.title}</h3>
        <p className='text-white/50'>{currentTrack.artist}</p>
      </div>


      {/* Progressbar */}
      <div className='w-full flex gap-2'>
        <span>{formatTime(currentTime)}</span>
        <input className='w-full' type="range" min="0" max={duration || 0} step="0.1" value={currentTime || 0} onChange={handleTimeChange} />
        <span>{formatTime(duration)}</span>
      </div>


      {/* control buttons */}
      <div className='flex gap-3 mb-3'>
        <button className='bg-blue-400 h-10 w-10 rounded-full flex items-center justify-center' onClick={prevTrack}><Rewind/></button>
        <button className=' bg-blue-400 h-10 w-10 rounded-full flex items-center justify-center' onClick={()=> (isPlaying ? pause() : play())}>
          {isPlaying ? <Pause/>:<Play/>}
        </button>
        <button className='bg-blue-400 h-10 w-10 rounded-full flex items-center justify-center' onClick={nextTrack}><FastForward/></button>
      </div>

      {/* Volume */}
      <div className='flex gap-1 w-full'>
        <span><Volume/></span>
        <input className='w-full' type="range" min="0" max="1" step="0.1" onChange={handleVolumeChange} value={volume} />
      </div>


    </div>
  )
}

export default MusicPlayer