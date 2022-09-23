import SnackbarAlert from "../SnackbarAlert";
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import {store} from "../../../redux/reducers";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

it('SnackbarAlert renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><SnackbarAlert closeSnackbar={true} snackbarMessage={'message'} snackbarStatus={'opened'}></SnackbarAlert></BrowserRouter></Provider>,div)
})

