"use client";
import { useState, useRef } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number, showSeconds = true) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return showSeconds
      ? `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-[720px] 2xl:max-w-[880px]">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            className="bg-site-bg cursor-pointer w-full h-full object-cover"
            poster="/cover.png"
            playsInline
            muted
            preload="metadata"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onPause={handlePause}
          >
            <source src="/sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play button overlay */}
          {!isPlaying && (
            <button
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="drop-shadow-lg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* custom controls */}
      <div className="flex justify-between text-xl w-full max-w-[720px] 2xl:max-w-[880px]">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="hover:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-site-text"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? "pause" : "play"}
          </button>
          {isPlaying && <span>{formatTime(currentTime)}/01:20</span>}
        </div>

        <div className="flex gap-6">
          <button
            onClick={toggleMute}
            className="hover:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-site-text"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? "unmute" : "mute"}
          </button>
          <button
            onClick={toggleFullscreen}
            className="hover:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-site-text"
            aria-label="Enter fullscreen"
          >
            fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
