import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDestinasi from "./pages/AdminDestinasi";
import AdminPaket from "./pages/AdminPaket";
import AdminBlog from "./pages/AdminBlog";

function App() {
  return (
    <Router>
      <div className="font-sans antialiased bg-[#fcf2e8]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* === Rute Dashboard Admin === */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/destinasi" element={<AdminDestinasi />} />
          <Route path="/admin/paket-wisata" element={<AdminPaket />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
