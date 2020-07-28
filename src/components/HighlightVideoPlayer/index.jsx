import React, { useEffect, useState } from 'react';
import './styles.css';
import YTApiMessages from './YTApiMessages';
import useWindowDimensions from '../hooks/windowDimensions';

const HighlightVideoPlayer = ({ videoInfo, shouldVideoPlay }) => {
  const { videoId } = videoInfo;

  const [contentWindow, setContentWindow] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const player = document.getElementById('highlight-player');
    setContentWindow(player.contentWindow);
  }, []);

  useEffect(() => {
    if (contentWindow) {
      if (shouldVideoPlay === false) {
        const pauseMessage = YTApiMessages.pause();
        contentWindow.postMessage(pauseMessage, '*');
      } else if (shouldVideoPlay === true) {
        const playMessage = YTApiMessages.play();
        contentWindow.postMessage(playMessage, '*');
      }
    }
  }, [shouldVideoPlay]);

  return (
    <div className="video-player-wrapper">
      <iframe
        title="highlight-player"
        id="highlight-player"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&start=0&disablekb=0&rel=0&modestbranding=1&autohide=1&controls=${
          (width <= 1024 && '1') || '0'
        }&playerapiid=ytplayer`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        className="yt-iframe-player"
      ></iframe>
      )
    </div>
  );
};

export default HighlightVideoPlayer;
