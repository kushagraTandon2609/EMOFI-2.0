import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <section className="min-h-screen bg-[#050816] text-white">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="ml-[290px]">

        {/* Topbar */}

        <Topbar />

        {/* Page */}

        <div className="px-8 pb-8">

          {children}

        </div>

      </main>

    </section>
  );
}