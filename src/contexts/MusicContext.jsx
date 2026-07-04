import { createContext, useEffect } from "react";
import { useState, useContext } from "react";


const MusicContext = createContext()

const songs = [
  {
    id: 1,
    title: "Rock Power",
    artist: "heart of hope",
    url: "/songs/Rock Power.mp3",
    duration: "0:30"
  },
  {
    id: 2,
    title: "message for you",
    artist: "juliush",
    url: "/songs/message for you.mp3",
    duration: "1:32"
  },
  {
    id: 3,
    title: "k-pop-ringtone",
    artist: "poorartistt",
    url: "/songs/k-pop-ringtone.mp3" ,
    duration: "3:26"
  },
];

export const MusicProvider = ({children}) =>{

    const [allSongs, setAllSongs] = useState(songs)
    const [currentTrack, setCurrentTrack] = useState(songs[0])
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [playlist, setPlaylist] = useState([])

    useEffect(()=>{
      
      const savedPlaylists = localStorage.getItem("musicPlayerPlaylists")
      if(savedPlaylists){
        const playlists = JSON.parse(savedPlaylists)
        setPlaylist(playlists)
      }
      


    },[])

    useEffect(()=>{
      if(playlist.length > 0){
        localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlist))
      } else {
        localStorage.removeItem("musicPlayerPlaylists")
      }


    },[playlist])


    const handlePlaySong = (song, index) => {
        setCurrentTrack(song)
        setCurrentTrackIndex(index)
        setIsPlaying(false)
        }

    const nextTrack = () => {
        setCurrentTrackIndex((prev)=>{
          const nextIndex = (prev+1)%allSongs.length
          setCurrentTrack(allSongs[nextIndex])
          
          return nextIndex
        })
        setIsPlaying(false)
        }

    const prevTrack = () => {
        setCurrentTrackIndex((prev)=>{
          const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1
          setCurrentTrack(allSongs[nextIndex])
          
          return nextIndex
        })
        setIsPlaying(false)
        }


    const formatTime = (time) => {
        if (isNaN(time) || time === undefined) return "0.00"

        const minutes = Math.floor(time/60)
        const seconds = Math.floor(time % 60)

        return `${minutes}:${seconds.toString().padStart(2,"0")}`
      }

    const createPlaylist = (name) => {
      const newPlaylist = {
        id:Date.now(),
        name,
        songs: [],
      }

      setPlaylist((prev)=>[...prev, newPlaylist])

    }

    const deletePlaylist = (playlistId) => {
      setPlaylist((prev)=>prev.filter((playlist)=>playlist.id !== playlistId))
    }

    const addSongToPlaylist = (playlistId, song) =>{
      setPlaylist((prev)=>prev.map((playlist) => {
        if(playlist.id === playlistId){
          return{...playlist, songs: [...playlist.songs, song]}
        } else {
          return playlist
        }
      })

      )
    }

    const play = () => setIsPlaying(true)
    const pause = () => setIsPlaying(false)


return <MusicContext.Provider 
value={{allSongs, 
  volume, 
  setVolume, 
  play, 
  pause, 
  isPlaying, 
  handlePlaySong, 
  nextTrack, 
  prevTrack, 
  currentTrack, 
  currentTrackIndex, 
  currentTime, 
  setCurrentTime, 
  formatTime, 
  duration, 
  setDuration,
  playlist,
  createPlaylist,
  addSongToPlaylist,
  deletePlaylist
  
}}>
  {children}
  </MusicContext.Provider>
}

export const useMusic = () => {
    const contextValue = useContext(MusicContext)
    if(!contextValue){
        throw new Error("useMusic must be used inside of MusicProvider")
        
    }

    return contextValue
}