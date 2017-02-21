import Hook from '../virtualDom/Hook';

export default class HookRef extends Hook {
    constructor (component, refName) {
        super();
        this.component = component;
        this.refName = refName;
    }

    hook (node) {
        this.component.refs[this.refName] = node;
    }
}