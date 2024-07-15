import { KeyboardEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import userService from '../apis/services/login.service'
import PlayListComp from './playList'
import musicnote from '../Images/musicnote.png'
import Songs from '../types/song'

import { CgAdd } from "react-icons/cg";

import '../music.css'

export default function MusicCom() {
  const [songs, setSongs] = useState<Songs[]>([])
  const [playList, setPlayList] = useState<Songs[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const musicList = async () => {
      try {
        const response = await userService.getSongs();
        setSongs(response.data)
      } catch (error) {
        throw new Error('Error fetching songs');

      }
    }
    musicList();
  }, [])

  const musicSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    try {

      if (inputValue.trim()) {
        if (e.key === 'Enter') {
          const response = await userService.getSongsByTitle(inputValue)
          setSongs(response.data)
        }
      } else {
        const response = await userService.getSongs();
        setSongs(response.data)
      }

    } catch (error) {
      alert('unable to find songs');
    }
  }

  const addSong = async (songId: string) => {
    const response = await userService.addToPlaylist(songId)
    if (response.status === 200) {
      setPlayList(response.data)
    }
  }
  useEffect(() => {
    const playList = async () => {
      try {
        const response = await userService.getPlaylist()
        setPlayList(response.data)
      } catch (error) {
        throw new Error('unable to fetch playlist')
      }
    }
    playList()
  }, [])

  const removeSong = async (songId: string) => {
    try {
      const response = await userService.removeFromPlaylist(songId)
      const updatedPlaylist = await userService.getPlaylist()
      setPlayList(updatedPlaylist.data)

    } catch (error) {
      throw new Error('Error removing song from playlist')
    }
  }


  const logOut = () => {
    sessionStorage.removeItem('token')
    navigate('/login')

  }


  return (
    <div className='main'>
      <div className='header'>
        <img src={musicnote} alt='music' style={{ width: '74px', borderRadius: '20%' }} />
        <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..."
          aria-label="Search for..."
          role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto"
          onKeyUp={(e) => musicSearch(e)}></input>
        <button type="button" className="btn btn-primary" onClick={logOut}>Logout</button>
      </div>
      <hr />
      <h3>Songs you may like....</h3>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (<tr key={song.id}>
            {/* <td>{song.id}</td> */}
            <td>{index + 1}</td>
            <td>{song.title}</td>
            <td>{song.releaseDate}</td>
            <td >
              <CgAdd onClick={() => addSong(song.id)} />
            </td>
          </tr>))}
        </tbody>
      </table>
      <PlayListComp playlist={playList} onRemove={removeSong} />

    </div>
  )
}
