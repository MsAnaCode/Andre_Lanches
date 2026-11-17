/**
 * Configuração de conexão com o Supabase.
 *
 * As credenciais são lidas das variáveis de ambiente públicas do Expo
 * (prefixo EXPO_PUBLIC_), definidas no arquivo `.env` na raiz do projeto.
 * Caso não estejam configuradas, o aplicativo opera automaticamente em
 * modo local com os dados do cardápio armazenados no dispositivo.
 */

export const SUPABASE_URL = (process.env.EXPO_PUBLIC_SUPABASE_URL || '').trim().replace(/\/+$/, '');
export const SUPABASE_ANON_KEY = (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '').trim();

/**
 * Verifica se as credenciais do Supabase foram preenchidas pelo usuário.
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes('SEU-PROJETO') &&
    !SUPABASE_ANON_KEY.includes('SUA-CHAVE')
  );
}
