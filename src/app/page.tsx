"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const VIDEO_WIDTH = 540; //  centralised value = fewer magic numbers
  const HALF_VIDEO = VIDEO_WIDTH / 2;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [, setDuration] = useState(0);

  /* ------------------------------ video logic ----------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

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

  /* ------------------------------  layout  -------------------------------- */

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#f5f2e8] text-[#7D2B18] flex flex-col items-center px-4 py-8">
      {/* Site overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-5"
        style={{
          backgroundImage: "url(/overlay.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Main content container */}
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-center h-full space-y-6">
        {/* Top section with headline and date info - aligned to video edges */}
        <div className="w-full max-w-[720px] flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-8 lg:space-y-0 text-xl">
          {/* Left side - headline and graphic */}
          <div>
            &ldquo;Describe your perfect date...&rdquo;
            <div className="hidden lg:block mt-8 pl-16">
              <Image src="/d1.svg" alt="" width={144} height={160} priority />
            </div>
          </div>

          {/* Right side - date details */}
          <div className="lg:text-right leading-relaxed">
            <div className="mb-2">April 25, 2026.</div>
            <div>Frankies 457 Spuntino.</div>
            <div>A night in Carroll Gardens.</div>
            <div>Dinner&apos;s on us.</div>
            <div>Bring a light jacket.</div>
          </div>
        </div>

        {/* Video section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative bg-[#f5f2e8] w-full max-w-[720px]">
            <video
              ref={videoRef}
              className="bg-[#f5f2e8] cursor-pointer w-full h-auto"
              poster="/cover.png"
              onClick={togglePlay}
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play button overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
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
              </div>
            )}
          </div>

          {/* custom controls */}
          <div className="flex justify-between text-xl w-full max-w-[720px]">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="hover:opacity-70 cursor-pointer"
              >
                {isPlaying ? "pause" : "play"}
              </button>
              {isPlaying && <span>{formatTime(currentTime)}/01:20</span>}
            </div>

            <div className="flex gap-6">
              <button
                onClick={toggleMute}
                className="hover:opacity-70 cursor-pointer"
              >
                {isMuted ? "unmute" : "mute"}
              </button>
              <button
                onClick={toggleFullscreen}
                className="hover:opacity-70 cursor-pointer"
              >
                fullscreen
              </button>
            </div>
          </div>
        </div>

        {/* Bottom graphics */}
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <Image
              src="/d2.svg"
              alt=""
              width={280}
              height={100}
              priority
              className="ml-24"
            />
            <Image
              src="/logo.svg"
              alt="Logo"
              width={65}
              height={65}
              className="absolute opacity-80"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
