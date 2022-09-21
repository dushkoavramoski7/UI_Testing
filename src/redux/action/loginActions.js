import {LOGIN} from "../actionTypes";

export const loginActions = {

    //simulate login
    userLogin: (username) => {
        return {
            type: LOGIN,
            username: username
        }
    }
}