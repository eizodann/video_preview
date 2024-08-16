import { useEffect, useState } from "react";
import { VideoData } from "../components";

export const useFetchVideos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [videoList, setVideoList] = useState<VideoData[]>([]);

  const getVideos = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json"
      );
      const res = await response.json();
      setVideoList(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return {
    isLoading,
    isError,
    videoList,
  };
};
