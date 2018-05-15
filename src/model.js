import getImages from './service';
import getFavourites, { addFavourite } from './favourites.service';
import EventEmitter from 'eventemitter3';

export default class Model {
    constructor(name) {
        this.emitter = new EventEmitter();
        this.init();
    }

    init() {
        this.images = [];
        this.favourites = [];
        this.offset = 0;
    }

    reset() {
        this.init();
    }

    async fetchImages({ q='dogs', silent=false }) {
        const response = await getImages({ q, offset: this.offset });
        this.images = response.data;
        if(!silent) {
            this.emitter.emit('FETCHED');
        }
        return await this.images;
    }

    async fetchAndAppendImages({ q='dogs' }) {
        this.offset += 10;
        const currentImages = this.images.slice(); //[...this.images] (es6)
        const moreImages = await this.fetchImages({ q, silent: true });
        this.images = [...currentImages, ...moreImages];
        this.emitter.emit('FETCHED');
        return this.images;
    }

    async fetchFavourites({ userId = 'user001' }) {
        const { favourites = [] } = await getFavourites({ userId });
        this.favourites = favourites;
        this.emitter.emit('FETCHED:FAV');
        return this.favourites;
    }

    async addFavourite({ favourite = {} }) {
        console.log('favourite');
        console.log(favourite);
        const { result = 0 } = await addFavourite({ favourite });
        this.emitter.emit('ADDED_FAV');
        return result;
    }
}