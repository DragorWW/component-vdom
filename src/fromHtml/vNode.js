import VNode from 'virtual-dom/vnode/vnode';
import svg from 'virtual-dom/virtual-hyperscript/svg';

const isComponentTag = (tagName) => tagName === 'component';

export default function (getComponentCallback) {
    return (tagName, properties, children, key, namespace) => {
        if (isComponentTag(tagName)) {
            let data = JSON.parse(decodeURI(properties.data));

            let Component = getComponentCallback(properties.name);

            return new Component(data, children);
        }
        if (tagName === 'svg' || tagName === 'use') {
            return svg(tagName, properties.attributes, children);
        }
        if (properties.attributes.class) {
            properties.className = properties.attributes.class;
            delete properties.attributes.class;
        }
        return new VNode(tagName, properties, children, key, namespace);
    }
}
