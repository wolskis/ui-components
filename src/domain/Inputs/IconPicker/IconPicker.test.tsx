import { shallow } from 'enzyme'
import React from 'react'

import { IconType } from '../../Icons/Icon'
import { IconPicker } from './IconPicker'

const dummyClick = () => console.log('hey')

const testIcons = [
  'intelli-icon-australia',
  'intelli-icon-card',
  'intelli-icon-book'
] as IconType[]

describe('<IconPicker />', () => {
  it(`should render an Icon Picker`, () => {
    const wrapper = shallow(
      <IconPicker
        name='icon-picker'
        handleChange={dummyClick}
        icons={testIcons}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
