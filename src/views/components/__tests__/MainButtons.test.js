import React from 'react';
import ReactDOM from 'react-dom';
import MainButtons from '../MainButtons';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";

afterEach(cleanup);

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MainButtons></MainButtons></BrowserRouter>,div)
})

test('test to check if Export button is enabled on initial load', async ()=>{
    render(<BrowserRouter><MainButtons addItemLink={'Export'} openExportModal={true} openImportModal={true}/></BrowserRouter>)
    expect(await screen.findByRole('button', {name: /export/i})).toBeEnabled();
})

test('test to check if Import button is enabled on initial load', async ()=>{
    render(<BrowserRouter><MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/></BrowserRouter>)
    expect(await screen.findByRole('button', {name: /import/i})).toBeEnabled();
})

test('test to check if Import button has expected text', async ()=>{
    render(<BrowserRouter><MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/></BrowserRouter>)
    expect(await screen.findByRole('button', {name: /import/i})).toHaveTextContent("Import");
})

test('test to check if Export button has expected text', async ()=>{
    render(<BrowserRouter><MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/></BrowserRouter>)
    expect(await screen.findByRole('button', {name: /export/i})).toHaveTextContent("Export");
})

test('test to check if add button is enabled, has name NEW and it is clickable', async ()=>{
    render(<BrowserRouter><MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/></BrowserRouter>)
    const addButton = screen.getByRole('link', {name: /new/i})
    expect(await addButton).toBeEnabled()
    expect(await addButton).toHaveTextContent("NEW")
})