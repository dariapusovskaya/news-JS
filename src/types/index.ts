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

// Типы для API ответов
export interface NewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: NewsArticle[];
}

export interface SourcesApiResponse {
    status: 'ok' | 'error';
    sources: NewsSource[];
}

// Generic интерфейс для компонентов
export interface Drawable<T> {
    draw(data: T[]): void;
}

// Enums (требование задания)
export enum Endpoint {
    EVERYTHING = 'everything',
    SOURCES = 'sources'
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum Status {
    OK = 'ok',
    ERROR = 'error'
}

export enum NewsCategory {
    BUSINESS = 'business',
    ENTERTAINMENT = 'entertainment',
    GENERAL = 'general',
    HEALTH = 'health',
    SCIENCE = 'science',
    SPORTS = 'sports',
    TECHNOLOGY = 'technology'
}

// Utility Types (требование задания)
export type PartialArticle = Partial<NewsArticle>;
export type ArticlePreview = Pick<NewsArticle, 'title' | 'description' | 'url' | 'urlToImage'>;
export type ReadonlySource = Readonly<NewsSource>;

// Generic для API ответов
export type ApiResponse<T> = {
    status: Status;
    data?: T;
    message?: string;
};

// Union Types для данных
export type NewsData = NewsArticle[] | NewsApiResponse;
export type SourcesData = NewsSource[] | SourcesApiResponse;

// Для совместимости со старым кодом
export interface Component extends Drawable<any> {} // Временно, потом убрать !!

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
    drawNews(data: NewsData): void;
    drawSources(data: SourcesData): void;
}

export interface ProcessEnv {
    API_URL?: string;
    API_KEY?: string;
}

// для конфигурации Loader
export interface LoaderOptions {
    apiKey: string;
    [key: string]: string;
}

// для базового Loader
export interface ILoader {
    // есть в Loader классе
    getResp<T>(params: any, callback: (data: T) => void): void;
}

// Тип для параметров getResp
export interface GetRespParams {
    endpoint: Endpoint;
    options?: Record<string, string>;
}

// Generic callback тип
export type LoaderCallback<T> = (data: T) => void;