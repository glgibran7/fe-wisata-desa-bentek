import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api.jsx";
import Loading from "../components/Loading.jsx"; // ⬅️ Tambahkan ini

export default function AdminDestinasi() {
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(false); // ⬅️ LOADING STATE
  const [formOpen, setFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    gambar: "",
  });

  const navigate = useNavigate();

  //  GET DATA DESTINASI
  useEffect(() => {
    const fetchDestinasi = async () => {
      try {
        setLoading(true); // START LOADING
        const res = await Api.get("/destinasi");
        setDestinasi(res.data);
      } catch (error) {
        console.error("Gagal mengambil destinasi:", error);
      } finally {
        setLoading(false); // STOP LOADING
      }
    };

    fetchDestinasi();
  }, []);

  //  HANDLE UPLOAD IMAGE
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, gambar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  //  SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // START LOADING

    try {
      if (editIndex !== null) {
        // UPDATE DATA
        await Api.put(`/destinasi/${formData.id}`, {
          name: formData.nama,
          description: formData.deskripsi,
          image_url: formData.gambar,
        });

        const updated = [...destinasi];
        updated[editIndex] = {
          ...updated[editIndex],
          name: formData.nama,
          description: formData.deskripsi,
          image_url: formData.gambar,
        };
        setDestinasi(updated);
      } else {
        // CREATE DATA
        const res = await Api.post("/destinasi", {
          name: formData.nama,
          description: formData.deskripsi,
          image_url: formData.gambar,
        });

        setDestinasi([...destinasi, res.data]);
      }

      setFormData({ id: null, nama: "", deskripsi: "", gambar: "" });
      setEditIndex(null);
      setFormOpen(false);
    } catch (err) {
      console.error("Gagal menyimpan destinasi:", err);
    } finally {
      setLoading(false); // STOP LOADING
    }
  };

  //  EDIT
  const handleEdit = (index) => {
    const item = destinasi[index];

    setEditIndex(index);
    setFormData({
      id: item.id_destination,
      nama: item.name,
      deskripsi: item.description,
      gambar: item.image_url,
    });

    setFormOpen(true);
  };

  //  DELETE
  const handleDelete = async (index) => {
    const item = destinasi[index];

    if (!window.confirm("Yakin ingin menghapus destinasi ini?")) return;

    try {
      setLoading(true); // START LOADING
      await Api.delete(`/destinasi/${item.id_destination}`);

      setDestinasi(destinasi.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Gagal menghapus destinasi:", err);
    } finally {
      setLoading(false); // STOP LOADING
    }
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

          <h1 className="text-3xl font-bold text-[#1c4444]">
            Manajemen Destinasi Wisata
          </h1>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323] transition"
        >
          <FaPlus /> Tambah Destinasi
        </button>
      </header>

      {/* LOADING */}
      {loading && <Loading />}

      {/* LIST DESTINASI */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinasi.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#1c4444]">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>

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
      )}

      {/* MODAL FORM */}
      {formOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <h2 className="text-xl font-semibold text-[#1c4444] mb-4">
              {editIndex !== null ? "Edit Destinasi" : "Tambah Destinasi Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Nama Destinasi
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  required
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Deskripsi
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="4"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              {/* Upload Foto */}
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

              {/* Preview */}
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  className="w-40 h-28 object-cover rounded-lg border mt-2"
                  alt="preview"
                />
              )}

              {/* Tombol */}
              <div className="flex gap-3 justify-end">
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
                    setFormData({
                      id: null,
                      nama: "",
                      deskripsi: "",
                      gambar: "",
                    });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => {
                setFormOpen(false);
                setEditIndex(null);
                setFormData({ id: null, nama: "", deskripsi: "", gambar: "" });
              }}
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
