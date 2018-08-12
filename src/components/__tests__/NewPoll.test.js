
jest.mock('../../actions/shared');

import React from 'react';
import { shallow } from 'enzyme';
import NewPoll from '../NewPoll';
import { handleAddQuestion } from '../../actions/shared';
import * as NathanUrl from '../../Images/me.png';
import * as ClaireUrl from '../../Images/claire.jpg';

const mockUsers = {
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
};

it('should update state of with the users provided questions', () => {

  const eventA = { target: { value: 'random stringA' }};
  const eventB = { target: { value: 'random stringB' }};

  const wrapper = shallow(<NewPoll.WrappedComponent users={mockUsers} authedUser={'nathan'}/>).instance();

  wrapper.setState({ optionOneText: '', optionTwoText: '' });
  wrapper.handleChangeA(eventA);
  expect(wrapper.state.optionOneText).toEqual('random stringA');
  wrapper.handleChangeB(eventB);
  expect(wrapper.state.optionTwoText).toEqual('random stringB');

});

it('should create a new question', () => {
  
  handleAddQuestion.mockImplementation(() => 'value');

  const e = { preventDefault: jest.fn() };
  const loading = { loadingBar: { default: 1 }};

  const mockDispatch = jest.fn();
  const wrapper = shallow(<NewPoll.WrappedComponent users={mockUsers} loadingBar={loading} authedUser={'nathan'} dispatch={mockDispatch}/>).instance();
  wrapper.setState({
    optionOneText: 'op1',
    optionTwoText: 'op2',
    toHome: false,
  });

  wrapper.handleSubmit(e);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(e.preventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith('value');
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(handleAddQuestion).toHaveBeenCalledWith(wrapper.state.optionOneText, wrapper.state.optionTwoText);
  expect(wrapper.state.toHome).toEqual(true);

});

it('should redirect to the home page if a new poll was submitted', () => {

  const loading = { loadingBar: { default: 0 }};
  const wrapper = shallow(<NewPoll.WrappedComponent users={mockUsers} loadingBar={loading} authedUser={'claire'} />);
  wrapper.setState({ home: true });
  wrapper.instance();
  expect(wrapper.children()).toHaveLength(1);

})