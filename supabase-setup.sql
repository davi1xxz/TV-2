-- =====================================================
-- CONFIGURAÇÃO DA TABELA DE PROGRAMAÇÃO - TV OK
-- =====================================================

-- 1. Criar a tabela programacao
CREATE TABLE IF NOT EXISTS programacao (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horario TEXT NOT NULL,
  titulo TEXT NOT NULL,
  subtitulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_programacao_updated_at ON programacao;
CREATE TRIGGER update_programacao_updated_at 
    BEFORE UPDATE ON programacao 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Configurar RLS (Row Level Security)
ALTER TABLE programacao ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas de segurança
-- Política para permitir leitura pública
DROP POLICY IF EXISTS "Permitir leitura pública" ON programacao;
CREATE POLICY "Permitir leitura pública" ON programacao
FOR SELECT USING (true);

-- Política para permitir CRUD para usuários autenticados
DROP POLICY IF EXISTS "Permitir CRUD para usuários autenticados" ON programacao;
CREATE POLICY "Permitir CRUD para usuários autenticados" ON programacao
FOR ALL USING (auth.role() = 'authenticated');

-- 6. Inserir dados de exemplo (opcional)
INSERT INTO programacao (horario, titulo, subtitulo, autor) VALUES
('06:00 - 09:00', 'Bom Dia TV OK', 'Comece o dia com as melhores músicas e informações', 'Marcos Lopes'),
('09:00 - 12:00', 'Sucessos da Manhã', 'Os maiores hits nacionais e internacionais', 'Ana Silva'),
('12:00 - 15:00', 'Almoço Musical', 'Música para acompanhar seu almoço', 'Carlos Mendes'),
('15:00 - 18:00', 'Tarde de Sucessos', 'As melhores músicas para sua tarde', 'Maria Santos'),
('18:00 - 21:00', 'Jornal da TV OK', 'As principais notícias do dia', 'Roberto Costa'),
('21:00 - 00:00', 'Noite de Estrelas', 'Música romântica para sua noite', 'Fernanda Lima'),
('00:00 - 03:00', 'Madrugada Suave', 'Música relaxante para a madrugada', 'João Paulo'),
('03:00 - 06:00', 'Amanhecer Musical', 'Música para quem trabalha de madrugada', 'Pedro Alves');

-- 7. Verificar se tudo foi criado corretamente
SELECT 
  'Tabela programacao criada com sucesso!' as status,
  COUNT(*) as total_registros
FROM programacao; 