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
import {replaceArray} from "../../utils/utils";
import {addElementToArrayIfNotExist} from "../../utils/utils";

const initialState = {
    brands: [],
    allBrands: [],
    brandSelected: {},
    filterBy: {brandName: [], brandManufacturer: [], brandActiveFlag: '', brandCreatedAfter: null, brandCreatedBefore: null},
    brandManufacturers: [],
    brandNames: [],
    fetchedBrand: {}
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRANDS: {
            return {
                ...state,
                brands: action.brands,
                allBrands: action.brands,
                brandSelected: action.brands[0]
            }
        }
        case FETCH_BRAND: {
            return {
                ...state,
                brands: addElementToArrayIfNotExist(action.brand, state.brands),
                allBrands: addElementToArrayIfNotExist(action.brand, state.allBrands),
                fetchedBrand: action.brand
            }
        }
        case ADD_BRAND: {
            return {
              ...state
            }
        }
        case EDIT_BRAND: {
            return {
                ...state
            }
        }
        case SEARCH_BRANDS: {
            let brands = state.allBrands.filter(brand => (brand.brandName.toString().toUpperCase().includes(action.searchVal.toString().toUpperCase()) ||
                brand.brandManufacturer.toString().toUpperCase().includes(action.searchVal.toString().toUpperCase())));

            let selectedBrand = state.allBrands[0]
            if(brands.length!==0)
            {
                selectedBrand = brands[0];
            }
            else if(brands.length===0)
            {
                selectedBrand = {}
            }
            return {
                ...state,
                brands: brands,
                brandSelected: selectedBrand,
                filterBy: {
                    brandName: '',
                    brandManufacturer: '',
                    brandActiveFlag: '',
                    brandCreatedAfter: null,
                    brandCreatedBefore: null
                }
            }
        }
        case CHANGE_STATUS_BRAND: {
            let oldBrand1 = state.allBrands.find(brand => brand.brandId === action.payload.brandId);
            let newBrand1 = {
                ...oldBrand1,
                brandActiveFlag: action.payload.brandActiveFlag === 0 ? 1 : 0,
            }
            let oldBrand2 = state.brands.find(brand => brand.brandId === action.payload.brandId);
            let newBrand2 = {
                ...oldBrand2,
                brandActiveFlag: action.payload.brandActiveFlag === 0 ? 1 : 0,
            }
            let brands = state.brands;
            let allBrands = state.allBrands;
            return {
                ...state,
                allBrands: replaceArray(newBrand1, oldBrand1, allBrands),
                brands: replaceArray(newBrand2, oldBrand2, brands),
            }
        }
        case ALL_BRANDS: {
            let allBrands = state.allBrands;
            return {
                ...state,
                brands: allBrands,
                brandSelected: allBrands[0]
            }
        }
        case DELETE_BRAND: {
            return {
                ...state,
                brands: state.brands.filter(brand => brand.brandId !== action.brandId),
                allBrands: state.allBrands.filter(brand => brand.brandId !== action.brandId),
                brandSelected: state.brands.filter(brand => brand.brandId !== action.brandId).length === 0 ? {} : state.brands.filter(brand => brand.brandId !== action.brandId)[0]
            };
        }
        case CHANGE_STATUS_NOTE: {
            let oldBrand1 = state.brands.find(brand => brand.brandId === action.payload.brandId)
            let notes1 = oldBrand1.notes;
            let oldNote1 = notes1.find(note => note.noteId === action.payload.noteId);
            let newNote1 = {
                ...oldNote1,
                noteStatus: action.newNote.noteStatus,
                formattedNoteStatus: action.newNote.formattedNoteStatus
            }
            let newNotes1 = replaceArray(newNote1, oldNote1, notes1);
            let newBrand1 = {
                ...oldBrand1,
                notes: newNotes1
            }

            let oldBrand2 = state.allBrands.find(brand => brand.brandId === action.payload.brandId)
            let notes2 = oldBrand2.notes;
            let oldNote2 = notes2.find(note => note.noteId === action.payload.noteId);
            let newNote2 = {
                ...oldNote2,
                noteStatus: action.newNote.noteStatus,
                formattedNoteStatus: action.newNote.formattedNoteStatus
            }
            let newNotes2 = replaceArray(newNote2, oldNote2, notes2);
            let newBrand2 = {
                ...oldBrand2,
                notes: newNotes2
            }
            let brands = state.brands;
            let allBrands = state.allBrands;
            return {
                ...state,
                brands: replaceArray(newBrand1, oldBrand1, brands),
                allBrands: replaceArray(newBrand2, oldBrand2, allBrands),
                brandSelected: newBrand1
            }
        }
        case SELECT_BRAND: {
            return {
                ...state,
                brandSelected: action.brandSelected
            }
        }
        case DELETE_NOTE: {
            let oldBrand1 = state.allBrands.find(brand => brand.brandId === action.brandId)
            let notesAfterDelete1 = oldBrand1.notes.filter(note => note.noteId !== action.noteId);
            let newBrand1 = {
                ...oldBrand1,
                notes: notesAfterDelete1
            }
            let oldBrand2 = state.brands.find(brand => brand.brandId === action.brandId)
            let notesAfterDelete2 = oldBrand2.notes.filter(note => note.noteId !== action.noteId);
            let newBrand2 = {
                ...oldBrand2,
                notes: notesAfterDelete2
            }
            let oldBrand3 = state.brands.find(brand => brand.brandId === action.brandId)
            let notesAfterDelete3 = oldBrand3.notes.filter(note => note.noteId !== action.noteId);
            let newBrand3 = {
                ...oldBrand3,
                notes: notesAfterDelete3
            }
            return {
                ...state,
                allBrands: replaceArray(newBrand1, oldBrand1, state.allBrands),
                brands: replaceArray(newBrand2, oldBrand2, state.brands),
                brandSelected:newBrand3
            };
        }
        case ADD_NOTE: {
            let note = action.note;

            let oldBrand1 = state.allBrands.find(brand => brand.brandId === action.brandId)
            let notes1 = [note, ...oldBrand1.notes];
            let newBrand1 = {
                ...oldBrand1,
                notes: notes1
            }
            let oldBrand2 = state.brands.find(brand => brand.brandId === action.brandId)
            let notes2 = [note, ...oldBrand2.notes];
            let newBrand2 = {
                ...oldBrand2,
                notes: notes2
            }
            let oldBrand3 = state.brandSelected;
            let notes3 = [note, ...oldBrand3.notes];
            let newBrand3 = {
                ...oldBrand3,
                notes: notes3
            }
            return {
                ...state,
                allBrands: replaceArray(newBrand1, oldBrand1, state.allBrands),
                brands: replaceArray(newBrand2, oldBrand2, state.brands),
                brandSelected:newBrand3
            };
        }
        case SORT_BRANDS: {
            const sortElementsAsc = (brands) => {
                if(action.sortBy === 'brandManufacturer')
                    return brands.slice().sort((a, b) => a.brandManufacturer.toString().toUpperCase() > b.brandManufacturer.toString().toUpperCase() ? 1 : -1)
                else if(action.sortBy === 'brandName')
                    return brands.slice().sort((a, b) => a.brandName.toString().toUpperCase() > b.brandName.toString().toUpperCase() ? 1 : -1)
                else if(action.sortBy === 'brandActiveFlag')
                    return brands.slice().sort((a, b) => a.brandActiveFlag > b.brandActiveFlag ? 1 : -1)
            }
            const sortElementsDesc = (brands) => {
                if(action.sortBy === 'brandManufacturer')
                    return brands.slice().sort((a, b) => a.brandManufacturer.toString().toUpperCase() < b.brandManufacturer.toString().toUpperCase() ? 1 : -1)
                else if(action.sortBy === 'brandName')
                    return brands.slice().sort((a, b) => a.brandName.toString().toUpperCase() < b.brandName.toString().toUpperCase() ? 1 : -1)
                else if(action.sortBy === 'brandActiveFlag')
                    return brands.slice().sort((a, b) => a.brandActiveFlag < b.brandActiveFlag ? 1 : -1)
            }
            return {
                ...state,
                allBrands: action.sortDirection === 'asc' ?  sortElementsAsc(state.allBrands) : sortElementsDesc(state.allBrands),
                brands: action.sortDirection === 'asc' ? sortElementsAsc(state.brands) : sortElementsDesc(state.brands),
            }
        }
        case FILTER_BRANDS: {
            let filteredBrands_unique = state.allBrands;
            let filteredBrands = [];

            if(!action.clear) {
                filteredBrands_unique = [];
                if(action.values.brandName.length !== 0 || action.values.brandManufacturer.length !== 0 || action.values.brandCreatedAfter !== null || action.values.brandCreatedBefore !== null) {
                    if (action.values.brandName.length !== 0) {
                        action.values.brandName.forEach((selectedVal) => (
                                state.allBrands.filter(brand => (brand.brandName.toString() === selectedVal.toString())
                                && ((action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true))
                                    .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                            )
                        )
                    }
                    if (action.values.brandManufacturer.length !== 0) {
                        action.values.brandManufacturer.forEach((selectedVal) => (
                                state.allBrands.filter(brand => (brand.brandManufacturer.toString() === selectedVal.toString())
                                && ((action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true))
                                    .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                            )
                        )
                    }
                    if(action.values.brandCreatedAfter !== null && action.values.brandCreatedBefore !== null) {
                        state.allBrands.filter(brand => Date.parse((new Date(brand.brandDateCreated)).toLocaleDateString().toString()) >= Date.parse(action.values.brandCreatedAfter.toLocaleDateString().toString()) &&  Date.parse(brand.brandDateCreated) <= action.values.brandCreatedBefore.setUTCHours(21, 59, 59, 999)
                                    && ((action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true))
                                    .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                    }
                    else if(action.values.brandCreatedAfter !== null && action.values.brandCreatedBefore === null) {
                        state.allBrands.filter(brand => (Date.parse((new Date(brand.brandDateCreated)).toLocaleDateString().toString()) >= Date.parse(action.values.brandCreatedAfter.toLocaleDateString().toString()))
                            && ((action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true))
                            .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                    }
                    else if(action.values.brandCreatedBefore !== null && action.values.brandCreatedAfter === null) {
                        state.allBrands.filter(brand => (Date.parse(brand.brandDateCreated) <= action.values.brandCreatedBefore.setUTCHours(21, 59,59,999))
                            && ((action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true))
                            .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                    }
                }
                else {
                        state.allBrands.filter(brand => (action.values.brandActiveFlag !== '') ? (brand.brandActiveFlag.toString() === action.values.brandActiveFlag) : true)
                            .map(filteredBrand => filteredBrands_unique = addElementToArrayIfNotExist(filteredBrand, filteredBrands))
                }
            }

            let selectedBrand = state.allBrands[0]
            if(filteredBrands_unique.length!==0)
            {
                selectedBrand = filteredBrands_unique[0];
            }
            if(filteredBrands_unique === state.allBrands)
            {
                selectedBrand = state.brandSelected
            }
            else if(filteredBrands_unique.length === 0) {
                selectedBrand = {}
            }
            return {
                ...state,
                brands: filteredBrands_unique.sort((a, b) => a.brandName.toString().toUpperCase() < b.brandName.toString().toUpperCase() ? -1 : 1),
                brandSelected: selectedBrand,
                filterBy: {
                    brandName: action.values.brandName,
                    brandManufacturer: action.values.brandManufacturer,
                    brandActiveFlag: action.values.brandActiveFlag,
                    brandCreatedAfter: action.values.brandCreatedAfter,
                    brandCreatedBefore: action.values.brandCreatedBefore,
                }
            }
        }
        case GET_DATA_FOR_SELECT_BRAND: {
            let brandManufacturers = [];
            let brandNames = [];
            state.allBrands.forEach((brand) => {
                if(brandManufacturers.filter(e => e.name === brand.brandManufacturer).length === 0)
                    brandManufacturers.push({name: brand.brandManufacturer, value: brand.brandManufacturer})
                if(brandNames.filter(e => e.name === brand.brandName).length === 0)
                    brandNames.push({name: brand.brandName, value: brand.brandName})
            })
            return {
                ...state,
                brandManufacturers: brandManufacturers.sort((a, b) => a.name.toString().toUpperCase() < b.name.toString().toUpperCase() ? -1 : 1),
                brandNames: brandNames.sort((a, b) => a.name.toString().toUpperCase() < b.name.toString().toUpperCase() ? -1 : 1)
            }
        }
        case ADD_BRANDS: {
            state.allBrands.push.apply(state.allBrands, action.newBrands)
            return {
                ...state,
                filterBy: {
                    brandName: [],
                    brandManufacturer: [],
                    brandActiveFlag: '',
                    brandCreatedAfter: null,
                    brandCreatedBefore: null,
                },
            }
        }
        default:
            return state
    }
}
export default reducer;