import {
    FETCH_COMPANIES
} from "../actionTypes";

const initialState = {
    companies: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANIES: {
            return {
                ...state,
                companies: action.companies
            }
        }
        default:
            return state
    }
}
export default reducer;