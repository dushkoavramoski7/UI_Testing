import axios from "../../axios/axiosInstance"
import {
    FETCH_COMPANIES
} from "../actionTypes";

export const companyActions = {
    fetchCompanies: () => dispatch => {
        axios.get("/brands/companies").then(resp => {
            dispatch({
                type: FETCH_COMPANIES,
                companies: resp.data
            });
        });

    }
}
