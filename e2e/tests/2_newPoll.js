module.exports = {
  
  'Create new question'(browser) {
    const signInPage = browser.page.signIn();
    const newPollPage = browser.page.newPoll();
    const homePage = browser.page.homePage();

    signInPage.navigate();
    signInPage.waitForElementVisible('@loginSelect');
    signInPage.waitForElementVisible('@selectOptionValue');
    signInPage.click('@initialNav');
    signInPage.click('@selectOptionValue');
    signInPage.click('@loginButton');
    homePage.expect.element('@homeVisible').to.be.present;
    newPollPage.waitForElementVisible('@newQuestionNav');
    newPollPage.click('@newQuestionNav');
    newPollPage.expect.element('@newQuestionNav').to.be.present;
    newPollPage.expect.element('@wyrBanner').to.be.present;
    newPollPage.expect.element('@orText').to.be.present;
    newPollPage.setValue('@textAreaA', 'optionA');
    newPollPage.setValue('@textAreaB', 'optionB');
    newPollPage.waitForElementVisible('@submitButton');
    newPollPage.click('@submitButton');
    homePage.expect.element('@homeVisible').to.be.present;
    homePage.assert.containsText('.q-list-ul li:first-child', 'optionA');
    browser.end();
  },
};
