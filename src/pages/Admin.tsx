import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNews } from '@/hooks/use-news'
import { useSchedule } from '@/hooks/use-schedule'
import { NewsItem, ScheduleItem } from '@/lib/supabase'
import NewsForm from '@/components/NewsForm'
import NewsTable from '@/components/NewsTable'
import ScheduleForm from '@/components/ScheduleForm'
import ScheduleTable from '@/components/ScheduleTable'
import TestDataButton from '@/components/TestDataButton'
import { 
  Settings, 
  Plus, 
  LogOut, 
  Home, 
  BarChart3, 
  Users,
  Newspaper,
  Clock,
  Menu
} from 'lucide-react'
import { useRef } from 'react'

const Admin = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null)
  const [newsPerHome, setNewsPerHome] = useState(6)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTable, setActiveTable] = useState<'news' | 'schedule'>('news')
  
  const { user, signOut, loading: authLoading } = useAuth()
  const { news, loading, loadNews } = useNews()
  const { schedule, loading: scheduleLoading, error: scheduleError, loadSchedule } = useSchedule()
  const navigate = useNavigate()

  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user) {
      loadNews()
      loadSchedule()
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

  const handleEditSchedule = (schedule: ScheduleItem) => {
    setEditingSchedule(schedule)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingNews(null)
    setEditingSchedule(null)
    loadNews()
    loadSchedule()
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingNews(null)
    setEditingSchedule(null)
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-16 relative">
            <div className="flex items-center gap-3 justify-center w-full">
              <Settings className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-center">Painel Administrativo</h1>
            </div>
            {/* Desktop: botões visíveis */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex md:flex items-center gap-2">
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
            {/* Mobile: menu 3 pontinhos */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex md:hidden items-center z-50">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center justify-center w-10 h-10"
                aria-label="Abrir menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
              {menuOpen && (
                <div ref={menuRef} className="absolute right-0 top-14 w-44 bg-white dark:bg-gray-900 rounded-lg shadow-lg border z-50 flex flex-col animate-fade-in">
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                    onClick={() => { setMenuOpen(false); navigate('/') }}
                  >
                    <Home className="w-4 h-4" /> Ver Site
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-left border-t"
                    onClick={() => { setMenuOpen(false); handleLogout() }}
                  >
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-2 pt-4 pb-8 sm:px-4 sm:pt-8 sm:pb-8 lg:px-8 transition-all duration-200 ${menuOpen ? 'filter blur-sm brightness-90 pointer-events-none select-none' : ''}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Tabelas Sidebar */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Tabelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button
                    onClick={() => setActiveTable('news')}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
                      activeTable === 'news' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Newspaper className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold">Tabela de Notícias</span>
                  </button>
                  <button
                    onClick={() => setActiveTable('schedule')}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
                      activeTable === 'schedule' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold">Tabela de Programação</span>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {activeTable === 'news' ? (
              <>
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
              </>
            ) : (
              <>
                {showForm ? (
                  <ScheduleForm
                    editingSchedule={editingSchedule}
                    onCancel={handleCancelForm}
                    onSuccess={handleFormSuccess}
                  />
                ) : (
                  <>
                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Gerenciar Programação</h2>
                      <div className="flex gap-2">
                        <TestDataButton />
                        <Button
                          onClick={() => setShowForm(true)}
                          className="flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Nova Programação
                        </Button>
                      </div>
                    </div>

                    {/* Schedule Table */}
                    <ScheduleTable schedule={schedule} loading={scheduleLoading} onEdit={handleEditSchedule} />
                    
                    {/* Debug Info */}
                    {scheduleError && (
                      <Card className="mt-4 border-red-200 bg-red-50 dark:bg-red-900/20">
                        <CardContent className="p-4">
                          <div className="text-red-800 dark:text-red-200">
                            <p className="font-medium">Erro na Programação:</p>
                            <p className="text-sm">{scheduleError}</p>
                            <p className="text-xs mt-2">
                              <strong>Solução:</strong> Crie a tabela 'programacao' no Supabase com as colunas: 
                              id, horario, titulo, subtitulo, autor, created_at, updated_at
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin 