/// <reference types="cypress" />

context('Login page tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/login')
    })

    it('Display error messages', () => {
        //Test if onBlur function works for displaying error messages
        cy.findByRole('textbox', {  name: /username/i})
            .click()
        cy.findByLabelText(/password/i)
            .click()

        cy.get('.row.p-2 > .p-2').click()

        //Error messages should be displayed
        cy.findByText(/username is required\./i).should("exist")
        cy.findByText(/password is required\./i).should("exist")

        //Enter credentials
        cy.findByRole('textbox', {  name: /username/i})
            .type("admin")
        cy.findByLabelText(/password/i)
            .type("admin")

        //Error messages should not be displayed
        cy.findByText(/username is required\./i).should("not.exist")
        cy.findByText(/password is required\./i).should("not.exist")


        //remove entered text in inputs
        cy.findByRole('textbox', {  name: /username/i})
            .clear()
        cy.findByLabelText(/password/i)
            .clear()
        //Error messages should be displayed
        cy.findByText(/username is required\./i).should("exist")
        cy.findByText(/password is required\./i).should("exist")

        cy.get('.row.p-2 > .p-2').click()

        cy.wait(1000)
        //Enter credentials
        cy.findByRole('textbox', {  name: /username/i})
            .type("admin")
        cy.findByLabelText(/password/i)
            .type("admin")
        cy.get('.iCheck-helper')
            .click()

        //login
        cy.findByRole('button', {  name: /login/i})
            .click()
    })
})