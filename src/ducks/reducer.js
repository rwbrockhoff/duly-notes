const initialState = {
    name: '',
    picture: ''
}

const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state=initialState, action){
    switch (action.type){

        case UPDATE_USER :
        return {...state,...action.payload}

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