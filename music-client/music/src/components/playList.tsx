import { useState } from 'react'
import Songs from '../types/song'

import 'react-h5-audio-player/lib/styles.css';

import { BsPlayCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import MusicPlayer from './musicPlayer'

type Props = {
  playlist: Songs[],
  onRemove: (song: string) => void,
}
export default function PlayListComp(props: Props) {
  const [isPlay, setPlay] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setPlay(index)
  }
  const handleNext = () => {
    setPlay(prevIndex => (prevIndex! + 1) % props.playlist.length)

  }
  const handlePrevious = () => {
    setPlay(prevIndex => prevIndex === 0 ? props.playlist.length - 1 : prevIndex! - 1)
  }


  return (
    <div>
      <h4>Your play List...</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.playlist.map((play, index) => (<tr key={play.id}>
            {/* <td>{play.id}</td> */}
            <td>{index + 1}</td>
            <td>{play.title}</td>
            <td>
              <div style={{ display: 'flex', gap: '50px' }}>
                <BsPlayCircle onClick={() => handleClick(index)} />
                <FiMinusCircle onClick={() => props.onRemove(play.songId)} />
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>
      <div className='fixed-bottom'>
        {isPlay !== null && (
          <div>  {props.playlist.length > 0 ?
            // <MusicPlayer src={'http://localhost:8000/' + props.playlist[isPlay].urlPath} /> : <></>}</div>
            <MusicPlayer song={props.playlist[isPlay]} onNext={handleNext} onPrevious={handlePrevious} /> : <></>}</div>
        )}
      </div>
    </div>
  )
}
