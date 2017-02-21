import App from 'component-vdom/src/App';
import EntryMain from  'components/entry/Main/index.es6';
import {createStore, combineReducers} from 'redux';
let initialState = {
    data: {
        login: 'asd',
        password: '1111',
    },
};

const reducers = combineReducers({
    data: (state = {}, action) => {
        switch (action.type) {
            case 'SET_LOGIN':
                return Object.assign({}, state, {login: action.login});
            case 'SET_PASSWORD':
                return Object.assign({}, state, {password: action.password});
            default:
                return state;
        }
    },
});

let store = createStore(reducers, initialState, window.devToolsExtension ? window.devToolsExtension() : (f) => {
    return f;
});

let app = new App(initialState, EntryMain);


app.appendTo(document.querySelector('#root'));

store.subscribe(() => {
    app.update(store.getState());
});

window.app = app;
window.store = store;