import * as NathanUrl from '../../Images/me.png';
import * as ClaireUrl from '../../Images/claire.jpg';
import * as JohnDoe from '../../Images/johnDoe.png';
import * as trophie from '../../Images/trophie.png';
import * as trophie2 from '../../Images/trophie2.png';
import * as trophie3 from '../../Images/trophie3.png';
import * as renderer from 'react-test-renderer';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Leaderboard from '../Leaderboard';

const mockUsers = [
  {
    id: "nathan",
    name: "Nathan Sage",
    avatarURL: NathanUrl,
    questionsAnswered: 4,
    questionsAsked: 4,
    total: 8,
  },
  {
    id: "claire",
    name: "Claire Teters",
    avatarURL: ClaireUrl,
    questionsAnswered: 4,
    questionsAsked: 3,
    total: 7,
  },
  {
    id: "johndoe",
    name: "John Doe",
    avatarURL: JohnDoe,
    questionsAnswered: 4,
    questionsAsked: 2,
    total: 6,
  }
];

it('should render a list  users', () => {

  const tree = renderer.create(
    <Leaderboard.WrappedComponent users={mockUsers} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});

it('should not blow up into smithereens if there are no users', () => {

  const tree = renderer.create(
    <Leaderboard.WrappedComponent />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});

it('should render a list of only one user', () => {

  const mockUser = [
    {
      id: "nathan",
      name: "Nathan Sage",
      avatarURL: NathanUrl,
      questionsAnswered: 4,
      questionsAsked: 4,
      total: 8,
    }
  ];

  const wrapper = mount(<Leaderboard.WrappedComponent users={mockUser} />);

  expect(wrapper.find('div.user-container').children()).toHaveLength(1);

});

it('should return a trophie if the given id exsists', () => {

  const wrapper = shallow(<Leaderboard.WrappedComponent users={mockUsers} />);

  expect(wrapper.instance().chooseTrophey('nathan')).toEqual(trophie);
  expect(wrapper.instance().chooseTrophey('claire')).toEqual(trophie2);
  expect(wrapper.instance().chooseTrophey('johndoe')).toEqual(trophie3);
  expect(wrapper.instance().chooseTrophey()).toEqual(null);

});
