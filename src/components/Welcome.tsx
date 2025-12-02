export const Welcome = () => {
  return (
    <>
      <div className="mb-8 animate-fade-in">
        <div className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 mb-6">
          Welcome
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">Vite + React + TypeScript</h1>
        <p className="text-xl text-purple-200">Tailwind CSS + Modern Design</p>
      </div>

      <div className="mt-12 space-y-4">
        <p className="text-lg text-gray-300 leading-relaxed">
          A powerful, modern stack for building beautiful web applications with blazing-fast performance.
        </p>
      </div>
    </>
  );
};
