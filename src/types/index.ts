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


export type ApiStatus = 'ok' | 'error';

export interface NewsApiResponse {
    status: ApiStatus;
    totalResults: number;
    articles: NewsArticle[];
}

export interface SourcesApiResponse {
    status: ApiStatus;
    sources: NewsSource[];
}

export interface Drawable<T> {
    draw(data: T[]): void;
}


export enum Endpoint {
    EVERYTHING = 'everything',
    SOURCES = 'sources',
    MOCK_EVERYTHING = 'mocks/everything',
    MOCK_SOURCES = 'mocks/sources'
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum HttpStatus {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
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


export type ApiResponse<T> = {
    status: Status;
    data?: T;
    message?: string;
};


export type NewsData = NewsArticle[] | NewsApiResponse;
export type SourcesData = NewsSource[] | SourcesApiResponse;


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


export interface LoaderOptions {
    apiKey: string;
    [key: string]: string;
}

export interface GetRespParams {
    endpoint: Endpoint;
    options?: Record<string, string>;
}

export type LoaderCallback<T> = (data: T) => void;


export type SourcesCallback = (data: NewsSource[]) => void;
export type NewsCallback = (data: NewsArticle[]) => void;