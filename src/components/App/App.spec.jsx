import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  it('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').length).toBe(1)
  })
})
