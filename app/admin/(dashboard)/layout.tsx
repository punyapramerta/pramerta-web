import { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | PAS HVAC",
  description: "Dashboard panel untuk manajemen konten website",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}
