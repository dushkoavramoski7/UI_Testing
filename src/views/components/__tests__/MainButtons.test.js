import React from 'react';
import ReactDOM from 'react-dom';
import MainButtons from '../MainButtons';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<MainButtons></MainButtons>,div)
})

test('test to check if Export button is enabled on initial load', async ()=>{
    render(<MainButtons addItemLink={'Export'} openExportModal={true} openImportModal={true}/>)
    expect(await screen.findByRole('button', {name: /export/i})).toBeEnabled();
})

test('test to check if Import button is enabled on initial load', async ()=>{
    render(<MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/>)
    expect(await screen.findByRole('button', {name: /import/i})).toBeEnabled();
})

test('test to check if Import button has expected text', async ()=>{
    render(<MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/>)
    expect(await screen.findByRole('button', {name: /import/i})).toHaveTextContent("Import");
})

test('test to check if Export button has expected text', async ()=>{
    render(<MainButtons addItemLink={'Import'} openExportModal={true} openImportModal={true}/>)
    expect(await screen.findByRole('button', {name: /export/i})).toHaveTextContent("Export");
})


