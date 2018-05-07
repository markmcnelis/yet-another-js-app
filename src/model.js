import getImages from './service';
import EventEmitter from 'eventemitter3';

export default class Model {
    constructor(name) {
        this.emitter = new EventEmitter();
        this.init();
    }

    init() {
        this.images = [];
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
}