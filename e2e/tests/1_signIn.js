module.exports = {
  
  'Sign in: from home'(browser) {
    const signInPage = browser.page.signIn();
    const homePage = browser.page.homePage();

    signInPage.navigate()
    signInPage.waitForElementVisible('@loginSelect');
    signInPage.waitForElementVisible('@selectOptionValue');
    signInPage.click('@initialNav');
    signInPage.click('@selectOptionValue');
    signInPage.click('@loginButton');
    homePage.expect.element('@homeVisible').to.be.present;
    browser.end();
  }
};
