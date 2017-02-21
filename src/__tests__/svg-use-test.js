import chai from 'chai';
import fromHtml from '../fromHtml';

var expect = chai.expect;

describe('svg', () => {
    it('use it', () => {
        let html = '<svg class="svg"><use xlink:href="#icon-test"></use></svg></div>';
        let tree = fromHtml(() => {})(html);

        expect(tree.namespace).to.equal('http://www.w3.org/2000/svg');
        expect(tree.children.length).to.equal(1);
        expect(tree.children[0].namespace).to.equal('http://www.w3.org/2000/svg');
        expect(tree.children[0].namespace).to.equal('http://www.w3.org/2000/svg');
        expect(tree.children[0].hooks['xlink:href']).to.exist;
    });
});