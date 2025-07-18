import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SponsorItem } from '@/lib/supabase'
import { useSponsors } from '@/hooks/use-sponsors'
import { Upload, Link2, Edit } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface SponsorFormProps {
  editingSponsor?: SponsorItem | null
  onCancel: () => void
  onSuccess: () => void
}

const SponsorForm = ({ editingSponsor, onCancel, onSuccess }: SponsorFormProps) => {
  const { createSponsor, updateSponsor, uploadImage, sponsors, loadSponsors } = useSponsors()
  const [formData, setFormData] = useState({
    nome: editingSponsor?.nome || '',
    url_link: editingSponsor?.url_link || '',
    ordem: editingSponsor?.ordem || 1,
    url_imagem: editingSponsor?.url_imagem || ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === 'ordem' ? Number(value) : value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      let url_imagem = formData.url_imagem
      // Se for edição e o usuário selecionou uma nova imagem
      if (editingSponsor && imageFile) {
        // Deleta a imagem antiga
        if (editingSponsor.url_imagem) {
          try {
            const url = editingSponsor.url_imagem
            const pathMatch = url.match(/imagenspatrocinadores\/(.+)$/)
            if (pathMatch && pathMatch[1]) {
              const filePath = pathMatch[1]
              await supabase.storage.from('imagenspatrocinadores').remove([filePath])
            }
          } catch (err) {
            // Silenciar erro de deleção
          }
        }
      }
      if (imageFile) {
        url_imagem = await uploadImage(imageFile)
      }
      // Garante exclusividade da ordem
      const ordemEscolhida = formData.ordem
      if ([1, 2, 3].includes(ordemEscolhida)) {
        const outro = sponsors.find(s => s.ordem === ordemEscolhida && (!editingSponsor || s.id !== editingSponsor.id))
        if (outro) {
          await updateSponsor(outro.id, { ordem: null })
        }
      }
      if (editingSponsor) {
        const result = await updateSponsor(editingSponsor.id, {
          ...formData,
          url_imagem
        })
        if (!result.success) throw new Error(result.error)
      } else {
        const result = await createSponsor({
          ...formData,
          url_imagem
        })
        if (!result.success) throw new Error(result.error)
      }
      await loadSponsors()
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar patrocinador')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {editingSponsor ? (
            <><Edit className="w-5 h-5" />Editar Patrocinador</>
          ) : (
            <><Upload className="w-5 h-5" />Adicionar Patrocinador</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome do patrocinador"
              required
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url_link">Link *</Label>
            <Input
              id="url_link"
              name="url_link"
              value={formData.url_link}
              onChange={handleInputChange}
              placeholder="https://site-do-patrocinador.com"
              required
              maxLength={200}
              type="url"
            />
          </div>
          <div className="space-y-2">
            <Label>Ordem *</Label>
            <div className="flex gap-2">
              {[1, 2, 3].map((ordem) => (
                <Button
                  key={ordem}
                  type="button"
                  variant={formData.ordem === ordem ? 'default' : 'outline'}
                  className={formData.ordem === ordem ? 'bg-[#ad1917] text-white' : 'text-[#ad1917]'}
                  onClick={() => setFormData((prev) => ({ ...prev, ordem }))}
                >
                  {ordem}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Imagem *</Label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Selecionar Imagem
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imageFile ? (
                <span className="text-xs text-green-600">{imageFile.name}</span>
              ) : formData.url_imagem ? (
                <img src={formData.url_imagem} alt="Preview" className="w-20 h-10 object-contain rounded border" />
              ) : null}
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : editingSponsor ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SponsorForm 