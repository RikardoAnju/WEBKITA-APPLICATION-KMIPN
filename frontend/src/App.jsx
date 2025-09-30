import React, { useState, useEffect } from "react";
import {
  Code2,
  Users,
  Zap,
  ArrowRight,
  Clock,
  Shield,
  Menu,
  X,
} from "lucide-react";

// Komponen Login sederhana
function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Masuk</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main App Component ---
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  // --- AOS Initialization ---
  useEffect(() => {
    // Dynamically load AOS CSS
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Dynamically load AOS JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
    script.onload = () => {
      // Initialize AOS once script is loaded
      if (window.AOS) {
        window.AOS.init({
          duration: 800, // Durasi animasi lebih cepat untuk smooth transition
          once: false, // Animasi berulang setiap kali element masuk viewport
          mirror: true, // Animasi berjalan saat scroll ke atas
          offset: 100, // Jarak dari viewport sebelum animasi dimulai (px)
          easing: 'ease-in-out-cubic', // Easing function untuk transisi lebih smooth
          anchorPlacement: 'top-bottom', // Titik anchor untuk trigger animasi
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup function to remove the added elements on component unmount
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount
  // ------------------------

  // Jika halaman login, tampilkan komponen Login
  if (currentPage === "login") {
    return <Login />;
  }

  // Card component for reusability
  const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <div
      className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="p-4 bg-gray-900 text-white rounded-full inline-flex mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Static, no AOS */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-gray-900">Webkita</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Keunggulan
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Cara Kerja
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Harga
              </a>
              <button
                onClick={() => setCurrentPage("login")}
                className="text-gray-700 hover:text-blue-600 transition font-medium px-6 py-2"
              >
                Masuk
              </button>
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition">
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
              >
                Keunggulan
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
              >
                Cara Kerja
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 transition font-medium py-2"
              >
                Harga
              </a>
              <button
                onClick={() => setCurrentPage("login")}
                className="w-full text-gray-700 hover:text-blue-600 transition font-medium py-2 text-left"
              >
                Masuk
              </button>
              <button className="w-full bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium">
                Daftar
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 order-2 lg:order-1" data-aos="fade-right">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
                  Platform Teknologi #1
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Hubungkan Bisnis Anda dengan Developer Terbaik
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Platform marketplace yang menghubungkan pembeli dengan developer
                profesional. Kami mengelola pihak ketiga terpercaya untuk
                memastikan proyek website Anda berjalan lancar.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center group">
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-900 hover:bg-gray-50 transition">
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Info Items */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-semibold text-sm">100k+ Pengguna</div>
                    <div className="text-sm text-gray-500">
                      Bergabung dengan Kami
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="text-sm font-medium">Respon Cepat</div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div className="text-sm font-medium">Garansi Keamanan</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2" data-aos="fade-left">
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "60px 60px 60px 60px",
                  clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team Working"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/10" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Services Section (Layanan Kami) --- */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menawarkan berbagai layanan pembuatan website yang
              profesional dan disesuaikan dengan kebutuhan bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Code2}
              title="Pembuatan Website Kustom"
              description="Dari nol hingga siap pakai, kami rancang website yang unik, optimal, dan sesuai dengan identitas merek Anda."
              delay="100"
            />
            <ServiceCard
              icon={Zap}
              title="Integrasi E-commerce"
              description="Tingkatkan penjualan dengan toko online yang canggih, aman, dan terintegrasi dengan berbagai sistem pembayaran."
              delay="300"
            />
            <ServiceCard
              icon={Shield}
              title="Keamanan & Perawatan"
              description="Pastikan website Anda selalu aman, cepat, dan bebas dari masalah dengan dukungan teknis 24/7 kami."
              delay="500"
            />
          </div>
        </div>
      </div>
      {/* --- Horizontal Separator --- */}
      <div className="border-t border-gray-100"></div>

      {/* --- Call to Action Section (CTA) --- */}
      <div className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl p-10 sm:p-16 text-center shadow-2xl" data-aos="zoom-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Siap Memulai Proyek Website Anda?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Jangan tunda lagi. Hubungi kami sekarang dan dapatkan konsultasi
              gratis untuk mewujudkan ide digital Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition shadow-lg">
                Konsultasi Gratis
              </button>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition border border-transparent">
                Lihat Portofolio Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Webkita</h3>
              <p className="text-sm text-gray-600">
                Hubungkan bisnis Anda dengan developer terbaik.
              </p>
              <div className="mt-4 flex space-x-4">
                {/* Placeholder for social media icons */}
                <a href="#" className="text-gray-400 hover:text-gray-900">
                  {/* Icon Placeholder (e.g., Facebook, Twitter) */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.766 7.824 6.64 9.123.486.089.665-.213.665-.473v-1.64c-2.68.583-3.243-1.288-3.243-1.288-.438-1.111-1.07-1.405-1.07-1.405-.875-.596.066-.584.066-.584.77 0 1.173.793 1.173.793.682 1.168 1.794.83 2.235.635.068-.492.269-.83.487-1.02-2.04-.23-4.183-1.02-4.183-4.524 0-1.002.359-1.82.951-2.46-.096-.23-.413-1.166.091-2.42 0 0 .779-.246 2.55.945.74-.206 1.52-.308 2.308-.312.788.004 1.568.106 2.308.312 1.77-1.191 2.549-.945 2.549-.945.504 1.254.187 2.19.091 2.42.592.64.951 1.458.951 2.46 0 3.513-2.146 4.29-4.195 4.516.326.279.62.833.62 1.674v2.486c0 .26.179.564.66.473C19.237 19.82 22 16.237 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Group 1 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Perusahaan</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Tentang Kami</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Karir</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Kontak</a></li>
              </ul>
            </div>

            {/* Links Group 2 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Layanan</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Developer</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">E-commerce</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Design</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Konsultasi</a></li>
              </ul>
            </div>

            {/* Links Group 3 */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Dukungan</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Pusat Bantuan</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Syarat & Ketentuan</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Kebijakan Privasi</a></li>
              </ul>
            </div>
            
            {/* Newsletter/Contact */}
             <div className="col-span-2 md:col-span-1">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-4">
                Dapatkan update terbaru dari kami.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="px-4 py-2 border border-gray-300 rounded-l-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition text-sm">
                  Kirim
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Webkita. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;