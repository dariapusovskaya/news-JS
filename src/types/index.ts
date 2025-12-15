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


export interface NewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: NewsArticle[];
}

export interface SourcesApiResponse {
    status: 'ok' | 'error';
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


export type PartialArticle = Partial<NewsArticle>;
export type ArticlePreview = Pick<NewsArticle, 'title' | 'description' | 'url' | 'urlToImage'>;
export type ReadonlySource = Readonly<NewsSource>;

export type ApiResponse<T> = {
    status: Status;
    data?: T;
    message?: string;
};


export type NewsData = NewsArticle[] | NewsApiResponse;
export type SourcesData = NewsSource[] | SourcesApiResponse;


export interface Component extends Drawable<unknown> {}

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

export interface ILoader {

    getResp<T>(params: GetRespParams, callback: LoaderCallback<T>): void;
}

export interface GetRespParams {
    endpoint: Endpoint;
    options?: Record<string, string>;
}

export type LoaderCallback<T> = (data: T) => void;


export type SourcesCallback = (data: NewsSource[]) => void;
export type NewsCallback = (data: NewsArticle[]) => void;