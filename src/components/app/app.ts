import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { AppType } from '../../types';

class App implements AppType{
    public controller: AppController;
    public view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        try {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) {
            throw new Error('Element .sources not found');
        }
        
        sourcesContainer.addEventListener('click', (e: Event) => 
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        
        this.controller.getSources((data) => this.view.drawSources(data));
    } catch (error: unknown)
    {
        console.error('Element with class ".sources" not found in DOM', error);
    }
}
}

export default App;
