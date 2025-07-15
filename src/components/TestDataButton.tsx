import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSchedule } from '@/hooks/use-schedule'
import { scheduleExample } from '@/data/schedule-example'
import { Database } from 'lucide-react'

const TestDataButton = () => {
  const [loading, setLoading] = useState(false)
  const { addSchedule } = useSchedule()

  const handleAddTestData = async () => {
    if (!confirm('Deseja adicionar dados de exemplo de programação?')) {
      return
    }

    setLoading(true)
    try {
      for (const item of scheduleExample) {
        await addSchedule(item)
      }
      alert('Dados de exemplo adicionados com sucesso!')
    } catch (error) {
      console.error('Erro ao adicionar dados de exemplo:', error)
      alert('Erro ao adicionar dados de exemplo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleAddTestData}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Database className="w-4 h-4" />
      {loading ? 'Adicionando...' : 'Adicionar Dados de Exemplo'}
    </Button>
  )
}

export default TestDataButton 