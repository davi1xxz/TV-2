import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScheduleItem } from '@/lib/supabase'
import { useSchedule } from '@/hooks/use-schedule'
import { X, Save } from 'lucide-react'
import { TimePicker } from '@/components/ui/time-picker'

interface ScheduleFormProps {
  editingSchedule?: ScheduleItem | null
  onCancel: () => void
  onSuccess: () => void
}

const ScheduleForm = ({ editingSchedule, onCancel, onSuccess }: ScheduleFormProps) => {
  const [formData, setFormData] = useState({
    horario: '',
    titulo: '',
    subtitulo: '',
    autor: ''
  })
  const [loading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState('06:00')
  const [endTime, setEndTime] = useState('09:00')
  const { addSchedule, updateSchedule } = useSchedule()

  useEffect(() => {
    if (editingSchedule) {
      setFormData({
        horario: editingSchedule.horario,
        titulo: editingSchedule.titulo,
        subtitulo: editingSchedule.subtitulo,
        autor: editingSchedule.autor
      })
      
      // Extrair horários do formato "06:00 - 09:00"
      const timeMatch = editingSchedule.horario.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/)
      if (timeMatch) {
        setStartTime(timeMatch[1])
        setEndTime(timeMatch[2])
      }
    }
  }, [editingSchedule])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const scheduleData = {
        ...formData,
        horario: `${startTime} - ${endTime}`
      }

      if (editingSchedule) {
        await updateSchedule(editingSchedule.id, scheduleData)
      } else {
        await addSchedule(scheduleData)
      }
      onSuccess()
    } catch (error) {
      console.error('Erro ao salvar programação:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTimeChange = (start: string, end: string) => {
    setStartTime(start)
    setEndTime(end)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">
          {editingSchedule ? 'Editar Programação' : 'Nova Programação'}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="horario">Horário *</Label>
              <TimePicker
                startTime={startTime}
                endTime={endTime}
                onTimeChange={handleTimeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="autor">Apresentador/Autor *</Label>
              <Input
                id="autor"
                type="text"
                placeholder="Ex: Marcos Lopes"
                value={formData.autor}
                onChange={(e) => handleChange('autor', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo">Título do Programa *</Label>
            <Input
              id="titulo"
              type="text"
              placeholder="Ex: Bom Dia TV OK"
              value={formData.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitulo">Descrição/Subtítulo *</Label>
            <Textarea
              id="subtitulo"
              placeholder="Ex: Comece o dia com as melhores músicas e informações"
              value={formData.subtitulo}
              onChange={(e) => handleChange('subtitulo', e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ScheduleForm 