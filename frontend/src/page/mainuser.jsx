import React, { useState } from 'react';
import { LayoutDashboard, Calculator, FolderOpen, Search, User, Plus, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const WebKitaDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Data proyek
  const projects = [
    {
      id: 1,
      name: 'Website E-commerce Fashion',
      budget: '15.000.000 - 20.000.000',
      status: 'Aktif',
      progress: 85,
      deadline: '2025-11-15',
      category: 'E-commerce'
    },
    {
      id: 2,
      name: 'Landing Page Startup SaaS',
      budget: '5.000.000 - 8.000.000',
      status: 'Menunggu',
      progress: 0,
      deadline: '2025-11-30',
      category: 'Landing Page'
    },
    {
      id: 3,
      name: 'Dashboard Admin Panel',
      budget: '12.000.000 - 15.000.000',
      status: 'Aktif',
      progress: 45,
      deadline: '2025-12-10',
      category: 'Dashboard'
    },
    {
      id: 4,
      name: 'Company Profile',
      budget: '5.000.000 - 7.000.000',
      status: 'Selesai',
      progress: 100,
      deadline: '2025-10-05',
      category: 'Company Profile'
    },
    {
      id: 5,
      name: 'Mobile App Portfolio',
      budget: '8.000.000 - 10.000.000',
      status: 'Menunggu',
      progress: 0,
      deadline: '2025-12-20',
      category: 'Mobile App'
    }
  ];

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Aktif').length;
  const completedProjects = projects.filter(p => p.status === 'Selesai').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'bg-blue-100 text-blue-700';
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Aktif': return <TrendingUp className="w-4 h-4" />;
      case 'Selesai': return <CheckCircle2 className="w-4 h-4" />;
      case 'Menunggu': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
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
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">WK</span>
            </div>
            <span className="text-xl font-bold text-gray-800">WebKita</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                BS
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-800">Budi Santoso</div>
              <div className="text-sm text-gray-500">User</div>
            </div>
            <button className="ml-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang, Budi! 👋
          </h1>
          <p className="text-gray-600 mb-8">Ringkasan budget dan proyek Anda</p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Hitung Budget Website</h3>
              <p className="text-sm text-gray-600 mb-4">Gunakan kalkulator untuk mengetahui fitur yang bisa didapat dengan budget Anda</p>
              <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Mulai Hitung Budget
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Buat Proyek Baru</h3>
              <p className="text-sm text-gray-600 mb-4">Posting proyek Anda dan dapatkan proposal dari developer terbaik</p>
              <button className="w-full px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                Buat Proyek
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Total Proyek</span>
                <FolderOpen className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{totalProjects}</div>
              <div className="text-xs text-green-600 font-medium">↑ 2 proyek baru</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Proyek Aktif</span>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{activeProjects}</div>
              <div className="text-xs text-gray-500">Sedang dikerjakan</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Selesai</span>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{completedProjects}</div>
              <div className="text-xs text-gray-500">Proyek selesai</div>
            </div>

          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Proyek Terbaru</h2>
                <p className="text-sm text-gray-500 mt-1">Proyek yang sedang berjalan</p>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Lihat Semua
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Proyek</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Budget (Rp)</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                            {project.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{project.name}</div>
                            <div className="text-xs text-gray-500">{project.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-700">Rp {project.budget}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-600">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">{project.deadline}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <FloatingWAButton />
    </div>
  );
};

export default WebKitaDashboard;