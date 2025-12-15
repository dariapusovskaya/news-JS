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

            // 1. фото новости - используем ТОЛЬКО placeholder для избежания 404 ошибок
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundColor = '#4a6fa5';
            }

            // 2. автор
            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            // 3. дата публикации
            const metaDate = newsClone.querySelector('.news__meta-date');
            if (metaDate && item.publishedAt) {
                metaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            // 4. заголовок новости
            const titleElement = newsClone.querySelector('.news__description-title');
            if (titleElement) {
                titleElement.textContent = item.title;
            }

            // 5. источник новости
            const sourceElement = newsClone.querySelector('.news__description-source');
            if (sourceElement) {
                sourceElement.textContent = item.source.name;
            }

            // 6. описание новости
            const contentElement = newsClone.querySelector('.news__description-content');
            if (contentElement) {
                contentElement.textContent = item.description;
            }

            // 7. ссылка "Read more"
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