import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";
import AddNoteBrandForm from "../../forms/AddNoteForm";

afterEach(cleanup);

it('Export modal renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><AddNoteBrandForm/></BrowserRouter></Provider>,div)
})

test('Test to check if submit button is enabled/disabled', async ()=>{
    render(<Provider store={store}><BrowserRouter><AddNoteBrandForm/></BrowserRouter></Provider>)

    const submitButton = screen.getByText("Submit")

    expect(await submitButton).toBeInTheDocument()
    expect(await submitButton).toBeDisabled()
    expect(await submitButton).toHaveTextContent("Submit")
    fireEvent.click(await submitButton)
})
