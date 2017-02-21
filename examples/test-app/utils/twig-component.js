var Twig = require('twig');
module.exports = function () {
    Twig.extend(function (Twig) {
        Twig.exports.extendTag({
            type: 'component',
            regex: /^component\s+(ignore missing\s+)?(.+?)\s*(?:with\s+([\S\s]+?))?\s*(only)?$/,
            next: [],
            open: true,
            compile: function (token) {
                var match = token.match,
                    includeMissing = match[1] !== undefined,
                    expression = match[2].trim(),
                    withContext = match[3],
                    only = ((match[4] !== undefined) && match[4].length);

                delete token.match;

                token.only = only;
                token.includeMissing = includeMissing;

                token.stack = Twig.expression.compile.apply(this, [{
                    type: Twig.expression.type.expression,
                    value: expression
                }]).stack;

                if (withContext !== undefined) {
                    token.withStack = Twig.expression.compile.apply(this, [{
                        type: Twig.expression.type.expression,
                        value: withContext.trim()
                    }]).stack;
                }

                return token;
            },
            parse: function (token, context, chain) {
                // Resolve filename
                var innerContext = {},
                    withContext,
                    i,
                    template;

                if (!token.only) {
                    innerContext = Twig.ChildContext(context);
                }

                if (token.withStack !== undefined) {
                    withContext = Twig.expression.parse.apply(this, [token.withStack, context]);

                    for (i in withContext) {
                        if (withContext.hasOwnProperty(i)) {
                            innerContext[i] = withContext[i];
                        }
                    }
                }

                var file = Twig.expression.parse.apply(this, [token.stack, innerContext]);
                delete innerContext._keys;
                var data = JSON.stringify(innerContext);

                return {
                    chain: chain,
                    output: '<component name="' + file + '" data="' + encodeURI(data) + '"></component>'
                };
            }
        });
        Twig.exports.extendTag({
            /**
             * The embed tag combines the behaviour of include and extends.
             * It allows you to include another template's contents, just like include does.
             *
             *  Format: {% embed "template.twig" [with {some: 'values'} only] %}
             */
            type: 'embedcomponent',
            regex: /^embedcomponent\s+(ignore missing\s+)?(.+?)\s*(?:with\s+(.+?))?\s*(only)?$/,
            next: [
                'endembedcomponent'
            ],
            open: true,
            compile: function (token) {
                var match = token.match,
                    includeMissing = match[1] !== undefined,
                    expression = match[2].trim(),
                    withContext = match[3],
                    only = ((match[4] !== undefined) && match[4].length);

                delete token.match;

                token.only = only;
                token.includeMissing = includeMissing;

                token.stack = Twig.expression.compile.apply(this, [{
                    type: Twig.expression.type.expression,
                    value: expression
                }]).stack;

                if (withContext !== undefined) {
                    token.withStack = Twig.expression.compile.apply(this, [{
                        type: Twig.expression.type.expression,
                        value: withContext.trim()
                    }]).stack;
                }

                return token;
            },
            parse: function (token, context, chain) {
                // Resolve filename
                var innerContext = {},
                    withContext,
                    i,
                    template;

                if (!token.only) {
                    for (i in context) {
                        if (context.hasOwnProperty(i)) {
                            innerContext[i] = context[i];
                        }
                    }
                }

                if (token.withStack !== undefined) {
                    withContext = Twig.expression.parse.apply(this, [token.withStack, context]);

                    for (i in withContext) {
                        if (withContext.hasOwnProperty(i)) {
                            innerContext[i] = withContext[i];
                        }
                    }
                }

                var file = Twig.expression.parse.apply(this, [token.stack, innerContext]);


                // reset previous blocks
                this.blocks = {};

                // parse tokens. output will be not used
                var output = Twig.parse.apply(this, [token.output, innerContext]);

                delete withContext._keys;
                // withContext._children = this.blocks;
                var data = JSON.stringify(withContext);

                // render tempalte with blocks defined in embed block
                return {
                    chain: chain,
                    output: '<component name="' + file + '" data="' + encodeURI(data) + '">' + output.trim() + '</component>'.trim()
                };
            }
        });
        Twig.exports.extendTag({
            type: 'endembedcomponent',
            regex: /^endembedcomponent$/,
            next: [],
            open: false
        });
    });
};