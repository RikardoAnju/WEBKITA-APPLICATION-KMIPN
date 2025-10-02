import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

/**
 
 * @param {object} props
 * @param {React.ReactNode} props.children 
 * @param {function} props.onLoginClick 
 * @param {function} props.onCaraKerjaClick 
 * @param {function} props.onNavigateHome 
 * @param {function} props.onNavigateHarga 
 */
export default function Layout({ 
  children, 
  onLoginClick, 
  onCaraKerjaClick,
  onNavigateHome,
  onNavigateHarga 
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar di atas */}
      <Navbar 
        onLoginClick={onLoginClick} 
        onCaraKerjaClick={onCaraKerjaClick}
        onNavigateHome={onNavigateHome}
        onNavigateHarga={onNavigateHarga}
      />
     
      {/* Konten Halaman Utama (diinject melalui props children) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer di bawah */}
      <Footer />
    </div>
  );
}