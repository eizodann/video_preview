import { VideoList } from "./components";
import { useFetchVideos } from "./hooks";

function App() {
  const { isLoading, videoList, isError } = useFetchVideos();

  return (
    <div className="border-2 rounded md:m-4 m-1 p-4 space-y-2 shadow-sm">
      <h1 className="text-center font-bold text-xl text-slate-700">
        YouTube-like Video Preview
      </h1>
      {isLoading && <p className="text-center">Loading Videos...</p>}
      {isError && (
        <p className="text-center">
          Error loading Videos. Please try again later.
        </p>
      )}
      {!isLoading && !isError && <VideoList videos={videoList} />}
    </div>
  );
}

export default App;
