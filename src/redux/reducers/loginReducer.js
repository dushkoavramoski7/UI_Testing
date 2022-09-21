import {LOGIN} from "../actionTypes";

const initialState = {
    username: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return{
                ...state,
                username: action.username
            }
        }
        default:
            return state
    }
}
export default reducer;