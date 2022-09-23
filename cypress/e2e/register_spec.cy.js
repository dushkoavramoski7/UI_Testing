/// <reference types="cypress" />
context('Register page tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/register')
    })
    it('Display error messages', () => {

        cy.findByRole('textbox', {  name: /username/i})
            .click()

        cy.findByRole('textbox', {  name: /email/i})
            .click()

        cy.get('#password')
            .click()

        cy.get('.iCheck-helper')
            .click()

        cy.get('h3')
            .click() //click outside

        //Error messages should be displayed
        cy.findByText(/username is required\./i).should("exist")
        cy.findByText(/email is required\./i).should("exist")
        cy.findByText(/password is required\./i).should("exist")
        cy.findByText(/email not valid\./i).should("not.exist") // error message only for 'required' filed is shown

        //enter some credentials
        cy.findByRole('textbox', {  name: /username/i})
            .type("user123")

        cy.findByRole('textbox', {  name: /email/i})
            .type("not_a_valid_email")

        cy.get('#password')
            .type("password")


        //Error messages should not be displayed
        cy.findByText(/username is required\./i).should("not.exist")
        cy.findByText(/email is required\./i).should("not.exist")
        cy.findByText(/password is required\./i).should("not.exist")
        cy.findByText(/email not valid\./i).should("exist")// error message for 'email validation' is shown

        //enter valid email
        cy.findByRole('textbox', {  name: /email/i})
            .clear()
            .type("valid_email@hotmail.com")

        //Error messages should not be displayed
        cy.findByText(/username is required\./i).should("not.exist")
        cy.findByText(/email is required\./i).should("not.exist")
        cy.findByText(/email not valid\./i).should("not.exist")
        cy.findByText(/password is required\./i).should("not.exist")


        //create user
        cy.findByRole('button', {  name: /register/i})
            .click()

        //validate that login page is shown
        cy.get('[data-test="loginView"]').should("exist")

        //assert that message for successfully created user is displayed
        cy.findByText(/user created! use same credentials to login\./i).should("exist")

    })

})