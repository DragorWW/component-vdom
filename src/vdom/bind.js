import bindChildren from './bindChildren';
import bindEventAttr from './bindEventAttr';
import bindEventList from './bindEventList';
import bindMount from './bindMount';
import bindRef from './bindRef';

export const hashAttributes = (vnode) => vnode.properties && vnode.properties.attributes;

export default function (vtree, component) {
    bindOnNode(vtree, component, true);
    return vtree;
};

function bindOnNode (vnode, component, first = false) {
    bindChildren(vnode, component, first);
    bindEventAttr(vnode, component, first);
    bindEventList(vnode, component, first);
    bindMount(vnode, component, first);
    bindRef(vnode, component, first);
    
    bindOnTree(vnode, component);
}
function bindOnTree (vnode, component) {
    if (vnode.children) {
        vnode.children.forEach((vnode) => {
            if (!vnode) {
                return false;
            }
            bindOnNode(vnode, component);
        });
    }
}