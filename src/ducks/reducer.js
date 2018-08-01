const initialState = {
    name: '',
    picture: "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png"
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const DISPLAY_NOTE = 'DISPLAY_NOTE';

export default function reducer(state=initialState, action){
    switch (action.type){

        case UPDATE_USER :
        return {...state,...action.payload}

        case LOGOUT_USER :
        return {...state, ...initialState}

        case DISPLAY_NOTE :
        return {...state, ...action.payload}
        
        default: 
            return state
    }
}

export function updateUser(val){
    return {
        type: UPDATE_USER,
        payload: val
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function displayNote(val){
    return {
        type: DISPLAY_NOTE,
        payload: val
    }
}