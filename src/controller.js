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

    getFavourites() {
        this.model.fetchFavourites({ userId: 'user001' });
    }

    addFavourites({ favouriteId = '' }) {
        const favourite = this.model.images.find(i => i.id === favouriteId);
        this.model.addFavourite({ favourite });
    }

    addListeners(){
        this.model.emitter.on('FETCHED', this.onGetImages, this);
        this.model.emitter.on('FETCHED:FAV', this.onGetFavourites, this);
        this.view.emitter.on('FETCH_APPEND', ()=> this.getAndAppendImages());
        this.view.emitter.on('TOGGLE_FAV', favouriteId => this.addFavourites({favouriteId}));
    }

    onGetImages() {
        this.view.update({ data: this.model.images, switchTemplate: false });
    }

    onGetFavourites() {
        this.view.update({ data: this.model.favourites, switchTemplate: false });
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
        } else if(route === '#favourites') {
            viewState = 'favourites';
            this.getFavourites();
            console.log(this.model);
            this.view.update({ 
                data: this.model.favourites,
                state: viewState
            });
            return;    
        }
        this.view.update({ 
            data: this.model.images,
            state: viewState
        });
    }

}