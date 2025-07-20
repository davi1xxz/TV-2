import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScheduleItem } from '@/lib/supabase'
import { Edit, Trash2, Clock, User, FileText, AlertCircle } from 'lucide-react'

interface ScheduleTableProps {
  schedule: ScheduleItem[]
  loading: boolean
  onEdit: (schedule: ScheduleItem) => void
  onDelete: (id: string) => Promise<boolean>
}

// Hook para detectar se está em tela md+ (desktop)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true)
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isDesktop
}

const ScheduleTable = ({ schedule, loading, onEdit, onDelete }: ScheduleTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta programação?')) {
      setDeletingId(id)
      try {
        const success = await onDelete(id)
        if (!success) {
          setError('Erro ao excluir programação')
        }
      } finally {
        setDeletingId(null)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Carregando programação...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Erro: {error}</p>
            <p className="text-sm text-gray-600 mt-2">
              Verifique se a tabela 'programacao' foi criada no Supabase
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (schedule.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 py-16">
          <div className="text-center text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">Nenhuma programação encontrada</p>
            <p className="text-sm">Adicione a primeira programação para começar</p>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Dica:</strong> Se você acabou de criar a tabela no Supabase, 
                aguarde alguns segundos e tente novamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderização explícita baseada no tamanho da tela
  if (isDesktop) {
    return (
      <div className="space-y-4">
        {/* Desktop Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-4 font-medium text-sm">Horário</th>
                    <th className="text-left p-4 font-medium text-sm">Título</th>
                    <th className="text-left p-4 font-medium text-sm">Descrição</th>
                    <th className="text-left p-4 font-medium text-sm">Apresentador</th>
                    <th className="text-right p-4 font-medium text-sm">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {item.horario}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {item.titulo}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-600 dark:text-gray-400 max-w-xs truncate">
                          {item.subtitulo}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.autor}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(item)}
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="space-y-4 px-0 w-full max-w-full">
        {/* Mobile Cards */}
        {schedule.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow w-full max-w-full">
            <CardContent className="p-4 w-full max-w-full">
              <div className="space-y-3 w-full max-w-full">
                {/* Header with time and actions */}
                <div className="flex items-center justify-between w-full max-w-full">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-600 dark:text-red-400 text-sm">
                      {item.horario}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item)}
                      className="h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <div className="w-full max-w-full">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base break-words">
                    {item.titulo}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2 w-full max-w-full">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed break-words w-full max-w-full">
                    {item.subtitulo}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 pt-1 w-full max-w-full">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.autor}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}

export default ScheduleTable 