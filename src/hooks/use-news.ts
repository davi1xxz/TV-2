import { useState } from 'react'
import { supabase, NewsItem } from '@/lib/supabase'

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar todas as notícias
  const loadNews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30)

      if (error) throw error
      setNews(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar notícias')
    } finally {
      setLoading(false)
    }
  }

  // Carregar notícias em destaque para a home
  const loadHomeNews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('noticias')
        .select('*')
        .eq('destaque_home', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setNews(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar notícias')
    } finally {
      setLoading(false)
    }
  }

  // Criar nova notícia
  const createNews = async (newsData: Omit<NewsItem, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('noticias')
        .insert([{
          ...newsData,
          created_at: new Date().toISOString()
        }])

      if (error) throw error
      await loadNews()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao criar notícia' 
      }
    }
  }

  // Atualizar notícia
  const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
    try {
      const { error } = await supabase
        .from('noticias')
        .update(newsData)
        .eq('id', id)

      if (error) throw error
      await loadNews()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao atualizar notícia' 
      }
    }
  }

  // Deletar notícia
  const deleteNews = async (id: string) => {
    try {
      // Primeiro, buscar a notícia para pegar informações da mídia
      const { data: news, error: fetchError } = await supabase
        .from('noticias')
        .select('url_midia, tipo_midia')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      // Se for imagem, remover do Storage
      if (news && news.tipo_midia === 'imagem' && news.url_midia) {
        const url = news.url_midia
        const pathMatch = url.match(/imagens_noticias\/(.+)$/)
        if (pathMatch && pathMatch[1]) {
          const filePath = pathMatch[1]
          await supabase.storage.from('imagens_noticias').remove([filePath])
        }
      }

      // Remover a notícia do banco
      const { error } = await supabase
        .from('noticias')
        .delete()
        .eq('id', id)

      if (error) throw error
      await loadNews()
      return { success: true }
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Erro ao deletar notícia' 
      }
    }
  }

  // Upload de imagem
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage
        .from('imagens_noticias')
        .upload(filePath, file)

      if (error) throw error

      // Obter URL pública da imagem
      const { data: { publicUrl } } = supabase.storage
        .from('imagens_noticias')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      throw new Error('Falha no upload da imagem')
    }
  }

  // Extrair ID do vídeo do YouTube
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  // Atualizar ordem de destaque
  const setDestaqueOrdem = async (id: string, ordem: number | null) => {
    try {
      // Remove esse valor de outros
      if (ordem) {
        await supabase
          .from('noticias')
          .update({ destaque_ordem: null })
          .eq('destaque_ordem', ordem)
      }
      // Atualiza a notícia
      const { error } = await supabase
        .from('noticias')
        .update({ destaque_ordem: ordem, destaque_home: !!ordem })
        .eq('id', id)
      if (error) throw error
      await loadNews()
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro ao atualizar destaque'
      }
    }
  }

  return {
    news,
    loading,
    error,
    loadNews,
    loadHomeNews,
    createNews,
    updateNews,
    deleteNews,
    uploadImage,
    extractYouTubeId,
    setDestaqueOrdem
  }
} 