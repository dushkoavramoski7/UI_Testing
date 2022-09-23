import React from 'react';
import ReactDOM from 'react-dom';
import PaginationHeader from '../PaginationHeader';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";

afterEach(cleanup);

it('PaginationHeader renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><PaginationHeader></PaginationHeader></BrowserRouter></Provider>,div)
})

test('Test if on initial load to have 15 entities', ()=>{
    render(<Provider store={store}><BrowserRouter><PaginationHeader itemsPerPage={15} setItemsPerPage={15} setPage={0}
                                                                  setEndOffset={15} setItemOffset={0}/></BrowserRouter></Provider>);
    const comboBox = screen.getByRole('combobox');
    expect(comboBox).toBeInTheDocument();
    expect(comboBox).toHaveValue("15")
})