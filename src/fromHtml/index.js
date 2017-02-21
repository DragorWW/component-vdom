import vNode from './vNode';
import VText from 'virtual-dom/vnode/vtext';
import htmlToVdom from 'html-to-vdom';

const fromHtml = function(getComponentCallback = () => {}) {
    return htmlToVdom({
        VNode: vNode(getComponentCallback),
        VText
    });
};

export default fromHtml;