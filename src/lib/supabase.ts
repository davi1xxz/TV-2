import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnbsjqhdtiwhcjcqkeoa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYnNqcWhkdGl3aGNqY3FrZW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MzU5OTUsImV4cCI6MjA2NzUxMTk5NX0.jOZhvIzhgDKtz9KrfYpSO2salZl7KuJvTudwBFnn8ZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as notícias
export interface NewsItem {
  id: string
  titulo: string
  subtitulo: string
  descricao: string
  tipo_midia: 'imagem' | 'youtube'
  url_midia: string
  destaque_home: boolean
  destaque_ordem?: number // 1, 2, 3 ou null
  autor: string
  data_publicacao: string
  created_at: string
  updated_at: string
}

export interface ScheduleItem {
  id: string
  horario: string
  titulo: string
  subtitulo: string
  autor: string
  created_at: string
  updated_at: string
}

export interface SponsorItem {
  id: string
  nome: string
  url_imagem: string
  url_link: string
  ordem: number
  created_at: string
  updated_at: string
}

// Configurações do site
export const SITE_CONFIG = {
  newsPerHome: 6,
  newsPerPage: 12
} 