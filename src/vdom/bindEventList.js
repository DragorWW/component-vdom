import select from 'vtree-select';
import {getData} from './bindEventAttr';


function parse (event) {
    var parts = event.split(/ +/);
    return {
        name: parts.shift(),
        selector: parts.join(' ')
    }
}

export default function (vnode, component, first = false) {
    if (first) {
        Object.keys(component.events).map((selector) => {
            let data =  parse(selector);
            let name = data.name;
            let methodName = component.events[selector] || 'on' + name;

            let isMethod = 'function' === typeof component[methodName];

            if (isMethod) {
                let method = component[methodName];
                if (data.selector) {
                    let vnodeList = select(data.selector)(vnode);
                    if (vnodeList) {
                        vnodeList.map((vnode) => {
                            const data = getData(vnode);
                            vnode.properties['on'+name] = method.bind(component, data);
                        });

                    }
                } else {
                    const data = getData(vnode);
                    vnode.properties['on'+name] = method.bind(component, data);
                }
            }
        });

    }
}