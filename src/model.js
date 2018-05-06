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

    async fetchImages({ q='dogs' }) {
        const response = await getImages({ q, offset: this.offset });
        this.images = [...this.images, ...response.data];
        this.offset += 10;
        this.emitter.emit('FETCHED');
        return await this.images;
    }
}