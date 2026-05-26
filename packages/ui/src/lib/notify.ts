'use client'

import { toast } from 'sonner'

function normalize(msg?: string, fallback = "Erro inesperado") {
  if (!msg || !msg.trim()) return fallback
  return msg
}

export const notify = {
  success(msg?: string) {
    toast.success(normalize(msg, "Operação realizada com sucesso"))
  },

  error(msg?: string) {
    toast.error(normalize(msg, "Ocorreu um erro inesperado"))
  },

  info(msg?: string) {
    toast(normalize(msg, "Informação"))
  }
}
