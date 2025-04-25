import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  return (
    <main
      className={`${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }h-[100vh] flex flex-col`}
    >
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex-1 ">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
