import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Beranda", sectionId: "hero" },
    { name: "Cara Kerja", sectionId: "cara-kerja" },
    { name: "Harga", sectionId: "budget-calculator" },
    { name: "Pertanyaan", sectionId: "faq" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            WebKita
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={onLoginClick}
              className="text-gray-700 hover:text-blue-600 transition font-medium px-6 py-2"
            >
              Masuk
            </button>
            <button 
              onClick={onRegisterClick}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Daftar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-medium py-2"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                onLoginClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-gray-700 hover:text-blue-600 transition font-medium py-2 text-left"
            >
              Masuk
            </button>
            <button 
              onClick={() => {
                onRegisterClick();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Daftar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;