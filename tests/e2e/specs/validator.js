// https://docs.cypress.io/api/introduction/api.html

describe('努力値の余りをチェック', () => {
  it('HABミミッキュ', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('ミミッキュ{enter}')

    cy.get('.check-leftovers')
      .check()

    cy.get('.warning-box')
      .contains('残りの努力値は508です！')

    cy.get('.effort-hp')
      .clear()
      .type('196')
      .blur()

    cy.get('.warning-box')
      .contains('残りの努力値は312です！')

    cy.get('.effect-attack')
      .select('↑')
    cy.get('.effect-sp-attack')
      .select('↓')
    cy.get('.effort-attack')
      .clear()
      .type('156')
      .blur()

    cy.get('.warning-box')
      .contains('残りの努力値は156です！')

    cy.get('.effort-defence')
      .clear()
      .type('148')
      .blur()

    cy.get('.warning-box')
      .contains('残りの努力値は8です！')

    cy.get('.effort-sp-defence')
      .clear()
      .type('4')
      .blur()

    cy.get('.warning-box')
      .contains('残りの努力値は4です！')

    cy.get('.effort-speed')
      .clear()
      .type('4')
      .blur()

    cy.get('.warning-box')
      .should('not.exist')
  })
})

describe('努力値の無駄をチェック', () => {
  it('フシギダネ', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('フシギダネ{enter}')

    cy.get('.check-useless')
      .check()

    cy.get('.warning-box')
      .should('not.exist')

    cy.get('.effort-hp')
      .type('{uparrow}')
      .trigger('change')

    cy.get('.warning-box')
      .should('not.exist')

    cy.get('.effort-hp')
      .type('{uparrow}')
      .trigger('change')

    cy.get('.warning-box')
      .contains('HPの努力値に無駄があります！')

    cy.get('.effort-hp')
      .type('{uparrow}')
      .trigger('change')

    cy.get('.warning-box')
      .should('not.exist')
  })
})
