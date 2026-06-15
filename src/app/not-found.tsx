import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-7xl font-bold text-[#A083F7]">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900">Страница не найдена</h2>
      <p className="text-gray-500 max-w-sm">
        Запрошенная страница не существует или была перемещена.
      </p>
      <Link
        href="/"
        className="bg-[#A083F7] hover:bg-[#8B6EE0] text-white px-8 py-3 rounded-full font-semibold transition-colors"
      >
        На главную
      </Link>
    </div>
  )
}
