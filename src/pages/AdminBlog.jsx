import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api.jsx";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    post_url: "",
    imageFile: null,
  });

  const navigate = useNavigate();

  // FETCH BLOG DARI API
  const fetchBlogs = async () => {
    try {
      const res = await Api.get("/blog");
      setBlogs(res.data);
    } catch (err) {
      console.error("Gagal mengambil blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // UPLOAD GAMBAR → API HARUS SEDIA /upload
  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("image", file);

    try {
      const res = await Api.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.url; // BE harus return { url: "..." }
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Gagal upload gambar");
      return null;
    }
  };

  // SUBMIT TAMBAH / EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let image_url = formData.image_url;

    // Jika ada file baru → upload
    if (formData.imageFile) {
      const uploaded = await uploadImage(formData.imageFile);
      if (uploaded) image_url = uploaded;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      image_url,
      post_url: formData.post_url,
    };

    try {
      if (editId) {
        // EDIT
        await Api.put(`/blog/${editId}`, payload);
      } else {
        // TAMBAH
        await Api.post("/blog", payload);
      }

      fetchBlogs();
      closeForm();
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Gagal menyimpan data");
    }
  };

  // DELETE BLOG
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus blog ini?")) return;

    try {
      await Api.delete(`/blog/${id}`);
      setBlogs(blogs.filter((b) => b.id_blog !== id));
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  // OPEN EDIT
  const handleEdit = (blog) => {
    setEditId(blog.id_blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url,
      post_url: blog.post_url,
      imageFile: null,
    });
    setFormOpen(true);
  };

  // CLOSE FORM
  const closeForm = () => {
    setFormOpen(false);
    setEditId(null);
    setFormData({ title: "", content: "", image_url: "", imageFile: null });
  };

  // HANDLE IMAGE INPUT
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      imageFile: file,
      image_url: URL.createObjectURL(file),
    });
  };

  return (
    <div className="min-h-screen bg-[#fcf2e8] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1c4444] hover:text-[#163737] px-3 py-1 rounded-md"
          >
            <FaArrowLeft size={20} />
          </button>

          <h1 className="text-3xl font-bold text-[#1c4444]">Manajemen Blog</h1>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323] transition"
        >
          <FaPlus /> Tambah Blog
        </button>
      </header>

      {/* LIST BLOG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id_blog}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
          >
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1c4444]">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {blog.content}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={18} />
                </button>

                <button
                  onClick={() => handleDelete(blog.id_blog)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM */}
      {formOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold text-[#1c4444] mb-4">
              {editId ? "Edit Blog" : "Tambah Blog Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Judul
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Isi Blog
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="6"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Url Postingan
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.post_url}
                  onChange={(e) =>
                    setFormData({ ...formData, post_url: e.target.value })
                  }
                  placeholder="Masukkan URL asli postingan (opsional)"
                />
              </div>

              {/* Upload Photo */}
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

              {formData.image_url && (
                <img
                  src={formData.image_url}
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
                  onClick={closeForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeForm}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
