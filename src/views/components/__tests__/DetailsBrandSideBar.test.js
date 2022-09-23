import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../../LoginView';
import DetailsBrandSideBar from '../DetailsBrandSideBar';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";

import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";

afterEach(cleanup);


it('DetailsBrandSideBar view renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><DetailsBrandSideBar/></BrowserRouter></Provider>,div)
})

