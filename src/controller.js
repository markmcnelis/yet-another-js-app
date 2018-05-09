import Route from 'route-parser';

export default class Controller {
    
    constructor({ model, view }) {
        this.model = model;
        this.view = view;
        this.addListeners();
    }

    getImages({ q= 'avengers'}) {
        this.model.fetchImages({ q });
    }    

    getAndAppendImages() {
        this.model.fetchAndAppendImages({ q: 'avengers' });
    }

    addListeners(){
        this.model.emitter.on('FETCHED', this.onGetImages, this);
        this.view.emitter.on('FETCH_APPEND', ()=> this.getAndAppendImages());
    }

    onGetImages() {
        this.view.update({ data: this.model.images, switchTemplate: false });
    }

    /**
     * Set and render the active route.
     *
     * @param {string} raw '' | '#/' | '#/list' | '#/detail'
     */
    setView(raw) {
        const route = raw.replace(/^#\//, '');
        const resultsRoute = new Route('#list/:q');
        let viewState = '';

        if(route === '#list') {
            viewState = 'list';
            this.getImages({});
        }else if(route === '#detail') {
            viewState = 'detail';
        }else if(resultsRoute.match(route)) {
            viewState = 'list';
            this.getImages({ q:resultsRoute.match(route).q });
        }
        this.view.update({ 
            data: this.model.images,
            state: viewState
        });
    }

}