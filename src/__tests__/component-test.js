import chai from 'chai';
import EventObjectComponent from './data/EventObjectComponent';
import EventAttrComponent from './data/EventAttrComponent';

var expect = chai.expect;


describe('Component', () => {
    describe('prop events', () => {
        it('bind on child node', () => {
            let component = new EventObjectComponent({counter: 0});
            component.init();
            component.block.querySelector('.property-events-bind').click();
            expect(component.data.counter).to.equal(1);
        });
        it('bind on root node', () => {
            let component = new EventObjectComponent({counter: 0});
            component.init();
            component.block.click();
            expect(component.data.counter).to.equal(1);
        });
        it('work event handler after update', () => {
            let component = new EventObjectComponent({counter: 1});
            component.init();
            component.setData({counter: 0});
            component.init();
            component.block.click();
            component.block.querySelector('.property-events-bind').click();
            expect(component.data.counter).to.equal(2);
        });
    });
    describe('inline attr event', () => {
        it('bind on child node', () => {
            let component = new EventAttrComponent({counter: 0});
            component.init();
            component.block.querySelector('.inline-event-attr').click();
            expect(component.data.counter).to.equal(1);
        });
        it('bind on root node', () => {
            let component = new EventAttrComponent({counter: 0});
            component.init();
            component.block.click();
            expect(component.data.counter).to.equal(1);
        });
    });
});