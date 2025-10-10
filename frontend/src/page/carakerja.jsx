import React from "react";
import {
  Package,
  FileText,
  CreditCard,
  Monitor,
  Rocket,
  Headphones,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const CaraKerja = ({ onBackToHome }) => {
  const steps = [
    {
      id: 1,
      title: "Pilih Paket",
      description: "Pilih paket layanan yang sesuai dengan kebutuhan bisnis Anda (UMKM, UI/UX, Front End, atau Back End).",
      icon: Package,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Isi Kebutuhan & Dokumen",
      description: "Lengkapi formulir kebutuhan aplikasi, upload dokumen pendukung, dan detail spesifikasi proyek Anda.",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Pembayaran",
      description: "Lakukan pembayaran dengan sistem escrow yang aman. Dana Anda dijamin hingga proyek selesai.",
      icon: CreditCard,
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      title: "Pantau Progres",
      description: "Pantau perkembangan proyek secara real-time melalui dashboard user. Update langsung dari tim developer.",
      icon: Monitor,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      title: "Serah Terima Proyek",
      description: "Setelah proyek selesai dan disetujui, kami serahkan kode, aset, dan dokumentasi lengkap kepada Anda.",
      icon: Rocket,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 6,
      title: "Maintenance & Support",
      description: "Dapatkan layanan pemeliharaan dan dukungan teknis berkelanjutan untuk menjaga website Anda tetap optimal.",
      icon: Headphones,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const StepCard = ({ step }) => {
    const Icon = step.icon;
    
    return (
      <div className="relative h-full" data-aos="fade-up" data-aos-delay={step.id * 100}>
        {/* KARTU DIBUAT FLEX & TINGGI PENUH */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
          {/* Number Badge */}
          <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {step.id}
          </div>
          
          {/* Wrapper untuk konten agar bisa tumbuh */}
          <div className="flex flex-col flex-grow">
            {/* Icon */}
            <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 mt-2 flex-shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            {/* flex-grow akan membuat deskripsi ini mendorong konten lain ke bawah */}
            <p className="text-gray-600 leading-relaxed flex-grow">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
                Proses Mudah & Transparan
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Cara Kerja WebKita
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              6 langkah sederhana untuk mewujudkan website impian Anda dengan aman dan terpercaya
            </p>
          </div>
          
          {/* Steps Grid */}
          {/* KELAS grid-rows-1 DITAMBAHKAN PADA UKURAN DESKTOP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 lg:grid-rows-1">
            {steps.map((step) => (
              <StepCard 
                key={step.id} 
                step={step} 
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 sm:p-16 text-center shadow-2xl" data-aos="zoom-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan klien yang telah mempercayai WebKita untuk mengembangkan website mereka
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onBackToHome}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                Pilih Paket Sekarang
              </button>
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  Kembali ke Beranda
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaraKerja;