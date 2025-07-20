import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { TeamMember } from '@/components/TeamTable'

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carregar todos os membros da equipe
  const loadTeam = useCallback(async () => {
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
  }, [])

  // Criar novo membro
  const createMember = useCallback(async (memberData: Omit<TeamMember, 'id'>) => {
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
  }, [loadTeam])

  // Atualizar membro
  const updateMember = useCallback(async (id: string, memberData: Partial<TeamMember>) => {
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
  }, [loadTeam])

  // Deletar membro
  const deleteMember = useCallback(async (id: string) => {
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
  }, [loadTeam])

  return { team, loading, error, loadTeam, createMember, updateMember, deleteMember }
} 