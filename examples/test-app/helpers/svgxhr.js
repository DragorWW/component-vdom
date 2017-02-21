// TODO: вынести скрипт в вендорный модуль, баг тут https://github.com/mrsum/webpack-svgstore-plugin/issues/70
export default function svgXHR (url, baseUrl) {
    let _ajax = new XMLHttpRequest();
    let _fullPath;

    if ('undefined' !== typeof XDomainRequest) {
        _ajax = new XDomainRequest();
    }

    if ('undefined' === typeof baseUrl) {
        if ('undefined' !== typeof window.baseUrl) {
            baseUrl = window.baseUrl;
        } else {
            baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
    }

    _fullPath = (baseUrl + '/' + url).replace(/([^:]\/)\/+/g, '$1');

    _ajax.open('GET', _fullPath, true);

    _ajax.onload = function () {
        let div = document.createElement('div');
        div.innerHTML = _ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
    };

    _ajax.send();
}