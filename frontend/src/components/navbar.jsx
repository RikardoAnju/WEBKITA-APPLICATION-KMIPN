import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onLoginClick, onRegisterClick, onCaraKerjaClick, onNavigateHome, onHargaClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  const navLinks = [
    { name: "Beranda", onClick: onNavigateHome || (() => window.location.href = "/") },
    { name: "Cara Kerja", onClick: onCaraKerjaClick || (() => {}) },
    { name: "Harga", onClick: onHargaClick || (() => {}) },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={onNavigateHome || (() => window.location.href = "/")}
          >
            Webkita
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={onLoginClick || (() => window.location.href = "/login")}
              className="text-gray-700 hover:text-blue-600 transition font-medium px-6 py-2"
            >
              Masuk
            </button>
            <button
              onClick={onRegisterClick || (() => window.location.href = "/register")}
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
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  link.onClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition font-medium py-2"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                if (onLoginClick) {
                  onLoginClick();
                } else {
                  window.location.href = "/login";
                }
                setMobileMenuOpen(false);
              }}
              className="w-full text-gray-700 hover:text-blue-600 transition font-medium py-2 text-left"
            >
              Masuk
            </button>
            <button
              onClick={() => {
                if (onRegisterClick) {
                  onRegisterClick();
                } else {
                  window.location.href = "/register";
                }
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
}