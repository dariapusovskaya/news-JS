declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    API_KEY: string;
  }
}

export {};