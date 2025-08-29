// frontend/src/app/(main)/custom-order/layout.jsx

import Newsletter from "@/components/layout/Footer/Newsletter";
import NavBar from "@/components/layout/Header/NavBar";

export const metadata = {
  title: "Custom Order - TailorMate",
  description: "Customize clothing with exact measurements, fabrics, and styles.",
};

export default function CustomOrderLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <NavBar />

      {/* Layout Body */}
      <div className="flex flex-1">
        {/* Sidebar placeholder */}
        <aside className="hidden lg:block w-64 bg-white border-r" />

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-white">
        <Newsletter />
      </div>
    </div>
  );
}
