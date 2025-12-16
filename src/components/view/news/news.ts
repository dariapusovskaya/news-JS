import './news.css';
import { NewsArticle } from '../../../types';

class News {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        
        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item: NewsArticle, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement;
            
            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.classList.add('.news__meta-photo-background')
            }

            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate && item.publishedAt) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const titleElement = newsClone.querySelector('.news__description-title');
            if (titleElement) {
                titleElement.textContent = item.title;
            }

            const sourceElement = newsClone.querySelector('.news__description-source');
            if (sourceElement) {
                sourceElement.textContent = item.source.name;
            }

            const contentElement = newsClone.querySelector('.news__description-content');
            if (contentElement) {
                contentElement.textContent = item.description;
            }

            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('News container .news not found');
        }
    }
}

export default News;