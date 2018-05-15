import EventEmitter from 'eventemitter3';
import './view.scss'; 
import { searchTemplate, listTemplate, favouritesTemplate } from './templates';

export default class View {
    
    constructor({ parentEl }) {
        this.emitter = new EventEmitter();
        this.parentEl = parentEl;
        this.currentTemplate = searchTemplate;
        this.current = screens.search;
    }

    update({ data, state='', switchTemplate=true }) {
        this.data = data;
        if(switchTemplate) {
            this.previous = this.current;
            if(state === '') {
                this.current = screens.search;
            }else if( state === 'list') {
                this.current = screens.list;
            }else if(state === 'detail') {
            }else if( state === 'favourites') {
                this.current = screens.favourites;
            }else {
                console.log('no view state match');
            }
        }
        this.render();
    }

    render() {
        if(this.previous) {
            this.previous.removeListeners.call(this);
        }
        this.parentEl.innerHTML = this.current.template(this.data);
        this.current.addListeners.call(this);
    }
    
}


const screens = {
    search: {
        addListeners(){},
        removeListeners(){},
        template: searchTemplate
    },
    list: {
        addListeners(){
            const moreBtn = this.parentEl.querySelector('#moreBtn');
            const saveBtn = this.parentEl.querySelector('#saveBtn');
            moreBtn.addEventListener('click', (e)=> {
                e.preventDefault();
                this.emitter.emit('FETCH_APPEND');
            })
            console.log('1: Data:', this.data.length);
            if (this.data.length) {
                console.log(this.data);
                const buttons = this.data.map(item => item.id);
                buttons.forEach(id => {
                    const saveBtn = this.parentEl.querySelector(`#btn_${id}`);
                    if (!!saveBtn) {
                        saveBtn.addEventListener('click', (e) => {
                            this.emitter.emit('TOGGLE_FAV', id);
                        })
                    }
                });
                console.log(buttons);
            }
        },
        removeListeners(){},
        template: listTemplate
    },
    favourites: {
        addListeners(){},
        removeListeners(){},
        template: favouritesTemplate
    }
};