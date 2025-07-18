import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TeamMember } from '@/components/TeamTable'

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar todos os membros da equipe
  const loadTeam = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('equipe')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      setTeam(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar equipe')
    } finally {
      setLoading(false)
    }
  }

  // Criar novo membro
  const createMember = async (memberData: Omit<TeamMember, 'id'>) => {
    try {
      const { error } = await supabase
        .from('equipe')
        .insert([{ ...memberData }])
      if (error) throw error
      await loadTeam()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao criar membro' }
    }
  }

  // Atualizar membro
  const updateMember = async (id: string, memberData: Partial<TeamMember>) => {
    try {
      const { error } = await supabase
        .from('equipe')
        .update({ ...memberData })
        .eq('id', id)
      if (error) throw error
      await loadTeam()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao atualizar membro' }
    }
  }

  // Deletar membro
  const deleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('equipe')
        .delete()
        .eq('id', id)
      if (error) throw error
      await loadTeam()
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao deletar membro' }
    }
  }

  return { team, loading, error, loadTeam, createMember, updateMember, deleteMember }
} 