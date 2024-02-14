// components/VideoThumbnail.tsx
'use client';
import React from 'react';

import Image from 'next/image';

interface VideoThumbnailProps {
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  const handleVideoClick = () => {
    // Implement your logic to redirect or play the video
    console.log('Video clicked!');
  };

  return (
    <div className="relative cursor-pointer" onClick={handleVideoClick}>
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
        <Image src={videoUrl} layout="fill" objectFit="cover" alt="Video Thumbnail" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
        ▶
      </div>
    </div>
  );
};

export default VideoThumbnail;
