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
    <section className="min-h-screen bg-[#050816]">

      {/* Sidebar */}

      <div className="fixed left-5 top-5 z-50">
        <Sidebar />
      </div>

      {/* Main */}

      <main className="ml-[245px] min-w-0">

        <Topbar />

        <div className="mx-auto max-w-[1700px] px-8 py-8">

          {children}

        </div>

      </main>

    </section>
  );
}