import { useState, useEffect, useRef } from 'react'
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
import SponsorsTable from '@/components/SponsorsTable'
import SponsorForm from '@/components/SponsorForm'
import { useSponsors } from '@/hooks/use-sponsors'
import TeamTable from '@/components/TeamTable'
import TeamForm from '@/components/TeamForm'
import { useTeam } from '@/hooks/use-team'
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

const Admin17342 = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null)
  const [newsPerHome, setNewsPerHome] = useState(6)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTable, setActiveTable] = useState<'news' | 'schedule' | 'sponsors' | 'team'>('news')
  const [editingSponsor, setEditingSponsor] = useState<any | null>(null)
  const [showSponsorForm, setShowSponsorForm] = useState(false)
  const [editingTeam, setEditingTeam] = useState<any | null>(null)
  const [showTeamForm, setShowTeamForm] = useState(false)
  
  const { user, signOut, loading: authLoading } = useAuth()
  const { news, loading, loadNews } = useNews()
  const { schedule, loading: scheduleLoading, error: scheduleError, loadSchedule } = useSchedule()
  const { sponsors, loading: sponsorsLoading, loadSponsors, createSponsor, updateSponsor, deleteSponsor } = useSponsors()
  const { team, loading: teamLoading, loadTeam, createMember, updateMember, deleteMember } = useTeam()
  const navigate = useNavigate()

  const menuRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop();

  // REMOVIDO: Não fecha mais ao clicar fora, só pelo botão (toggle)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin17342/login')
    }
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (user) {
      loadNews()
      loadSchedule()
      loadSponsors()
      loadTeam()
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/admin17342/login')
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
            {isDesktop && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
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
            )}
            {/* Mobile: menu 3 pontinhos */}
            {!isDesktop && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center z-50">
                <Button
                  id="menu-hamburguer-btn"
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
            )}
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
                  <button
                    onClick={() => setActiveTable('sponsors')}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
                      activeTable === 'sponsors' 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {/* Ícone de patrocinador: BarChart3 */}
                    <BarChart3 className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold">Tabela de Patrocinadores</span>
                  </button>
                  <button
                    onClick={() => setActiveTable('team')}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded transition-colors ${
                      activeTable === 'team' 
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold">Tabela de Equipes</span>
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
                      <h2 className="text-2xl font-bold">Gerenciar de Notícias ({news.length}/30)</h2>
                      <div className="flex flex-col items-end">
                      <Button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2"
                          disabled={news.length >= 30}
                      >
                        <Plus className="w-4 h-4" />
                        Nova Notícia
                      </Button>
                        {news.length >= 30 && (
                          <span className="text-xs text-gray-500 mt-1">Limite de 30 notícias atingido.</span>
                        )}
                      </div>
                    </div>

                    {/* News Table */}
                    <NewsTable
                      news={news.slice(0, 30)}
                      loading={loading}
                      onEdit={handleEdit}
                      hideTitle
                    />
                  </>
                )}
              </>
            ) : activeTable === 'schedule' ? (
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
                      <h2 className="text-2xl font-bold">Gerenciar Programação ({schedule.length}/20)</h2>
                      <div className="flex flex-col items-end gap-0">
                        <Button
                          onClick={() => setShowForm(true)}
                          className="flex items-center gap-2"
                          disabled={schedule.length >= 20}
                        >
                          <Plus className="w-4 h-4" />
                          Nova Programação
                        </Button>
                        {schedule.length >= 20 && (
                          <span className="text-xs text-gray-500 mt-1">Limite de 20 programações atingido.</span>
                        )}
                      </div>
                    </div>

                    {/* Schedule Table ordenada por horário */}
                    <ScheduleTable schedule={schedule.slice(0, 20).sort((a, b) => {
                      // Ordena pelo horário inicial (ex: 06:00 - 09:00)
                      const getMinutes = (h: string) => {
                        const [start] = h.split(' - ')
                        const [hh, mm] = start.split(':').map(Number)
                        return hh * 60 + mm
                      }
                      return getMinutes(a.horario) - getMinutes(b.horario)
                    })} loading={scheduleLoading} onEdit={handleEditSchedule} />
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
            ) : activeTable === 'sponsors' ? (
              <>
                {showSponsorForm ? (
                  <SponsorForm
                    editingSponsor={editingSponsor}
                    onCancel={() => { setShowSponsorForm(false); setEditingSponsor(null) }}
                    onSuccess={() => { setShowSponsorForm(false); setEditingSponsor(null); loadSponsors() }}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Gerenciar Patrocinadores ({sponsors.length}/3)</h2>
                      <div className="flex flex-col items-end gap-0">
                      <Button
                        onClick={() => { setShowSponsorForm(true); setEditingSponsor(null) }}
                        className="flex items-center gap-2"
                          disabled={sponsors.length >= 3}
                      >
                        <Plus className="w-4 h-4" />
                        Novo Patrocinador
                      </Button>
                        {sponsors.length >= 3 && (
                          <span className="text-xs text-gray-500 mt-1">Limite de 3 patrocinadores atingido.</span>
                        )}
                      </div>
                    </div>
                    <SponsorsTable
                      sponsors={sponsors.slice(0, 3)}
                      loading={sponsorsLoading}
                      onEdit={(sponsor) => { setEditingSponsor(sponsor); setShowSponsorForm(true) }}
                      onDelete={async (id) => { await deleteSponsor(id); loadSponsors() }}
                      hideTitle
                    />
                  </>
                )}
              </>
            ) : activeTable === 'team' ? (
              <>
                {showTeamForm ? (
                  <TeamForm
                    initialData={editingTeam}
                    onCancel={() => { setShowTeamForm(false); setEditingTeam(null) }}
                    onSave={async (data) => {
                      if (editingTeam) {
                        await updateMember(editingTeam.id, data)
                      } else {
                        await createMember(data)
                      }
                      setShowTeamForm(false)
                      setEditingTeam(null)
                      loadTeam()
                    }}
                    loading={teamLoading}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Gerenciar Equipe ({team.length}/8)</h2>
                      <div className="flex flex-col items-end gap-0">
                        <Button
                          onClick={() => { setShowTeamForm(true); setEditingTeam(null) }}
                          className="flex items-center gap-2"
                          disabled={team.length >= 8}
                        >
                          <Plus className="w-4 h-4" />
                          Novo Membro
                        </Button>
                        {team.length >= 8 && (
                          <span className="text-xs text-gray-500 mt-1">Limite de 8 membros atingido.</span>
                        )}
                      </div>
                    </div>
                    <TeamTable
                      team={team}
                      loading={teamLoading}
                      onEdit={(member) => { setEditingTeam(member); setShowTeamForm(true) }}
                      onDelete={async (id) => { await deleteMember(id); loadTeam() }}
                      hideTitle
                    />
              </>
            )}
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin17342 