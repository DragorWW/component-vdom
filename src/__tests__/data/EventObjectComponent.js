import Component from 'widget/Component';


export default class TestComponent extends Component {
    get template() {
        return () => '<div><div class="property-events-bind-root"></div><div class="property-events-bind"></div></div>';
    }
    get events() {
        return {
            'click .property-events-bind': 'test',
            'click': 'test'
        }
    }
    test(data, event) {
        event.stopPropagation();
        this.data.counter++;
    }
}