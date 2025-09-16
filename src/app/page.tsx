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
  const [duration, setDuration] = useState(0);

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
    video.paused ? video.play() : video.pause();
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
    document.fullscreenElement
      ? document.exitFullscreen()
      : video.requestFullscreen();
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
    <div className="h-screen bg-[#f5f2e8] text-[#7D2B18] flex justify-center overflow-hidden">
      {/* centred / width-constrained canvas */}
      <div className="relative w-full max-w-[1040px] px-6 h-full flex flex-col">
        {/* headline and graphic together */}
        <div
          className="absolute text-xl"
          style={{ left: `calc(50% - ${HALF_VIDEO}px)`, top: "6rem" }}
        >
          &ldquo;Describe your perfect date...&rdquo;

          {/* d1 graphic */}
          <Image
            src="/d1.svg"
            alt=""
            width={180}
            height={200}
            className="mt-8 pl-16"
            priority
          />
        </div>

        {/* right-side copy – perfectly aligns with video's right edge */}
        <div
          className="absolute top-32  mb-8 text-right leading-relaxed text-xl"
          style={{ right: `calc(50% - ${HALF_VIDEO}px)` }}
        >
          <div className="mb-2">April 25, 2026.</div>
          <div>Frankies 457 Spuntino.</div>
          <div>A night in Carroll Gardens.</div>
          <div>Dinner&apos;s on us.</div>
          <div>Bring a light jacket.</div>
        </div>

        {/* ---------- Main vertical flow (video + controls + bottom decor) ----------- */}
        <div className="flex flex-col items-center justify-center flex-grow mt-16">
          {/* video */}
          <div className="relative">
            <video
              ref={videoRef}
              width={VIDEO_WIDTH}
              height={360}
              poster="/cover.png"
              className="shadow-xl"
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* custom controls */}
          <div
            className="flex justify-between mt-4 text-xl"
            style={{ width: VIDEO_WIDTH }}
          >
            <button
              onClick={togglePlay}
              className="hover:opacity-70 cursor-pointer"
            >
              {isPlaying ? `pause ${formatTime(currentTime)}/01:20` : "play"}
            </button>

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

        {/* bottom colour chips */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center">
          <div className="w-16 h-12 bg-[#f5f2a8] mr-4"></div>

          <div className="w-16 h-12 bg-[#a8c8d4] ml-4"></div>
        </div>

        {/* logo */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={60}
            className="opacity-80"
            priority
          />
        </div>
      </div>
    </div>
  );
}
