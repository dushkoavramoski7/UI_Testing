context('Add brand page tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/brands')
    })

    it('Add brand', () => {
        //Assert that brand view is shown
        cy.get('[data-test="brandView"]').should("exist")

        cy.wait(2000)

        //search brand test_brand_to_be_deleted
        cy.findByRole('textbox')
            .type("test_brand_to_be_deleted")

        cy.get('body')
            .then(($element) => {
                if ($element.find('[style="text-align: center;"] > span').length > 0) {
                    // No brand with name was found
                }
                else {
                    cy.get('[data-testid="CloseRoundedIcon"]')
                        .click()
                    cy.wait(1000)

                    //Assert that delete modal is open
                    cy.get('[data-test="deleteModal"]').should("exist")

                    //delete brand
                    cy.findByRole('button', {  name: /delete/i})
                        .click()
                    cy.wait(1000)
                }
            })

        cy.wait(2000)
        cy.get('[data-test="addBrandButton"]')
            .click()


        //Assert that add brand view is open
        cy.get('[data-test="addBrandView"]').should("exist")


        //display input fields errors
        cy.findByRole('button', {  name: /save/i})
            .should("not.be.disabled")
        cy.findByRole('button', {  name: /save/i})
            .click()

        //Error messages should be displayed
        cy.findByText(/brand name is required\./i).should("exist")
        cy.findByText(/brand manufacturer is required\./i).should("exist")

        cy.findByRole('button', {  name: /save/i})
            .should("be.disabled")


        //enter into input fields data
        cy.findByRole('textbox', {  name: /name \*/i})
            .type("test_brand_to_be_deleted")

        cy.findByRole('textbox', {  name: /manufacturer \*/i})
            .type("test_manufacturer_to_be_deleted")

        cy.findByRole('textbox', {  name: /description/i})
            .type("test_description_to_be_deleted")


        //submit
        cy.findByRole('button', {  name: /save/i})
            .should("not.be.disabled")
            .click()

        cy.wait(4000)
        cy.visit('/brands')

        //Assert that brand view is shown
        cy.get('[data-test="brandView"]').should("exist")

    })

})