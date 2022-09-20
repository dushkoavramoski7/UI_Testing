import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import brandReducer from "./reducers/brandReducer";
import companyReducer from "./reducers/companyReducer";

const rootReducer = combineReducers({
    brand: brandReducer,
    company: companyReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));