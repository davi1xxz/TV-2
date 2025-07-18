import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Users } from 'lucide-react'
import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface TeamMember {
  id: string
  nome: string
  funcao: string // nova propriedade
  url_foto: string
}

export interface TeamTableProps {
  team: TeamMember[]
  loading: boolean
  onEdit: (member: TeamMember) => void
  onDelete: (id: string) => void
  hideTitle?: boolean
}

const TeamTable = ({ team, loading, onEdit, onDelete, hideTitle }: TeamTableProps) => {
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando equipe...</div>
        </CardContent>
      </Card>
    )
  }

  if (team.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 py-16">
          <div className="text-center text-muted-foreground">
            Nenhum membro cadastrado
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {!hideTitle && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Gerenciar Equipe ({team.length})
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Nome</th>
                <th className="text-left p-2 font-medium">Função</th>
                <th className="text-left p-2 font-medium">Foto</th>
                <th className="text-left p-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {team.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 max-w-xs truncate" title={item.nome}>{item.nome}</td>
                  <td className="p-2 max-w-xs truncate" title={item.funcao}>{item.funcao}</td>
                  <td className="p-2">
                    {item.url_foto ? (
                      <img src={supabase.storage.from('equipe').getPublicUrl(item.url_foto).data.publicUrl} alt={item.nome} className="w-20 h-20 object-cover rounded-full border" />
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfirmId(item.id)}
                        disabled={deletingId === item.id}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
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
        {/* Modal de confirmação de exclusão */}
        {confirmId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-sm mx-4 relative animate-fade-in">
              <h2 className="text-lg font-bold mb-4 text-center">Confirmar exclusão</h2>
              <p className="mb-6 text-center">Tem certeza que deseja excluir este membro da equipe?</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setConfirmId(null)}
                  className="min-w-[100px]"
                  disabled={deletingId === confirmId}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  ref={confirmButtonRef}
                  onClick={() => { setDeletingId(confirmId); onDelete(confirmId!); setConfirmId(null); setDeletingId(null); }}
                  disabled={deletingId === confirmId}
                  className="min-w-[100px]"
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TeamTable 