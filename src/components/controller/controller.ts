import AppLoader from './appLoader';
import { NewsSource, NewsArticle, Endpoint, SourcesCallback, NewsCallback } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: SourcesCallback): void {
        super.getResp<{ sources: NewsSource[] }>(
            {
                endpoint: Endpoint.MOCK_SOURCES,
            },
            (data) => callback(data.sources)
        );
    }

    public getNews(e: Event, callback: NewsCallback): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<{ articles: NewsArticle[]}>(
                        {
                            endpoint: Endpoint.MOCK_EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data) => callback(data.articles)
                    );
                }
                return;
            }
            target = target.parentElement as HTMLElement;
        }
    }
}

export default AppController;
