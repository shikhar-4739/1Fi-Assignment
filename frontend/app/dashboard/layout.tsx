import React from "react";
import Sidebar from "@/pages/dashboard/Sidebar";
import Navbar from "@/pages/dashboard/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
    </AuthGuard>
  );
}
