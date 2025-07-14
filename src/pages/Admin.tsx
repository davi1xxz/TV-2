import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNews } from '@/hooks/use-news'
import { NewsItem } from '@/lib/supabase'
import NewsForm from '@/components/NewsForm'
import NewsTable from '@/components/NewsTable'
import { 
  Settings, 
  Plus, 
  LogOut, 
  Home, 
  BarChart3, 
  Users,
  Newspaper
} from 'lucide-react'

const Admin = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [newsPerHome, setNewsPerHome] = useState(6)
  
  const { user, signOut, loading: authLoading } = useAuth()
  const { news, loading, loadNews } = useNews()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user) {
      loadNews()
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/admin/login')
    } catch (error) {
      // Silenciar erros
    }
  }

  const handleEdit = (news: NewsItem) => {
    setEditingNews(news)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingNews(null)
    loadNews()
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingNews(null)
  }

  const handleSaveConfig = () => {
    // Aqui você pode salvar as configurações no Supabase
    // Silenciar qualquer notificação
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Olá, {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Ver Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Total de Notícias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Em Destaque</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Usuários Ativos</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {showForm ? (
              <NewsForm
                editingNews={editingNews}
                onCancel={handleCancelForm}
                onSuccess={handleFormSuccess}
              />
            ) : (
              <>
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Gerenciar Notícias</h2>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Notícia
                  </Button>
                </div>

                {/* News Table */}
                <NewsTable news={news} loading={loading} onEdit={handleEdit} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin 