import React, { useState } from "react";
import { Check, ArrowRight, X } from "lucide-react";

const PricingModal = ({ plan, isOpen, onClose }) => {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{plan.title}</h2>
            <p className="text-gray-600 mt-1">{plan.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 -m-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Price Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            {plan.badge && (
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                {plan.badge}
              </div>
            )}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Harga Mulai Dari</p>
              <div className="flex items-baseline">
                <span className="text-gray-700 text-xl mr-1">Rp</span>
                <span className="text-5xl font-bold text-gray-900">
                  {plan.price}
                </span>
              </div>
              {plan.priceRange && (
                <p className="text-sm text-gray-600 mt-2">{plan.priceRange}</p>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
              Pilih Paket Ini
            </button>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Fitur Yang Termasuk:
            </h3>
            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Kartu ringkas untuk setiap paket harga.
 */
const PricingCard = ({ plan, onClick }) => (
  <div
    className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer 
    ${plan.isPopular ? "border-4 border-blue-500" : "border border-gray-200"}`}
    onClick={onClick}
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

    <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.title}</h3>
    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

    <div className="mb-4">
      <p className="text-xs text-gray-500 mb-1">Mulai dari</p>
      <div className="flex items-baseline">
        <span className="text-gray-700 mr-1">Rp</span>
        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
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
      {plan.features.slice(0, 3).map((feature, index) => (
        <div key={index} className="flex items-start space-x-2">
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
);

/**
 * Komponen utama halaman Harga.
 */
const Harga = ({ onBackToHome }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCardClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => setSelectedPlan(null), 300);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Paket Layanan Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Dari UMKM
              hingga enterprise, kami siap membantu mewujudkan website impian
              Anda.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                onClick={() => handleCardClick(plan)}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Butuh Konsultasi Paket?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Tim kami siap membantu Anda menemukan solusi terbaik untuk
              kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis!
            </p>
            <a
              href="https://wa.me/6282171484751?text=Halo%20saya%20ingin%20konsultasi%20tentang%20paket%20layanan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
            >
              Hubungi Kami di WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>

          {/* Back to Home Button (Optional) */}
          {onBackToHome && (
            <div className="text-center mt-16">
              <button
                onClick={onBackToHome}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg"
              >
                Kembali ke Beranda
              </button>
            </div>
          )}
        </div>
      </main>


      {/* Pricing Modal */}
      <PricingModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

const App = () => {
  const handleBack = () => {
    console.log("Navigating back to Home!");
  };

  return (
    <div className="min-h-screen">
      <Harga onBackToHome={handleBack} />
    </div>
  );
};

export default App;
