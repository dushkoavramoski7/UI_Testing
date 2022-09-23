import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";
import {BrowserRouter} from "react-router-dom";
import BrandView from "../../BrandView";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import PopoverFiler from "../PopoverFilter";
import FilterChipBrandIndicators from '../FilterChipBrandIndicators'


test('Brand view renders without error', async ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><BrandView/></BrowserRouter></Provider>,div)
})

test('Popover filer renders without error', async ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><PopoverFiler/></BrowserRouter></Provider>,div)
})

test('Filter Chip Brand Indicators component renders without error', async ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><FilterChipBrandIndicators/></BrowserRouter></Provider>,div)
})
