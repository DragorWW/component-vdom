import Hook from '../virtualDom/Hook';
import nextTick from 'next-tick';

export default class HookMount extends Hook {
    /**
     * 
     * @param {Component} component
     */
    constructor (component) {
        super();
        this.component = component;
    }

    hook (node) {
        if (! node.parentNode) {
            nextTick(this.component.onMount.bind(this.component, node));
        }
    }

    unhook () {
        // TODO: поправить, сейчас вызываеться всегда.
        this.component.onUnMount.bind(this.component);
    }
}