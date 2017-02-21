export const isChilren = (vnode) => 'children' === vnode.tagName;

export default function (vnode, component, first = false) {
    if (component.children && component.children.length && vnode.children) {
        let children = component.children.find((node) => 'undefined' === typeof node.text);
        if (children) {
            vnode.children
                .find(isChilren)
                .forEach((node, i) => {
                    vnode.children[i] = children;
                });
        }
    }
}