import { Moon, Sun } from "lucide-react";

type ThemeProps = {
  theme: string;
  onToggle: () => void;
};

function ThemeToggle({ theme, onToggle }: ThemeProps) {
  return (
    <button
      className="absolute top-5 right-5 cursor-pointer z-10"
      onClick={onToggle}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

export default ThemeToggle;
