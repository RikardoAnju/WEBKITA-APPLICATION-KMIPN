import React, { useState, useEffect } from "react";
  import {
    Code2,
    Users,
    Zap,
    ArrowRight,
    Clock,
    Shield,
    ChevronLeft,
    ChevronRight,
    Package,
    FileText,
    CreditCard,
    Monitor,
    Rocket,
    Check,
    ChevronDown,
    Menu,
    X,
    SettingsIcon,
  } from "lucide-react";

  import Navbar from './components/Navbar';
  import Footer from './components/Footer';
  import Login from "./page/login";
  import Register from "./page/register";

  // ========== PAGE SECTIONS ==========

  const SLIDES = [
    {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      alt: "Team Working",
    },
    {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
      alt: "Business Meeting",
    },
    {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      alt: "Office Collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      alt: "Modern Workspace",
    },
  ];

  const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideCount = SLIDES.length;

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }, 5000);
      return () => clearInterval(timer);
    }, [slideCount]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideCount);
    const prevSlide = () =>
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    const goToSlide = (index) => setCurrentSlide(index);

    return (
      <div className="relative order-1 lg:order-2">
        <div
          className="relative overflow-hidden group"
          style={{
            borderRadius: "60px 60px 60px 60px",
            clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
            {SLIDES.map((slide, index) => (
              <img
                key={index}
                src={slide.src}
                alt={slide.alt}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ServiceCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <div className="p-4 bg-gray-900 text-white rounded-full inline-flex mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  

  const HeroSection = ({ onLoginClick }) => (
    <section id="hero" className="bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
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
              profesional. Kami mengelola pihak ketiga terpercaya untuk memastikan
              proyek website Anda berjalan lancar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
              onClick={onLoginClick}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center group">
                Mulai Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border-2 border-gray-900 hover:bg-gray-50 transition">
                Pelajari Lebih Lanjut
              </button>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-sm">100k+ Pengguna</div>
                  <div className="text-sm text-gray-500">Bergabung dengan Kami</div>                
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
          <ImageSlider />
        </div>
      </div>
    </section>
  );

const InvestmentValueSection = () => (
  <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24 scroll-mt-16 relative overflow-hidden">
    {/* Background gradient overlay, sedikit disesuaikan untuk lebih halus */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
    </div>

    {/* Placeholder untuk background image di sudut kanan bawah */}
    {/* Anda bisa mengganti 'your-image-url.jpg' dengan URL gambar asli Anda */}
    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-30 z-0">
        {/* Contoh: <img src="your-image-url.jpg" alt="Business Growth" className="w-full h-full object-contain" /> */}
        {/* Atau jika Anda ingin efek grafis abstrak seperti gambar di atas */}
        <svg className="w-full h-full text-blue-300" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor:'rgba(59,130,246,0.3)', stopOpacity:0.8}} />
                    <stop offset="100%" style={{stopColor:'rgba(59,130,246,0)', stopOpacity:0}} />
                </radialGradient>
            </defs>
            <circle cx="70" cy="70" r="50" fill="url(#grad1)" />
            <circle cx="30" cy="80" r="30" fill="url(#grad1)" />
        </svg>
    </div>


    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-black space-y-8" data-aos="fade-right">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold mb-4 border-2 border-blue-400/30 text-blue-800">
            Strategi Digital untuk Bisnis Anda
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Website Bukan Biaya,<br />Tapi <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Investasi</span> untuk Skala Bisnis
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed"> {/* Mengubah text-gray-500 menjadi text-gray-700 agar lebih mudah dibaca */}
            Di era digital ini, website profesional adalah aset utama, bukan sekadar pelengkap. Ini adalah gerbang untuk meraih audiens yang lebih luas, meningkatkan kredibilitas, dan secara eksponensial mengakselerasi pertumbuhan bisnis Anda dengan hasil yang terukur.
          </p>

          <div className="space-y-5 pt-4">
            {/* === Feature 1: Peningkatan Skala Bisnis === */}
            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm"> {/* Penyesuaian class */}
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" /> {/* Mengubah text-black menjadi text-white */}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">Skala Bisnis Tak Terbatas</h4>
                <p className="text-gray-600 text-sm">Jangkau pasar global, operasikan 24/7, dan lipatgandakan potensi pertumbuhan bisnis Anda tanpa batasan geografis atau waktu.</p>
              </div>
            </div>

            {/* === Feature 2: Konversi & Kepercayaan Pelanggan === */}
            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm"> {/* Penyesuaian class */}
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" /> {/* Mengubah text-black menjadi text-white */}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">Optimasi Konversi & Kredibilitas</h4>
                <p className="text-gray-600 text-sm">Ubah pengunjung menjadi pelanggan setia dengan desain intuitif, informasi lengkap, dan pengalaman pengguna yang prima.</p>
              </div>
            </div>

            {/* === Feature 3: Efisiensi Operasional === */}
            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm"> {/* Penyesuaian class */}
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" /> {/* Mengubah text-black menjadi text-white */}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">Efisiensi & Penghematan Jangka Panjang</h4>
                <p className="text-gray-600 text-sm">Otomatisasi proses bisnis, kurangi biaya promosi tradisional, dan fokus pada pertumbuhan inti perusahaan.</p>
              </div>
            </div>

            {/* === Feature 4: Dukungan Komprehensif === */}
            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 shadow-sm"> {/* Penyesuaian class */}
              <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" /> {/* Mengubah text-black menjadi text-white */}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-gray-800">Maintenance & Support Andal</h4>
                <p className="text-gray-600 text-sm">Kami memastikan website Anda selalu optimal, aman, dan siap menghadapi tantangan digital tanpa Anda pusing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bagian kanan dengan statistik --- */}
        <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="text-6xl font-extrabold mb-2">30</div>
            <div className="text-blue-100 text-lg font-semibold">Klien Puas</div>
            <div className="text-xs text-blue-200 mt-2">Dari berbagai industri</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="text-6xl font-extrabold mb-2">4.9/5</div>
            <div className="text-purple-100 text-lg font-semibold">Rating</div>
            <div className="text-xs text-purple-200 mt-2">Dari 30 review</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="text-6xl font-extrabold mb-2">100%</div>
            <div className="text-pink-100 text-lg font-semibold">On-Time</div>
            <div className="text-xs text-pink-200 mt-2">Delivery guarantee</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-2xl">
            <div className="text-6xl font-extrabold mb-2">24/7</div>
            <div className="text-orange-100 text-lg font-semibold">Support</div>
            <div className="text-xs text-orange-200 mt-2">Always ready</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsShowcaseSection = () => (
  <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center text-white space-y-8" data-aos="fade-up">
        <div className="inline-block mb-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold border-2 border-white/30">
            🚀 Platform Terpercaya #1 di Indonesia
          </span>
        </div>

        {/* === DIUBAH === */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Akselerasi Pertumbuhan Bisnis <br /> Melalui Angka Terbukti
        </h2>
        <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Kami tidak hanya berbicara tentang potensi, kami membuktikannya dengan hasil nyata. Setiap angka adalah cerminan dari komitmen kami terhadap kesuksesan Anda.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 pt-12 max-w-5xl mx-auto">
          {/* === DIUBAH === */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105" data-aos="zoom-in" data-aos-delay="100">
            <div className="text-5xl lg:text-6xl font-extrabold mb-3">30</div>
            <div className="text-blue-100 text-sm lg:text-base font-semibold">Kisah Sukses</div>
            <div className="text-xs text-blue-200 mt-2">Bisnis Telah Bertransformasi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105" data-aos="zoom-in" data-aos-delay="200">
            <div className="text-5xl lg:text-6xl font-extrabold mb-3">98%</div>
            <div className="text-purple-100 text-sm lg:text-base font-semibold">Tingkat Kepuasan</div>
            <div className="text-xs text-purple-200 mt-2">Melebihi Ekspektasi Klien</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105" data-aos="zoom-in" data-aos-delay="300">
            <div className="text-5xl lg:text-6xl font-extrabold mb-3">24/7</div>
            <div className="text-pink-100 text-sm lg:text-base font-semibold">Dukungan Prioritas</div>
            <div className="text-xs text-pink-200 mt-2">Kami Selalu Ada Untuk Anda</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105" data-aos="zoom-in" data-aos-delay="400">
            <div className="text-5xl lg:text-6xl font-extrabold mb-3">1</div>
            <div className="text-yellow-100 text-sm lg:text-base font-semibold">Tahun Inovasi</div>
            <div className="text-xs text-yellow-200 mt-2">Ahli di Industri Digital</div>
          </div>
        </div>

        {/* ... (sisa kode tidak berubah) ... */}
      </div>
    </div>
  </section>
);

   const GlobalMarketSection = ({ onLoginClick }) => (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Globe Visual */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-100 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
              
              {/* Main Globe Image Container */}
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 shadow-2xl">
                <div className="relative w-full aspect-square">
                  {/* Globe representation with dots */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Central circle */}
                      <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-30"></div>
                      <div className="absolute inset-4 rounded-full border-4 border-blue-300 opacity-40"></div>
                      <div className="absolute inset-8 rounded-full border-4 border-blue-400 opacity-50"></div>
                      
                      {/* Animated dots representing global reach */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-indigo-500 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                      
                      {/* Center icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating stats badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                  <div className="text-2xl font-bold text-blue-600">🌏</div>
                  <div className="text-xs font-semibold text-gray-700 mt-1">Global Reach</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce" style={{animationDelay: '0.5s'}}>
                  <div className="text-2xl font-bold text-purple-600">⚡</div>
                  <div className="text-xs font-semibold text-gray-700 mt-1">Fast Deploy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 order-1 lg:order-2" data-aos="fade-left">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold border-2 border-blue-200">
                🌍 Menuju Pasar Global
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Buat Website untuk Capai<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pasar Global</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              Perluas jangkauan bisnis Anda ke seluruh dunia dengan memiliki website profesional. Dengan website yang menarik dan mudah diakses, Anda bisa menjangkau lebih banyak pelanggan internasional dan meningkatkan penjualan. Wujudkan peluang bisnis baru di pasar global dengan langkah sederhana: buat website Anda sekarang!
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Jangkauan Tanpa Batas</h4>
                  <p className="text-sm text-gray-600">Website Anda dapat diakses 24/7 dari seluruh penjuru dunia, membuka peluang pasar internasional</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Kredibilitas Meningkat</h4>
                  <p className="text-sm text-gray-600">Website profesional meningkatkan kepercayaan dan kredibilitas brand Anda di mata konsumen global</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Penjualan Meningkat</h4>
                  <p className="text-sm text-gray-600">Raih pelanggan lebih banyak dan tingkatkan revenue bisnis dengan kehadiran online yang kuat</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onLoginClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
              >
                Buat Website Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <a
                href="https://wa.me/6282171484751?text=Halo%20saya%20ingin%20konsultasi%20tentang%20pembuatan%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const ServicesSection = () => (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai layanan pembuatan website yang profesional dan
            disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={Code2}
            title="Pembuatan Website Kustom"
            description="Dari nol hingga siap pakai, kami rancang website yang unik, optimal, dan sesuai dengan identitas merek Anda."
          />
          <ServiceCard
            icon={Zap}
            title="Integrasi E-commerce"
            description="Tingkatkan penjualan dengan toko online yang canggih, aman, dan terintegrasi dengan berbagai sistem pembayaran."
          />
          <ServiceCard
            icon={Shield}
            title="Keamanan & Perawatan"
            description="Pastikan website Anda selalu aman, cepat, dan bebas dari masalah dengan dukungan teknis 24/7 kami."
          />
        </div>
      </div>
    </section>
  );

  const CaraKerjaSection = () => {
    const steps = [
      {
        id: 1,
        title: "Pilih Paket",
        description:
          "Pilih paket layanan yang sesuai dengan kebutuhan bisnis Anda (UMKM, UI/UX, Front End, Back End atau Mobile/iOS Develpoment).",
        icon: Package,
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 2,
        title: "Isi Kebutuhan & Dokumen",
        description:
          "Lengkapi formulir kebutuhan aplikasi, upload dokumen pendukung, dan detail spesifikasi proyek Anda.",
        icon: FileText,
        color: "from-purple-500 to-purple-600",
      },
      {
        id: 3,
        title: "Pembayaran",
        description:
          "Lakukan pembayaran dengan sistem escrow yang aman. Dana Anda dijamin hingga proyek selesai.",
        icon: CreditCard,
        color: "from-green-500 to-green-600",
      },
      {
        id: 4,
        title: "Pantau Progres",
        description:
          "Pantau perkembangan proyek secara real-time melalui dashboard user. Update langsung dari tim developer.",
        icon: Monitor,
        color: "from-orange-500 to-orange-600",
      },
      {
        id: 5,
        title: "Serah Terima Proyek",
        description:
          "Setelah proyek selesai dan disetujui, kami serahkan kode, aset, dan dokumentasi lengkap kepada Anda.",
        icon: Rocket,
        color: "from-pink-500 to-pink-600",
      },
      {
        id: 6,
        title: "Maintenance & Support",
        description:
          "Dapatkan layanan pemeliharaan dan dukungan teknis berkelanjutan untuk menjaga website Anda tetap optimal.",
        icon: SettingsIcon,
        color: "from-indigo-500 to-indigo-600",
      },
    ];

    return (
      <section
        id="cara-kerja"
        className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 lg:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Proses Mudah & Transparan
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Cara Kerja WebKita
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              6 langkah sederhana untuk mewujudkan website impian Anda dengan aman
              dan terpercaya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="relative h-full">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                    <div
                      className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    >
                      {step.id}
                    </div>

                    <div className="flex flex-col flex-grow">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 mt-2 flex-shrink-0`}
                      >
                        <StepIcon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const BudgetCalculatorSection = ({ onLoginClick }) => {
    return (
      <section
        id="budget-calculator"
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Estimasi Budget
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Kalkulator Budget Proyek
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hitung estimasi budget untuk proyek website atau aplikasi Anda secara akurat dan terperinci
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Rencanakan Budget Anda</h3>
                  <p className="text-blue-100">
                    Dapatkan estimasi biaya yang transparan dan detail untuk proyek Anda
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Perhitungan Akurat
                    </h4>
                    <p className="text-sm text-gray-600">
                      Estimasi budget berdasarkan jenis proyek, fitur, dan timeline yang Anda pilih
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Harga Transparan
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tidak ada biaya tersembunyi, semua komponen budget dijelaskan dengan detail
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Fleksibel & Customizable
                    </h4>
                    <p className="text-sm text-gray-600">
                      Sesuaikan fitur dan timeline dengan kebutuhan dan budget Anda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Hasil Instan
                    </h4>
                    <p className="text-sm text-gray-600">
                      Dapatkan estimasi budget langsung setelah mengisi preferensi Anda
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center border-2 border-blue-100">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                    <Code2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Siap Menghitung Budget Anda?
                  </h3>
                  <p className="text-gray-600 max-w-lg mx-auto">
                    Login atau daftar terlebih dahulu untuk mengakses kalkulator budget lengkap dan mulai merencanakan proyek Anda
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={onLoginClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Mulai Hitung Budget
                  </button>
                  <a
                    href="https://wa.me/6282171484751?text=Halo%20saya%20ingin%20konsultasi%20tentang%20budget%20proyek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    Konsultasi Langsung
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-3">
              💡 Tips Menggunakan Kalkulator Budget:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Pilih jenis proyek yang paling sesuai dengan kebutuhan bisnis Anda
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Fitur tambahan dapat disesuaikan dengan budget yang tersedia
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Timeline fleksibel dapat membantu menghemat budget hingga 15%
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Hubungi kami untuk konsultasi gratis dan penawaran terbaik
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  };

  const PricingSection = () => {
    const pricingPlans = [
      {
        isPopular: true,
        title: "Paket UMKM",
        description: "Solusi lengkap untuk UMKM berkembang online",
        price: "1.500.000",
        priceRange: "Rp 1.500.000 - Rp 3.000.000",
        badge: "HEMAT & TERLARIS",
        features: [
          "Gratis domain 1 tahun",
          "Gratis hosting 1 tahun",
          "Gratis maintenance 3 bulan",
          "Optimasi SEO Dasar",
          "Training & edukasi untuk kelola website",
        ],
      },
      {
        title: "Paket UI/UX",
        description: "Desain modern dengan optimasi SEO lanjutan",
        price: "450.000",
        priceRange: "Mulai dari Rp 450.000",
        badge: "TERLARIS",
        features: [
          "Semi-custom responsive design",
          "CMS (Content Management System)",
          "Advanced SEO optimization",
          "Basic e-commerce functionality",
          "Analytics integration",
          "Maintenance support 1 tahun",
        ],
      },
      {
        title: "Paket Front End",
        description: "Website modern dengan animasi interaktif",
        price: "800.000",
        priceRange: "Mulai dari Rp 800.000",
        features: [
          "Desain UI/UX modern & responsive",
          "Dokumentasi & training penggunaan",
          "Optimasi kecepatan tampilan",
          "SEO friendly",
          "Animasi interaktif",
        ],
      },
      {
        title: "Paket Back End",
        description: "Sistem backend yang aman dan scalable",
        price: "900.000",
        priceRange: "Mulai dari Rp 900.000",
        badge: "PREMIUM",
        features: [
          "Pembuatan REST API",
          "Maintenance support 1 tahun",
          "Skalabilitas & optimasi performa server",
          "Keamanan data",
          "Autentikasi & otorisasi",
          "Manajemen database",
          "Integrasi dengan sistem eksternal",
        ],
      },
      {
        title: "Custom Web Development",
        description: "Website custom sesuai kebutuhan bisnis Anda",
        price: "3.000.000",
        priceRange: "Rp 3.000.000 - Rp 6.000.000",
        badge: "PREMIUM",
        features: [
          "Gratis hosting 1 tahun",
          "Gratis domain 1 tahun",
          "Maintenance gratis selama 3 bulan",
          "Kecepatan website teroptimasi",
          "Integrasi media sosial",
        ],
      },
      {
        title: "Mobile/iOS App Development",
        description: "Aplikasi mobile profesional untuk bisnis modern",
        price: "5.000.000",
        priceRange: "Rp 5.000.000 - Rp 10.000.000",
        badge: "ENTERPRISE",
        features: [
          "Desain UI/UX responsive & modern",
          "Integrasi API",
          "Dokumentasi & training penggunaan aplikasi",
          "System Integration",
          "Gratis maintenance 3 bulan",
        ],
      },
    ];

    return (
      <section
        id="harga"
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Paket Layanan Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Dari UMKM hingga
              enterprise, kami siap membantu mewujudkan website impian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer 
                ${
                  plan.isPopular
                    ? "border-4 border-blue-500"
                    : "border border-gray-200"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-xs shadow-md">
                    TERPOPULER
                  </div>
                )}

                {plan.badge && (
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold mb-3">
                    {plan.badge}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {plan.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Mulai dari</p>
                  <div className="flex items-baseline">
                    <span className="text-gray-700 mr-1">Rp</span>
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                  </div>
                  {plan.priceRange && (
                    <p className="text-xs text-gray-600 mt-1">{plan.priceRange}</p>
                  )}
                </div>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 mb-4 shadow-md
                  ${
                    plan.isPopular
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Lihat Detail
                </button>

                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">{feature}</p>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-xs text-blue-600 font-semibold pt-2">
                      +{plan.features.length - 3} fitur lainnya
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const testimonialsData = [
  {
    name: "Kevin Atmanda",
    quote:
      "Sejauh ini selama kurang lebih 3 tahun, penggunaannya memuaskan. Masalah selalu terselesaikan. Terdapat admin yang selalu sedia membantu. Ditambah lagi adanya komunitas...",
    avatarUrl: `https://ui-avatars.com/api/?name=Kevin+Atmanda&background=dbeafe&color=1e40af&bold=true`,
  },
  {
    name: "David Richards",
    quote:
      "Webkita memberikan layanan yang sangat baik, tidak hanya memberikan produk mereka saja, namun juga memberikan layanan yang bisa mempercantik tampilan dari website yang kita miliki...",
    avatarUrl: `https://ui-avatars.com/api/?name=David+Richards&background=dbeafe&color=1e40af&bold=true`,
  },
  {
    name: "Husein Izra",
    quote:
      "webkita Luar biasa! adminnya responsif, setiap kendala langsung dijawab dengan cepat. Proses pengerjaan juga nggak pake lama, ada grup diskusi yang aktif, jadi bisa saling tukar...",
    avatarUrl: `https://ui-avatars.com/api/?name=Husein+Izra&background=dbeafe&color=1e40af&bold=true`,
  },
  {
    name: "Qori firmana",
    quote:
      "Seneng banget sih punya website dengan Web Ekspor. Tidak hanya itu saja ada grup sharing yang jika ada yg ditanya, jual tiket pun mungkin ada. Dan adminnya...",
    avatarUrl: `https://ui-avatars.com/api/?name=Qori+firmana&background=dbeafe&color=1e40af&bold=true`,
  },
];

const TestimonialCard = ({ name, quote, companyUrl, avatarUrl }) => (
  <div className="flex-shrink-0 w-full px-2">
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <img
          src={avatarUrl}
          alt={name}
          className="w-14 h-14 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
        </div>
      </div>
      <blockquote className="text-gray-600 italic leading-relaxed flex-grow">
        "{quote}"
      </blockquote>
      <a
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm mt-4 inline-block"
      >
        {companyUrl}
      </a>
    </div>
  </div>
);
  
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex bg-blue-100 text-blue-800 font-semibold px-4 py-1 rounded-full text-sm mb-4">
            Suara Klien Kami
          </div>
          
          {/* === DIUBAH === */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Bergabunglah dengan Ribuan Kisah Sukses
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Mereka pernah berada di posisi Anda, mencari solusi untuk berkembang. Kini, mereka adalah bukti nyata dari kekuatan transformasi digital bersama kami.
          </p>
        </div>

        {/* === DIUBAH === */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">12.000+</h2>
            <p className="mt-2 text-gray-500 font-medium">Jejak Digital Tercipta</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">89%</h2>
            <p className="mt-2 text-gray-500 font-medium">Mengalami Lonjakan Penjualan</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">90%</h2>
            <p className="mt-2 text-gray-500 font-medium">Melaporkan Pertumbuhan Bisnis</p>
          </div>
        </div>

        {/* === Testimonials Slider === */}
        <div className="mt-20">
          <div className="relative max-w-xl mx-auto lg:max-w-4xl">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {/* Single card view for simplicity on mobile */}
                <div className="w-full flex-shrink-0 block lg:hidden">
                    <TestimonialCard {...testimonialsData[currentIndex]} />
                </div>

                {/* Multi-card view for larger screens */}
                <div className="w-full flex-shrink-0 hidden lg:flex lg:space-x-4">
                    <TestimonialCard {...testimonialsData[currentIndex]} />
                    <TestimonialCard {...testimonialsData[(currentIndex + 1) % testimonialsData.length]} />
                    <TestimonialCard {...testimonialsData[(currentIndex + 2) % testimonialsData.length]} />
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <button 
                  onClick={() => setCurrentIndex(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                  className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                  &lt;
              </button>
              <button
                  onClick={() => setCurrentIndex(prev => (prev + 1) % testimonialsData.length)}
                  className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                  &gt;
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: "Bagaimana cara melakukan pemesanan di WebKita?",
        answer:
          "Anda cukup memilih paket yang sesuai dengan kebutuhan — seperti paket UMKM, UI/UX, Front End, atau Back End. Setelah itu, isi detail proyek Anda dan tim kami akan segera menghubungi untuk konfirmasi serta estimasi waktu pengerjaan.",
      },
      {
        question: "Bagaimana sistem pembayarannya?",
        answer:
          "Kami menggunakan sistem escrow yang menjamin keamanan kedua belah pihak. Dana akan disimpan sementara oleh WebKita, dan baru diteruskan ke developer setelah proyek selesai serta disetujui oleh klien.",
      },
      {
        question: "Apa yang terjadi setelah saya melakukan pembayaran?",
        answer:
          "Setelah pembayaran terverifikasi, tim WebKita akan membuat ruang komunikasi proyek dan memulai proses pengembangan. Anda dapat memantau progres, memberi masukan, dan menerima update langsung dari tim developer.",
      },
      {
        question: "Apakah ada layanan setelah website saya selesai dibuat?",
        answer:
          "Tentu. WebKita menyediakan layanan maintenance dan support pasca proyek agar website Anda tetap optimal. Kami juga siap membantu bila Anda ingin menambah fitur, melakukan pembaruan, atau perawatan sistem secara berkala.",
      },
      {
        question: "Bagaimana cara melakukan perpanjangan layanan di Web Kita?",
        answer:
          "Anda dapat melakukan perpanjangan layanan melalui dashboard akun Anda. Pilih menu 'Layanan Saya', kemudian klik tombol 'Perpanjang' pada layanan yang ingin diperpanjang. Kami akan mengirimkan invoice dan panduan pembayaran selanjutnya.",
      },
      {
        question: "Bisakah saya mengganti domain website saya di Web Kita?",
        answer:
          "Ya, Anda dapat mengganti domain website kapan saja. Silakan hubungi tim support kami melalui email atau live chat, dan kami akan membantu proses perpindahan domain Anda dengan aman tanpa kehilangan data.",
      },
      {
        question: "Dimana kalian bisa menghubungi alamat kami?",
        answer:
          "Anda dapat menghubungi kami melalui halaman Kontak di website resmi WebKita atau melalui email & chat support yang tersedia 24 jam. Tim kami siap membantu setiap pertanyaan Anda dengan cepat. Alamat kantor kami tertera di bagian footer website.",
      },
    ];

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <section
        id="faq"
        className="bg-gray-50 py-16 lg:py-24 scroll-mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Perlu bantuan?
            </h2>
            <p className="text-gray-600 text-lg">
              Jangan khawatir! Cari dan temukan pertanyaanmu disini
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
            <a
              href="https://wa.me/6282171484751?text=Halo%20saya%20mau%20konsultasi%20tentang%20layanan%20Webkita"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    );
  };

  function App() {
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
      // Setup AOS (Animation on Scroll)
      const link = document.createElement("link");
      link.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
      script.onload = () => {
        if (window.AOS) {
          window.AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            offset: 100,
            easing: "ease-in-out-cubic",
            anchorPlacement: "top-bottom",
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        if (document.head.contains(link)) document.head.removeChild(link);
        if (document.body.contains(script)) document.body.removeChild(script);
      };
    }, []);

    // Handler untuk Navbar dan tombol navigasi
    const handleLoginClick = () => setCurrentPage("login");
    const handleRegisterClick = () => setCurrentPage("register");
    const handleNavigateHome = () => setCurrentPage("home");

    // Fungsi scroll ke section (untuk navbar)
    const handleScrollToSection = (sectionId) => {
      setCurrentPage("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Delay agar section sudah dirender
    };

  const FloatingWAButton = () => {
    return (
      <a
        href="https://wa.me/6282171484751?text=Halo%20saya%20mau%20konsultasi%20tentang%20layanan%20Webkita"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white rounded-full h-14 pl-4 pr-6 flex items-center justify-center shadow-lg font-bold text-base gap-3 hover:scale-105 transition-transform duration-200"
        aria-label="Chat di WhatsApp"
      >
        {/* Ikon WhatsApp SVG yang sudah diperbaiki */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span>Konsultasi Sekarang</span>
      </a>
    );
  };

    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onNavigateHome={() => handleScrollToSection("hero")}
          onCaraKerjaClick={() => handleScrollToSection("cara-kerja")}
          onHargaClick={() => handleScrollToSection("harga")}
        />
        <FloatingWAButton />
        {currentPage === "login" && (
          <Login onBackToHome={handleNavigateHome} onRegisterClick={handleRegisterClick} />
        )}
        {currentPage === "register" && (
          <Register onBackToHome={handleNavigateHome} />
        )}
        {currentPage === "home" && (
          <>
          <HeroSection onLoginClick={handleLoginClick} />
          
          {/* Transisi: Kredibilitas Awal */}
          <StatsShowcaseSection />
          <CaraKerjaSection />
          <InvestmentValueSection />
          <BudgetCalculatorSection onLoginClick={handleLoginClick} />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <Footer />
          </>
        )}
      </div>
    );
  }

  export default App;