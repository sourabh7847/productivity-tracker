import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  return (
    <main className={`${" bg-gray-900"} flex flex-col`}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex-1 w-full ">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
