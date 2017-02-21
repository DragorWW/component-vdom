import HookRef from '../hook/Ref';
import {hashAttributes} from './bind';

export const isRef = (key) => {
    return 'ref' === key;
};

export default function (vnode, component, first = false) {
    if (hashAttributes(vnode)) {
        const attributes = Object.keys(vnode.properties.attributes);
        attributes
            .filter(isRef)
            .forEach((eventName) => {
                const refName = vnode.properties.attributes[eventName];
                vnode.properties.ref = new HookRef(component, refName);
            });
    }
}