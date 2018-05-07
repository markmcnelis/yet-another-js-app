import EventEmitter from 'eventemitter3';
import './view.scss'; 

export default class View {
    
    constructor({ parentEl }) {
        this.emitter = new EventEmitter();
        this.parentEl = parentEl;
        this.currentTemplate = searchTemplate;
    }

    update({ data, state='', switchTemplate=true }) {
        this.data = data;
        if(switchTemplate) {
            if(state === '') {
                this.currentTemplate = searchTemplate;
            }else if( state === 'list') {
                this.currentTemplate = listTemplate;
            }else if(state === 'detail') {
                this.currentTemplate = detailTemplate;
            }else {
                console.log('no view state match');
            }
        }
        this.render();
    }

    render() {
        this.parentEl.innerHTML = this.currentTemplate(this.data);
    }
    
}

const searchTemplate = data => `
    <div class='search-view'>
        <a href="./#list">Search for cats..</a>
    </div>
`;

const listTemplate = data => `
    <div class='list-view'>
        <div>Images:</div>
        <div class="thumbs">
            ${data.map(item=> {
                return thumbnailTemplate(item);
            }).join('')}
        </div>
    </div>
`;

const thumbnailTemplate = item => `
    <a class="thumbnails" href="${item.images.downsized.url}">
        <figure>
            <img src="${item.images.fixed_height_small_still.url}" alt="${item.title}">
        </figure>
    </a>
`;

const detailTemplate = item => `
    <div class="detail-view">
        <title>${item.title}</title>
        <figure>
            <img src="${item.images.downsized.url}" alt="${item.title}">
        </figure>
    </div>
`;