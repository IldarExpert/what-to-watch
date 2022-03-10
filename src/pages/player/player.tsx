import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilm} from '../../store/api-action';
import {getFilm, getIsLoading} from '../../store/data-reducer/selectors';
import {convertTimePlayer} from '../../servises/convert-time-player';

const Player = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const filmData = useSelector(getFilm);
  const isLoading = useSelector(getIsLoading);
  const navigate = useNavigate();
  const videoTag = useRef<HTMLVideoElement>(null);
  const videoProgress = useRef<HTMLProgressElement>(null);

  const [videoIsPlay, setVideoIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(0);
  const [progress, setProgress] = useState<number | undefined>(0);
  const [capturePoint, setCapturePoint] = useState(false);

  const handleExitClick = () => {
    navigate(-1);
  }

  const handlePlayClick = () => {
    if (videoIsPlay) {
      videoTag.current?.pause();
    } else {
      videoTag.current?.play();
    }

    setVideoIsPlay((prev) => !prev);
  }

  const handleFullScreenClick = () => {
    videoTag.current?.requestFullscreen();
  }

  const handleDurationChange = () => {
    if (videoTag.current?.currentTime && videoTag.current?.currentTime >= 0) {
      let timeLeft = videoTag.current?.currentTime - videoTag.current?.duration;
      setTimeLeft(timeLeft);
    }
  }

  const handleProgressClick = (e: any) => {
    let newProgress = (e.clientX - e.target.getBoundingClientRect().left) * 100 / e.target.offsetWidth;
    setProgress(newProgress);
  }

  const handlePointerDown = (e: any) => {
    e.target.setPointerCapture(e.pointerId);
    e.target.ondragstart = () => false;
    setCapturePoint(true);
  }

  const handlePointerMove = (e: any) => {
    if (capturePoint) {
      let newProgress = videoProgress.current && (e.clientX - videoProgress.current.getBoundingClientRect().left) * 100 / videoProgress.current.offsetWidth;

      if (newProgress && newProgress < 0) newProgress = 0;
      if (newProgress && newProgress > 100) newProgress = 100;
      newProgress && setProgress(newProgress);
    }
  }

  const handlePointerUp = (e: any) => {
    setCapturePoint(false);
  }

  useEffect(() => {
    dispatch(fetchFilm(id));
  }, []);

  useEffect(() => {
    let currentTimeInterval: ReturnType<typeof setInterval>;
    if (videoIsPlay) {
      currentTimeInterval = setInterval(() => {
        setCurrentTime(videoTag.current?.currentTime);
        let timeLeft = (videoTag.current?.currentTime && videoTag.current?.currentTime - videoTag.current?.duration);
        setTimeLeft(timeLeft);
      }, 100);
    }

    return () => clearInterval(currentTimeInterval);
  }, [videoIsPlay]);

  useEffect(() => {
    let progressTime = currentTime && videoTag.current?.duration && currentTime * 100 / videoTag.current?.duration;
    setProgress(progressTime);
    if (progressTime && Math.round(progressTime) === 100) {
      setVideoIsPlay(false);
    }

  }, [currentTime]);

  useEffect(() => {
    if (progress) {
      videoTag.current && (videoTag.current.currentTime = (progress / 100) * videoTag.current?.duration);
    }
    if (videoTag.current?.currentTime && videoTag.current?.currentTime >= 0) {
      let timeLeft = videoTag.current?.currentTime - videoTag.current?.duration;
      setTimeLeft(timeLeft);
    }
  }, [progress]);

  useEffect(() => {
    setTimeLeft(videoTag.current?.duration);
  }, [videoTag])


  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="player">
      <video
        ref={videoTag}
        src={filmData.videoLink}
        className="player__video"
        poster={filmData.backgroundImage}
        onDurationChange={handleDurationChange}
        loop={false}
        muted={false}
        data-testid="videoPlayer"
      />

      <button onClick={handleExitClick} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              ref={videoProgress}
              onClick={handleProgressClick}
              className="player__progress"
              value={progress}
              max="100"
            />
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="player__toggler"
              style={{left: `${progress}%`}}
            >
              Toggler
            </div>
          </div>
          <div
            className="player__time-value">{convertTimePlayer(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button
            onClick={handlePlayClick}
            type="button"
            className="player__play"
            data-testid="buttonPlayPause"
          >
            {videoIsPlay ?
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </>
              :
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </>
            }
          </button>
          <div className="player__name">{filmData.name}</div>

          <button onClick={handleFullScreenClick} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;

