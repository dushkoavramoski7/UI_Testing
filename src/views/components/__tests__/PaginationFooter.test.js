import React from 'react';
import ReactDOM from 'react-dom';
import PaginationFooter from '../PaginationFooter';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";

afterEach(cleanup);

it('PaginationFooter renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><PaginationFooter/></BrowserRouter>,div)
})

test('Test to check if next and back arrows are present', async ()=>{
    render(<Provider store={store}><BrowserRouter><PaginationFooter/></BrowserRouter></Provider>)
    const countEntites = screen.getByTestId('NavigateNextIcon')
    expect(countEntites).toBeInTheDocument()
})
