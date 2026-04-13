'use client'
import { useState } from 'react'
import { featuredCompanies } from '../model/mockData'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/shared/ui/dialog'
import Image from 'next/image'
import { X } from 'lucide-react'

export const FeaturedCompanies = () => {
  const [selected, setSelected] = useState<(typeof featuredCompanies)[0] | null>(null)

  return (
    <>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1 px-4 lg:px-6 -mx-4 lg:-mx-6">
        {featuredCompanies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelected(company)}
            className="flex-shrink-0 w-[210px] h-[110px] bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <Image
              src={company.banner}
              width={210}
              height={110}
              alt={company.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="p-0 overflow-hidden border-none w-full max-w-[700px] max-h-[400px] lg:max-h-[500px] h-full w-full rounded-3xl ">
          <DialogTitle className="sr-only">Company Details</DialogTitle>
          <DialogClose className="w-8 h-8 absolute z-10 top-4 right-4 lg:right-5 flex justify-center items-center bg-white/60 hover:bg-white/80 transition duration-100 rounded-xl">
            <X />
          </DialogClose>
          {selected && (
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-[-1px] bg-cover bg-center"
                style={{ backgroundImage: `url(${(selected as any).banner})` }}
              />

              {/* Overlay to ensure button visibility if needed, but the user didn't ask for it */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Action Button */}
              <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-center">
                <Button
                  className="w-[200px] bg-primary hover:bg-primary shadow-2xl text-white text-base lg:text-lg font-semibold  h-12 lg:h-14 rounded-2xl transition-all active:scale-[0.98]"
                  onClick={() => setSelected(null)}
                >
                  Перейти
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
