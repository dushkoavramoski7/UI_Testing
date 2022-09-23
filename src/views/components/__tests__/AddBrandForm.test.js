import React from 'react';
import ReactDOM from 'react-dom';
import AddBrandForm from '../../forms/AddBrandForm';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";
import PaginationHeader from "../PaginationHeader";

afterEach(cleanup);

it('Test if Add form renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>,div)
})

test('Test if ', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandNameInput = screen.getByRole('textbox', {  name: /name \*/i})
    const brandManufacturerInput = screen.getByRole('textbox', {  name: /manufacturer \*/i})
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})

    expect(brandDescriptionInput).toBeInTheDocument()
    expect(brandManufacturerInput).toBeInTheDocument()
    expect(brandDescriptionInput).toBeInTheDocument()

    expect(brandDescriptionInput).toHaveValue("")
    expect(brandManufacturerInput).toHaveValue("")
    expect(brandDescriptionInput).toHaveValue("")
})

test('Test if on initial load to have 15 entities', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandNameInput = screen.getByRole('textbox', {  name: /name \*/i})
    const brandManufacturerInput = screen.getByRole('textbox', {  name: /manufacturer \*/i})
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})

    expect(brandNameInput).toBeInTheDocument()
    expect(brandManufacturerInput).toBeInTheDocument()
    expect(brandDescriptionInput).toBeInTheDocument()

    expect(brandNameInput).toHaveValue("")
    expect(brandManufacturerInput).toHaveValue("")
    expect(brandDescriptionInput).toHaveValue("")

})

test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v1', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandDescriptionInput).toBeInTheDocument()

    fireEvent.change(brandDescriptionInput, {'target': {'value':"someDesc"}})
    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()
})

test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v2', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandNameInput = screen.getByRole('textbox', {  name: /name \*/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandNameInput).toBeInTheDocument()

    fireEvent.change(brandNameInput, {'target': {'value':"Coca-cola"}})
    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()
})


test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v3', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandManufacturerInput = screen.getByRole('textbox', {  name: /manufacturer \*/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandManufacturerInput).toBeInTheDocument()

    fireEvent.change(brandManufacturerInput, {'target': {'value':"manufacturer"}})
    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()
})

test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v4', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandNameInput = screen.getByRole('textbox', {  name: /name \*/i})
    const brandManufacturerInput = screen.getByRole('textbox', {  name: /manufacturer \*/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandNameInput).toBeInTheDocument()
    expect(brandManufacturerInput).toBeInTheDocument()

    fireEvent.change(brandManufacturerInput, {'target': {'value':"manufacturer"}})
    fireEvent.change(brandNameInput, {'target': {'value':"Fanta"}})

    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()

})

test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v5', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandNameInput = screen.getByRole('textbox', {  name: /name \*/i})
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandNameInput).toBeInTheDocument()
    expect(brandDescriptionInput).toBeInTheDocument()

    fireEvent.change(brandDescriptionInput, {'target': {'value':"someDesc"}})
    fireEvent.change(brandNameInput, {'target': {'value':"Fanta"}})

    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()

})

test('Test if buttons cancel and save are enabled/disabled when writing text in inputs v6', ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandManufacturerInput = screen.getByRole('textbox', {  name: /manufacturer \*/i})
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})
    const saveButton = screen.getByRole('button', {  name: /save/i})
    const cancelButton = screen.getByRole('heading', {  name: /cancel/i})

    expect(brandManufacturerInput).toBeInTheDocument()
    expect(brandDescriptionInput).toBeInTheDocument()

    fireEvent.change(brandDescriptionInput, {'target': {'value':"someDesc"}})
    fireEvent.change(brandManufacturerInput, {'target': {'value':"manuf"}})

    expect(cancelButton).toBeEnabled();
    expect(saveButton).toBeEnabled()

})

test('Test if counting letters in brand description worsk properly on initial load', async ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})
    const countingLetters = screen.getByTestId("countingLetters")

    expect(await brandDescriptionInput).toBeInTheDocument()
    expect(await countingLetters).toHaveTextContent("0/400")
})

test('Test if counting letters in brand description worsk properly', async ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);
    const brandDescriptionInput = screen.getByRole('textbox', {  name: /description/i})
    const countingLetters = screen.getByTestId("countingLetters")

    expect(await brandDescriptionInput).toBeInTheDocument()

    fireEvent.change(await brandDescriptionInput, {'target': {'value':"desc"}})

    expect(await countingLetters).toHaveTextContent("4/400")
})

test('Test if active brand is Add Form', async ()=>{
    render(<Provider store={store}><BrowserRouter><AddBrandForm></AddBrandForm></BrowserRouter></Provider>);

    expect(screen.getByTestId('activeBrand')).toHaveTextContent("Add Brand");
})
