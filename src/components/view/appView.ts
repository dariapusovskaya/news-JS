import News from './news/news';
import Sources from './sources/sources';
import { NewsArticle, NewsSource, NewsApiResponse, SourcesApiResponse } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsApiResponse | NewsArticle[]): void {
        if ('articles' in data) {
            this.news.draw(data.articles);
        } else {
            this.news.draw(data);
        }
    }

    drawSources(data: SourcesApiResponse | NewsSource[]): void {
        if ('sources' in data) {
            this.sources.draw(data.sources);
        } else {
            this.sources.draw(data);
        }
    }
}

export default AppView;
