import {hashAttributes} from './bind';

export const isEventNamedAttr = (key) => key.startsWith('on');
export const isDataAttr = (attr) => attr.startsWith('data-');

export function getData (attributes) {
    let mergeData = (start, next) => Object.assign(start, {[next.replace('data-', '')]: attributes[next]});
    return Object.keys(attributes)
        .filter(isDataAttr)
        .reduce((start, next) => mergeData, {});
}

export default function (vnode, component, first = false) {
    if (hashAttributes(vnode)) {
        const attributes = Object.keys(vnode.properties.attributes);
        const data = getData(vnode);
        attributes
            .filter(isEventNamedAttr)
            .forEach((eventName) => {
                const functionName = vnode.properties.attributes[eventName];
                if (component[functionName]) {
                    vnode.properties[eventName] = component[functionName].bind(component, data);
                }
            });
    }
}