import { EventEmitter as Emitter } from 'eventemitter3';
import './view.scss'; 

export default class View {
    
    constructor({ parentEl }) {
        this.emitter = new Emitter();
        this.parentEl = parentEl;
    }

    update({ data }) {
        this.data = data;
        console.log(this.data);
        this.render();
    }

    render() {
        this.parentEl.innerHTML = template(this.data);
    }
    
}

const template = data => `
    <div class='list-view'>
        <div>Images:</div>
        <div>
            ${data.map(item=> {
                return thumbnailTemplate(item);
            }).join('')}
        </div>
    </div>
`;

const thumbnailTemplate = item => `
    <a href="${item.images.downsized.url}">
        <title>${item.title}</title>
        <figure>
            <img src="${item.images.fixed_height_small_still.url}" alt="${item.title}">
        </figure>
    </a>
`;