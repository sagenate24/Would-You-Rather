import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import FadeIn from 'react-fade-in';
import '../styles/App.css';

import PollQuestion from './PollQuestion';
import QuestionList from './QuestionList';
import NewPoll from './NewPoll';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import Login from './Login';
import NoMatch from './NoMatch';
import Profile from './Profile';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  returnProfile() {
    if (this.props && this.props.authedUser) {
      return (<Profile />);
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='App-container'>
            <div className='nav-bar'>
              <div className='nav-bar-child'>
                <Nav />
                {this.returnProfile()}
              </div>
            </div>
            <div className='App-body'>
              {this.props.loading === true
                ? <Route to='/login' exact component={Login} />
                : <Switch>
                  <Route path='/' exact component={QuestionList} />
                  <Route path='/questions/:id' component={PollQuestion} />
                  <Route path='/add' component={NewPoll} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route component={NoMatch} />
                </Switch>}
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser,
  }
}

export default connect(mapStateToProps)(App);
