import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

/**
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children 
 * @param {function} props.onLoginClick 
 * @param {function} props.onCaraKerjaClick 
 * @param {function} props.onNavigateHome 
 * @param {function} props.onHargaClick
 * @param {function} props.onRegisterClick
 * @param {string} props.currentPage
 */
export default function Layout({ 
  children, 
  onLoginClick, 
  onCaraKerjaClick,
  onNavigateHome,
  onRegisterClick,
  onHargaClick, 
  currentPage,
}) {
  // daftar halaman yang tidak butuh Navbar & Footer
  const hideNavAndFooter = ["login", "register"];
  const shouldHide = hideNavAndFooter.includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar hanya muncul kalau bukan login/register */}
      {!shouldHide && (
        <Navbar 
          onLoginClick={onLoginClick} 
          onCaraKerjaClick={onCaraKerjaClick}
          onNavigateHome={onNavigateHome}
          onHargaClick={onHargaClick}
          onRegisterClick={onRegisterClick}
        />
      )}
     
      {/* Konten Halaman Utama (diinject melalui props children) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer hanya muncul kalau bukan login/register */}
      {!shouldHide && <Footer />}
    </div>
  );
}
