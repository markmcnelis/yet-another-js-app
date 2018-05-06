export default class Controller {
    
    constructor({ model, view }) {
        this.model = model;
        this.view = view;
        this.addListeners();
    }

    init() {
        this.model.fetchImages({ q: 'cats' });
    }

    addListeners(){
        this.model.emitter.on('FETCHED', this.onGetImages, this);
    }

    onGetImages() {
        this.view.update({ data: this.model.images });
    }

}