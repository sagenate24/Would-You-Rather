module.exports = {

  url: function () {
    return 'http://localhost:3000';
  },
  elements: {
    loginButton: {
      selector: '.login-button'
    },
    loginSelect: {
      selector: '.login-select'
    },
    selectOptionValue: {
      selector: '.login-select option[value=nathan]'
    },
    initialNav: {
      selector: 'li[data-uitest=home]'
    },
    homeVisible: {
      selector: '.q-list-ul'
    },
  }
};
