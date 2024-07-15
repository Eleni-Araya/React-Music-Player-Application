import React from 'react'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Songs from '../types/song';

interface MusicPlayerProps {
    song: Songs,
    onNext: () => void,
    onPrevious: () => void
}
export default function MusicPlayer({ song, onNext, onPrevious }: MusicPlayerProps) {
    return (
        <div>
            <p>{song.title}</p>
            <AudioPlayer
                autoPlay
                showSkipControls
                onEnded={onNext}
                onClickNext={onNext}
                onClickPrevious={onPrevious}
                src={'http://localhost:8000/' + song.urlPath}

                onPlay={(e: any) => console.log('onPlay')}
            // other props as needed
            />
        </div>
    );
}
