declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_NAME: string;
    DATABASE_HOST: string;
    DATABASE_USER: string;
    DATABASE_PORT: string;
    DATABASE_PASSWORD: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_LIFETIME: string;
    SENDGRID_API_KEY: string;
  }
}
