context(' page tests', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/brands')
        cy.wait(1000)
    })

    it('Collapse navbar', () => {
        //initially navbar should be expanded
        let classes;
        cy.get('body').should($element => {
             classes = $element[0].className;
            expect(classes).to.not.match(/mini-navbar/)
        })

        //minimize navbar by clicking on button
        cy.get('[data-test="navbarButton"]')
            .click()

        //navbar should be minimized
        cy.get('body').should($element => {
            classes = $element[0].className;
            expect(classes).to.match(/mini-navbar/)
        })
        cy.wait(1000)
        //expand navbar by clicking on button
        cy.get('[data-test="navbarButton"]')
            .click()

        //navbar should not be minimized
        cy.get('body').should($element => {
            classes = $element[0].className;
            expect(classes).to.not.match(/mini-navbar/)
        })
        cy.wait(1000)
    })


    it('Set the viewport size and dimension', () => {
        //Assert that navbar is shown
        cy.get('[data-test="navbarView"]').should("exist")
        let classes;
        cy.get('body').should($element => {
            classes = $element[0].className;
            expect(classes).to.not.match(/body-small/)
        })
        //resize window
        cy.viewport(500, 600)
        // the navbar should have collapse since our screen is smaller
        cy.get('body').should($element => {
            classes = $element[0].className;
            expect(classes).to.match(/body-small/)
        })
        cy.wait(1000)
    })


})