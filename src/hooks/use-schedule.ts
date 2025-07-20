import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { ScheduleItem } from '@/lib/supabase'

export const useSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSchedule = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('programacao')
        .select('*')
        .order('horario', { ascending: true })

      if (error) {
        console.error('Erro ao carregar programação:', error)
        setError(`Erro ao carregar: ${error.message}`)
        return
      }

      setSchedule(data || [])
      setError(null)
    } catch (error) {
      console.error('Erro ao carregar programação:', error)
      setError('Erro inesperado ao carregar programação')
    } finally {
      setLoading(false)
    }
  }, [])

  const addSchedule = useCallback(async (scheduleData: Omit<ScheduleItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('programacao')
        .insert([scheduleData])
        .select()

      if (error) {
        console.error('Erro ao adicionar programação:', error)
        return null
      }

      await loadSchedule()
      return data?.[0] || null
    } catch (error) {
      console.error('Erro ao adicionar programação:', error)
      return null
    }
  }, [loadSchedule])

  const updateSchedule = useCallback(async (id: string, scheduleData: Partial<ScheduleItem>) => {
    try {
      const { data, error } = await supabase
        .from('programacao')
        .update(scheduleData)
        .eq('id', id)
        .select()

      if (error) {
        console.error('Erro ao atualizar programação:', error)
        return null
      }

      await loadSchedule()
      return data?.[0] || null
    } catch (error) {
      console.error('Erro ao atualizar programação:', error)
      return null
    }
  }, [loadSchedule])

  const deleteSchedule = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('programacao')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar programação:', error)
        return false
      }

      await loadSchedule()
      return true
    } catch (error) {
      console.error('Erro ao deletar programação:', error)
      return false
    }
  }, [loadSchedule])

  return {
    schedule,
    loading,
    error,
    loadSchedule,
    addSchedule,
    updateSchedule,
    deleteSchedule
  }
} 