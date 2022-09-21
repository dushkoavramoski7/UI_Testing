import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import brandReducer from "./reducers/brandReducer";
import companyReducer from "./reducers/companyReducer";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
    brand: brandReducer,
    company: companyReducer,
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));