import React from "react";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">WebKita</h3>
            <p className="text-gray-400 text-sm">
              Platform marketplace yang menghubungkan bisnis dengan developer
              profesional terbaik.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-400 hover:text-white transition"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cara-kerja")}
                  className="text-gray-400 hover:text-white transition"
                >
                  Cara Kerja
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("harga")}
                  className="text-gray-400 hover:text-white transition"
                >
                  Harga
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Website Development</li>
              <li>UI/UX Design</li>
              <li>E-commerce Solutions</li>
              <li>Mobile App Development</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@webkita.com</li>
              <li>Phone: +62 821-7148-4751</li>
              <li>Address: Batam, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 WebKita. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;