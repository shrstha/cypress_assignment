/// <reference types="cypress" />

context('Daraz Website Test', () => {
  beforeEach(() => {
    /*
      1. Open Daraz website.
      2. Login to Daraz with the created credential.
      3. Search the item(Mobile) in the Dark Search Box. 
    */
    cy.visit('https://www.daraz.com.np/')
    cy.get("#anonLogin > .grey").click()
    cy.get(".mod-login-input-loginName > input").type('vewehip431@grokleft.com')
    cy.get(".mod-input-password > input").type("y0u're-reading-my-pwd")
    cy.get(".next-btn").click()
    cy.wait(2000)
    cy.get("#q").type("Mobile")
    cy.get(".search-box__button--1oH7").click()
    /*
      ----- END -----
    */
  })

  /*
    4. Apply multiple filter and add item to the cart (Brand, Price, Rating).
    6. Remove the item in the cart.
  */
  it('Applying multiple filters adding to cart & remove from cart', () => {
    //Applying multiple filters adding to cart
    cy.wait(2000)
    cy.get(":nth-child(2) > .c2uiAC > :nth-child(1) > .c1WzWT > :nth-child(4) > .ant-checkbox > .ant-checkbox-input").check() //Clicks on OnePlus checkbox under Brand filter
    cy.get("[placeholder='Min']").type('60000')
    cy.get("[placeholder='Max']").type('90000')
    cy.get('.ant-btn').click() 
    cy.get(':nth-child(1) > .ant-rate').click() //Clicks on the 5-star rating option
    cy.contains('OnePlus 8T [ 12GB RAM, 256 GB ROM, Ultra Fast Charging, 120 Hz Fluid AMOLED display for Ultra Smooth Scrolling,').click()
    cy.get('.pdp-button_theme_orange').click() //clicks the Add to Cart button

    //Remove the item in the cart
    cy.get('.next-btn-secondary').click() //Clicks on Go to Cart
    cy.wait(2000)
    cy.get('.cart-icon > svg').click()
    cy.get('.checkbox-wrap > .next-checkbox > input').click() //Selects all items
    cy.get('.list-header-operation-text').click() //Clicks on Delete button
    cy.get('.ok').click() //Clicks on the Remove option
  })
  /*
    ----- END -----
  */

  /*
    5. Apply sort by filter from Low to High and select on the mobile search listing.
  */
  it('Apply sort by filter from Low to High and select on the mobile search listing', () => {
    cy.get(".ant-select-selection").click({force: true})
    cy.get("li[title='Price low to high']").click()
    cy.wait(2000)
    cy.get('[data-item-id="104150651"]').click()
  })
  // /*
  //   ----- END -----
  // */

  // /*
  //   7. Visit the seller homepage (Oliz Homepage) in Daraz.
  //   8. Search for Oliz Store in the Daraz Search Box.
  //   9. Verify the base URL after user visit
  //   10. Click for Free delivery -> Search for any item
  //   11. Click Shop Now -> Verify Free Delivery in Product page
  //   12. Ask Question for the particular product in Daraz and verify the question(Use API Stub)
  //   13. Verify Save More On App Click Action and verify App download link 
  // */
  it('Visit Oliz store homepage in Daraz website', () => {
    // 8. Search for Oliz Store in the Daraz Search Box.
    cy.get('#q').clear().type('oliz store')
    cy.get('.search-box__button--1oH7').click()

    // 7. Visit the seller homepage (Oliz Homepage) in Daraz.
    cy.get(':nth-child(2) > .c2uiAC > :nth-child(1) > .c1WzWT > :nth-child(2) > .ant-checkbox > .ant-checkbox-input').check() //Checks the Oliz Store option in Brand checkbox
    cy.wait(2000)
    cy.get('.c16H9d > a').click() //Clicks on the product sold by Oliz Store
    cy.get('.seller-link > .pdp-link').click({force:true}) //Click on the Go to store button

    // 9. Verify the base URL after user visit
    cy.url().should('include', '/shop/oliz-store/')

    // 10. Click for Free delivery -> Search for any item
    cy.contains('Free Delivery').first().click() //Clicks on Free Delivery Menu item
    cy.wait(2000)

    // 11. Click Shop Now -> Verify Free Delivery in Product page
    cy.contains('Shop Now').first().click() //Clicks on the Shop Now button
    cy.get('.delivery-option-item__promotion > .html-content').contains('free shipping')

    // 13. Verify Save More On App Click Action and verify App download link
    cy.get('#topActionDownload').click()
    cy.get('.get-the-app').should('be.visible')
    cy.get('.app-stores > a')
      .should('have.attr', 'href')
      .and('include','itunes.apple.com/app/id978058048') 
    cy.get('.app-stores > a')
      .eq(1).should('have.attr', 'href')
      .and('include','play.google.com/store/apps/details?id=com.daraz.android')

    // 12. Ask Question for the particular product in Daraz and verify the question(Use API Stub)  
    cy.server()
    cy.route('GET', '**/getQnAList/**', 'fixtures:example.json')
    cy.get('.qna-ask-box > .next-input > input').type('test')
    cy.get('.next-btn').click()
    cy.get('.qna-list')
      .should('contain', 'test')
  })
  /*
    ----- END -----
  */
})
