'use client'

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog'
import { AuthRequired } from './AuthRequired'

interface AuthRequiredModalProps {
  open: boolean
  onClose: () => void
}

export function AuthRequiredModal({ open, onClose }: AuthRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-3xl p-6 text-center">
        <DialogTitle className="sr-only"></DialogTitle>
        <AuthRequired
          description="Войдите или зарегистрируйтесь, чтобы продолжить"
          className="p-10"
        />
      </DialogContent>
    </Dialog>
  )
}
