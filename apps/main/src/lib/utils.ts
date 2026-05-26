import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { toast } from 'sonner'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULTDATA = new Date().toISOString().split('T')[0]

export const DEFAULTTIMEOUT = 1000 // ms

export function convertToBoolean(value: string | boolean) {
  if (value === '\u0001') {
    return true
  } else if (value === '\u0000') {
    return false
  }
  return Boolean(value)
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

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

import { formatDistanceToNow, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getRelativeTime(dateStr: string): string {
  try {
    const normalized = dateStr.replace(',', '')
    const parsed = parse(normalized, 'dd/MM/yyyy HH:mm:ss', new Date())
    return formatDistanceToNow(parsed, { addSuffix: true, locale: ptBR })
  } catch {
    return dateStr
  }
}

