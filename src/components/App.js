import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { handleLogOutUser } from '../actions/authedUser';
import './App.css';

import PollQuestion from './PollQuestion';
import QuestionList from './QuestionList';
import NewPoll from './NewPoll';
import Nav from './Nav';
import Leaderboard from './Leaderboard';
import Login from './Login';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleLogOut = () => {
    this.props.dispatch(handleLogOutUser());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <button onClick={this.handleLogOut}>Log out</button>
            {this.props.loading === true
              ? <Route to='/login' exact component={Login} />
              : <div>
                <Switch>
                  <Route path='/' exact component={QuestionList} />
                  <Route path='/question/:id' component={PollQuestion} />
                  <Route path='/add' component={NewPoll} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
