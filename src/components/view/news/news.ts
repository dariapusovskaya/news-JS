import './news.css';
import { NewsArticle } from '../../../types';

class News {
    // мтод draw принимает типизированный параметр
    public draw(data: NewsArticle[]): void { // : void - этот метод ничего не возвращает
        // фильтруем данные (первые 10 новостей если их много)
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        // DocumentFragment для вставки DOM
        const fragment = document.createDocumentFragment();
        
        //шаблон новости в HTML
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        
        // проверка: если шаблон не найден, выходим
        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }

        // цикл по каждой новости
        news.forEach((item: NewsArticle, idx: number) => {
            // клонируем шаблон
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            
            // находим элемент новости
            const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement;
            
            // добавляем класс 'alt' для каждой 2й новости
            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            }

            // заполнение данных с проверкой типов

            // 1. фото новости (может быть undefined, поэтому используем fallback)
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }

            // 2. автор (может быть undefined, поэтому fallback на source.name)
            const metaAuthor = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            // 3. дата публикации (преобразуем формат)
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

            // дбавляем клонированную новость в фрагмент
            fragment.append(newsClone);
        });

        // находим контейнер для новостей
        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            // очищаем и добавляем новые новости
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('News container .news not found');
        }
    }
}

export default News;