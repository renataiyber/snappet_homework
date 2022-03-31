import {LoginPage} from '../support/pages/login.page';

const lp = new LoginPage();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Log In', () => {
    beforeEach(() => {
        cy.visit('https://teacher.snappet.org/')
    });

    it('User Name required', () => {
        cy.log('User Name required')
        lp.loginBtn().click()
        cy.get('.text-danger.field-validation-error').should('include.text', 'Username is required')
    })

    it('Password required', () => {
        lp.userName()
            .type('TechChallengeTeacher')
        lp.loginBtn().click()
        cy.get('.text-danger.field-validation-error').should('include.text', 'Password is required')
    })

    it ('Wrong username', () => {
        lp.userName()
            .clear()
        lp.userName()
            .type('TestWrongMessage')
        lp.password()
            .type('P@ssw0rd')
        lp.loginBtn().click()
        cy.get('.text-danger.field-validation-error').should('include.text', 'Username or password is wrong')
    })

    it ('Wrong password', () => {
        lp.userName().clear()
        lp.userName().type('TechChallengeTeacher')
        lp.password().type('Test1234@test')
        lp.loginBtn().click()
        cy.get('.text-danger.field-validation-error').should('include.text', 'Username or password is wrong')
    })

    it ('Forgot password redirection', () => {
        lp.frgtPassword().click()
        cy.get('h2').should('include.text', 'Forgot your password?')
        cy.get('#emailInput').should('be.visible')
        cy.url().should('include', 'ForgotPassword')
    })

    it ('Log In', () => {

        lp.login()

        cy.get('.teach.active.is-active', {timeout:10000}).should('be.visible')
        cy.url().should('include', 'teach')

    })
})
