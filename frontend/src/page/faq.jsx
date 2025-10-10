import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu WebKita?",
      answer: "WebKita adalah platform digital yang menghubungkan bisnis dengan developer profesional untuk membuat website, aplikasi, hingga sistem digital yang sesuai kebutuhan. Kami memastikan setiap proyek berjalan aman, transparan, dan selesai tepat waktu."
    },
    {
      question: "Bagaimana cara melakukan pemesanan di WebKita?",
      answer: "Anda cukup memilih paket yang sesuai dengan kebutuhan — seperti paket UMKM, UI/UX, Front End, atau Back End. Setelah itu, isi detail proyek Anda dan tim kami akan segera menghubungi untuk konfirmasi serta estimasi waktu pengerjaan."
    },
    {
      question: "Bagaimana sistem pembayarannya?",
      answer: "Kami menggunakan sistem escrow yang menjamin keamanan kedua belah pihak. Dana akan disimpan sementara oleh WebKita, dan baru diteruskan ke developer setelah proyek selesai serta disetujui oleh klien."
    },
    {
      question: "Apa yang terjadi setelah saya melakukan pembayaran?",
      answer: "Setelah pembayaran terverifikasi, tim WebKita akan membuat ruang komunikasi proyek dan memulai proses pengembangan. Anda dapat memantau progres, memberi masukan, dan menerima update langsung dari tim developer."
    },
    {
      question: "Apakah ada layanan setelah website saya selesai dibuat?",
      answer: "Tentu. WebKita menyediakan layanan maintenance dan support pasca proyek agar website Anda tetap optimal. Kami juga siap membantu bila Anda ingin menambah fitur, melakukan pembaruan, atau perawatan sistem secara berkala."
    },
    {
      question: "Bagaimana cara melakukan perpanjangan layanan di Web Kita?",
      answer: "Anda dapat melakukan perpanjangan layanan melalui dashboard akun Anda. Pilih menu 'Layanan Saya', kemudian klik tombol 'Perpanjang' pada layanan yang ingin diperpanjang. Kami akan mengirimkan invoice dan panduan pembayaran selanjutnya."
    },
    {
      question: "Bisakah saya mengganti domain website saya di Web Kita?",
      answer: "Ya, Anda dapat mengganti domain website kapan saja. Silakan hubungi tim support kami melalui email atau live chat, dan kami akan membantu proses perpindahan domain Anda dengan aman tanpa kehilangan data."
    },
    {
      question: "Dimana kalian bisa menghubungi alamat kami?",
      answer: "Anda dapat menghubungi kami melalui halaman Kontak di website resmi WebKita atau melalui email & chat support yang tersedia 24 jam. Tim kami siap membantu setiap pertanyaan Anda dengan cepat. Alamat kantor kami tertera di bagian footer website."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Perlu bantuan?
          </h2>
          <p className="text-gray-600 text-lg">
            Jangan khawatir! Cari dan temukan pertanyaanmu disini
          </p>
        </div>

        {/* FAQ Items */}
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
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
  <p className="text-gray-600 mb-4">
    Masih ada pertanyaan lain?
  </p>
  <a
    href="https://wa.me/6282171484751?text=Halo%20saya%20mau%20konsultasi%20tentang%20layanan%20Webkita"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center w-fit mx-auto"
  >
    Hubungi Kami
  </a>
</div></div>
    </div>
  );
}
