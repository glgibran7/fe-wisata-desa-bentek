import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from "../utils/Api.jsx";
import Loading from "../components/Loading";

export default function AdminPaket() {
  const [paket, setPaket] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [destinationsList, setDestinationsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    harga: "",
    destinations: [],
    benefits: [],
    gambar: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      setLoading(true);
      try {
        const res = await Api.get("/paket");
        setPaket(res.data);
      } catch (err) {
        console.error("Gagal mengambil paket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaket();
  }, []);

  useEffect(() => {
    const fetchDestinasi = async () => {
      try {
        const res = await Api.get("/destinasi");
        setDestinationsList(res.data);
      } catch (err) {
        console.error("Gagal mengambil destinasi:", err);
      }
    };
    fetchDestinasi();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, gambar: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.nama,
      description: formData.deskripsi,
      price: Number(formData.harga),
      destinations: formData.destinations,
      benefits: formData.benefits,
      image_url: formData.gambar,
    };

    try {
      if (editIndex !== null) {
        await Api.put(`/paket/${formData.id}`, payload);
        const updated = [...paket];
        updated[editIndex] = { ...updated[editIndex], ...payload };
        setPaket(updated);
      } else {
        const res = await Api.post("/paket", payload);
        setPaket([...paket, res.data]);
      }

      resetForm();
    } catch (err) {
      console.error("Gagal menyimpan paket:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      nama: "",
      deskripsi: "",
      harga: "",
      destinations: [],
      benefits: [],
      gambar: "",
    });
    setEditIndex(null);
    setFormOpen(false);
  };

  const handleEdit = (index) => {
    const item = paket[index];
    setEditIndex(index);
    setFormData({
      id: item.id_package,
      nama: item.name,
      deskripsi: item.description,
      harga: item.price,
      destinations: item.destinations,
      benefits: item.benefits,
      gambar: item.image_url,
    });
    setFormOpen(true);
  };

  const handleDelete = async (index) => {
    const item = paket[index];
    if (!window.confirm("Yakin ingin menghapus paket ini?")) return;

    setLoading(true);
    try {
      await Api.delete(`/paket/${item.id_package}`);
      setPaket(paket.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Gagal menghapus paket:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf2e8] p-6">
      {loading && (
        <Loading overlay size={60} color="#ffffff" text="Loading..." />
      )}

      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#1c4444] hover:text-[#163737]"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#1c4444]">
            Manajemen Paket Wisata
          </h1>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 bg-[#c97b2f] text-white px-4 py-2 rounded-lg hover:bg-[#a86323]"
        >
          <FaPlus /> Tambah Paket
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paket.map((item, index) => (
          <div
            key={item.id_package}
            className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-[#1c4444]"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1c4444]">
                {item.name}
              </h3>

              <p className="text-gray-600 text-sm mt-2">{item.description}</p>

              <p className="font-bold text-[#1c4444] mt-2">
                Rp {Number(item.price).toLocaleString()}
              </p>

              <p className="text-sm mt-1 font-semibold">
                Destinasi:{" "}
                {item.destinations
                  .map((id) => {
                    const dest = destinationsList.find(
                      (d) => d.id_destination === id
                    );
                    return dest ? dest.name : `ID ${id}`;
                  })
                  .join(", ")}
              </p>

              <div className="mt-2">
                <p className="text-sm font-semibold text-[#1c4444]">
                  Benefits:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {item.benefits?.length ? (
                    item.benefits.map((b, i) => <li key={i}>{b}</li>)
                  ) : (
                    <li>-</li>
                  )}
                </ul>
              </div>

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

      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold text-[#1c4444] mb-4">
              {editIndex !== null ? "Edit Paket" : "Tambah Paket Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama */}
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

              {/* Harga */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Harga
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg"
                  value={formData.harga}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      harga: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              {/* Destinasi */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Pilih Destinasi
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {destinationsList.map((d) => (
                    <label
                      key={d.id_destination}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.destinations.includes(
                          d.id_destination
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              destinations: [
                                ...formData.destinations,
                                d.id_destination,
                              ],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              destinations: formData.destinations.filter(
                                (x) => x !== d.id_destination
                              ),
                            });
                          }
                        }}
                      />
                      <span>{d.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Benefit (pisahkan koma)
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

              {/* Gambar */}
              <div>
                <label className="block mb-1 text-[#1c4444] font-medium">
                  Upload Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded"
                  onChange={handleImageUpload}
                />
              </div>

              {formData.gambar && (
                <img
                  src={formData.gambar}
                  className="w-40 h-28 rounded-lg border object-cover"
                />
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-[#1c4444] text-white px-4 py-2 rounded-lg"
                >
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
              </div>
            </form>

            <button
              className="absolute top-3 right-3 text-2xl"
              onClick={resetForm}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
