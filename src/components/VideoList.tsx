import { VideoData, VideoPreview } from "./VideoPreview";

export const VideoList: React.FC<{ videos: VideoData[] }> = ({ videos }) => {
  return (
    <div className="flex flex-wrap justify-start md:justify-evenly items-center [&>*]:m-4 md:[&>*]:w-[44%] xl:[&>*]:w-[23%]">
      {videos.map((video) => (
        <VideoPreview
          key={video.id}
          video={video}
          mode="interactive"
          onVideoStart={() => console.log("Video started")}
          onVideoEnd={() => console.log("Video ended")}
          onVideoResume={() => console.log("Video resumed")}
          onVideoSeek={(time) => console.log("Video seeked to", time)}
        />
      ))}
    </div>
  );
};