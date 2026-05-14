'use client'
import React from 'react';
import { Sidebar } from '@/widgets/admin-sidebar/AdminSidebar';
import { RoleGuard } from '@/widgets/role-guard/RoleGuard';

interface AdminLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export function AdminLayout({ children, header }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {header && (
          <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-8 py-4">
            {header}
          </div>
        )}
        <div className="flex-1 px-8 py-6">{children}</div>
      </main>
    </div>
  );
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="ADMIN">
      {children}
    </RoleGuard>
  );
}
