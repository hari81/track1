import SQLiteManager from '../../database/SQLiteManager'

const defaultState = {
    isLoggedIn: false,
    username: '',
    password: ''
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            SQLiteManager.deleteConfigTable()
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username: '',
                password: ''
            });
        default:
            return state;
    }
}