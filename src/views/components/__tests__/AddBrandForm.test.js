import React from 'react';
import ReactDOM from 'react-dom';
import AddBrandForm from '../../forms/AddBrandForm';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";

afterEach(cleanup);

it('AddBrandForm renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<AddBrandForm/>,div)
})