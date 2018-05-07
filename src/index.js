import '../css/style.scss';
import Model from './model';
import View from './view';
import Controller from './controller';

const view = new View({ parentEl: document.querySelector('#root') });
const model = new Model();
const controller = new Controller({ view, model });
// controller.init();

const setView = () => controller.setView(document.location.hash);
window.addEventListener('load', setView);
window.addEventListener('hashchange', setView);
