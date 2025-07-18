import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamMember } from './TeamTable'
import { supabase } from '@/lib/supabase'

export interface TeamFormProps {
  initialData?: TeamMember | null
  onSave: (data: Omit<TeamMember, 'id'>) => void
  onCancel: () => void
  loading?: boolean
}

const TeamForm = ({ initialData, onSave, onCancel, loading }: TeamFormProps) => {
  const [nome, setNome] = useState(initialData?.nome || '')
  const [funcao, setFuncao] = useState(initialData?.funcao || '')
  const [fotoPath, setFotoPath] = useState(initialData?.url_foto || '')
  const [preview, setPreview] = useState(initialData?.url_foto ? getPublicUrl(initialData.url_foto) : '')
  const [uploading, setUploading] = useState(false)

  function getPublicUrl(path: string) {
    return path ? `${supabase.storage.from('equipe').getPublicUrl(path).data.publicUrl}` : ''
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
    const { error } = await supabase.storage.from('equipe').upload(fileName, file)
    if (!error) {
      setFotoPath(fileName)
      setPreview(getPublicUrl(fileName))
    }
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !funcao.trim() || !fotoPath.trim()) return
    onSave({ nome: nome.trim(), funcao: funcao.trim(), url_foto: fotoPath.trim() })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{initialData ? 'Editar Membro' : 'Adicionar Membro'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              maxLength={60}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Função</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={funcao}
              onChange={e => setFuncao(e.target.value)}
              required
              maxLength={60}
              placeholder="Ex: Presidente, Apresentador, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded px-3 py-2"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="Pré-visualização" className="w-24 h-24 object-cover rounded-full border" />
              </div>
            )}
            {uploading && <div className="text-xs text-gray-500 mt-1">Enviando imagem...</div>}
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="submit" disabled={loading || uploading}>
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading || uploading}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default TeamForm 