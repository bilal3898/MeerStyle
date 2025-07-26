// frontend/src/app/(main)/custom-order/layout.jsx

import CustomOrderNavbar from "@/components/custom-order/CustomOrderNavbar";
import CustomOrderSidebar from "@/components/custom-order/CustomOrderSidebar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "Custom Order - TailorMate",
  description: "Customize clothing with exact measurements, fabrics, and styles.",
};

export default function CustomOrderLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Top Navbar */}
      <CustomOrderNavbar />

      {/* Layout Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r">
          <CustomOrderSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
