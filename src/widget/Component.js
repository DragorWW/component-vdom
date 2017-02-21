import {create as createElement, diff, patch} from 'virtual-dom';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

import Widget from '../virtualDom/Widget';
import vdomBind from '../vdom/bind';
import fromHtml from '../fromHtml';

const COMPONENT_DATA = '__COMPONENT_DATA';

function renderHtmlByComponent (component) {
    // coloneDeep нужен для избежания перетирания данных из твига
    // баг: https://github.com/twigjs/twig.js/issues/397
    return component.template(cloneDeep(component.data)).trim();
}

// function getComponentCallback (name) {
//     return require('components/' + name + '/index.es6').default;
// }

export default class Component extends Widget {
    /**
     * Геттер получения html шаблона Компонента.
     *
     * @returns {function(): string} Функция шаблонизации
     */
    get template () {
        return (data) => '<div>Component</div>';
    }

    /**
     * Список событий.
     * @returns {{}}
     */
    get events () {
        return {};
    }

    /**
     * Геттер для получения функция подключения компонентов по его имене.
     *
     * @returns {getComponentCallback}
     */
    getComponentCallback (name) {
        return this;
    }

    constructor (data = {}, children = []) {
        super();
        this.refs = {};
        this.children = children;
        this.setData(data);
    }

    /**
     * @return {HTMLElement} вовращяет html ноду.
     */
    init () {
        this.tree = this.render();
        this.block = createElement(this.tree);
        this.onInit();
        return this.block;
    }

    onInit () {

    }

    onMount (node, propertyName, previousValue) {
    }

    onUnMount (node, propertyName, previousValue) {
    }

    update (previous, domNode) {
        this.refs = previous.refs;
        this.block = previous.block;
        
        if (isEqual(this.data, previous.data)) {
            this.tree = previous.tree;
            this.children = previous.children;
            return null;
        }

        this.afterUpdate(previous, domNode);
    }

    afterUpdate (previous, domNode) {
        let newTree = this.render();
        let patches = diff(previous.tree, newTree);
        this.block = patch(previous.block, patches);
        this.tree = newTree;
    }

    render () {
        let tree = fromHtml(this.getComponentCallback.bind(this))(renderHtmlByComponent(this));
        tree = vdomBind(tree, this);

        return tree;
    }

    get data () {
        return this[COMPONENT_DATA];
    }

    setData (data) {
        this[COMPONENT_DATA] = data;
    }

    updateData (data) {
        this.setData(merge(this.data, data));
        this.update(this);
    }
}