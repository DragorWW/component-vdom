import HookMount from '../hook/Mount';
export default function (vnode, component, first = false) {
    if (first) {
        vnode.properties.hookMount = new HookMount(component);
    }
}