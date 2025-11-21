import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import tiudemper from "../assets/images/tiudemper.webp";
import vihara from "../assets/images/vihara.jpg";
import kakao from "../assets/images/kakao.jpg";
import kerajinanbambu from "../assets/images/kerajinanbambu.jpg";
import sungaisawah from "../assets/images/sawah.jpg";
import villabintang from "../assets/images/villabintang.jpg";

// Dummy blog awal
const dummyBlog = [
  {
    judul: "Wisata Alam Desa Bentek",
    isi: "Nikmati keindahan alam Desa Bentek dengan udara sejuk dan pemandangan menakjubkan.",
    gambar: kakao,
  },
  {
    judul: "Budaya Lokal yang Menarik",
    isi: "Jelajahi tradisi lokal Desa Bentek yang unik dan edukatif.",
    gambar: vihara,
  },
];

export default function AdminBlog() {
  const [blogs, setBlogs] = useState(dummyBlog);
  const [formOpen, setFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    gambar: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, gambar: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...blogs];
      updated[editIndex] = formData;
      setBlogs(updated);
      setEditIndex(null);
    } else {
      setBlogs([...blogs, formData]);
    }
    setFormData({ judul: "", isi: "", gambar: "" });
    setFormOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(blogs[index]);
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus blog ini?")) {
      setBlogs(blogs.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf2e8] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1c4444]">Manajemen Blog</h1>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323] transition"
        >
          <FaPlus /> Tambah Blog
        </button>
      </header>

      {/* Daftar Blog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
          >
            {blog.gambar && (
              <img
                src={blog.gambar}
                alt={blog.judul}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1c4444]">
                {blog.judul}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{blog.isi}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold text-[#1c4444] mb-4">
              {editIndex !== null ? "Edit Blog" : "Tambah Blog Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Judul
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Isi Blog
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="6"
                  value={formData.isi}
                  onChange={(e) =>
                    setFormData({ ...formData, isi: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Upload Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                  onChange={handleImageUpload}
                />
              </div>

              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg border mt-2"
                />
              )}

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#1c4444] text-white px-4 py-2 rounded-lg hover:bg-[#163737] transition"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormOpen(false);
                    setEditIndex(null);
                    setFormData({ judul: "", isi: "", gambar: "" });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => {
                setFormOpen(false);
                setEditIndex(null);
                setFormData({ judul: "", isi: "", gambar: "" });
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
