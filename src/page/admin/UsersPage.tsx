'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminLayout } from '@/app/admin/layout';
import { AdminSearchBar } from '@/shared/ui/AdminSearchBar';
import { AdminPagination } from '@/shared/ui/AdminPagination';
import { AdminDropdown } from '@/shared/ui/AdminDropdown';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { adminApi, normalizeUser, type AdminUser } from '@/entities/admin/api/adminApi';

const PAGE_SIZE = 10;

const BanIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" strokeLinecap="round" />
  </svg>
);

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ type: 'ban' | 'delete'; user: AdminUser } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [employers, candidates] = await Promise.all([
        adminApi.getEmployers(),
        adminApi.getCandidates()
      ]);

      const merged = [
        ...employers.map(normalizeUser),
        ...candidates.map(normalizeUser)
      ].sort((a, b) => b.id - a.id); 

      setUsers(merged);
    } catch (err) {
      setError('Маалыматтарды жүктөөдө ката кетти. Сураныч, кайра аракет кылыңыз.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

const handleConfirm = async () => {
  if (!modal) return;
  try {
    setActionLoading(true);
    
    if (modal.type === 'ban') {
      await adminApi.banUser(modal.user.id);
      
      setUsers((prev) =>
        prev.map((u) =>
          u.id === modal.user.id ? { ...u, isBanned: true } : u
        )
      );
    } else if (modal.type === 'delete') {
      await adminApi.deleteUser(modal.user.id);
      
      setUsers((prev) => prev.filter((u) => u.id !== modal.user.id));
    }
    
    setModal(null); 
  } catch (err: any) {
    alert(`Ката кетти: ${err.message || 'Ролуңузду текшериңиз'}`);
  } finally {
    setActionLoading(false);
  }
};

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u => 
      u.displayName.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      (u.phoneNumber ?? '').includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AdminLayout
      header={
        <AdminSearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Аты, email же телефон боюнча издөө..."
          className="max-w-xl"
        />
      }
    >

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={loadData} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Кайра жүктөө</button>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] uppercase tracking-wider font-semibold text-gray-400 border-b">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Фио</th>
                  <th className="px-6 py-4">Телефон</th>
                  <th className="px-6 py-4">Роль</th>
                  <th className="px-6 py-4">Активдүүлүк</th>
                  <th className="px-6 py-4">Статус</th>
                  <th className="px-6 py-4 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-400">Эч ким табылган жок</td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={`${user.role}-${user.id}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">#{user.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phoneNumber || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          user.role === 'employer' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {user.role === 'employer' ? 'Компания' : 'Издөөчү'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.role === 'employer' ? `${user.itemCount} вакансия` : `${user.itemCount} резюме`}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isBanned ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {user.isBanned ? 'Бөгөттөлгөн' : 'Активдүү'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <AdminDropdown
                          items={[
                            ...(!user.isBanned ? [{
                              label: 'Бөгөттөө',
                              icon: <BanIcon />,
                              onClick: () => setModal({ type: 'ban', user }),
                            }] : []),
                            {
                              label: 'Өчүрүү',
                              icon: <TrashIcon />,
                              onClick: () => setModal({ type: 'delete', user }),
                              danger: true,
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <AdminPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {modal && (
        <ConfirmModal
          isOpen
          onClose={() => !actionLoading && setModal(null)}
          onConfirm={handleConfirm}
          type={modal.type}
          userName={modal.user.displayName}
          isLoading={actionLoading}
        />
      )}
    </AdminLayout>
  );
}