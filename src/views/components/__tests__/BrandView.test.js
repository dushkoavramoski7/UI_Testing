import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";
import {BrowserRouter} from "react-router-dom";
import BrandView from "../../BrandView";
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import LoginView from "../../LoginView";


test('Test to check if sasd', async ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><BrandView/></BrowserRouter></Provider>,div)
})

test('Test while username input has text and password is empty (button should be disabled) ', async ()=>{
    render(<Provider store={store}><BrowserRouter><BrandView/></BrowserRouter></Provider>)
    screen.getByRole('')
})
