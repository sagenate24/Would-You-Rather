import React from 'react';
import * as renderer from 'react-test-renderer';
import NoMatch from '../NoMatch';

it('should render correctly', () => {

  const tree = renderer.create(
    <NoMatch />
  ).toJSON();
  expect(tree).toMatchSnapshot();

});