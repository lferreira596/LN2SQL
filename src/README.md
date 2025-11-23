# Código Fonte

## Arquivos

- **main.gs** - Código principal completo do sistema
- **config.template.gs** - Template de configuração (copie para config.gs)

## Setup

1. Copie `config.template.gs` para `config.gs`
2. Edite `config.gs` com suas credenciais
3. No Apps Script, execute `configurarChavesIniciais()`
4. Apague as credenciais de `config.gs`
5. Copie o conteúdo de `main.gs` para o Apps Script

## Estrutura do Código
```
main.gs
├── Configuração (obterConfig, getters)
├── Função Principal (processarPergunta)
├── Funções de Suporte
│   ├── buscarExemplosRAG
│   ├── obterSchema
│   ├── validarEstrutura
│   └── salvarNoRAG
├── Geração de Código (gerarCodigoComGroq)
├── Execução (executarCodigo)
└── Observabilidade Langfuse
    ├── criarTraceLangfuse
    ├── criarGenerationLangfuse
    ├── criarSpanLangfuse
    └── adicionarScoreLangfuse
```

## Funções Principais

### `processarPergunta()`
Função principal executada pelo botão. Orquestra todo o fluxo.

### `gerarCodigoComGroq(pergunta, schema, exemplosRAG, traceId)`
Chama a API do Groq para gerar código executável.

### `executarCodigo(codigo)`
Executa o código gerado de forma segura.

### `criarTraceLangfuse(traceId, nome, metadata)`
Cria um trace de observabilidade no Langfuse.

## Customização

Para adaptar a outro domínio:
1. Ajuste o schema na aba "Schema"
2. Modifique o prompt em `gerarCodigoComGroq()`
3. Adicione exemplos específicos ao RAG
