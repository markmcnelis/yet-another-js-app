export default class Controller {
    
    constructor({ model, view }) {
        this.model = model;
        this.view = view;
        this.addListeners();
    }

    getImages() {
        this.model.fetchImages({ q: 'avengers' });
    }    

    getAndAppendImages() {
        this.model.fetchAndAppendImages({ q: 'avengers' });
    }

    addListeners(){
        this.model.emitter.on('FETCHED', this.onGetImages, this);
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
        let viewState = '';
        if(route === '#list') {
            viewState = 'list';
            this.getImages();
        }else if(route === '#detail') {
            viewState = 'detail';
        }
        this.view.update({ 
            data: this.model.images,
            state: viewState
        });
    }

}