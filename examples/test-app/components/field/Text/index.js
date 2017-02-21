import './style.less';
import template from './template.twig';
import Component from 'components/Component/index.es6';

export default class FieldText extends Component {
    get template () {
        return template;
    }
}