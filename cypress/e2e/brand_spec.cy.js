/// <reference types="cypress" />

context('Brand page tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/login')

        //enter credentials for login
        cy.findByRole('textbox', {  name: /username/i})
            .type("admin")
        cy.findByLabelText(/password/i)
            .type("admin")
        cy.get('.iCheck-helper')
            .click()
        cy.findByRole('button', {  name: /login/i})
            .click()

        //Assert that brand view is shown
        cy.get('[data-test="brandView"]').should("exist")
        cy.wait(1000)
    })

    it('Change active status for brand Xiaomi', () => {
        //Assert that first brand is shown in details sidebar
        let brand;
        cy.get(':nth-child(1) > [data-test="brandName"]').first()
            .then($brand => brand = ($brand.text()).toLowerCase())

        cy.get('[data-test="selectedBrandName"]')
            .should($brand => {
                const brandSelected = ($brand.text()).toLowerCase()
                expect(brand).to.be.equal(brandSelected)

            })
            .then($brand => ($brand.text()))

        //Assert that 15 brands are shown per page
        cy.findByRole('combobox').should('have.value', '15')
        cy.wait(1000)

        //search brand Xiaomi
        cy.findByRole('textbox')
            .type("Xiaomi")

        //Assert that "Xiaomi" details sidebar is shown
        cy.get('[data-test="selectedBrandName"]')
            .should($brand => {
                const brand = ($brand.text()).toLowerCase()
                expect(brand).to.be.contain("Xiaomi".toLowerCase())
            })
            .then($brand => ($brand.text()))

        //Click checkbox for active status
        cy.get('[data-test="checkbox"] > .PrivateSwitchBase-input')
            .first().click()
        cy.wait(2000)

        //Logout
        cy.findByRole('link', {  name: /log out/i})
            .click()

        //Assert that logout page is shown
        cy.get('[data-test="logoutView"]').should("exist")

    })

    it("Active navbar brand item", () => {
        let classes;
        cy.findByRole('link', {  name: /items/i})
            .then($item => $item.parent())
            .should($parent => {
                classes = $parent[0].className;
                expect(classes).to.match(/active/)
            })

        cy.findByRole('link', {  name: /brand/i})
            .then($item => $item.parent())
            .should($parent => {
                classes = $parent[0].className;
                expect(classes).to.match(/active/)
            })

        cy.findByRole('link', {  name: /items/i})
            .click()
            .then($item => $item.parent())
            .should($parent => {
                classes = $parent[0].className;
                expect(classes).to.not.match(/active/)
            })

        cy.findByRole('link', {  name: /brand/i})
            .then($item => $item.parent())
            .should($parent => {
                classes = $parent[0].className;
                expect(classes).to.match(/active/)
            })
        cy.wait(1000)
        cy.findByRole('link', {  name: /items/i})
            .click()
            .then($item => $item.parent())
            .should($parent => {
                classes = $parent[0].className;
                expect(classes).to.match(/active/)
            })
        cy.wait(1000)
    })

})