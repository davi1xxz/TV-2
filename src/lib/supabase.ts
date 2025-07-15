import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hnbsjqhdtiwhcjcqkeoa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYnNqcWhkdGl3aGNqY3FrZW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MzU5OTUsImV4cCI6MjA2NzUxMTk5NX0.jOZhvIzhgDKtz9KrfYpSO2salZl7KuJvTudwBFnn8ZM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para as notícias
export interface NewsItem {
  id: number
  titulo: string
  subtitulo: string // Novo campo
  descricao: string
  tipo_midia: 'imagem' | 'youtube'
  url_midia: string
  destaque_home: boolean
  created_at: string
  autor: string // Campo do autor da notícia
}

// Configurações do site
export const SITE_CONFIG = {
  newsPerHome: 6,
  newsPerPage: 12
} 