"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEditor = pathname?.includes("/editor") || pathname === "/admin";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isEditor={isEditor} />
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isEditor ? "ml-0 md:ml-4 lg:ml-8" : "ml-64"
        }`}
      >
        <main className={`flex-1 overflow-y-auto ${isEditor ? "p-4" : "p-8"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
