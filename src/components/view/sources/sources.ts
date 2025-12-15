import './sources.css';
import { NewsSource, Drawable } from '../../../types';

class Sources implements Drawable<NewsSource> {
    public draw(data: NewsSource[]): void {

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp not found');
            return;
        }

        data.forEach((item: NewsSource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            

            const nameElement = sourceClone.querySelector('.source__item-name');
            if (nameElement) {
                nameElement.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            } 

            fragment.append(sourceClone);
        });

            const sourcesContainer = document.querySelector('.sources');
            if (sourcesContainer) {
                sourcesContainer.append(fragment);
            } else {
                console.error('Sources container .sources not found');
            }
}}

export default Sources;
