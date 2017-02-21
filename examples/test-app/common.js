import 'babel-polyfill';
import './styles/main.less';
import twigComponent from './utils/twig-component';
twigComponent();


require('webpack-svgstore-plugin/src/helpers/svgxhr')('/build/sprite.svg');