/**
 * ⚠️ TEMPLATE DE CONFIGURAÇÃO
 * 
 * 1. Copie este arquivo para config.gs
 * 2. Preencha com suas credenciais reais
 * 3. Execute configurarChavesIniciais() UMA VEZ
 * 4. Apague as credenciais deste arquivo
 * 5. NUNCA commite o arquivo config.gs
 */

function configurarChavesIniciais() {
  const props = PropertiesService.getScriptProperties();
  
  // ⚠️ SUBSTITUA COM SUAS CHAVES REAIS
  props.setProperties({
    'GROQ_API_KEY': 'gsk_...',  // Obtenha em https://console.groq.com
    'GROQ_API_URL': 'https://api.groq.com/openai/v1/chat/completions',
    'MODEL': 'llama-3.3-70b-versatile',
    
    // Opcional - para observabilidade
    'LANGFUSE_SECRET_KEY': 'sk-lf-...',  // Obtenha em https://cloud.langfuse.com
    'LANGFUSE_PUBLIC_KEY': 'pk-lf-...',
    'LANGFUSE_HOST': 'https://us.cloud.langfuse.com'  // ou https://cloud.langfuse.com
  });
  
  Logger.log('✅ Chaves configuradas com sucesso!');
  Logger.log('⚠️ AGORA APAGUE AS CHAVES DESTE ARQUIVO E SALVE!');
}
