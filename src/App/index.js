import mainLoop from 'main-loop';
import {create, diff, patch} from 'virtual-dom';

const MAIN_LOOP = '__MAIN_LOOP';

export default class App {
    constructor (initialState, Component) {
        const render = (state) => new Component(state);
        
        this[MAIN_LOOP] = mainLoop(initialState, render, {
            create,
            diff,
            patch
        });
    }

    appendTo (el) {
        // TODO: реализовать нормальную очистку дерева если она нужна.
        if (el.children.length) {
            el.children[0].remove();
        }
        el.appendChild(this[MAIN_LOOP].target);
    }

    attachTo (el) {
        // TODO: добавить возможность привязывать к существующей ноде.
    }

    update (state) {
        this[MAIN_LOOP].update(state);
    }
};