import React from 'react';
import ReactDOM from 'react-dom';
import RegisterView from '../../RegisterView';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";


test('this is test for Register View', async ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><RegisterView></RegisterView></BrowserRouter></Provider>,div)
})

// test('Test to check initial state of register button and inputs and state when writing text in inputs', async ()=>{
//     render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
//     const registerButton = screen.getByRole('button', {
//         name: /register/i
//     })
//     const usernameInput = screen.getByRole('textbox', {
//         name: /username/i
//     })
//     const paswordInput = screen.getByLabelText(/password/i)
//     const emailInput = screen.getByRole('textbox', {  name: /email/i})
//     const agreeAndTerms = screen.getByText(/agree the terms and policy/i)
//     const checkbox = screen.getByTestId('checkboxInput')
//     expect(await registerButton).toBeInTheDocument()
//     expect(await usernameInput).toBeInTheDocument()
//     expect(await emailInput).toBeInTheDocument()
//     expect(await paswordInput).toBeInTheDocument()
//     expect(await registerButton).toBeDisabled()
//     expect(await registerButton).toHaveTextContent("Register")
//     fireEvent.change(usernameInput, {'target': {'value':"Slavko"}})
//     fireEvent.change(usernameInput, {'target': {'value':"slavkoanakievski@gmail.com"}})
//     fireEvent.change(paswordInput, {'target': {'value':"password123"}})
//     fireEvent.click(await checkbox)
//     expect(await checkbox.checked).toEqual(true)
//
// })

// test('Test if error message works properly) ', async ()=>{
//     render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
//
//     const emailInput = screen.getByRole('textbox', {  name: /email/i})
//     expect(await emailInput).toBeInTheDocument()
//     fireEvent.change(emailInput, {'target': {'value':"slavko"}})
//     fireEvent.click(screen.getByText(/agree the terms and policy/i))
//     expect(emailInput).toHaveClass("Mui-error")
// })
//Mui-error