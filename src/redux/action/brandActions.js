import axios from "../../axios/axiosInstance"
import {
    FETCH_BRANDS,
    FETCH_BRAND,
    ADD_BRAND,
    EDIT_BRAND,
    SEARCH_BRANDS,
    CHANGE_STATUS_BRAND,
    ALL_BRANDS,
    DELETE_BRAND,
    CHANGE_STATUS_NOTE,
    SELECT_BRAND,
    DELETE_NOTE,
    ADD_NOTE,
    SORT_BRANDS,
    FILTER_BRANDS,
    GET_DATA_FOR_SELECT_BRAND,
    ADD_BRANDS
} from "../actionTypes";

export const brandActions = {
    fetchAllBrands: () => dispatch => {
        axios.get("/brands").then(resp => {
            dispatch({
                type: FETCH_BRANDS,
                brands: resp.data,
            });
        });
    },
    fetchBrand: (brandId) => dispatch => {
        axios.get(`/brands/${brandId}`).then(resp => {
            dispatch({
                type: FETCH_BRAND,
                brand: resp.data
            })
        })
    },
    addBrand: (brand, callback) => dispatch => {
        axios.post("/brands/add", brand).then(resp => {
            dispatch({
                type: ADD_BRAND
            })
            callback(resp.data.brandId);
        })
        .catch(() => {
            callback(null);
        })
    },
    editBrand: (brandId, brand, callback) => dispatch => {
        axios.patch(`/brands/edit/${brandId}`, brand).then(resp => {
            dispatch({
                type: EDIT_BRAND
            })
            callback(resp.data);
        })
        .catch(() => {
            callback(null);
        })
    },
    searchBrand(searchVal) {
        return {
            type: SEARCH_BRANDS,
            searchVal
        }
    },
    changeActiveStatusBrand: (brand) => dispatch => {
        const payload = {
            brandId: brand.brandId,
            brandActiveFlag: brand.brandActiveFlag
        };
        axios.patch("/brands/activeFlag", brand)
            .then(() => {
                dispatch({
                    type: CHANGE_STATUS_BRAND,
                    payload
                })
            })
    },
    replaceBrandWithAllBrands() {
        return {
            type: ALL_BRANDS
        }
    },
    deleteBrand: (brandId, callback) => dispatch => {
        axios.delete(`/brands/delete/${brandId}`)
            .then(() => {
                dispatch({
                    type: DELETE_BRAND,
                    brandId: brandId
                })
                callback(true);
            })
            .catch(() => {
                callback(false);
            })
    },
    changeStatusNote: (note, brandId) => dispatch => {
        const payload = {
            noteId: note.noteId,
            noteStatus: note.noteStatus,
            brandId: brandId
        };
        axios.patch("/notes/status", note)
            .then((resp) => {
                dispatch ({
                    type: CHANGE_STATUS_NOTE,
                    payload,
                    newNote: resp.data
                })
            })
    },
    selectBrand(brandSelected) {
        return {
            type: SELECT_BRAND,
            brandSelected
        }
    },
    deleteNoteInBrand: (noteId, brandId)  => dispatch => {
        axios.delete(`/notes/delete/${noteId}`)
            .then(() => {
                dispatch({
                    type: DELETE_NOTE,
                    noteId: noteId,
                    brandId: brandId
                })
            })
    },
    addNoteInBrand: (note, brandId, callback) => dispatch => {
        axios.post("/notes", note)
            .then((resp) => {
                dispatch({
                    type: ADD_NOTE,
                    note: resp.data,
                    brandId: brandId
                })
                callback(false);
            })
            .catch(() => {
                callback(false);
            })

    },
    sortBrands (sortBy, sortDirection) {
        return {
            type: SORT_BRANDS,
            sortBy,
            sortDirection
        }
    },
    filterBrands (values, clear) {
        return {
            type: FILTER_BRANDS,
            values,
            clear
        }
    },
    getItemsForSelect() {
        return {
            type: GET_DATA_FOR_SELECT_BRAND,
        }
    },
    importBrandExcel: (file, callback) => dispatch => {
        axios.post("/brands/importExcel", file)
            .then((resp) => {
                dispatch({
                    type: ADD_BRANDS,
                    newBrands: resp.data
                })
                callback({status: true, data: resp.data});
            })
            .catch(() => {
                callback(false);
            })
    }
}