const initialState = {
    name: '',
    picture: "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png",
    displayNote: {title: 'Title'}, 
    theme: false,
    pomodoroToggle: false,
    checkedMg: true,
    pomodoro: {today: 0, week: 0, total: 0}
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const DISPLAY_NOTE = 'DISPLAY_NOTE';
const UPDATE_DISPLAY = 'UPDATE_DISPLAY';
const UPDATE_MG = 'UPDATE_MG';

export default function reducer(state=initialState, action){
    switch (action.type){

        case UPDATE_USER :
        return {...state,...action.payload}

        case LOGOUT_USER :
        return {...initialState}

        case DISPLAY_NOTE :
        return {...state, ...action.payload}
        
        case UPDATE_DISPLAY :
        return {...state, ...action.payload}
        
        case UPDATE_MG :
        return {...state, ...state.displayNote, ...action.payload}

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
        type: LOGOUT_USER
    }
}

export function displayNote(val){
    return {
        type: DISPLAY_NOTE,
        payload: val
    }
}

export function updateDisplay(val){
    return {
        type: UPDATE_DISPLAY,
        payload: val
    }
}