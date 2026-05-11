declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;
    DATABASE_URL: string;
    NODE_ENV: 'development' | 'production';
  }
}