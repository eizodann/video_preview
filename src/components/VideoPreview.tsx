import classNames from "classnames";
import { useState, useRef, useCallback, MouseEvent } from "react";
import { isDesktop } from "react-device-detect";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMute } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

export interface VideoData {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: number;
  author: string;
  videoUrl: string;
}

interface BaseVideoPreviewProps {
  video: VideoData;
}

interface InteractiveVideoProps extends BaseVideoPreviewProps {
  mode: "interactive";
  onVideoStart?: () => void;
  onVideoEnd?: () => void;
  onVideoResume?: () => void;
  onVideoSeek?: (time: number) => void;
}

interface StaticVideoProps extends BaseVideoPreviewProps {
  mode: "static";
  onVideoStart?: never;
  onVideoEnd?: never;
  onVideoResume?: never;
  onVideoSeek?: never;
}

type VideoPreviewProps = InteractiveVideoProps | StaticVideoProps;

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  video,
  mode,
  onVideoStart,
  onVideoEnd,
  onVideoResume,
  onVideoSeek,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasManuallyNavigated, setHasManuallyNavigated] = useState(false);
  const [lastTrackedPosition, setLastTrackedPosition] = useState(0);
  const [duration, setDuration] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isInteractive = mode === "interactive";

  const handleVideoTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setLastTrackedPosition(videoRef.current.currentTime);
    }
  }, []);

  const handleVideoEnded = useCallback(() => {
    setHasManuallyNavigated(false);
    if (isInteractive) {
      onVideoEnd?.();
    }
  }, [isInteractive, onVideoEnd]);

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as Element).closest("#sound-button")) {
        return;
      }
      if (isInteractive && isDesktop) {
        hoverTimerRef.current = setTimeout(() => {
          setIsPlaying(true);
          if (videoRef.current) {
            if (hasManuallyNavigated) {
              videoRef.current.currentTime = lastTrackedPosition;
              onVideoResume?.();
            } else {
              videoRef.current.currentTime = 0;
              onVideoStart?.();
            }
            videoRef.current.play();
          }
        }, 500);
      }
    },
    [
      isInteractive,
      hasManuallyNavigated,
      lastTrackedPosition,
      onVideoResume,
      onVideoStart,
    ]
  );

  const handleMouseLeave = useCallback(() => {
    if (isInteractive) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        setLastTrackedPosition(videoRef.current.currentTime);
      }
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    }
  }, [isInteractive]);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const time = parseFloat(e.target.value);
      setCurrentTime(time);
      setLastTrackedPosition(time);
      setHasManuallyNavigated(true);
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
      if (isInteractive) {
        onVideoSeek?.(time);
      }
    },
    [isInteractive, onVideoSeek]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  }, [isMuted]);

  const convertToSeconds = (timeStr: string) => {
    const parts = timeStr.split(":");
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div
        className="relative aspect-video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPlaying && isInteractive ? (
          <div className="w-full h-full object-cover">
            <video
              ref={videoRef}
              src={video.videoUrl}
              autoPlay
              muted={isMuted}
              onCanPlay={() => setDuration(`${videoRef.current?.duration}`)}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
            />
          </div>
        ) : (
          <img
            className="w-full h-full object-cover rounded-md"
            src={video.thumbnailUrl}
            alt={video.title}
          />
        )}
        <div className={classNames("flex", { invisible: !isPlaying })}>
          <div className="grow relative bottom-[9px]">
            <input
              className="w-full"
              id="range"
              type="range"
              min="0"
              max={duration ?? convertToSeconds(video.duration)}
              value={currentTime}
              onChange={handleSeek}
              step="0.01"
            />
          </div>
          <button
            id="sound-button"
            className="text-white bg-[#0009] p-1 absolute rounded-[50%] top-3 right-2 rotate-180"
            onClick={toggleMute}
          >
            {isMuted ? (
              <IoVolumeMute className="" size={24} />
            ) : (
              <GoUnmute size={24} />
            )}
          </button>
          <span className="absolute bottom-[28px] right-2 bg-[#0009] text-white px-1 rounded text-xs">
            {formatTime(currentTime)} / {formatTime(Number(duration))}
          </span>
        </div>
      </div>
      <div className="flex space-x-2 items-start">
        <RxAvatar size={36} className="text-zinc-400" />
        <div>
          <h3>{video.title}</h3>
          <div className="text-sm text-zinc-400">
            <p>{video.author}</p>
            <p>
              {video.views} views • {video.uploadTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
