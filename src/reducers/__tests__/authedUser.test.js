import authedUser from '../authedUser';
import { setAuthedUser, logOutUser } from '../../actions/authedUser';

it('should set the authed user', () => {

  let userId = 'johndoe';

  expect(authedUser(undefined, setAuthedUser(userId))).toEqual(userId);
});

it('should log out the user', () => {

  expect(authedUser('johndoe', logOutUser())).toEqual(null);
});

it('should not modify state by default', () => {

  let action = {
    type: Math.random().toString()
  };

  expect(authedUser(null, action)).toEqual(null);
  expect(authedUser('johndoe', action)).toEqual('johndoe');
});