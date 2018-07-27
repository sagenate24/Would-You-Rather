import * as NathanUrl from '../Images/me.png';
import * as ClaireUrl from '../Images/claire.jpg';
import * as JohnDoe from '../Images/johnDoe.jpg';

let users = {
  claire: {
    id: 'claire',
    name: 'Claire Teters',
    avatarURL: ClaireUrl,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionOne',
      "3r18vdn9ilggpszlfeal86": 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9', '2ezoza3lsan24iezmucfat']
  },
  nathan: {
    id: 'nathan',
    name: 'Nathan Sage',
    avatarURL: NathanUrl,
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "zx6ug2my22i4jtmzi64ld9": 'optionTwo',
      "3r18vdn9ilggpszlfeal86": 'optionOne',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do', 'zx6ug2my22i4jtmzi64ld9', '3r18vdn9ilggpszlfeal86'],
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: JohnDoe,
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionTwo',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'claire',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['claire'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'have 500 tarantulas crawling in your house',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: '1000 crickets jumping around your room'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'claire',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'have to sneeze but not be able to',
    },
    optionTwo: {
      votes: ['claire'],
      text: 'have something stuck in your eye for a year'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'nathan',
    timestamp: 1482579767190,
    optionOne: {
      votes: ['claire'],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: [],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'nathan',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['nathan'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['nathan'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'write Swift'
    }
  },
  "zx6ug2my22i4jtmzi64ld9": {
    id: 'zx6ug2my22i4jtmzi64ld9',
    author: 'nathan',
    timestamp: 1488579767199,
    optionOne: {
      votes: [],
      text: 'have your face 2 inches away from a black widow spider for 10 minutes',
    },
    optionTwo: {
      votes: ['nathan'],
      text: 'slap a king cobra in the face 3 times'
    }
  },
  "3r18vdn9ilggpszlfeal86": {
    id: '3r18vdn9ilggpszlfeal86',
    author: 'nathan',
    timestamp: 1488579767195,
    optionOne: {
      votes: ['nathan'],
      text: 'be the dog with a long stick in his mouth trying to walk thru a narrow door',
    },
    optionTwo: {
      votes: ['claire'],
      text: 'the cat that jumps for a ledge and falls miserably short'
    }
  },
  "2ezoza3lsan24iezmucfat": {
    id: '2ezoza3lsan24iezmucfat',
    author: 'claire',
    timestamp: 1488579767193,
    optionOne: {
      votes: [],
      text: 'live one life that lasts 1,000 years',
    },
    optionTwo: {
      votes: [],
      text: 'live 10 lives that last 100 years each'
    }
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
