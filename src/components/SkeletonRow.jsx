const SkeletonRow = () => {
  return (
    <div className="mb-8">
      <div className="h-6 w-40 bg-gray-700 rounded mb-4 animate-pulse"></div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-40 h-60 bg-gray-800 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonRow;