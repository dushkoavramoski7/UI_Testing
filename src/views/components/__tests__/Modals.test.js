import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";
import DeleteModal from "../../modal/DeleteModal"
import ExportModal from "../../modal/ExportDataModal"
import ImportModal from "../../modal/ImportDataModal"


afterEach(cleanup);


it('Export modal renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><ExportModal/></BrowserRouter></Provider>,div)
})

it('Import modal renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><ImportModal/></BrowserRouter></Provider>,div)
})

it('Delete modal renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><DeleteModal show={'1'} closeDeleteDialog={false} deleteItem={'1'} itemToBeDeleted={['Brand Name: ', 'Brand Manufacturer: ']}/></BrowserRouter></Provider>,div)
})