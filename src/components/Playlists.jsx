import React, { useState } from 'react'
import { useMusic } from '../contexts/MusicContext'

function Playlists() {

  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const {playlist, createPlaylist, allSongs, addSongToPlaylist, currentTrackIndex, handlePlaySong, deletePlaylist} = useMusic()

  const handleCreatePlaylist = () =>{
    if(newPlaylistName.trim()){
      createPlaylist(newPlaylistName.trim())
      setNewPlaylistName("")
    }
  }

  const handleAddSong = (song) =>{
    if(selectedPlaylist){
      addSongToPlaylist(selectedPlaylist.id, song)
      setSearchQuery("")
      setShowDropdown(false)
    }
  }

  const deletePlaylistConfirmation = (playlist)=>{
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)){
      deletePlaylist(playlist.id)
    }
  }

  const handlePlayFromPlaylist = (song) =>{
    const globalIndex = allSongs.findIndex((s)=>s.id===song.id)
    handlePlaySong(song, globalIndex)
  }

  const filteredSongs = allSongs.filter((song) => {
    const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some((playlistSong) => playlistSong.id === song.id)

    return matches && !isAlreadyInPlaylist
  })

  return (
    <div className='bg-slate-900 text-white p-5 w-md rounded-2xl'>
        <h2 className='mb-5 text-2xl text-center font-bold'>Playlists</h2>

        {/* create playlist */}
        <div className='bg-slate-800 text-white p-5 my-5 rounded-2xl'>
          <h3 className='mb-3'>Create New Playlist</h3>

          <div className='flex items-center gap-3'>
              <input 
                type="text" 
                placeholder='playlist name...' 
                onChange={(e)=>setNewPlaylistName(e.target.value)} value={newPlaylistName}
                className='bg-slate-700 rounded-2xl px-2 py-1 w-full'/>
              <button className='bg-blue-400 px-4 py-1 rounded-full' onClick={handleCreatePlaylist}>Create</button>
          </div>
        </div>

        {/* playlists list */}
        <div className='bg-slate-800 text-white p-5 mt-5 rounded-2xl'>
          {playlist.length === 0 ? <p>No Playlists created yet</p> 
          : 
          playlist.map((playlist, key)=>(
            <div key={key}>
              <div className='flex items-center mb-5 justify-between'>
                <h3>{playlist.name}</h3>
                <div><button className='bg-red-400 px-4 py-1 rounded-full' onClick={()=> deletePlaylistConfirmation(playlist)}>delete</button></div>
              </div>

              {/* add song search */}
              <div className='relative'>
                <div>
                  <input className='bg-slate-700 rounded-2xl px-2 py-1 mb-3 w-full'
                  type="text" 
                  placeholder='Search song to add...' 
                  value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}
                  onChange={(e)=>{
                    setSearchQuery(e.target.value)
                    setSelectedPlaylist(playlist)
                    setShowDropdown(e.target.value.length > 0)
                  }}
                  onFocus={(e)=>{
                    setSelectedPlaylist(playlist)
                    setShowDropdown(e.target.value.length > 0)
                  }}
                  />

                  {selectedPlaylist?.id === playlist.id && showDropdown && (
                    <div className='absolute top-full w-full'>
                        {filteredSongs.length === 0 ? 
                        (
                          <div className='bg-slate-900'>No Songs found</div>
                        ):
                        (
                          filteredSongs.slice(0,3).map((song, key) => (
                            <div key={key} onClick={()=>{handleAddSong(song)}} className='bg-slate-900 flex items-center justify-between hover:bg-slate-700 text-white p-1 '>
                              <span>{song.title}</span>
                              <span className='text-white/50 text-sm'>{song.artist}</span>
                            </div>
                          ))
                        )}
                    </div>
                  )}


                </div>
              </div>

              <div>
                {playlist.songs.length === 0 ? 
                <p>No Songs in this playlist</p> 
                : 
                playlist.songs.map((song, key)=>(
                  <div key={key} onClick={()=> handlePlayFromPlaylist(song)} 
                  className={`${currentTrackIndex === allSongs.findIndex((s)=>s.id === song.id) ? "bg-blue-400" : "bg-slate-700"} rounded-2xl my-3 p-2 flex items-center justify-between `}>
                    <div>
                      <span >{song.title}</span>
                      <span className='text-white/50 ml-2 '>{song.artist}</span>
                      
                    </div>
                      <span>{song.duration}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

    </div>
  )
}

export default Playlists