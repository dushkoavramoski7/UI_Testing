import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../../LoginView';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";

it('AddBrandForm renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<LoginView></LoginView>,div)
})
