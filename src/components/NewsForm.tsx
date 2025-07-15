import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useNews } from '@/hooks/use-news'
import { NewsItem } from '@/lib/supabase'
import { Image, Video, X, Upload } from 'lucide-react'

interface NewsFormProps {
  editingNews?: NewsItem | null
  onCancel: () => void
  onSuccess: () => void
}

const NewsForm = ({ editingNews, onCancel, onSuccess }: NewsFormProps) => {
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '', // Novo campo
    descricao: '',
    tipo_midia: 'imagem' as 'imagem' | 'youtube',
    url_midia: '',
    destaque_home: false,
    autor: '' // Novo campo
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')

  const { createNews, updateNews, uploadImage } = useNews()

  useEffect(() => {
    if (editingNews) {
      setFormData({
        titulo: editingNews.titulo,
        subtitulo: editingNews.subtitulo || '',
        descricao: editingNews.descricao,
        tipo_midia: editingNews.tipo_midia,
        url_midia: editingNews.url_midia,
        destaque_home: editingNews.destaque_home,
        destaque_ordem: editingNews.destaque_ordem ?? null,
        autor: editingNews.autor || ''
      })
      if (editingNews.tipo_midia === 'imagem') {
        setImagePreview(editingNews.url_midia)
      }
    }
  }, [editingNews])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.titulo || !formData.descricao || !formData.autor) {
      return
    }

    if (formData.tipo_midia === 'youtube' && !formData.url_midia) {
      return
    }

    setLoading(true)

    try {
      let finalUrlMidia = formData.url_midia

      // Upload de imagem se necessário
      if (formData.tipo_midia === 'imagem' && imageFile) {
        finalUrlMidia = await uploadImage(imageFile)
      }

      const newsData = {
        titulo: formData.titulo,
        subtitulo: formData.subtitulo,
        descricao: formData.descricao,
        tipo_midia: formData.tipo_midia,
        url_midia: finalUrlMidia,
        destaque_home: formData.destaque_home,
        autor: formData.autor
      }

      let result
      if (editingNews) {
        result = await updateNews(editingNews.id, newsData)
      } else {
        result = await createNews(newsData)
      }

      if (result.success) {
        onSuccess()
      }
    } catch (error) {
      // Silenciar erros
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      subtitulo: '',
      descricao: '',
      tipo_midia: 'imagem',
      url_midia: '',
      destaque_home: false,
      autor: ''
    })
    setImageFile(null)
    setImagePreview('')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {editingNews ? (
            <>
              <Image className="w-5 h-5" />
              Editar Notícia
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Adicionar Nova Notícia
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Digite o título da notícia"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitulo">Subtítulo *</Label>
            <Input
              id="subtitulo"
              name="subtitulo"
              value={formData.subtitulo}
              onChange={handleInputChange}
              placeholder="Digite o subtítulo da notícia"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Digite a descrição da notícia"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="autor">Autor *</Label>
            <Input
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleInputChange}
              placeholder="Nome do autor da matéria"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Mídia *</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tipo_midia"
                  value="imagem"
                  checked={formData.tipo_midia === 'imagem'}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span>Imagem</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tipo_midia"
                  value="youtube"
                  checked={formData.tipo_midia === 'youtube'}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span>Vídeo do YouTube</span>
              </label>
            </div>
          </div>

          {formData.tipo_midia === 'imagem' && (
            <div className="space-y-2">
              <Label htmlFor="imageFile">Upload de Imagem</Label>
              <div className="flex items-center gap-4">
                <label htmlFor="imageFile" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-black font-semibold rounded-lg cursor-pointer shadow-sm hover:bg-gray-50 transition-all">
                  <Upload className="w-5 h-5 mr-2 text-black" />
                  {imageFile ? 'Trocar Imagem' : 'Escolher Imagem'}
                  <input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <span className="text-sm text-gray-700 dark:text-gray-200 max-w-[180px] truncate">{imageFile.name}</span>
                )}
              </div>
              {imagePreview && (
                <div className="relative inline-block mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('')
                      setImageFile(null)
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {formData.tipo_midia === 'youtube' && (
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">URL do Vídeo do YouTube</Label>
              <Input
                id="youtubeUrl"
                name="url_midia"
                type="url"
                value={formData.url_midia}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <Label className="mr-2">Destaque na Página Inicial:</Label>
            {[1, 2, 3].map((ordem) => (
              <Button
                key={ordem}
                type="button"
                size="sm"
                variant={formData.destaque_ordem === ordem ? 'default' : 'outline'}
                className={formData.destaque_ordem === ordem ? 'bg-[#ad1917] text-white' : 'text-[#ad1917]'}
                onClick={() => setFormData((prev) => ({
                  ...prev,
                  destaque_ordem: prev.destaque_ordem === ordem ? null : ordem,
                  destaque_home: prev.destaque_ordem === ordem ? false : true
                }))}
              >
                {ordem}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Salvando..." : (editingNews ? "Atualizar" : "Criar")}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            {!editingNews && (
              <Button type="button" variant="ghost" onClick={resetForm}>
                Limpar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewsForm 