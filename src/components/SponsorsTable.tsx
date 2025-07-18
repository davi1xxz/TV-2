import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Link2 } from 'lucide-react'
import { SponsorItem } from '@/lib/supabase'
import { useRef, useState } from 'react'
import { useSponsors } from '@/hooks/use-sponsors'

export interface SponsorsTableProps {
  sponsors: SponsorItem[]
  loading: boolean
  onEdit: (sponsor: SponsorItem) => void
  onDelete: (id: string) => void
  hideTitle?: boolean
}

const SponsorsTable = ({ sponsors, loading, onEdit, onDelete, hideTitle }: SponsorsTableProps) => {
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const { setOrdemExclusiva, loadSponsors } = useSponsors()

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando patrocinadores...</div>
        </CardContent>
      </Card>
    )
  }

  if (sponsors.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 py-16">
          <div className="text-center text-muted-foreground">
            Nenhum patrocinador cadastrado
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
            <Link2 className="w-5 h-5 text-yellow-500" />
            Gerenciar Patrocinadores ({sponsors.length})
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Nome</th>
                <th className="text-left p-2 font-medium">Imagem</th>
                <th className="text-left p-2 font-medium">Link</th>
                <th className="text-left p-2 font-medium">Ordem</th>
                <th className="text-left p-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="p-2 max-w-xs truncate" title={item.nome}>{item.nome}</td>
                  <td className="p-2">
                    {item.url_imagem ? (
                      <img src={item.url_imagem} alt={item.nome} className="w-20 h-10 object-contain rounded border" />
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-2">
                    {item.url_link ? (
                      <a href={item.url_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs break-all">{item.url_link}</a>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3].map((ordem) => (
                        <Button
                          key={ordem}
                          size="sm"
                          variant={item.ordem === ordem ? 'default' : 'outline'}
                          className={item.ordem === ordem ? 'bg-[#ad1917] text-white' : 'text-[#ad1917]'}
                          onClick={async () => {
                            await setOrdemExclusiva(item.id, item.ordem === ordem ? null : ordem)
                            await loadSponsors()
                          }}
                        >
                          {ordem}
                        </Button>
                      ))}
                    </div>
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
              <p className="mb-6 text-center">Tem certeza que deseja excluir este patrocinador?</p>
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

export default SponsorsTable 