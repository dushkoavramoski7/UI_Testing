import React from 'react';
import ReactDOM from 'react-dom';
import SearchInputTable from '../SearchInputTable';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {store} from "../../../redux/reducers";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

afterEach(cleanup);

it('SearchInputTable renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><SearchInputTable></SearchInputTable></BrowserRouter></Provider>,div)
})

test('Test to check if input is empty on initial load', async ()=>{
    render(<Provider store={store}><BrowserRouter><SearchInputTable/></BrowserRouter></Provider>)
    const searchInput = screen.getByPlaceholderText("Search")
    expect(searchInput).toHaveTextContent("")
})
