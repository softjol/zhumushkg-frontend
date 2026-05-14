'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/app/admin/layout';
import { AdminSearchBar } from '@/shared/ui/AdminSearchBar';
import { AdminPagination } from '@/shared/ui/AdminPagination';

interface ContentItem {
  id: number;
  name: string;
  photo: string;
  views: number;
  createdAt: string;
  categories?: string[];
  isActive: boolean;
}

const MOCK: ContentItem[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: 'Вакансия для автодилеров',
  photo: 'img.png',
  views: 25,
  createdAt: '10.06.2025',
  categories: ['Водитель', 'Курьер', '+2 категории'],
  isActive: true,
}));

const PAGE_SIZE = 8;

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
  </svg>
);
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
  </svg>
);

function CreateContentModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; photo: File | null }) => void;
}) {
  const [name, setName]     = useState('');
  const [photo, setPhoto]   = useState<File | null>(null);
  const [dragging, setDrag] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, photo });
    setName('');
    setPhoto(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">Создать контент</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Чтобы создать новый контент заполните все поля
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B5FC7]/20 focus:border-[#5B5FC7] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Фото</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                const f = e.dataTransfer.files[0];
                if (f) setPhoto(f);
              }}
              onClick={() => document.getElementById('admin-file-input')?.click()}
              className={[
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
                dragging
                  ? 'border-[#5B5FC7] bg-[#5B5FC7]/5'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300',
              ].join(' ')}
            >
              <input
                id="admin-file-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              />
              <svg
                className="w-8 h-8 mx-auto mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {photo ? (
                <p className="text-sm text-[#5B5FC7] font-medium">{photo.name}</p>
              ) : (
                <p className="text-sm text-gray-400">
                  Загрузите фото для обложки курса
                  <br />
                  или перетащите его сюда
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Закрыть
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-2.5 bg-[#5B5FC7] hover:bg-[#4a4eb5] text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Создать контент
          </button>
        </div>
      </div>
    </div>
  );
}

function ContentCard({
  item,
  onEdit,
  onDelete,
}: {
  item: ContentItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-[110px] bg-gradient-to-br from-[#e8e4ff] to-[#d4cff5] flex items-center justify-center relative">
        <p className="text-[#3a3780] font-semibold text-sm text-center px-3 leading-snug">
          {item.name}
        </p>
        <span className="absolute bottom-2 left-2 bg-white/80 rounded-md px-1.5 py-0.5 text-[10px] text-[#5B5FC7] font-semibold tracking-wide">
          CARRECTLY
        </span>
      </div>

      <div className="p-3.5">
        <p className="font-semibold text-gray-900 text-sm mb-2 truncate">{item.name}</p>
        {item.categories && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.categories.map((c) => (
              <span
                key={c}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-gray-100 text-gray-500 border border-gray-200"
              >
                {c}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-1.5">
          <button
            onClick={onEdit}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-300 hover:text-blue-500 transition-colors"
          >
            <EditIcon />
          </button>
          <button
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-300 hover:text-red-500 transition-colors"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  const [search, setSearch]           = useState('');
  const [page, setPage]               = useState(1);
  const [tab, setTab]                 = useState<'active' | 'archived'>('active');
  const [viewMode, setViewMode]       = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal]     = useState(false);
  const [contents, setContents]       = useState<ContentItem[]>(MOCK);

  const filtered = contents.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) && c.isActive === (tab === 'active'),
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: number) =>
    setContents((prev) => prev.filter((c) => c.id !== id));

  const header = (
    <div className="flex items-center gap-3">
      <AdminSearchBar
        value={search}
        onChange={(v) => { setSearch(v); setPage(1); }}
        placeholder="Поиск контента..."
        className="flex-1 max-w-xl"
      />
      <button
        onClick={() => setViewMode('grid')}
        className={[
          'p-2 rounded-lg transition-colors',
          viewMode === 'grid'
            ? 'text-[#5B5FC7] bg-[#5B5FC7]/10'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        ].join(' ')}
        title="Сетка"
      >
        <GridIcon />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={[
          'p-2 rounded-lg transition-colors',
          viewMode === 'list'
            ? 'text-[#5B5FC7] bg-[#5B5FC7]/10'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
        ].join(' ')}
        title="Список"
      >
        <ListIcon />
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2.5 bg-[#5B5FC7] hover:bg-[#4a4eb5] text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap"
      >
        Создать контент
      </button>
    </div>
  );

  return (
    <AdminLayout header={header}>
      <div className="flex bg-white rounded-xl border border-gray-100 p-1 mb-6 max-w-xs">
        {(['active', 'archived'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setPage(1); }}
            className={[
              'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
              tab === t
                ? 'bg-[#5B5FC7] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {t === 'active' ? 'Активные' : 'В архиве'}
          </button>
        ))}
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginated.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onEdit={() => {}}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
          {paginated.length === 0 && (
            <p className="col-span-4 text-center py-16 text-gray-400 text-sm">
              Контент не найден
            </p>
          )}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50/60 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {['ID', 'Название', 'Фото', 'Просмотрели', 'Создан', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    Контент не найден
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-400 font-mono">{item.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm text-blue-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                          <polyline points="13 2 13 9 20 9" />
                        </svg>
                        {item.photo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.views}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{item.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-300 hover:text-blue-500 transition-colors">
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-300 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <AdminPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <CreateContentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          setContents((prev) => [
            {
              id: prev.length + 1,
              name: data.name,
              photo: data.photo?.name ?? 'img.png',
              views: 0,
              createdAt: new Date().toLocaleDateString('ru'),
              isActive: true,
            },
            ...prev,
          ]);
        }}
      />
    </AdminLayout>
  );
}
