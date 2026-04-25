const VideoTitle = ({ title, description }) => {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col
      justify-center px-6 md:px-16 bg-gradient-to-r
     from-black/80 via-black/40 to-transparent text-white"
    >
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-xl">{title}</h1>

      <p className="mt-4 text-sm lg:text-lg max-w-lg line-clamp-3 text-gray-200">
        {description}
      </p>

      <div className="mt-6 flex gap-3">
        <button className="bg-white text-black px-6 py-2 rounded font-semibold
         hover:bg-gray-300 cursor-pointer">
          ▶ Play
        </button>

        <button className="bg-gray-500/50 text-white px-6 py-2 rounded font-semibold
         hover:bg-gray-500/30 cursor-pointer">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
