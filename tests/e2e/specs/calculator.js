// https://docs.cypress.io/api/introduction/api.html

describe('ポケモン名入力->ステータス反映', () => {
  it('無補正無振りクレセリア', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('クレセリア{enter}')

    cy.get('.hp')
      .should('have.value', '195')
    cy.get('.attack')
      .should('have.value', '90')
    cy.get('.defence')
      .should('have.value', '140')
    cy.get('.sp-attack')
      .should('have.value', '95')
    cy.get('.sp-defence')
      .should('have.value', '150')
    cy.get('.speed')
      .should('have.value', '105')
  })

  it('フォルムチェンジした無補正無振りロトム', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('ロトム(ヒートロトム){enter}')

    cy.get('.hp')
      .should('have.value', '125')
    cy.get('.attack')
      .should('have.value', '85')
    cy.get('.defence')
      .should('have.value', '127')
    cy.get('.sp-attack')
      .should('have.value', '125')
    cy.get('.sp-defence')
      .should('have.value', '127')
    cy.get('.speed')
      .should('have.value', '106')
  })
})

describe('ポケモン名入力->レベル入力->ステータス反映', () => {
  it('テッカグヤLv50', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('テッカグヤ{enter}')

    cy.get('.pokemon-lv')
      .select('50')

    cy.get('.hp')
      .should('have.value', '172')
    cy.get('.attack')
      .should('have.value', '121')
    cy.get('.defence')
      .should('have.value', '123')
    cy.get('.sp-attack')
      .should('have.value', '127')
    cy.get('.sp-defence')
      .should('have.value', '121')
    cy.get('.speed')
      .should('have.value', '81')
  })

  it('ホワイトキュレムLv100', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('キュレム(ホワイトキュレム){enter}')

    cy.get('.pokemon-lv')
      .select('100')

    cy.get('.hp')
      .should('have.value', '391')
    cy.get('.attack')
      .should('have.value', '276')
    cy.get('.defence')
      .should('have.value', '216')
    cy.get('.sp-attack')
      .should('have.value', '376')
    cy.get('.sp-defence')
      .should('have.value', '236')
    cy.get('.speed')
      .should('have.value', '226')
  })
})

describe('ポケモン名入力->努力値入力->ステータス反映', () => {
  it('無補正AdSガブリアス', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('ガブリアス{enter}')

    cy.get('.effort-attack')
      .clear()
      .type('252')
    cy.get('.effort-sp-defence')
      .clear()
      .type('4')
    cy.get('.effort-speed')
      .clear()
      .type('252')
<<<<<<< HEAD
      .blur()
=======
>>>>>>> develop

    cy.get('.hp')
      .should('have.value', '183')
    cy.get('.attack')
      .should('have.value', '182')
    cy.get('.defence')
      .should('have.value', '115')
    cy.get('.sp-attack')
      .should('have.value', '100')
    cy.get('.sp-defence')
      .should('have.value', '106')
    cy.get('.speed')
<<<<<<< HEAD
      .should('have.value', '154')
  })
})

describe('ポケモン名入力->個体値入力->ステータス反映', () => {
  it('A0ゲンガー', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('ゲンガー{enter}')

    cy.get('.individual-attack')
      .clear()
      .type('0')
      .blur()

    cy.get('.hp')
      .should('have.value', '135')
    cy.get('.attack')
      .should('have.value', '70')
    cy.get('.defence')
      .should('have.value', '80')
    cy.get('.sp-attack')
      .should('have.value', '150')
    cy.get('.sp-defence')
      .should('have.value', '95')
    cy.get('.speed')
      .should('have.value', '130')
=======
      .should('have.value', '122')
>>>>>>> develop
  })
})

describe('ポケモン名入力->性格補正入力->ステータス反映', () => {
  it('なまいきメタモン', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('メタモン{enter}')

    cy.get('.effect-sp-defence')
      .select('↑')
    cy.get('.effect-speed')
      .select('↓')

    cy.get('.hp')
      .should('have.value', '123')
    cy.get('.attack')
      .should('have.value', '68')
    cy.get('.defence')
      .should('have.value', '68')
    cy.get('.sp-attack')
      .should('have.value', '68')
    cy.get('.sp-defence')
      .should('have.value', '75')
    cy.get('.speed')
      .should('have.value', '61')
  })
})
<<<<<<< HEAD

describe('ポケモン名入力->レベル入力->努力値入力->個体値入力->性格補正入力->ステータス反映', () => {
  it('最遅バンギラス', () => {
    cy.visit('/')
    cy.get('.pokemon-name-input')
      .type('バンギラス{enter}')

    cy.get('.pokemon-lv')
      .select('50')
    cy.get('.effort-hp')
      .clear()
      .type('252')
    cy.get('.effort-attack')
      .clear()
      .type('204')
    cy.get('.effort-sp-defence')
      .clear()
      .type('52')

    cy.get('.individual-speed')
      .clear()
      .type('0')

    cy.get('.effect-attack')
      .select('↑')
    cy.get('.effect-speed')
      .select('↓')

    cy.get('.hp')
      .should('have.value', '207')
    cy.get('.attack')
      .should('have.value', '198')
    cy.get('.defence')
      .should('have.value', '130')
    cy.get('.sp-attack')
      .should('have.value', '115')
    cy.get('.sp-defence')
      .should('have.value', '127')
    cy.get('.speed')
      .should('have.value', '59')
  })
})
=======
>>>>>>> develop
