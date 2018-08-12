
jest.mock('../../actions/authedUser');

import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Login';
import { handleSetAuthedUser } from '../../actions/authedUser';

it('should be able to select a user', () => {
  const event = { target: { value: 'user' } };
  const loginComp = shallow(<Login.WrappedComponent userArray={[]} />).instance();

  loginComp.setState({ authedUser: '' });
  loginComp.handleChange(event);
  expect(loginComp.state.authedUser).toEqual('user');
});

it('should log in as the selected user', () => {
  handleSetAuthedUser.mockImplementation(() => 'hahah');

  const e = {
    preventDefault: jest.fn(),
    target: {
      value: 'user'
    }
  };

  const mockDispatch = jest.fn();
  const loginComp = shallow(<Login.WrappedComponent userArray={[]} dispatch={mockDispatch} />).instance();
  loginComp.setState({ authedUser: 'cheetos' });

  loginComp.handleAuthedUser(e);

  expect(e.preventDefault).toHaveBeenCalled();
  expect(e.preventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith('hahah');
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(handleSetAuthedUser).toHaveBeenCalledWith(loginComp.state.authedUser);
  expect(handleSetAuthedUser).toHaveBeenCalledTimes(1);
});

it('should render a list of multiple users', () => {
  let mockUserArray = ['nathan', 'claire', 'john'];

  const mockUsers = {
    nathan: {
      id: 'nathan',
      name: 'Nathan Sage',
    },
    claire: {
      id: 'claire',
      name: 'Claire Teters'
    },
    john: {
      id: 'john',
      name: 'John Doe'
    }
  };

  const loginComp = mount(<Login.WrappedComponent userArray={mockUserArray} users={mockUsers} />);

  expect(loginComp.find('select').children()).toHaveLength(4);
  expect(loginComp.find('option[value="nathan"]').text()).toEqual('Nathan Sage');
  expect(loginComp.find('option[value="claire"]').text()).toEqual('Claire Teters');
  expect(loginComp.find('option[value="john"]').text()).toEqual('John Doe');
});


it('should not blow up into smithereens if there are no users', () => {
  let mockUserArray = [];
  const mockUsers = {};

  const loginComp = mount(<Login.WrappedComponent userArray={mockUserArray} users={mockUsers} />);

  expect(loginComp.find('select').children()).toHaveLength(1);
});
