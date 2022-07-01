import { createStore, combineReducers, applyMiddleware } from 'redux';
import { calculateReducer } from './reducers/calculate';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    calculate: calculateReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));