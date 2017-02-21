module.exports = function (templateParams) {
    var pageName = templateParams.htmlWebpackPlugin.options.pageName;
    var template = require('../pages/' + pageName + '.twig');
    var data = require('../pages/data/' + pageName + '.json');

    return template(data);
}