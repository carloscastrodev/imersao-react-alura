import React, { useEffect, useState } from 'react';
import './styles.css';
import YTApiMessages from '../../services/YTApiMessages';
import useWindowDimensions from '../hooks/windowDimensions';
import useOnMount from '../hooks/onMount';

const HighlightVideoPlayer = ({ videoInfo, shouldVideoPlay, controls }) => {
  const videoId = videoInfo.videoId;
  const [contentWindow, setContentWindow] = useState(null);
  const { width } = useWindowDimensions();

  useOnMount(() => {
    const player = document.getElementById('highlight-player');
    setContentWindow(player.contentWindow);
  });

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
          ((width <= 1024 || controls) && '1') || '0'
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
