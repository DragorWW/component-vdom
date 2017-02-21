export default function () {
    let blockList = document.querySelectorAll('[data-bem]');
    [].forEach.call(blockList, function (el) {
        let blockName = el.getAttribute('data-bem');
        let Component = require('components/' + blockName + '/index.es6').default;
        new Component(el);
    });
}
