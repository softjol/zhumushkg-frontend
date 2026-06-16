'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminLayout } from '@/app/admin/layout';
import { AdminSearchBar } from '@/shared/ui/AdminSearchBar';
import { AdminPagination } from '@/shared/ui/AdminPagination';
import { AdminDropdown } from '@/shared/ui/AdminDropdown';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { vacancyApi, type ApiVacancy } from '@/entities/admin/admin-vacancy/vacancyApi';

const PAGE_SIZE = 10;

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
  </svg>
);

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<ApiVacancy[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [modal, setModal]         = useState<{ type: 'delete'; vacancy: ApiVacancy } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await vacancyApi.getVacancies();
      setVacancies(data || []);
    } catch (err) {
      console.error('Ошибка при загрузке вакансий:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return vacancies.filter((v) => 
      (v.position || '').toLowerCase().includes(q) || 
      (v.company || '').toLowerCase().includes(q)
    );
  }, [vacancies, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleConfirm = async () => {
    if (!modal) return;
    try {
      setActionLoading(true);
      await vacancyApi.deleteVacancy(modal.vacancy.id);
      setVacancies((prev) => prev.filter((v) => v.id !== modal.vacancy.id));
      setModal(null);
    } catch (err) {
      alert('Не удалось удалить вакансию');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU');
  };

  return (
    <AdminLayout
      header={
        <AdminSearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Поиск по вакансиям..."
          className="max-w-xl"
        />
      }
    >
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Вакансии</h1>
        <span className="text-sm text-gray-400">{filtered.length} шт.</span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {['ID', 'Название', 'Компания', 'Зарплата', 'Город', 'Просмотры', 'Дата', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 first:pl-5 last:pr-5 last:w-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
               <tr><td colSpan={8} className="text-center py-20 text-gray-400">Загрузка...</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-20 text-gray-400 text-sm">Вакансий нет</td></tr>
            ) : (
              paginated.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-4 pl-5 text-sm text-gray-400 font-mono">{v.id}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{v.position}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{v.company || '-'}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-medium">
                    {v.salary_net ? `${v.salary_net.toLocaleString()} сом` : 'Не указана'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{v.city}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">{v.views}</td>
                  <td className="px-4 py-4 text-sm text-gray-400">{formatDate(v.createdAt)}</td>
                  <td className="px-4 py-4 pr-5 text-right">
                    <AdminDropdown
                      items={[
                        {
                          label: 'Удалить',
                          icon: <TrashIcon />,
                          onClick: () => setModal({ type: 'delete', vacancy: v }),
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

      <div className="mt-4">
        <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {modal && (
        <ConfirmModal
          isOpen
          onClose={() => !actionLoading && setModal(null)}
          onConfirm={handleConfirm}
          type="delete"
          userName={modal.vacancy.position}
          isLoading={actionLoading}
        />
      )}
    </AdminLayout>
  );
}