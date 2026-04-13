'use client'

import { useRef } from 'react'
import {
  LayoutGrid,
  Hammer,
  Car,
  Monitor,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  Wrench,
  ShoppingBag,
  Factory,
  Shield,
} from 'lucide-react'
import { categories } from '../model/mockData'

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  Hammer,
  Car,
  Monitor,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  Wrench,
  ShoppingBag,
  Factory,
  Shield,
}

const iconColors: Record<string, string> = {
  all: '#64748b',
  construction: '#f59e0b',
  transport: '#3b82f6',
  it: '#8b5cf6',
  food: '#ef4444',
  education: '#10b981',
  beauty: '#ec4899',
  services: '#facc15',
  trade: '#0ea5e9',
  manufacturing: '#475569',
  security: '#dc2626',
}

interface Props {
  active: string
  onChange: (id: string) => void
}

export const CategoryChips = ({ active, onChange }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, distance: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = {
      active: true,
      startX: e.pageX,
      scrollLeft: ref.current!.scrollLeft,
      distance: 0,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    e.preventDefault()
    const walk = (e.pageX - drag.current.startX) * 1.5
    drag.current.distance = Math.abs(walk)
    ref.current!.scrollLeft = drag.current.scrollLeft - walk
  }

  const onMouseUp = () => {
    drag.current.active = false
  }

  const handleClick = (id: string, e: React.MouseEvent) => {
    if (drag.current.distance > 10) {
      e.preventDefault()
      return
    }
    onChange(id)
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className={`flex gap-2 overflow-x-auto scrollbar-hide -mx-4 lg:-mx-6 py-2 touch-pan-x overscroll-x-contain cursor-grab active:cursor-grabbing select-none`}
    >
      <div className="w-2 lg:w-4 flex-shrink-0" />
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon]
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            onClick={(e) => handleClick(cat.id, e)}
            className={`flex items-center hover:shadow gap-1.5 px-4 py-2.5 border rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-white text-muted-foreground hover:bg-accent'
            }`}
          >
            {Icon && (
              <Icon
                size={18}
                color={isActive ? 'currentColor' : iconColors[cat.id] || 'currentColor'}
                className={isActive ? '' : 'opacity-90'}
              />
            )}
            {cat.label}
          </button>
        )
      })}
      <div className="w-2 lg:w-4 flex-shrink-0" />
    </div>
  )
}
