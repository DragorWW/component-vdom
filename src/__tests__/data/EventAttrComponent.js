import Component from 'widget/Component';


export default class TestComponent extends Component {
    get template() {
        return () => '<div class="inline-event-attr-root" onclick="test"><div class="inline-event-attr" onclick="test"></div></div>';
    }
    test(data, event) {
        event.stopPropagation();
        this.data.counter++;
    }
}