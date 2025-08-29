// frontend/src/app/(main)/custom-order/layout.jsx

// Simplify layout to existing components to avoid missing imports
import NavBar from "@/components/layout/Header/NavBar";
import Newsletter from "@/components/layout/Footer/Newsletter";

export const metadata = {
  title: "Custom Order - TailorMate",
  description: "Customize clothing with exact measurements, fabrics, and styles.",
};

export default function CustomOrderLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Top Navbar */}
      <NavBar />

      {/* Layout Body */}
      <div className="flex flex-1">
        {/* Sidebar placeholder - implement later */}
        <aside className="hidden lg:block w-64 bg-white border-r"></aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Newsletter />
    </div>
  );
}
