export interface NewsArticle {
    source: {
      name: string;
      id?: string;
    };
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }
  
  export interface NewsSource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
  }
  
  // Типы для API ответов (из задания News API)
  export interface NewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: NewsArticle[];
  }
  
  export interface SourcesApiResponse {
    status: 'ok' | 'error';
    sources: NewsSource[];
  }
  
  // Типы для компонентов
  export interface Component {
    draw(data: any): void;  // Из вашего кода методы называются draw
  }
  
  export interface Controller {
    getSources(callback: (data: NewsSource[]) => void): void;
    getNews(e: Event, callback: (data: NewsArticle[]) => void): void;
  }
  
  export interface AppType {
    controller: Controller;
    view: View;
    start(): void;
  }
  
  export interface View {
    drawNews(data: NewsArticle[]): void;
    drawSources(data: NewsSource[]): void;
  }