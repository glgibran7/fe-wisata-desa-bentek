import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Dummy Paket Wisata
const dummyPaket = [
  {
    nama: "Paket Eksplor Alam",
    deskripsi: "Nikmati keindahan alam Desa Bentek...",
    harga: 150000,
    spots: [
      "Tiu Demper",
      "Villa Bintang",
      "Sungai dan Sawah",
      "Pembibitan Pohon Kakao",
    ],
    benefits: [
      "Pemandu wisata lokal",
      "Air mineral & snack",
      "Tiket masuk lokasi wisata",
    ],
    gambar: "",
  },
  {
    nama: "Paket Religi & Budaya",
    deskripsi: "Jelajahi sisi spiritual dan budaya lokal...",
    harga: 200000,
    spots: [
      "Vihara Bodhi Dharma",
      "Sentra Kerajinan Bambu",
      "Sungai dan Sawah",
    ],
    benefits: [
      "Tur budaya & edukasi",
      "Souvenir kerajinan bambu",
      "Makan siang khas Desa Bentek",
    ],
    gambar: "",
  },
  {
    nama: "Paket Petualangan Desa",
    deskripsi: "Rasakan petualangan seru...",
    harga: 250000,
    spots: [
      "Tiu Demper",
      "Villa Bintang",
      "Sungai dan Sawah",
      "Pembibitan Pohon Kakao",
      "Sentra Kerajinan Bambu",
    ],
    benefits: [
      "Pemandu profesional",
      "Peralatan trekking",
      "Minuman hangat di akhir perjalanan",
    ],
    gambar: "",
  },
];

export default function AdminPaket() {
  const [paket, setPaket] = useState(dummyPaket);
  const [formOpen, setFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    spots: [],
    benefits: [],
    gambar: "",
  });

  const navigate = useNavigate();

  // Upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, gambar: reader.result });
    reader.readAsDataURL(file);
  };

  // Submit form tambah/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...paket];
      updated[editIndex] = formData;
      setPaket(updated);
      setEditIndex(null);
    } else {
      setPaket([...paket, formData]);
    }
    setFormData({
      nama: "",
      deskripsi: "",
      harga: "",
      spots: [],
      benefits: [],
      gambar: "",
    });
    setFormOpen(false);
  };

  // Edit paket
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(paket[index]);
    setFormOpen(true);
  };

  // Hapus paket
  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus paket ini?")) {
      setPaket(paket.filter((_, i) => i !== index));
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
            Manajemen Paket Wisata
          </h1>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323] transition"
        >
          <FaPlus /> Tambah Paket
        </button>
      </header>

      {/* Daftar Paket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paket.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
          >
            {item.gambar && (
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1c4444]">
                {item.nama}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.deskripsi}</p>
              <p className="text-[#1c4444] font-bold mt-2">
                Rp {Number(item.harga).toLocaleString()}
              </p>
              <p className="text-sm mt-1 font-semibold">
                Destinasi: {item.spots.join(", ")}
              </p>

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
              {editIndex !== null ? "Edit Paket" : "Tambah Paket Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Paket */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Nama Paket
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

              {/* Deskripsi Paket */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Deskripsi Paket
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="4"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  required
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Harga Paket (Rp)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.harga}
                  onChange={(e) =>
                    setFormData({ ...formData, harga: Number(e.target.value) })
                  }
                  required
                />
              </div>

              {/* Destinasi */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Destinasi (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.spots.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spots: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </div>

              {/* Benefit */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Benefit (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.benefits.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      benefits: e.target.value.split(",").map((b) => b.trim()),
                    })
                  }
                />
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

              {/* Preview Gambar */}
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt="Preview"
                  className="w-40 h-28 object-cover rounded-lg border mt-2"
                />
              )}

              {/* Tombol */}
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
                    setFormData({
                      nama: "",
                      deskripsi: "",
                      harga: "",
                      spots: [],
                      benefits: [],
                      gambar: "",
                    });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>

            {/* Tombol tutup modal */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => {
                setFormOpen(false);
                setEditIndex(null);
                setFormData({
                  nama: "",
                  deskripsi: "",
                  harga: "",
                  spots: [],
                  benefits: [],
                  gambar: "",
                });
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
