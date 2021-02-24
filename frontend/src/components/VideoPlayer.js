import React, { useState, useEffect, useRef } from 'react';
import '../Styles/VideoPlayer.css';
import { useInView } from 'react-intersection-observer';

// Material Ui
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [ref, inView, entry] = useInView({
        threshold: 1.0
    })

    useEffect(() => {
        if (inView) {
            setIsPlaying(true);
            videoRef.current.play()
        } else {
            setIsPlaying(false);
            videoRef.current.pause()
        }
    }, [inView, ref, entry])

    const onPlayPress = () => {
        if (isPlaying) {
            setIsPlaying(false);
            videoRef.current.pause()
        } else {
            setIsPlaying(true);
            videoRef.current.play()
        }
    }

    const onMutePress = () => {
        setIsMuted(!isMuted)
    }

    return (
        <div className='video__container' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className='video__wrapper' ref={ref}>
                <video muted={isMuted} loop ref={videoRef} className='video' src={src} />
                <div className={`controls ${isHovering ? 'showControls' : 'hideControls'}`}>
                    <div className='controls__option' onClick={onPlayPress}>
                        {isPlaying ? (
                            <PauseRoundedIcon />
                        ) : (
                            <PlayArrowRoundedIcon />
                        )}
                    </div>
                    <div className='controls__option' onClick={onMutePress}>
                        {isMuted ? (
                            <VolumeOffRoundedIcon />
                        ) : (
                            <VolumeUpRoundedIcon />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;
