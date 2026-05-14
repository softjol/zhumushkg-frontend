// src/shared/ui/admin/ConfirmModal.tsx
'use client';

import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'ban' | 'delete';
  userName: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  userName,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isBan = type === 'ban';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={[
          'bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl',
          isBan ? 'border-2 border-dashed border-gray-200' : '',
        ].join(' ')}
      >
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          {isBan ? 'Заблокировать пользователя' : 'Удалить пользователя'}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Вы действительно хотите{' '}
          {isBan ? 'заблокировать' : 'удалить'} &ldquo;
          <span className="font-medium text-gray-700">{userName}</span>&rdquo; ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Закрыть
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {isBan ? 'Заблокировать' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  );
}
