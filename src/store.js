import { createStore, compose } from 'redux';
// import tvmazeFeatchMiddleware from './tvmazeFeatchMiddleware';
import rootReducer from './reducers';
//
const createAppStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            // applyMiddleware(tvmazeFeatchMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : noop => noop
        )
    );

    return store;
};

export default createAppStore;
