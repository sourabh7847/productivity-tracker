import React, { useState } from "react";
import ThemeToggle from "./ThemToggle";
interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
const Header = ({
  isDarkMode,
  toggleTheme,
}: HeaderProps) => {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-800">
      <header className="sticky top-0 z-10  shadow-sm px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
          Wellness Tracker
        </h1>
        <ThemeToggle
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </header>
    </div>
  );
};

export default Header;
