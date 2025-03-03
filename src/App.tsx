import ThemeToggle from "./components/ThemeToggle";
import { usePersistedState } from "./hooks/usePersistedState";
import TaskList from "./pages/TaskList";

function App() {
  const [theme, setTheme] = usePersistedState<string>(
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div
      className={`${theme} min-h-screen min-w-screen bg-zinc-200 dark:bg-zinc-900 text-black dark:text-white`}
    >
      <ThemeToggle onToggle={handleTheme} theme={theme} />

      <div className=" w-full h-full p-2 sm:p-8 relative">
        <h1 className="text-4xl text-center font-bold mb-8 mt-20 sm:mt-0">
          TaskList
        </h1>

        <TaskList />
      </div>
    </div>
  );
}

export default App;
