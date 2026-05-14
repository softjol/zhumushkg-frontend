'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '@/app/admin/layout';
import { adminApi, normalizeUser } from '@/entities/admin/api/adminApi';

function SalesChart() {
  const CHART_DATA = [
    { time: '8:00',  value: 14000 },
    { time: '9:00',  value: 22000 },
    { time: '10:00', value: 29000 },
    { time: '11:00', value: 28000 },
    { time: '12:00', value: 33000 },
    { time: '13:00', value: 42000 },
    { time: '14:00', value: 49000 },
  ];

  const [tooltip, setTooltip] = useState<{
    x: number; y: number; value: number; time: string;
  } | null>(null);

  const W = 700; const H = 220; const PX = 44; const PY = 24;
  const max = Math.max(...CHART_DATA.map((d) => d.value));

  const pts = CHART_DATA.map((d, i) => ({
    x: PX + (i / (CHART_DATA.length - 1)) * (W - PX * 2),
    y: PY + (1 - d.value / max) * (H - PY * 2),
    ...d,
  }));

  const line = pts.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`)).join(' ');
  const area = `${line} L${pts[pts.length - 1].x} ${H - PY} L${pts[0].x} ${H - PY}Z`;
  const yTicks = [50000, 40000, 30000, 20000, 10000, 5000, 0];

  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full select-none" onMouseLeave={() => setTooltip(null)}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B5FC7" stopOpacity=".18" />
          <stop offset="100%" stopColor="#5B5FC7" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((v) => {
        const y = PY + (1 - v / max) * (H - PY * 2);
        return (
          <g key={v}>
            <line x1={PX} y1={y} x2={W - PX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
            <text x={PX - 6} y={y + 4} fontSize="10" textAnchor="end" fill="#9ca3af">{v >= 1000 ? `${v / 1000}k` : v}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#sg)" />
      <path d={line} fill="none" stroke="#5B5FC7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p) => (
        <g key={p.time} onMouseEnter={() => setTooltip({ x: p.x, y: p.y, value: p.value, time: p.time })}>
          <circle cx={p.x} cy={p.y} r="5" fill="#5B5FC7" stroke="white" strokeWidth="2" />
          <rect x={p.x - 20} y={0} width={40} height={H} fill="transparent" />
          <text x={p.x} y={H + 14} fontSize="10" textAnchor="middle" fill="#9ca3af">{p.time}</text>
        </g>
      ))}
      {tooltip && (
        <g>
          <line x1={tooltip.x} y1={PY} x2={tooltip.x} y2={H - PY} stroke="#5B5FC7" strokeWidth="1" strokeDasharray="4" />
          <rect x={tooltip.x - 52} y={tooltip.y - 46} width={104} height={38} rx="8" fill="white" stroke="#e5e7eb" />
          <text x={tooltip.x} y={tooltip.y - 30} fontSize="10" textAnchor="middle" fill="#6b7280">{tooltip.time}</text>
          <text x={tooltip.x} y={tooltip.y - 14} fontSize="12" textAnchor="middle" fill="#111827" fontWeight="600">{(tooltip.value / 1000).toFixed(1)}k с</text>
        </g>
      )}
    </svg>
  );
}

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    userCount: 0,
    totalVacancies: 0,
    activeVacancies: 0,
    blockedUsers: 0,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [employers, candidates] = await Promise.all([
        adminApi.getEmployers(),
        adminApi.getCandidates()
      ]);

      const allUsers = [
        ...employers.map(normalizeUser),
        ...candidates.map(normalizeUser)
      ];

      setStats({
        userCount: allUsers.length,
        totalVacancies: allUsers.reduce((sum, u) => sum + (u.itemCount || 0), 0),
        activeVacancies: allUsers.filter(u => !u.isBanned).reduce((sum, u) => sum + (u.itemCount || 0), 0),
        blockedUsers: allUsers.filter(u => u.isBanned).length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const STATS_CARDS = [
    { label: 'Число пользователей', value: stats.userCount.toLocaleString(), bg: 'bg-white' },
    { label: 'Число вакансий',      value: stats.totalVacancies.toLocaleString(), bg: 'bg-white' },
    { label: 'Активные вакансии',   value: stats.activeVacancies.toLocaleString(), bg: 'bg-green-50' },
    { label: 'Заблокированные пользователи', value: stats.blockedUsers.toLocaleString(), bg: 'bg-red-50' },
    { label: 'Платные вакансии',    value: '9 000 сом', bg: 'bg-white' },
    { label: 'Общий доход',         value: '50 000$',   bg: 'bg-white' },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {STATS_CARDS.map((s) => (
          <div
            key={s.label}
            className={`${s.bg} rounded-2xl border border-gray-100 p-5 relative hover:shadow-sm transition-shadow`}
          >
            {/* Сиз сураган мурдагы жебе иконкасы */}
            <button className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor"
                strokeWidth={2} viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-xs text-gray-500 mb-3 pr-8 leading-snug">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{loading ? "..." : s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#5B5FC7]" fill="none" stroke="currentColor"
                strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 3v18h18M7 16l4-4 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-semibold text-gray-900">Статистика по продажам</h2>
          </div>
          <div className="flex gap-2">
            {['Тариф PRO', 'За день'].map((label) => (
              <button
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {label}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                  strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <SalesChart />
      </div>
    </AdminLayout>
  );
}