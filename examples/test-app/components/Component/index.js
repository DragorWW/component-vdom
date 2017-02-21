import BaseComponent from 'component-vdom/src/widget/Component';

export default class Component extends BaseComponent {
    getComponentCallback (name) {
        return require('components/' + name + '/index.es6').default;
    }
}