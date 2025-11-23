# 🚀 LN2SQL - Natural Language to SQL Query System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLama%203.3-orange)
![Langfuse](https://img.shields.io/badge/Observability-Langfuse-purple)

Sistema de consulta de dados usando linguagem natural. Converte perguntas em português para código executável e retorna resultados automaticamente, com observabilidade completa.

## ✨ Features

- 🗣️ **Perguntas em linguagem natural** - Faça perguntas em português sobre seus dados
- 🤖 **Geração automática de código** - LLM gera e executa código JavaScript/SQL
- 📚 **RAG (Retrieval-Augmented Generation)** - Aprende com histórico de consultas
- 📊 **Observabilidade total** - Rastreamento completo com Langfuse
- ⚡ **Respostas instantâneas** - Execução automática e resultados em segundos
- 🔒 **Seguro** - Credenciais protegidas com Properties Service

## 🎯 Casos de Uso

- Análise de dados de vendas
- Consultas em inventário
- Relatórios financeiros
- Métricas operacionais
- Qualquer dataset tabulado no Google Sheets

## 📋 Pré-requisitos

- Conta Google (Google Sheets + Apps Script)
- API Key do Groq ([console.groq.com](https://console.groq.com)) - **Gratuito**
- Conta Langfuse ([cloud.langfuse.com](https://cloud.langfuse.com)) - Opcional, para observabilidade

## 🚀 Quick Start

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ln2sql.git
cd ln2sql
```

### 2. Configure o Google Sheets

Crie um novo Google Sheets com 4 abas:

**Aba "Dados"** - Seus dados
```
data_compra | produto | vlr_unitario | quantidade | vlr_total | tipo_pagamento
24-10-2024  | Arroz   | 20          | 10         | 200       | credito
```

**Aba "Schema"** - Descrição das colunas
```
coluna        | tipo   | descricao              | valores_exemplo
data_compra   | date   | Data da transação      | 24-10-2024
produto       | string | Nome do produto        | Arroz, Feijão
vlr_unitario  | number | Valor unitário         | 20, 30
```

**Aba "RAG"** - Histórico (deixe apenas o header)
```
pergunta | codigo_gerado | resultado | data_consulta
```

**Aba "Consulta"** - Interface do usuário
```
A              | B
Pergunta:      | (vazio - usuário digita aqui)
Resultado:     |
Código:        |
```

### 3. Configure o Apps Script

1. No Google Sheets: **Extensions → Apps Script**
2. Copie o conteúdo de `src/main.gs` para o editor
3. Copie `src/config.template.gs` para `config.gs` (localmente, não commite!)
4. Edite `config.gs` e adicione suas API keys
5. Execute a função `configurarChavesIniciais()` uma vez
6. Apague as chaves do código
7. Salve

### 4. Adicione o botão

1. Na aba "Consulta" do Sheet
2. **Insert → Drawing** → Crie um botão "EXECUTAR"
3. Clique nos 3 pontos → **Assign script**
4. Digite: `processarPergunta`

### 5. Teste!

Digite na célula B1: `"Qual o valor médio do Arroz?"`

Clique em **EXECUTAR**

Veja o resultado em B2 e o código gerado em B3!

## 📖 Documentação

- [Setup Detalhado](docs/SETUP.md)
- [Guia de Uso](docs/USAGE.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Contribuindo](docs/CONTRIBUTING.md)

## 🎯 Exemplos de Perguntas
```javascript
// Valores simples
"Qual o valor unitário do Arroz?"
"Qual o produto mais caro?"

// Agregações
"Qual o valor médio do Arroz?"
"Qual o total gasto com Feijão?"
"Quantas compras fiz em outubro?"

// Filtros
"Quais produtos comprei com crédito?"
"Quanto gastei em débito?"
"Quantos itens comprei no dia 24/10?"

// Comparações
"Qual tipo de pagamento usei mais?"
"Qual produto comprei mais vezes?"
```

## 🏗️ Arquitetura
```
┌─────────────────┐
│  Google Sheets  │ ← Interface
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Apps Script    │ ← Orquestração
│   + RAG         │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌──────┐  ┌──────────┐
│ Groq │  │ Langfuse │
│ LLM  │  │  (obs)   │
└──────┘  └──────────┘
```

**Fluxo:**
1. Usuário faz pergunta
2. Sistema busca exemplos similares no RAG
3. LLM (Groq) gera código baseado no schema + RAG
4. Código é executado nos dados
5. Resultado é exibido e salvo no RAG
6. Métricas são enviadas ao Langfuse

## 🔒 Segurança

**⚠️ NUNCA commite credenciais!**

Este projeto usa o Properties Service do Google Apps Script para armazenar credenciais de forma segura.

✅ **Boas práticas implementadas:**
- API keys em Properties Service
- `.gitignore` configurado
- Template de configuração sem chaves
- Função de setup único
- Cache de configuração

Ver [Guia de Segurança](docs/SETUP.md#segurança)

## 📊 Observabilidade (Langfuse)

Métricas rastreadas:
- ✅ Latência total
- ✅ Tempo de resposta da LLM
- ✅ Tokens consumidos
- ✅ Taxa de sucesso/erro
- ✅ Tempo de execução do código

Acesse seu dashboard: [cloud.langfuse.com](https://cloud.langfuse.com)

## 🛠️ Tecnologias

- **Frontend:** Google Sheets
- **Backend:** Google Apps Script (JavaScript)
- **LLM:** Groq API (Llama 3.3 70B)
- **Observability:** Langfuse
- **Storage:** Google Sheets (dados + RAG)

## 💰 Custo

- **Google Apps Script:** Gratuito
- **Groq API:** Gratuito (com rate limits generosos)
- **Langfuse:** Gratuito até 50k events/mês
- **Google Sheets:** Gratuito (até 15GB por conta)

**Custo total: ~$0/mês** 🎉

## 🗺️ Roadmap

### v1.0 (Atual) ✅
- [x] Perguntas em português
- [x] Geração de código com Groq
- [x] Execução automática
- [x] RAG básico
- [x] Observabilidade Langfuse

### v1.1 (Próximo)
- [ ] Busca semântica no RAG (embeddings)
- [ ] Validação de código antes da execução
- [ ] Cache de respostas frequentes
- [ ] Interface web customizada
- [ ] Suporte a múltiplas fontes de dados

### v2.0 (Futuro)
- [ ] Queries SQL diretas (BigQuery, PostgreSQL)
- [ ] Geração de gráficos automáticos
- [ ] API REST
- [ ] Multi-tenancy
- [ ] Suporte a outros idiomas

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [CONTRIBUTING.md](docs/CONTRIBUTING.md)

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-perfil)

## 🙏 Agradecimentos

- [Groq](https://groq.com) pela API gratuita e performática
- [Langfuse](https://langfuse.com) pelo framework de observabilidade
- Comunidade open-source

## ⭐ Star o projeto!

Se este projeto foi útil, considere dar uma ⭐!

---

**Nota:** Este é um projeto educacional e de demonstração. Para uso em produção com dados sensíveis, considere implementações adicionais de segurança.
```

---

## `LICENSE`
```
MIT License

Copyright (c) 2024 [Seu Nome]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
