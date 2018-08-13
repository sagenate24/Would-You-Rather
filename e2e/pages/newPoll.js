module.exports = {

  url: function () {
    return 'http://localhost:3000';
  },
  elements: {
    submitButton: {
      selector: 'button'
    },
    userNameHeader: {
      selector: 'p[data-uitest=newQuestion]'
    },
    wyrBanner: {
      selector: '.wyr-banner'
    },
    newQuestionNav: {
      selector: 'li[data-uitest=newQuestion]'
    },
    newQuestionAvatar: {
      selector: '.avatar-medium'
    },
    textAreaA: {
      selector: 'textarea[data-uitest=optionOneText]'
    },
    textAreaB: {
      selector: 'textarea[data-uitest=optionTwoText]'
    },
    orText: {
      selector: '.question-or'
    }
  }
};
