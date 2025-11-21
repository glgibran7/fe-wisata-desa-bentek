import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import tiudemper from "../assets/images/tiudemper.webp";
import vihara from "../assets/images/vihara.jpg";
import kerajinanbambu from "../assets/images/kerajinanbambu.jpg";

export default function AdminDestinasi() {
  const dummyData = [
    {
      nama: "Tiu Demper (Lokok Segara)",
      deskripsi: "Air terjun alami dengan suasana asri dan udara sejuk.",
      gambar: tiudemper,
    },
    {
      nama: "Vihara Bodhi Dharma",
      deskripsi:
        "Tempat ibadah umat Buddha dengan arsitektur khas dan suasana damai.",
      gambar: vihara,
    },
    {
      nama: "Sentra Kerajinan Bambu",
      deskripsi:
        "Tempat pembuatan kerajinan bambu oleh pengrajin lokal yang kreatif.",
      gambar: kerajinanbambu,
    },
  ];

  const [destinasi, setDestinasi] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    gambar: "",
  });

  const navigate = useNavigate();

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem("destinasi");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setDestinasi(parsed);
      } else {
        setDestinasi(dummyData);
        localStorage.setItem("destinasi", JSON.stringify(dummyData));
      }
    } else {
      setDestinasi(dummyData);
      localStorage.setItem("destinasi", JSON.stringify(dummyData));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("destinasi", JSON.stringify(destinasi));
  }, [destinasi]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, gambar: reader.result }); // Base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...destinasi];
      updated[editIndex] = formData;
      setDestinasi(updated);
      setEditIndex(null);
    } else {
      setDestinasi([...destinasi, formData]);
    }

    setFormData({ nama: "", deskripsi: "", gambar: "" });
    setFormOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(destinasi[index]);
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus destinasi ini?")) {
      setDestinasi(destinasi.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf2e8] p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          {/* Tombol Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1c4444] hover:text-[#163737] px-3 py-1 rounded-md"
            aria-label="Kembali"
          >
            <FaArrowLeft size={20} /> {/* Icon back */}
          </button>
          <h1 className="text-3xl font-bold text-[#1c4444]">
            Manajemen Destinasi Wisata
          </h1>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323] transition"
        >
          <FaPlus />
          Tambah Destinasi
        </button>
      </header>

      {/* Daftar Destinasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinasi.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
          >
            <img
              src={item.gambar}
              alt={item.nama}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1c4444]">
                {item.nama}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.deskripsi}</p>

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

              {/* Preview Foto */}
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg border mt-2"
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
                    setFormData({ nama: "", deskripsi: "", gambar: "" });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            {/* Close button di pojok kanan */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => {
                setFormOpen(false);
                setEditIndex(null);
                setFormData({ nama: "", deskripsi: "", gambar: "" });
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
