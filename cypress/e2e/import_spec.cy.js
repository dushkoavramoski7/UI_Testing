/// <reference types="cypress" />

context('Import brand tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/brands')

        cy.wait(1000)
    })

    it("Import file", () => {
        cy.wait(1000)
        //search for example brand that will be later imported trough excel

        //search brand Heineken
        cy.findByRole('textbox')
            .type("Heineken")

        cy.get('body')
            .then(($element) => {
                if ($element.find('[style="text-align: center;"] > span').length > 0) {
                    // No brand with name was found
                    //import can continue
                }
                else {
                    //delete Heineken, to verify that it will be added trough excel
                    cy.get('[data-testid="CloseRoundedIcon"]')
                        .click()
                    cy.wait(1000)

                    //Assert that delete modal is open
                    cy.get('[data-test="deleteModal"]').should("exist")

                    //delete brand
                    cy.findByRole('button', {  name: /delete/i})
                        .click()
                }
                cy.wait(2000)
            })

        //open modal
        cy.get('[data-test="importModal"]').should("not.exist")
        cy.findByText(/import/i)
            .click()
        cy.get('[data-test="importModal"]').should("exist")

        cy.wait(1000)

        //download file
        cy.get('[data-test="downloadBrandExcel"] > .btn')
            .click() // file will be saved in the cypress/downloads folder

        cy.wait(2000)

        //upload file
        cy.findByLabelText(/choose file/i)
            .attachFile("../downloads/Brands.xlsx") //get file from cypress/downloads folder were was previously saved


        //submit import
        cy.findByRole('button', {  name: /upload/i})
            .should("exist")
            .should("not.be.disabled")
            .click()

        cy.wait(10000)

        //search brand Heineken
        cy.findByRole('textbox')
            .type("Heineken")
        //check that Heineken brand was added, Assert that "Heineken" details sidebar is shown
        cy.get('[data-test="selectedBrandName"]')
            .should($brand => {
                const brand = ($brand.text()).toLowerCase()
                expect(brand).to.be.contain("Heineken".toLowerCase())
            })
            .then($brand => ($brand.text()))
        cy.wait(1000)


    })


})