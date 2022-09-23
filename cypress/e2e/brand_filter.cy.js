context('Filter by date created', () => {
    beforeEach(() => {
        // browser with a 720p monitor
        cy.viewport(1280, 720)

        //visit login page
        cy.visit('/brands')

        //Assert that brand view is shown
        cy.get('[data-test="brandView"]').should("exist")
        cy.wait(2000)
    })


    it("Filter by date created", () => {
        cy.get('[data-test="filterButton"]')
            .should("exist")
            .should("be.visible")
            .click()

        cy.wait(3000)
        cy.get('[data-test="beforeDate"] > .MuiInputBase-root-121 > #brandDateCreatedAfter')
            .click()

        cy.wait(2000)
        cy.get('.MuiPickersYear-yearSelected-284')
            .click()

        cy.wait(2000)
        cy.findByRole('button', {  name: /aug/i})
            .click()

        cy.wait(2000)
        cy.findByRole('button', {  name: /21/i})
            .click()


        //submit date selected
        cy.findByRole('button', {  name: /ok/i})
           .click()


        cy.findByRole('button', {  name: /filter/i})
            .click()

        //check if filter is applied
        cy.get('.MuiChip-label > span > b')
            .should('exist')
            .then($filter => {
                const createdBeforeFilter = $filter[0].innerText.split(" ");
                expect(createdBeforeFilter[1]).to.be.equal('Aug')
                expect(createdBeforeFilter[2]).to.be.equal('21')
                expect(createdBeforeFilter[3]).to.be.equal('2022')
            })

        cy.wait(2000)

        //clear filter
        cy.get('[data-test="filterButton"]')
            .should("exist")
            .should("be.visible")
            .click()

        cy.findByText(/clear filter/i)
            .click()

        //close popover
        cy.get('[data-test="filterButton"]')
            .should("exist")
            .should("be.visible")
            .click()


        //no filter indicators are shown
        cy.get('.MuiChip-label > span > b')
            .should('not.exist')
    })

    it("Filter by brand manufacturer", () => {
        cy.get('[data-test="filterButton"]')
            .should("exist")
            .should("be.visible")
            .click()


        //select brand names to filter upon
        cy.get(':nth-child(1) > .select-search > .select-search__value > .select-search__input')
            .type('b')
        cy.wait(1000)
        cy.findByRole('button', {  name: /bershka/i})
            .click()
        cy.wait(1000)
        cy.findByRole('button', {  name: /bimilk/i})
            .click()
        cy.wait(1000)

        cy.get('.popover-body > .mt-1')
            .click()
        cy.wait(1000)

        cy.findByRole('button', {  name: /filter/i})
            .click()

        let brandNameFilteredBy = [];
            cy.get('.MuiChip-label > span > b')
                .should('exist')
                .then($filter => {
                    for(let i =0 ;i< $filter.length ;i++) {
                        brandNameFilteredBy.push($filter[i].innerText)
                    }
                })
                .then( $test => {
                    expect(brandNameFilteredBy).to.match(/Bershka/)
                    expect(brandNameFilteredBy).to.match(/Bimilk/)
                    }
                )

            cy.wait(4000)
            //clear filter
            cy.get('[data-test="filterButton"]')
                .should("exist")
                .should("be.visible")
                .click()

            cy.findByText(/clear filter/i)
                .click()

        cy.wait(2000)

            //close popover
            cy.get('[data-test="filterButton"]')
                .should("exist")
                .should("be.visible")
                .click()

        cy.wait(2000)
            //no filter indicators are shown
            cy.get('.MuiChip-label > span > b')
                .should('not.exist')


    })

})