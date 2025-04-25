import React from "react";
import { SunIcon, MoonIcon } from "lucide-react";
interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
const ThemeToggle = ({
  isDarkMode,
  toggleTheme,
}: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label={
        isDarkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      {isDarkMode ? (
        <SunIcon size={18} />
      ) : (
        <MoonIcon size={18} />
      )}
    </button>
  );
};
export default ThemeToggle;
