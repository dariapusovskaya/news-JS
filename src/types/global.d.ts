declare module '*.css' {
  const content: any;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    API_KEY: string;
  }
}

export {};