const NetflixLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Inner glow */}
        <div className="absolute inset-2 bg-red-600 rounded-full blur-md opacity-70 animate-pulse"></div>
      </div>
    </div>
  );
};

export default NetflixLoader;
