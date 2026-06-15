# SEO Аудит: jumush.kg
**Дата:** 2026-06-15  
**Стек:** Next.js 16.1.6 (App Router) · React 19 · TypeScript · Tailwind CSS · Zustand

---

## TL;DR

Проект практически не проработан с точки зрения SEO. Единственные метаданные — это общий `title: 'Jumush'` и `description` в корневом layout. Все ключевые страницы для SEO (вакансии, список вакансий) рендерятся **полностью на клиенте** (`'use client'`), что означает пустой HTML для поисковых роботов. Нет sitemap, нет robots.txt, нет JSON-LD разметки (а `JobPosting` для job-борда критически важна для Google for Jobs). Нет i18n, нет canonical URL, нет Open Graph. Посадочная страница (landing) — единственная страница, потенциально видимая поисковикам, но и она без уникальных мета-тегов.

---

## Карта маршрутов

| URL | Файл | Рендеринг | Метаданные | Индексируемость |
|-----|------|-----------|------------|-----------------|
| `/` | `app/page.tsx` | ✅ SSR (Server) | ⚠️ Только глобальные | Частично |
| `/login` | `(auth)/login/page.tsx` | ✅ SSR→Client (LoginPage) | ❌ Нет | Не важно |
| `/register` | `(auth)/register/page.tsx` | ✅ SSR→Client | ❌ Нет | Не важно |
| `/jobs` | `(candidate)/jobs/page.tsx` | ❌ Client-only* | ❌ Нет | ❌ Нет |
| `/jobs/[id]` | `(candidate)/jobs/[id]/page.tsx` | ❌ Client-only* | ❌ Нет | ❌ Нет |
| `/favorites` | `(candidate)/favorites/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/applications` | `(candidate)/applications/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/chat` | `(candidate)/chat/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/chat/[id]` | `(candidate)/chat/[id]/page.tsx` | ❌ Client-only | ❌ Нет | Не важно |
| `/profile` | `(candidate)/profile/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/resume` | `(candidate)/resume/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/resume/create` | `(candidate)/resume/create/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/resume/edit` | `(candidate)/resume/edit/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/filters` | `(candidate)/filters/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/notifications` | `(candidate)/notifications/page.tsx` | ❌ Client-only* | ❌ Нет | Не важно |
| `/employer/vacancies` | `employer/vacancies/page.tsx` | ⚠️ Частично SSR | ❌ Нет | ❌ Нет |
| `/employer/vacancies/[id]` | `employer/vacancies/[id]/page.tsx` | ⚠️ Частично SSR | ❌ Нет | ❌ Нет |
| `/employer/candidates` | `employer/candidates/page.tsx` | ⚠️ Частично SSR | ❌ Нет | Не важно |
| `/employer/candidates/[id]` | `employer/candidates/[id]/page.tsx` | ⚠️ Частично SSR | ❌ Нет | Не важно |
| `/employer/chat/[id]` | `employer/chat/[id]/page.tsx` | ❌ Client-only | ❌ Нет | Не важно |
| `/admin/*` | `admin/*/page.tsx` | ❌ Client-only | ❌ Нет | Не нужно |

> \* — route file сам не `'use client'`, но `(candidate)/layout.tsx` помечен как `'use client'`,  
> что делает **все** дочерние страницы клиентскими по умолчанию.

---

## 1. Структура и стек

### Next.js и конфиг

**Версия:** Next.js 16.1.6 (актуальная, App Router)  
**Файл:** `next.config.ts`

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
}
```

**Что настроено:**
- Разрешены изображения с любых внешних доменов (wildcard `**`) — работает, но небезопасно
- `scrollRestoration: true` — UX-фича, не влияет на SEO
- **Нет** `i18n`, `redirects`, `headers`, `rewrites`

### Архитектура проекта

Проект следует **Feature Sliced Design**:
```
src/
├── app/         — маршруты (Next.js App Router)
├── page/        — полные страницы (логика + UI)
├── entities/    — бизнес-сущности (vacancy, user, chat)
├── features/    — фичи
├── widgets/     — крупные UI-блоки (header, sidebar, footer)
└── shared/      — общие утилиты, UI-компоненты
```

Это хорошая архитектура, но из-за неё все `app/*/page.tsx` — просто тонкие обёртки, которые **импортируют `'use client'`-компоненты из `src/page/`**.

### SEO-зависимости

| Библиотека | Статус |
|------------|--------|
| `next/font/google` (Manrope) | ✅ Подключена |
| `next/image` | ✅ Используется |
| `next/link` | ✅ Используется |
| next-intl / i18next | ❌ Отсутствует |
| next-sitemap / @astrojs/sitemap | ❌ Отсутствует |
| schema-dts (JSON-LD типы) | ❌ Отсутствует |

---

## 2. Рендеринг (критично для SEO)

### Проблема: `(candidate)/layout.tsx` — `'use client'`

Это **ключевая проблема**. Файл `src/app/(candidate)/layout.tsx`:

```tsx
'use client'               // ← ВСЕ дочерние страницы становятся клиентскими
import { AppLayout } from '@/widgets/app-layout/ui/AppLayout'
import { RoleGuard } from '@/widgets/role-guard/RoleGuard'

export default function CandidateLayout({ children }) {
  return (
    <RoleGuard allowedRole="JOB_SEEKER">
      <AppLayout>{children}</AppLayout>
    </RoleGuard>
  )
}
```

Из-за `'use client'` в layout-е **все** маршруты группы `(candidate)/` — `/jobs`, `/jobs/[id]`, `/favorites` и т.д. — рендерятся на клиенте. Google видит только пустой `<div>`.

### Страница вакансии `/jobs/[id]`

`src/app/(candidate)/jobs/[id]/page.tsx` — Server Component, НО импортирует:

```tsx
import { JobDetailPage } from '@/page/job-detail/ui/JobDetailPage'
```

А `src/page/job-detail/ui/JobDetailPage.tsx` — `'use client'`. Значит, вся страница вакансии рендерится на клиенте. **Поисковик не увидит ни название вакансии, ни описание, ни компанию.**

### Стратегия рендеринга по типам страниц

| Тип страницы | Должно быть | Реально | Статус |
|---|---|---|---|
| `/` (лендинг) | SSR/SSG | SSR (частично) | ⚠️ |
| `/jobs` (список) | SSR + ISR | Client-only | ❌ |
| `/jobs/[id]` (вакансия) | SSR + ISR | Client-only | ❌ |
| `/login`, `/register` | SSR | SSR→Client | OK |
| Protected pages | Client OK | Client | ✅ |

### generateStaticParams

**Не используется нигде.** Все динамические маршруты (`/jobs/[id]`, `/employer/vacancies/[id]`) не имеют `generateStaticParams`. Страницы генерируются по запросу или (в текущем состоянии) вообще не генерируются на сервере.

### Кэширование fetch

Ни один `fetch()` в проекте не использует опции Next.js кэширования:
- Нет `fetch(url, { next: { revalidate: 3600 } })`
- Нет `export const revalidate = 3600`
- Нет `export const dynamic = 'force-static'`

---

## 3. Метаданные

### Что есть

Единственный `metadata` — в корневом layout (`src/app/layout.tsx`):

```ts
export const metadata: Metadata = {
  title: 'Jumush',
  description: 'Платформа для поиска работы и кандидатов в Кыргызстане',
  icons: { icon: '/icon.svg' },
}
```

Этот `title` и `description` **одинаковы на всех страницах сайта**.

### Чего нет

| Поле | Статус | Важность |
|------|--------|----------|
| `title` (per-page) | ❌ | Критично |
| `description` (per-page) | ❌ | Критично |
| `generateMetadata` | ❌ | Критично для /jobs/[id] |
| `openGraph.title/description/image` | ❌ | Высокая |
| `openGraph.type = 'website'` | ❌ | Высокая |
| `twitter: { card, title, description }` | ❌ | Средняя |
| `alternates.canonical` | ❌ | Высокая |
| `alternates.languages` (hreflang) | ❌ | Средняя |
| `robots: { index, follow }` | ❌ | Высокая |
| `keywords` | ❌ | Низкая (Google игнорирует) |

### `<html lang="ru">`

Установлен в корневом layout — **правильно**. Но это единственный языковой атрибут; нет `hreflang` для кыргызской версии.

---

## 4. Техническое SEO

### Sitemap

| Файл | Статус |
|------|--------|
| `src/app/sitemap.ts` | ❌ НЕТ |
| `public/sitemap.xml` | ❌ НЕТ |
| `src/app/sitemap.xml/route.ts` | ❌ НЕТ |

Поисковые роботы не знают ни одного URL кроме `/`. Это означает, что ни одна страница вакансий не будет найдена и проиндексирована.

### Robots

| Файл | Статус |
|------|--------|
| `src/app/robots.ts` | ❌ НЕТ |
| `public/robots.txt` | ❌ НЕТ |

Без `robots.txt` поведение краулера непредсказуемо. Нет возможности запретить индексацию `/admin/`, `/employer/`, `/chat/` и других приватных разделов.

### Структура URL

Все динамические страницы используют числовые ID:
- `/jobs/42` вместо `/jobs/programmist-bishkek`
- `/employer/vacancies/15` вместо `/vacancies/marketing-manager`

Числовые ID не несут смысловой нагрузки для SEO. Поисковики предпочитают URL вида `/jobs/qa-engineer-bishkek`.

### Пагинация

В проекте есть компонент `src/features/pagination/Pagination.tsx` (`'use client'`). Пагинация реализована на клиенте. Поисковики не видят ни следующих страниц списка вакансий, ни `rel="next"/"prev"` атрибутов.

### not-found / 404

| Файл | Статус |
|------|--------|
| `src/app/not-found.tsx` | ❌ НЕТ |
| `src/app/error.tsx` | ❌ НЕТ |

Используется дефолтная Next.js страница 404. Это работает, но нет кастомного контента с перелинковкой на полезные страницы.

---

## 5. Структурированные данные (JSON-LD)

**Результат поиска по `application/ld+json`, `@context`, `JobPosting`, `schema.org`:**

> ❌ Ничего не найдено. В проекте нет ни одного фрагмента JSON-LD разметки.

### Почему это критично для job-борда

**Google for Jobs** — специальный блок в выдаче Google, который показывает вакансии прямо в поиске. Для попадания в него обязательна разметка `JobPosting`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Программист Python",
  "description": "...",
  "identifier": { "@type": "PropertyValue", "name": "Jumush", "value": "42" },
  "datePosted": "2026-06-01",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Компания ABC",
    "sameAs": "https://jumush.kg"
  },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressLocality": "Бишкек", "addressCountry": "KG" }
  }
}
</script>
```

Без этой разметки вакансии **не попадут в Google for Jobs** — главный источник органического трафика для job-порталов.

### Что ещё нужно разметить

| Тип разметки | Страница | Приоритет |
|---|---|---|
| `JobPosting` | `/jobs/[id]` | ❌ Критично |
| `Organization` | `/` (лендинг) | Высокий |
| `WebSite` + `SearchAction` (sitelinks search) | `/` | Высокий |
| `BreadcrumbList` | `/jobs/[id]`, `/jobs` | Средний |
| `FAQPage` | Лендинг (раздел FAQ) | Низкий |

---

## 6. Мультиязычность

### Текущее состояние

| Параметр | Статус |
|----------|--------|
| i18n библиотека | ❌ Не установлена |
| Языковые маршруты (`/ru/`, `/ky/`) | ❌ Нет |
| `hreflang` мета-теги | ❌ Нет |
| Кыргызский язык в контенте | ❌ Нет |
| `<html lang>` | ✅ `lang="ru"` (только русский) |

### Потенциал

Рынок Кыргызстана: значительная часть пользователей читает на кыргызском языке. Конкуренты с кыргызской версией сайта будут выигрывать в поисковой выдаче по кыргызскоязычным запросам.

Рекомендованный подход при внедрении: `next-intl` с маршрутами вида `/ru/jobs/[id]` и `/ky/jobs/[id]` + `hreflang` в `generateMetadata`.

---

## 7. Контент и семантика

### Иерархия заголовков

**Хорошее:**
- На странице вакансии `JobDetailPage` есть `<h1>` с названием вакансии
- На лендинге есть иерархия `<h1>` → `<h2>` → `<h3>`
- На странице профиля есть `<h1>`

**Проблемы:**
- `(candidate)/chat/layout.tsx` имеет `<h1>Чаты</h1>` прямо в layout-е — это создаёт конфликт с `<h1>` дочерних страниц
- Некоторые страницы используют `<h3>` без предшествующих `<h2>` (нарушение иерархии)
- Страницы списка (`/jobs`, `/favorites`) не имеют видимого `<h1>` (контент рендерится на клиенте, поисковик его не видит)
- Странное начало с `<h3>` в chat pages: `<h3 className="text-lg font-semibold text-foreground">Выберите чат</h3>` — чат-страница не нуждается в индексации, но паттерн нехороший

### Семантические теги — что хорошо

| Тег | Используется | Примеры |
|-----|-------------|---------|
| `<main>` | ✅ | `app/page.tsx`, `admin/layout.tsx` |
| `<header>` | ✅ | `widgets/header`, `page/landing/Header.tsx` |
| `<nav>` | ✅ | `widgets/sidebar`, landing navigation |
| `<footer>` | ✅ | `widgets/footer`, landing footer |
| `<section>` | ✅ | Лендинг, job detail страницы |
| `<article>` | ❌ | Не используется (рекомендуется для карточек вакансий) |

### next/image

✅ Используется повсеместно. У всех изображений есть `alt` атрибуты. Есть `priority` на hero-изображении лендинга. Пример хорошего использования:

```tsx
// src/page/landing/ui/Hero.tsx
<Image src={heroBg} alt="Hero" fill priority className="object-cover" sizes="100vw" />
```

### next/link vs `<a>`

✅ `next/link` используется для внутренней навигации.  
⚠️ Внешние ссылки (Instagram, WhatsApp, Telegram в footer) корректно используют `<a target="_blank" rel="noopener noreferrer">`.

---

## 8. Производительность (Core Web Vitals)

### Шрифты

✅ **next/font используется:**

```ts
// src/app/layout.tsx
import { Manrope } from 'next/font/google'
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})
```

Это предотвращает FOUT и загрузку шрифтов через отдельный запрос — **правильно**.

### Избыточный `'use client'`

**Критическая проблема:** `(candidate)/layout.tsx` помечен как `'use client'` только ради `RoleGuard`. Это означает, что весь поддерев кандидата — включая страницы, которые могли бы быть SSR — рендерится на клиенте.

Файлы с `'use client'` в route-файлах (не shared UI):
- `src/app/(candidate)/layout.tsx` — ⚠️ лишний, влияет на все дочерние страницы
- `src/app/(candidate)/chat/layout.tsx` — оправданно (реалтайм данные)
- `src/app/(candidate)/chat/[id]/page.tsx` — оправданно
- `src/app/admin/layout.tsx` — оправданно (только для авторизованных)
- `src/app/employer/chat/layout.tsx` — оправданно
- `src/app/employer/chat/[id]/page.tsx` — оправданно

### Клиентский бандл

Zustand store + React Query pattern + все страницы как клиентские = тяжёлый initial JS бандл. Пользователь видит пустой экран до гидрации.

### Изображения

- `next/image` используется ✅
- `remotePatterns: [{ hostname: '**' }]` — wildcard небезопасен, но не влияет на производительность

### API Proxy

Все API-запросы идут через `src/app/api-proxy/[...path]/route.ts` → `railway.app`. Дополнительный hop увеличивает latency. Это не SEO-проблема напрямую, но влияет на TTFB (Time to First Byte).

---

## Таблица «Проблемы и возможности»

| # | Проблема / Возможность | Приоритет | Сложность | Влияние |
|---|---|---|---|---|
| 1 | Нет JSON-LD `JobPosting` на страницах вакансий | 🔴 High | Medium | Google for Jobs, Rich Results |
| 2 | `/jobs/[id]` рендерится client-only — контент невидим для SEO | 🔴 High | High | Все вакансии не индексируются |
| 3 | Нет `generateMetadata` ни на одной странице | 🔴 High | Medium | Одинаковые title/description на всём сайте |
| 4 | Нет `sitemap.ts` — поисковики не знают об URL вакансий | 🔴 High | Low | Краулинговое покрытие |
| 5 | Нет `robots.ts` — нет контроля над индексацией | 🔴 High | Low | Индексация приватных разделов |
| 6 | `(candidate)/layout.tsx` помечен `'use client'` без необходимости | 🔴 High | Medium | Блокирует SSR для /jobs, /favorites |
| 7 | Нет Open Graph метатегов | 🟠 Medium | Low | Шаринг в соцсетях, CTR |
| 8 | URL — числовые ID вместо slug (`/jobs/42`) | 🟠 Medium | High | Семантика URL, кликабельность в выдаче |
| 9 | Нет `alternates.canonical` | 🟠 Medium | Low | Дублированный контент |
| 10 | Нет `robots` директив в metadata (noindex для /admin) | 🟠 Medium | Low | Утечка приватных страниц в индекс |
| 11 | Нет JSON-LD `WebSite` + `SearchAction` на лендинге | 🟠 Medium | Low | Sitelinks Search Box в выдаче |
| 12 | Нет JSON-LD `Organization` | 🟠 Medium | Low | Knowledge Panel, доверие |
| 13 | Нет `not-found.tsx` (кастомная 404) | 🟠 Medium | Low | UX + перелинковка |
| 14 | Пагинация — клиентская, без `rel="next"` | 🟠 Medium | Medium | Краулинг страниц со списком вакансий |
| 15 | Нет кыргызской языковой версии (`hreflang`) | 🟡 Low | High | Аудитория, говорящая на кыргызском |
| 16 | Нет `<article>` для карточек вакансий | 🟡 Low | Low | Семантика |
| 17 | Wildcard `remotePatterns: { hostname: '**' }` | 🟡 Low | Low | Безопасность (не SEO) |
| 18 | API-прокси добавляет latency (влияет на TTFB) | 🟡 Low | High | Core Web Vitals |
| 19 | Twitter Card отсутствует | 🟡 Low | Low | Шаринг в X/Twitter |
| 20 | `<article>` не используется для карточек | 🟡 Low | Low | Семантика HTML |

---

## Предварительный план работ по этапам

### Этап 1 — Быстрые победы (1–3 дня)

Файлы с минимальным риском, максимальным эффектом:

1. **Создать `src/app/robots.ts`** — запретить индексацию `/admin/*`, `/employer/*`, `/chat/*`, `/profile`, `/resume/*`, разрешить `/jobs/*`, `/`.

2. **Создать `src/app/sitemap.ts`** — добавить лендинг и динамически загружать все вакансии через API для генерации URL вида `/jobs/[id]`.

3. **Добавить `generateMetadata` на ключевые страницы:**
   - `/` — уникальный title + description с ключевыми словами
   - `/jobs` — "Вакансии в Кыргызстане | Jumush"
   - `/jobs/[id]` — `"${vacancy.position} в ${vacancy.company} | Jumush"`

4. **Добавить базовый Open Graph** в корневой layout и `generateMetadata` для вакансий.

5. **Создать `src/app/not-found.tsx`** с ссылками на главную и список вакансий.

6. **Добавить `robots: { index: false }` в метаданные** приватных разделов (`/employer/*`, `/admin/*`, `/chat/*`).

### Этап 2 — Решить проблему рендеринга (3–7 дней)

Это самое важное для SEO job-борда:

7. **Убрать `'use client'` из `(candidate)/layout.tsx`** — вынести `RoleGuard` в Client Component-обёртку, а сам layout оставить Server Component.

8. **Конвертировать `JobDetailPage` в Server Component** — перенести fetch данных вакансии на сервер (в `page.tsx` или server action), передавать данные как props в клиентскую часть (кнопки, формы).

9. **Конвертировать `JobsPage` (список вакансий) в Server Component** — первый экран загружать на сервере, клиент только для фильтров и пагинации.

### Этап 3 — Структурированные данные (2–4 дня)

10. **Добавить JSON-LD `JobPosting`** на страницу `/jobs/[id]` — обязательно для Google for Jobs.

11. **Добавить JSON-LD `Organization`** + **`WebSite` с `SearchAction`** на лендинг.

12. **Добавить `BreadcrumbList`** на страницу вакансии.

### Этап 4 — URL и пагинация (3–5 дней)

13. **Ввести slug в URL вакансий** — `/jobs/qa-engineer-bishkek` вместо `/jobs/42`. Требует изменений в API или генерации slug на фронте + `generateStaticParams`.

14. **Добавить `revalidate`** для страниц вакансий — ISR с обновлением каждые 1–24 часа.

15. **Добавить серверную пагинацию** с параметром `?page=2` и `rel="next"` в `<head>`.

### Этап 5 — Мультиязычность (1–2 недели)

16. **Внедрить `next-intl`** с маршрутами `/ru/` и `/ky/`.

17. **Добавить `hreflang`** через `alternates.languages` в `generateMetadata`.

18. **Перевести контент** ключевых страниц (лендинг, вакансии).

---

## Приложение: Полный список файлов с `'use client'`

### Route-файлы (влияют на рендеринг страниц)
- `src/app/(candidate)/layout.tsx` — ⚠️ влияет на все дочерние маршруты
- `src/app/(candidate)/chat/layout.tsx`
- `src/app/(candidate)/chat/[id]/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/employer/chat/layout.tsx`
- `src/app/employer/chat/[id]/page.tsx`

### Page-компоненты (импортируемые в route-файлы)
- `src/page/job-detail/ui/JobDetailPage.tsx` — ❌ Критично
- `src/page/employer-applications/EmployerApplicationsPage.tsx`

### Shared UI (ожидаемо клиентские)
- `src/features/pagination/Pagination.tsx`
- `src/shared/ui/sonner.tsx`
- `src/shared/ui/carousel.tsx`
- `src/shared/ui/dropdown-menu.tsx`
- `src/shared/ui/checkbox.tsx`
- `src/shared/ui/dialog.tsx`
- `src/shared/ui/drawer.tsx`
- `src/shared/ui/label.tsx`
- `src/shared/ui/input-otp.tsx`
- `src/shared/ui/tabs.tsx`
