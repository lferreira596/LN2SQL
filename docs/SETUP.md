# 🔧 Setup Detalhado

## Requisitos

- Conta Google
- Navegador web moderno
- 10 minutos de tempo

## Passo a Passo

### 1. Obtenha as API Keys

#### Groq (Obrigatório)

1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta (gratuito)
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Dê um nome (ex: "LN2SQL")
6. Copie a key (começa com `gsk_`)

#### Langfuse (Opcional - para observabilidade)

1. Acesse [cloud.langfuse.com](https://cloud.langfuse.com)
2. Crie uma conta
3. Crie um novo projeto
4. Vá em Settings → API Keys
5. Copie:
   - Public Key (começa com `pk-lf-`)
   - Secret Key (começa com `sk-lf-`)
   - Host URL (geralmente `https://us.cloud.langfuse.com`)

### 2. Crie o Google Sheets

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Crie um novo spreadsheet
3. Renomeie para "LN2SQL"

#### Crie as 4 abas:

**Aba 1: "Dados"**

Headers na linha 1:
```
data_compra | produto | vlr_unitario | quantidade | vlr_total | tipo_pagamento
```

Adicione alguns dados de exemplo (linhas 2+):
```
24-10-2024 | Arroz   | 20 | 10 | 200 | credito
24-10-2024 | Feijão  | 10 | 10 | 100 | debito
25-10-2024 | Macarrão| 30 | 10 | 300 | credito
```

**Aba 2: "Schema"**

Headers na linha 1:
```
coluna | tipo | descricao | valores_exemplo
```

Linhas 2+:
```
data_compra  | date   | Data da transação     | 24-10-2024
produto      | string | Nome do produto       | Arroz, Feijão, Macarrão
vlr_unitario | number | Valor unitário        | 20, 10, 30
quantidade   | number | Quantidade comprada   | 10
vlr_total    | number | Valor total           | 200, 100, 300
tipo_pagamento| string| Forma de pagamento    | credito, debito
```

**Aba 3: "RAG"**

Apenas headers na linha 1:
```
pergunta | codigo_gerado | resultado | data_consulta
```

**Aba 4: "Consulta"**
```
      A           |  B
1  Pergunta:      |
2  Resultado:     |
3  Código:        |
```

### 3. Configure o Apps Script

1. No Google Sheets: **Extensions → Apps Script**
2. Apague o código padrão
3. Copie o conteúdo completo de `src/main.gs`
4. Cole no editor
5. Salve (Ctrl+S ou Cmd+S)

### 4. Configure as Credenciais

**Método 1: Via Código (Recomendado)**

1. Copie `src/config.template.gs` para um arquivo local
2. Edite e adicione suas API keys
3. No Apps Script, crie um novo arquivo chamado `config.gs`
4. Cole o conteúdo editado
5. Selecione a função `configurarChavesIniciais`
6. Clique em **Run/Executar**
7. Autorize o script quando solicitado
8. Veja nos logs: "✅ Chaves configuradas com sucesso!"
9. **IMPORTANTE:** Apague as chaves do arquivo `config.gs`
10. Salve

**Método 2: Via Console (Alternativo)**

1. No Apps Script: **Project Settings** (engrenagem)
2. Vá em **Script Properties**
3. Adicione manualmente:
   - `GROQ_API_KEY`: `gsk_...`
   - `GROQ_API_URL`: `https://api.groq.com/openai/v1/chat/completions`
   - `MODEL`: `llama-3.3-70b-versatile`
   - `LANGFUSE_SECRET_KEY`: `sk-lf-...`
   - `LANGFUSE_PUBLIC_KEY`: `pk-lf-...`
   - `LANGFUSE_HOST`: `https://us.cloud.langfuse.com`

### 5. Valide a Configuração

1. No Apps Script, selecione a função `verificarConfiguracao`
2. Clique em **Run**
3. Veja nos logs se todas as configurações estão ✅ OK

### 6. Adicione o Botão de Execução

1. Volte para o Google Sheets
2. Vá na aba "Consulta"
3. Clique em **Insert → Drawing**
4. Crie uma forma (retângulo ou círculo)
5. Adicione texto: "EXECUTAR" ou "🚀 PERGUNTAR"
6. Clique em **Save and Close**
7. Clique no desenho criado
8. Clique nos 3 pontos no canto superior direito
9. Selecione **Assign script**
10. Digite: `processarPergunta`
11. Clique OK

### 7. Primeiro Teste!

1. Na célula B1, digite: `"Quantas compras fiz?"`
2. Clique no botão **EXECUTAR**
3. Aguarde ~3-5 segundos
4. Veja o resultado em B2
5. Veja o código gerado em B3

Se funcionou, parabéns! 🎉

## Troubleshooting

### Erro: "GROQ_API_KEY is not defined"

**Solução:** Execute `configurarChavesIniciais()` novamente

### Erro: "Cannot read properties of null"

**Solução:** Verifique se as 4 abas existem com nomes corretos (case-sensitive)

### Erro: "Authorization required"

**Solução:** Autorize o script:
1. Execute qualquer função
2. Clique em "Review permissions"
3. Selecione sua conta
4. Clique em "Advanced"
5. Clique em "Go to [project name] (unsafe)"
6. Clique em "Allow"

### Botão não funciona

**Solução:**
1. Clique com botão direito no desenho
2. Assign script novamente
3. Digite exatamente: `processarPergunta`

### Resultado sempre "0" ou "Não encontrado"

**Solução:** Verifique o schema:
1. Índices das colunas estão corretos?
2. Nomes dos produtos têm espaços extras?
3. Execute `debugArroz()` para inspecionar dados

## Segurança

### ⚠️ Checklist de Segurança

- [ ] API keys configuradas via Properties Service
- [ ] Arquivo `config.gs` NÃO commitado no git
- [ ] `.gitignore` configurado
- [ ] Chaves antigas revogadas se foram expostas
- [ ] Logs não expõem credenciais

### Boas Práticas

1. **Nunca** compartilhe API keys
2. **Sempre** use `.gitignore`
3. **Revogue** keys antigas periodicamente
4. **Use** Properties Service para credenciais
5. **Valide** inputs do usuário

## Próximos Passos

- [ ] Teste com suas próprias perguntas
- [ ] Adicione mais dados à aba "Dados"
- [ ] Customize o schema para seu domínio
- [ ] Explore o Langfuse dashboard
- [ ] Contribua com melhorias!
