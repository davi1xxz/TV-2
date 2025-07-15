import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNews } from '@/hooks/use-news'
import { NewsItem } from '@/lib/supabase'
import { Edit, Trash2, Eye, Image, Video, Star } from 'lucide-react'
import { useRef } from 'react'

// Hook para detectar se está em tela md+ (desktop)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768)
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isDesktop
}

export interface NewsTableProps {
  news: NewsItem[]
  loading: boolean
  onEdit: (news: NewsItem) => void
}

const NewsTable = ({ news, loading, onEdit }: NewsTableProps) => {
  const { deleteNews, loadNews, setDestaqueOrdem } = useNews()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [localDestaques, setLocalDestaques] = useState<{[id: string]: number | null}>({})
  const confirmButtonRef = useRef<HTMLButtonElement>(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    // Sincroniza localDestaques com o backend
    const map: {[id: string]: number | null} = {}
    news.forEach(n => { map[n.id] = n.destaque_ordem ?? null })
    setLocalDestaques(map)
  }, [news])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    setIsLoading(true)
    try {
      await deleteNews(id)
      window.location.reload()
    } catch (error) {
      // Silenciar erros
    } finally {
      setDeletingId(null)
      setIsLoading(false)
      setConfirmId(null)
    }
  }

  const handleDestaqueClick = async (id: string, ordem: number) => {
    setLocalDestaques(prev => {
      // Remove ordem de outros
      const novo = { ...prev }
      Object.keys(novo).forEach(k => {
        if (novo[k] === ordem) novo[k] = null
      })
      novo[id] = prev[id] === ordem ? null : ordem
      return novo
    })
    await setDestaqueOrdem(id, localDestaques[id] === ordem ? null : ordem)
    // Depois do backend, loadNews já sincroniza
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando notícias...</div>
        </CardContent>
      </Card>
    )
  }

  if (news.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 py-16">
          <div className="text-center text-muted-foreground">
            Nenhuma notícia encontrada
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Gerenciar Notícias ({news.length}/30)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Título</th>
                  <th className="text-left p-2 font-medium">Preview</th>
                  <th className="text-left p-2 font-medium">Tipo</th>
                  <th className="text-left p-2 font-medium">Destaque</th>
                  <th className="text-left p-2 font-medium">Data</th>
                  <th className="text-left p-2 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div className="max-w-xs truncate" title={item.titulo}>
                        {item.titulo}
                      </div>
                    </td>
                    <td className="p-2">
                      {item.tipo_midia === 'imagem' && item.url_midia ? (
                        <img
                          src={item.url_midia}
                          alt={item.titulo}
                          className="w-16 h-12 object-cover rounded border"
                        />
                      ) : item.tipo_midia === 'youtube' && item.url_midia ? (
                        <img
                          src={`https://img.youtube.com/vi/${(item.url_midia.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1] || ''}/default.jpg`}
                          alt={item.titulo}
                          className="w-16 h-12 object-cover rounded border"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-1">
                        {item.tipo_midia === 'imagem' ? (
                          <Image className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Video className="w-4 h-4 text-red-500" />
                        )}
                        <span className="capitalize">{item.tipo_midia}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((ordem) => (
                          <Button
                            key={ordem}
                            size="sm"
                            variant={localDestaques[item.id] === ordem ? 'default' : 'outline'}
                            className={localDestaques[item.id] === ordem ? 'bg-[#ad1917] text-white' : 'text-[#ad1917]'}
                            onClick={() => handleDestaqueClick(item.id, ordem)}
                          >
                            {ordem}
                          </Button>
                        ))}
                      </div>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(item)}
                          disabled={isLoading}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmId(item.id)}
                          disabled={deletingId === item.id || isLoading}
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
                <p className="mb-6 text-center">Tem certeza que deseja excluir esta notícia?</p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => isLoading ? null : setConfirmId(null)}
                    className="min-w-[100px]"
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    ref={confirmButtonRef}
                    onClick={() => handleDelete(confirmId)}
                    disabled={deletingId === confirmId || isLoading}
                    className="min-w-[100px]"
                  >
                    {isLoading ? 'Excluindo...' : 'Excluir'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Mobile: cards
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Gerenciar Notícias ({news.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {news.map((item) => (
            <div key={item.id} className="border rounded-lg bg-white dark:bg-gray-800 shadow p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">{item.titulo}</span>
                {item.destaque_home && <span className="text-yellow-600 flex items-center gap-1"><Star className="w-4 h-4" />Destaque</span>}
              </div>
              <div className="flex gap-2 items-center">
                {item.tipo_midia === 'imagem' && item.url_midia ? (
                  <img src={item.url_midia} alt={item.titulo} className="w-16 h-12 object-cover rounded border" />
                ) : item.tipo_midia === 'youtube' && item.url_midia ? (
                  <img src={`https://img.youtube.com/vi/${(item.url_midia.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) || [])[1] || ''}/default.jpg`} alt={item.titulo} className="w-16 h-12 object-cover rounded border" />
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
                <span className="capitalize text-xs text-gray-500">{item.tipo_midia}</span>
                <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(item)} disabled={isLoading} className="flex-1"><Edit className="w-4 h-4" />Editar</Button>
                <Button size="sm" variant="outline" onClick={() => setConfirmId(item.id)} disabled={deletingId === item.id || isLoading} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" />Excluir</Button>
              </div>
              {/** Destaque ordem mobile */}
              <div className="flex gap-2 mt-2">
                {[1, 2, 3].map((ordem) => (
                  <Button
                    key={ordem}
                    size="sm"
                    variant={localDestaques[item.id] === ordem ? 'default' : 'outline'}
                    className={localDestaques[item.id] === ordem ? 'bg-[#ad1917] text-white' : 'text-[#ad1917]'}
                    onClick={() => handleDestaqueClick(item.id, ordem)}
                  >
                    {ordem}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Modal de confirmação de exclusão */}
        {confirmId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-sm mx-4 relative animate-fade-in">
              <h2 className="text-lg font-bold mb-4 text-center">Confirmar exclusão</h2>
              <p className="mb-6 text-center">Tem certeza que deseja excluir esta notícia?</p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => isLoading ? null : setConfirmId(null)}
                  className="min-w-[100px]"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  ref={confirmButtonRef}
                  onClick={() => handleDelete(confirmId)}
                  disabled={deletingId === confirmId || isLoading}
                  className="min-w-[100px]"
                >
                  {isLoading ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NewsTable 