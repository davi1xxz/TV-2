import { ScheduleItem } from '@/lib/supabase'

export const scheduleExample: Omit<ScheduleItem, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    horario: '06:00 - 09:00',
    titulo: 'Bom Dia TV OK',
    subtitulo: 'Comece o dia com as melhores músicas e informações',
    autor: 'Marcos Lopes'
  },
  {
    horario: '09:00 - 12:00',
    titulo: 'Sucessos da Manhã',
    subtitulo: 'Os maiores hits nacionais e internacionais',
    autor: 'Ana Silva'
  },
  {
    horario: '12:00 - 15:00',
    titulo: 'Almoço Musical',
    subtitulo: 'Música para acompanhar seu almoço',
    autor: 'Carlos Mendes'
  },
  {
    horario: '15:00 - 18:00',
    titulo: 'Tarde de Sucessos',
    subtitulo: 'As melhores músicas para sua tarde',
    autor: 'Maria Santos'
  },
  {
    horario: '18:00 - 21:00',
    titulo: 'Jornal da TV OK',
    subtitulo: 'As principais notícias do dia',
    autor: 'Roberto Costa'
  },
  {
    horario: '21:00 - 00:00',
    titulo: 'Noite de Estrelas',
    subtitulo: 'Música romântica para sua noite',
    autor: 'Fernanda Lima'
  },
  {
    horario: '00:00 - 03:00',
    titulo: 'Madrugada Suave',
    subtitulo: 'Música relaxante para a madrugada',
    autor: 'João Paulo'
  },
  {
    horario: '03:00 - 06:00',
    titulo: 'Amanhecer Musical',
    subtitulo: 'Música para quem trabalha de madrugada',
    autor: 'Pedro Alves'
  }
] 