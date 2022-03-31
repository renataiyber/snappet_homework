export class LoginPage {

    userName() {
        return cy.get('#Input_Username');
    }

    password() {
        return cy.get('#password-input');
    }

    loginBtn () {
        return cy.get ('form button[type="submit"]');
    }

    frgtPassword () {
        return cy.get ('.forgot-password');
    }

    login () {
        this.userName()
            .type('TechChallengeTeacher')
        this.password()
            .get('#password-input')
            .type('P@ssw0rd')
        this.loginBtn()
            .click()
    }



}
