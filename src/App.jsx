import React from 'react'
import MusicPlayer from './components/MusicPlayer'
import { BrowserRouter, Routes, Route } from 'react-router'
import Playlists from './components/Playlists'
import AllSongs from './components/AllSongs'
import { MusicProvider } from './contexts/MusicContext'
import Navbar from './components/Navbar'

function App() {
  return (
   <BrowserRouter>
   <MusicProvider>
    <div className='flex flex-col items-center'>
      <Navbar/>
    
    <main className='flex justify-center gap-5 '>

    <div>
      <MusicPlayer/>
    </div>

    <div>
      <Routes>
        <Route path='/' element={<AllSongs />} />
        <Route path='/Playlists' element={<Playlists />} />
      </Routes>
    </div>

    </main>
    </div>
    
    </MusicProvider>
    </BrowserRouter>
  )
}

export default App