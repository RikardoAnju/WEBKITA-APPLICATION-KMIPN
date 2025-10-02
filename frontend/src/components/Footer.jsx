import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Kolom 1: Logo & Sosial Media */}
                    <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Webkita</h3>
                        <p className="text-sm text-gray-600">
                            Hubungkan bisnis Anda dengan developer terbaik.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            {/* Placeholder for social media icons */}
                            <a href="#" className="text-gray-400 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.766 7.824 6.64 9.123.486.089.665-.213.665-.473v-1.64c-2.68.583-3.243-1.288-3.243-1.288-.438-1.111-1.07-1.405-1.07-1.405-.875-.596.066-.584.066-.584.77 0 1.173.793 1.173.793.682 1.168 1.794.83 2.235.635.068-.492.269-.83.487-1.02-2.04-.23-4.183-1.02-4.183-4.524 0-1.002.359-1.82.951-2.46-.096-.23-.413-1.166.091-2.42 0 0 .779-.246 2.55.945.74-.206 1.52-.308 2.308-.312.788.004 1.568.106 2.308.312 1.77-1.191 2.549-.945 2.549-.945.504 1.254.187 2.19.091 2.42.592.64.951 1.458.951 2.46 0 3.513-2.146 4.29-4.195 4.516.326.279.62.833.62 1.674v2.486c0 .26.179.564.66.473C19.237 19.82 22 16.237 22 12c0-5.523-4.477-10-10-10z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Kolom 2: Perusahaan */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Perusahaan</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Tentang Kami</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Karir</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Kontak</a></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Layanan */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Layanan</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Developer</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">E-commerce</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Design</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Konsultasi</a></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Dukungan */}
                    <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-4">Dukungan</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Pusat Bantuan</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600">Kebijakan Privasi</a></li>
                        </ul>
                    </div>
                    
                    {/* Kolom 5: Newsletter */}
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
    );
}