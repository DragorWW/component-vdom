class BEM {
    constructor (block) {
        this.block = block;
        this.element = '';
        this.modifer = '';
        this.isDot = false;
    }

    // Set element scope
    el (elementIdentifier) {
        if ('undefined' !== elementIdentifier) {
            this.element = elementIdentifier;
            this.modifer = '';
        }
        return this;
    }

    mod (modifier, value = false) {
        if ('string' === typeof value && value) {
            this.modifer = `${modifier}_${value}`;
        } else {
            this.modifer = modifier;
        }

        return this;
    }

    dot (isDot = true) {
        this.isDot = isDot;

        return this;
    }


    toString () {
        let classes = [];

        let prefix = this.element ? `${this.block}__${this.element}` : this.block;

        if (this.isDot) {
            classes.push('.');
        }

        classes.push(prefix);

        if (this.modifer) {
            classes.push(`_${this.modifer}`);
        }

        this.element = '';
        this.modifer = '';
        this.isDot = false;

        return classes.join('');
    }
}

export default function (ctx) {
    if ('string' === typeof ctx) {
        return new BEM(ctx);
    }
    throw new Error('BEM block not of valid type');
}