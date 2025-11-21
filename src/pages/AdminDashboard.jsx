import { Link, RouterLink } from "react-router-dom";
import {
  FaMountain,
  FaSuitcaseRolling,
  FaNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcf2e8]">
      {/* === Header === */}
      <header className="flex justify-between items-center p-6 mb-10">
        <h1 className="text-3xl font-bold text-[#1c4444]">Admin Dashboard</h1>

        {/* Logout */}
        <Link
          to="/"
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </Link>
      </header>

      {/* === Cards Container === */}
      <main className="flex-grow px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* === Card Destinasi === */}
          <Link
            to="/admin/destinasi"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#1c4444]"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#1c4444] text-white rounded-lg">
                <FaMountain size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1c4444]">
                  Manajemen Destinasi
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola daftar tempat wisata.
                </p>
              </div>
            </div>
          </Link>

          {/* === Card Paket Wisata === */}
          <Link
            to="/admin/paket-wisata"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#c97b2f]"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#c97b2f] text-white rounded-lg">
                <FaSuitcaseRolling size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#c97b2f]">
                  Manajemen Paket Wisata
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Tambah, edit, dan hapus paket wisata.
                </p>
              </div>
            </div>
          </Link>

          {/* === Card Blog / Berita === */}
          <Link
            to="/admin/blog"
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#1c4444]"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#1c4444] text-white rounded-lg">
                <FaNewspaper size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1c4444]">
                  Manajemen Blog
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Kelola postingan atau berita wisata.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* === Footer === */}
      <footer className="p-6 text-center text-sm text-gray-500 bg-[#fcf2e8]">
        © 2025 OutlookProject. All rights reserved.
      </footer>
    </div>
  );
}
