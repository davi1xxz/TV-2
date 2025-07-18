import { useState } from 'react'
import { supabase, SponsorItem } from '@/lib/supabase'

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar todos os patrocinadores
  const loadSponsors = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('patrocinadores')
        .select('*')
        .order('ordem', { ascending: true })

      if (error) throw error
      setSponsors(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar patrocinadores')
    } finally {
      setLoading(false)
    }
  }

  // Criar novo patrocinador
  const createSponsor = async (sponsorData: Omit<SponsorItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('patrocinadores')
        .insert([{ ...sponsorData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
      if (error) throw error
      await loadSponsors()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao criar patrocinador' }
    }
  }

  // Atualizar patrocinador
  const updateSponsor = async (id: string, sponsorData: Partial<SponsorItem>) => {
    try {
      const { error } = await supabase
        .from('patrocinadores')
        .update({ ...sponsorData, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
      await loadSponsors()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao atualizar patrocinador' }
    }
  }

  // Deletar patrocinador
  const deleteSponsor = async (id: string) => {
    try {
      // Buscar patrocinador para pegar url_imagem
      const { data: sponsor, error: fetchError } = await supabase
        .from('patrocinadores')
        .select('url_imagem')
        .eq('id', id)
        .single()
      if (fetchError) throw fetchError
      // Remover imagem do Storage
      if (sponsor && sponsor.url_imagem) {
        const url = sponsor.url_imagem
        const pathMatch = url.match(/imagenspatrocinadores\/(.+)$/)
        if (pathMatch && pathMatch[1]) {
          const filePath = pathMatch[1]
          await supabase.storage.from('imagenspatrocinadores').remove([filePath])
        }
      }
      // Remover do banco
      const { error } = await supabase
        .from('patrocinadores')
        .delete()
        .eq('id', id)
      if (error) throw error
      await loadSponsors()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao deletar patrocinador' }
    }
  }

  // Upload de imagem
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { data, error } = await supabase.storage
        .from('imagenspatrocinadores')
        .upload(filePath, file)
      if (error) throw error
      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('imagenspatrocinadores')
        .getPublicUrl(filePath)
      return publicUrl
    } catch (error) {
      throw new Error('Falha no upload da imagem')
    }
  }

  // Garante exclusividade da ordem (igual setDestaqueOrdem das notícias)
  const setOrdemExclusiva = async (id: string, ordem: number | null) => {
    try {
      if (ordem) {
        // Remove de todos (inclusive do atual)
        await supabase
          .from('patrocinadores')
          .update({ ordem: null })
          .eq('ordem', ordem)
      }
      // Atualiza o atual
      const { error } = await supabase
        .from('patrocinadores')
        .update({ ordem })
        .eq('id', id)
      if (error) throw error
      await loadSponsors()
      return { success: true }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Erro ao atualizar ordem'
      }
    }
  }

  return {
    sponsors,
    loading,
    error,
    loadSponsors,
    createSponsor,
    updateSponsor,
    deleteSponsor,
    uploadImage,
    setOrdemExclusiva
  }
} 