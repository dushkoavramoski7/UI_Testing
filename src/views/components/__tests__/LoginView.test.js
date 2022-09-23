import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from '../../LoginView';
import RegisterView from '../../RegisterView';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from "react-router-dom";
import MainButtons from "../MainButtons";
import BreadCrumbs from "../BreadCrumbs";
import {Provider} from "react-redux";
import {store} from "../../../redux/reducers";

it('Login view renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><BrowserRouter><LoginView/></BrowserRouter></Provider>,div)
})

test('Test to check initial state of login button and inputs and state when writing text in inputs', async ()=>{
    render(<Provider store={store}><BrowserRouter><LoginView/></BrowserRouter></Provider>)
    const loginButton = screen.getByRole('button', {name: /login/i})
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })
    const paswordInput = screen.getByLabelText(/password/i)
    expect(await loginButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await loginButton).toBeDisabled()
    expect(await loginButton).toHaveTextContent("Login")
    fireEvent.change(usernameInput, {'target': {'value':"Slavko"}})
    fireEvent.change(paswordInput, {'target': {'value':"password123"}})
    expect(await loginButton).toBeEnabled()
})

test('Test while username input has text and password is empty (button should be disabled) ', async ()=>{
    render(<Provider store={store}><BrowserRouter><LoginView/></BrowserRouter></Provider>)
    const loginButton = screen.getByRole('button', {name: /login/i})
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })
    const paswordInput = screen.getByLabelText(/password/i)
    expect(await loginButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await loginButton).toBeDisabled()
    expect(await loginButton).toHaveTextContent("Login")
    fireEvent.change(usernameInput, {'target': {'value':"Slavko"}})
    fireEvent.change(paswordInput, {'target': {'value':""}})
    expect(await loginButton).toBeDisabled()
})

test('Test while password input has text and username is empty (button should be disabled) ', async ()=>{
    render(<Provider store={store}><BrowserRouter><LoginView/></BrowserRouter></Provider>)
    const loginButton = screen.getByRole('button', {name: /login/i})
    const usernameInput = screen.getByRole('textbox', {
        name: /username/i
    })
    const paswordInput = screen.getByLabelText(/password/i)
    expect(await loginButton).toBeInTheDocument()
    expect(await usernameInput).toBeInTheDocument()
    expect(await paswordInput).toBeInTheDocument()
    expect(await loginButton).toBeDisabled()
    expect(await loginButton).toHaveTextContent("Login")
    fireEvent.change(usernameInput, {'target': {'value':""}})
    fireEvent.change(paswordInput, {'target': {'value':"password123"}})
    expect(await loginButton).toBeDisabled()
})


test('Test if Create Account button and forget password are enabled and are present in the document) ', async ()=>{
    render(<Provider store={store}><BrowserRouter><LoginView/></BrowserRouter></Provider>)
    const createAccountButton = screen.getByRole('link', {  name: /create an account/i})
    const forgotPassword = screen.getByText(/forgot password\?/i)
    expect(await createAccountButton).toBeInTheDocument()
    expect(await forgotPassword).toBeInTheDocument()
    expect(createAccountButton).toBeEnabled()
    expect(forgotPassword).toBeEnabled()
})
