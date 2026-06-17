import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard — Brandex',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0A0E17]">
      <AdminSidebar />
      <main className="flex-1 ml-56">{children}</main>
    </div>
  )
}
