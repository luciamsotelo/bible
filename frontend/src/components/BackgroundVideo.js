import React from 'react';
import '../styles/BackgroundVideo.css'; // Your CSS file

const BackgroundVideo = () => {
  return (
    <div className="background-video-container">
      <video autoPlay muted loop id="background-video">
        <source src="/videos/coudVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
