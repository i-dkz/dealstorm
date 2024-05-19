interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly GOOGLE_MAP_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
