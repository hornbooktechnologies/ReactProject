import React from 'react'
import CurrentStatus from '../../components/currentStatus/CurrentStatus';
import renderer from 'react-test-renderer'
describe('Component: CurrentStatus', () => {

it('CurrentStatus renders correctly', () => {
  const tree = renderer.create(<CurrentStatus />).toJSON()
  expect(tree).toMatchSnapshot()
})

});


