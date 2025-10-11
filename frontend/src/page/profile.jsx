import React, { useState } from 'react';
import { LayoutDashboard, Plus, Calculator, FolderOpen, User, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState('Profil');
  const [formData, setFormData] = useState({
    username: 'budisantoso',
    firstName: 'Budi',
    lastName: 'Santoso',
    email: 'budi.santoso@email.com',
    phone: '+62 812-3456-7890'
  });

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert('Perubahan disimpan!');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl flex flex-col border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>
        </div>
        
        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveMenu('Dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === 'Dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveMenu('Buat Proyek')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === 'Buat Proyek' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Buat Proyek</span>
          </button>
          
          <button
            onClick={() => setActiveMenu('Budget Calculator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === 'Budget Calculator' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calculator className="w-5 h-5" />
            <span className="font-medium">Budget Calculator</span>
          </button>
          
          <button
            onClick={() => setActiveMenu('Proyek Saya')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === 'Proyek Saya' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            <span className="font-medium">Proyek Saya</span>
          </button>
          
          <button
            onClick={() => setActiveMenu('Profil')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === 'Profil' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil dan pengaturan akun Anda</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Profile Picture Section - Centered at Top */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  BS
                </div>
                <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-gray-500 mb-6">@{formData.username}</p>
              
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Foto
              </button>
              <p className="text-xs text-gray-500 mt-3">JPG, PNG atau GIF. Max 2MB</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Informasi Pribadi</h2>
              <p className="text-gray-600">Perbarui informasi pribadi Anda</p>
            </div>

            <div className="space-y-6">
              {/* Username */}
              <div className="transition-all duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange(e.target)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                  placeholder="Masukkan username"
                />
              </div>

              {/* Nama Depan dan Belakang */}
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                    placeholder="Nama depan"
                  />
                </div>
                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                    placeholder="Nama belakang"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="transition-all duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Nomor Telepon */}
              <div className="transition-all duration-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e.target)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all duration-200"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => setFormData({
                    username: 'budisantoso',
                    firstName: 'Budi',
                    lastName: 'Santoso',
                    email: 'budi.santoso@email.com',
                    phone: '+62 812-3456-7890'
                  })}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}