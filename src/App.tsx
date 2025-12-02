import { Cards, Welcome } from "@components/index";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative z-10 text-center max-w-3xl">
        <Welcome />
        <Cards />
      </div>
    </div>
  );
};

export default App;
