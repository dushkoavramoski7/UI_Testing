/// <reference types="cypress" />

context('Notes tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/brands')

        //Assert that brand view is shown
        cy.get('[data-test="brandView"]').should("exist")
        cy.wait(2000)
    })

    it("Add note form should initially be closed", () => {

        //check if button (add note) exists
        cy.get('[data-test="add-note"]')
            .should("exist")
            .then($button => {
                expect($button[0].innerText.trim()).to.be.equal("Add Note")
            })

        cy.findByRole('textbox', {  name: /note text/i})
            .should("not.exist")


        cy.get('[data-test="submit-note"]')
            .should("not.be.visible")

        //all radio buttons in form should not be visible
        cy.get('.MuiRadio-root > .PrivateSwitchBase-input')
            .should("not.be.visible")
    })

    it("Open note form", () => {
        //open form
        cy.get('[data-test="add-note"]')
            .click()
        cy.wait(2000)
        //check if button (close note) exists
        cy.get('[data-test="add-note"]')
            .should("exist")
            .then($button => {
                expect($button[0].innerText.trim()).to.be.equal("Close Note")
            })

        cy.findByRole('textbox', {  name: /note text/i})
            .should("exist")


        cy.get('[data-test="submit-note"]')
            .should("be.visible")

        //all radio buttons in form should be visible
        cy.get('#notePriority > .row')
            .should("be.visible")
    })

    it("Display error message for input field note text", () => {
        cy.get('[data-test="add-note"]')
            .click()

        //submit button should be disabled
        cy.get('[data-test="submit-note"]')
            .should("be.visible")
            .should("be.disabled")

        //focus and un-focus input field to trigger error
        cy.findByRole('textbox', {  name: /note text/i})
            .should("exist")
            .click()

        cy.get('form > .mb-3')
            .click()

        //error message should be displayed
        cy.findByText(/enter note text\./i).should("exist")
        cy.wait(1000)

        //enter something in note input
        cy.findByRole('textbox', {  name: /note text/i})
            .should("exist")
            .type('Some note text goes in here...')

        //error message should not be displayed
        cy.findByText(/enter note text\./i).should("not.exist")

        //submit button should not be disabled
        cy.get('[data-test="submit-note"]')
            .should("be.visible")
            .should("be.not.disabled")

    })



    it('Add new note to brand', () => {
        cy.get('[data-test="add-note"]')
            .click()

        cy.findByRole('textbox', {  name: /note text/i})
            .type('Some note text goes in here...')

        cy.get('[data-test="LOW"] > .MuiRadio-root > .PrivateSwitchBase-input')
            .not('[disabled]')
            .should('be.checked')

        cy.get('[data-test="MEDIUM"] > .MuiRadio-root > .PrivateSwitchBase-input')
            .check()

        cy.get('[data-test="HIGH"] > .MuiRadio-root > .PrivateSwitchBase-input')
            .check()

        //submit note
        cy.get('[data-test="submit-note"]')
            .click()
    })

    it('Check if note was added', () => {
        cy.get('[data-test="noteText"]').first()
            .then($noteText => {
                expect($noteText[0].innerText).to.be.equal('Some note text goes in here...')
                }
            )

        cy.get('[data-test="notePriority"]').first()
            .then($notePriority => {
                    expect($notePriority[0].innerText.split(":")[1].trim()).to.be.equal('HIGH')
                }
            )

        cy.get('[data-test="noteStatus"]').first()
            .then($noteStatus => {
                    expect($noteStatus[0].innerText).to.be.equal('TODO')
                }
            )

        const dateTime = new Date();
        cy.get('[data-test="noteCreatedAt"]').first()
            .then($noteCreatedAt => {
                let date = $noteCreatedAt[0].innerText.split(" ")[0].split("-");
                expect(date[0]).to.be.equal(dateTime.getUTCFullYear().toString())
                expect(Number(date[1])).to.be.equal(dateTime.getUTCMonth() + 1)
                expect(Number(date[2])).to.be.equal(dateTime.getUTCDate())

                let time = $noteCreatedAt[0].innerText.split(" ")[1].split(":").slice(0, -1);
                expect(Number(time[0])).to.be.equal(dateTime.getHours())
                expect(Number(time[1])).to.be.equal(dateTime.getMinutes())
                }
            )
    })

    it('Change note status', () => {
        cy.get('[data-test="noteStatus"]').first()
            .click()
        cy.wait(1000)

        cy.get('[data-test="noteStatus"]').first()
            .then($noteStatus => {
                    expect($noteStatus[0].innerText).to.be.equal('IN PROGRESS')
                }
            )
            .click()

        cy.wait(1000)
        cy.get('[data-test="noteStatus"]').first()
            .then($noteStatus => {
                    expect($noteStatus[0].innerText).to.be.equal('DONE')
                }
            )
            .click()
        cy.wait(1000)
        cy.get('[data-test="noteStatus"]').first()
            .then($noteStatus => {
                    expect($noteStatus[0].innerText).to.be.equal('TODO')
                }
            )
    })

})