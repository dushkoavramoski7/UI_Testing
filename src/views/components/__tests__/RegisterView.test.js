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

test('Test to check initial state of register button and inputs and state when writing text in inputs and checked agreements checkbox', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(usernameInput, {'target': {'value':"Slavko"}})
    fireEvent.change(emailInput, {'target': {'value':"slavkoanakievski@gmail.com"}})
    fireEvent.change(paswordInput, {'target': {'value':"password123"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeEnabled();

})

test('Test to check if register button is disabled when only username is entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(usernameInput, {'target': {'value':"Slavko"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

test('Test to check if register button is disabled when only password is entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(paswordInput, {'target': {'value':"dushko123"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

test('Test to check if register button is disabled when only email is entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(emailInput, {'target': {'value':"test.test@gmail.com"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

test('Test to check if register button is disabled when username and email are entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(usernameInput, {'target': {'value':"testUsername"}})
    fireEvent.change(emailInput, {'target': {'value':"test.test@gmail.com"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

test('Test to check if register button is disabled when password and email are entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(paswordInput, {'target': {'value':"passwrod123"}})
    fireEvent.change(emailInput, {'target': {'value':"test.test@gmail.com"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

test('Test to check if register button is disabled when username and password are entered', async ()=>{
    render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
    const registerButton = screen.getByRole('button', {
        name: /register/i
    })
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })

    const paswordInput = screen.getByLabelText(/password/i)
    const emailInput = screen.getByRole('textbox', {  name: /email/i})
    const checkbox = screen.getByTestId('checkboxInput')

    expect(await registerButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await emailInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await registerButton).toBeDisabled()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.checked).toEqual(false)
    expect(await registerButton).toHaveTextContent("Register")

    fireEvent.change(usernameInput, {'target': {'value':"testUsername"}})
    fireEvent.change(paswordInput, {'target': {'value':"password123"}})
    fireEvent.click(checkbox)

    expect(checkbox.checked).toEqual(true)
    expect(await registerButton).toBeDisabled();

})

// test('Test if error message works properly', async ()=>{
//     render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
//
//     // const checkbox = screen.getByText(/agree the terms and policy/i)
//     // expect(await checkbox).toBeInTheDocument();
//     // expect(await checkbox.checked).toBeChecked()
//     screen.getByRole('')
// })
//
// // test('Test if error message works properly) ', async ()=>{
// //     render(<Provider store={store}><BrowserRouter><RegisterView/></BrowserRouter></Provider>)
// //
// //     const emailInput = screen.getByRole('textbox', {  name: /email/i})
// //     expect(await emailInput).toBeInTheDocument()
// //     fireEvent.change(emailInput, {'target': {'value':"slavko"}})
// //     fireEvent.click(screen.getByText(/agree the terms and policy/i))
// //     expect(emailInput).toHaveClass("Mui-error")
// // })
