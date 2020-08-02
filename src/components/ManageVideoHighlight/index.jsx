import React, { useState, useEffect } from 'react';
import HighlightVideoPlayer from '../HighlightVideoPlayer';
import './styles.css';
import FluidIframeAppendix from '../FluidIframeAppendix';
import useWindowDimensions from '../hooks/windowDimensions';
import ManageVideoAppendix from './ManageVideoAppendix';

const ManageVideoHighlight = ({ highlightedVideo, deleteVideoCallback }) => {
  const [iframeHeight, setIframeHeight] = useState(0);
  const [iframeWidth, setIframeWidth] = useState(0);

  const { width } = useWindowDimensions();
  useEffect(() => {
    const videoWrappers = document.getElementsByClassName(
      'video-player-wrapper',
    );
    const positionInfo = videoWrappers[0].getBoundingClientRect();
    const topOffset = 0.6 * positionInfo.height;
    const appendixWidth = 0.6 * positionInfo.width;
    setIframeHeight(topOffset);
    setIframeWidth(appendixWidth);
  }, [width]);
  return (
    <section className="manage-video-highlight-wrapper">
      <HighlightVideoPlayer
        videoInfo={highlightedVideo}
        shouldVideoPlay={false}
        controls={true}
      />
      <FluidIframeAppendix
        iframeHeight={iframeHeight}
        iframeWidth={iframeWidth}
      >
        <ManageVideoAppendix
          videoInfo={highlightedVideo}
          deleteVideoCallback={deleteVideoCallback}
        />
      </FluidIframeAppendix>
    </section>
  );
};

export default ManageVideoHighlight;
