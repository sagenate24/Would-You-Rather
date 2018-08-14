jest.mock('../../actions/shared');

import { handleInitialData } from '../../actions/shared';

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('should dispatch the initial data correctly', () => {
  const mockLoading = false;
  const mockAuthedUser = 'johndoe';
  handleInitialData.mockImplementation(() => 'hahah');
  const mockDispatch = jest.fn();

  const wrapper = shallow(<App.WrappedComponent loading={mockLoading} authedUser={mockAuthedUser} dispatch={mockDispatch} />)

  wrapper.instance();

  expect(handleInitialData).toHaveBeenCalled();
  expect(handleInitialData).toHaveBeenCalledTimes(1);

});
