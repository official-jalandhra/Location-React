import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducer/rootreducer';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));  

const store = createStore(rootReducer,enhancer);
store.subscribe(()=>{})
export default store;
