import {createStore} from 'redux';

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_JWT':
            return {...state, jwt: action.payload}
        case 'SET_USER':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null, jwt: null}
    
        default:
            return state;
    }
}

const INITIAL_STATE = {
    jwt: null,
    user: null
}
const store = createStore(reducer, INITIAL_STATE)

export default store;